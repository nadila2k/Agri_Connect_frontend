import React, { useState, useEffect } from 'react';
import { BsCloudPlusFill } from "react-icons/bs";
import './Styles_blogs.css'; 
import apiHelper from '../../../features/apiHelper.js'; 

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState({ title: '', description: '', image: null });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await apiHelper('get', { url: '/blogs' });
      setBlogs(response);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBlog({ ...blog, image: file });
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setIsEditing(false);
    setBlog({ title: '', description: '', image: null });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (blog.title && blog.description && blog.image) {
      const formData = new FormData();
      formData.append('title', blog.title);
      formData.append('description', blog.description);
      formData.append('image', blog.image);

      try {
        if (isEditing) {
          // Update blog
          const response = await apiHelper('put', {
            url: `/blogs/${blogs[editingIndex].id}`,
            data: formData,
          });
          setBlogs(blogs.map((b, i) => (i === editingIndex ? response : b)));
          setNotification('Blog updated successfully!');
        } else {
          // Add new blog
          const response = await apiHelper('post', { url: '/blogs', data: formData });
          setBlogs([...blogs, response]);
          setNotification('Blog added successfully!');
        }
        closePopup();
        setTimeout(() => setNotification(null), 3000);
      } catch (error) {
        console.error('Error submitting blog:', error);
        setError('An error occurred while saving the blog.');
      }
    } else {
      setError('All fields are required!');
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiHelper('delete', { url: `/blogs/${id}` });
      setBlogs(blogs.filter(b => b.id !== id));
      setNotification('Blog deleted successfully!');
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error('Error deleting blog:', error);
      setError('An error occurred while deleting the blog.');
    }
  };

  const handleUpdateClick = (index) => {
    setEditingIndex(index);
    setBlog(blogs[index]);
    setIsEditing(true);
    openPopup();
  };

  return (
    <div className="blog-manager-full">
      {notification && <div className="notification">{notification}</div>}
      {error && <div className="error-card">{error}</div>}
      
      <h1>Manage Blogs</h1>
      <p>Here you can manage your Blogs.</p>

      <div className="centered-button">
        <button className="add-blog-button" onClick={openPopup}><BsCloudPlusFill />Add Blog</button>
      </div>

      {isPopupOpen && (
        <div className="popup-modal">
          <div className="popup-content">
            <button className="close-button" onClick={closePopup}>X</button>
            <h2>{isEditing ? 'Update Blog' : 'Add Blog'}</h2>
            <form onSubmit={handleSubmit} className="add-blog-form">
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={blog.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Description:</label>
                <textarea
                  name="description"
                  value={blog.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Image:</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  required
                />
              </div>
              <div className="popup-buttons">
                <button type="submit" className="submit-blog-button">
                  {isEditing ? 'Update Blog' : 'Add Blog'}
                </button>
                <button type="button" className="close-popup-button" onClick={closePopup}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((b, index) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.description}</td>
              <td>
                {b.image && (
                  <img
                    src={b.image} // Assuming image URL is returned by API
                    alt={b.title}
                    style={{ width: '100px', height: 'auto' }}
                  />
                )}
              </td>
              <td>
                <button className="update-crop-button" onClick={() => handleUpdateClick(index)}>Update</button>
                <button className="delete-crop-button" onClick={() => handleDelete(b.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogManager;
