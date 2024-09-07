import React, { useState, useEffect } from 'react';
import './Styles_listings.css';
import APIHelper from '../../utils/APIHelper'; // Adjust the import according to your project structure

const Listings = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    location: '',
    contactNumber: '',
    image: null,
    stockCount: '',
    productType: '' // Added field for product type
  });
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch userId from login details or context
    const fetchUserId = async () => {
      try {
        const response = await APIHelper.get('/user/me'); // Replace with your endpoint
        setUserId(response.data.id);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
    fetchProducts(); // Fetch initial product data
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await APIHelper.get('/products'); // Replace with your endpoint
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (
      product.name &&
      product.description &&
      product.price &&
      product.location &&
      product.contactNumber &&
      product.image &&
      product.stockCount &&
      product.productType
    ) {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('location', product.location);
      formData.append('contactNumber', product.contactNumber);
      formData.append('image', product.image);
      formData.append('stockCount', product.stockCount);
      formData.append('productType', product.productType);
      formData.append('userId', userId);

      try {
        await APIHelper.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        }); // Replace with your endpoint
        setProducts([...products, product]);
        setProduct({
          name: '',
          description: '',
          price: '',
          location: '',
          contactNumber: '',
          image: null,
          stockCount: '',
          productType: ''
        });
        setShowPopup(false);
        setNotification('Product added successfully!');
        setTimeout(() => setNotification(null), 3000);
      } catch (error) {
        console.error('Error adding product:', error);
        setError('Error adding product. Please try again.');
      }
    } else {
      setError('Please fill out all fields and upload an image.');
    }
  };

  const handleDelete = async (index) => {
    try {
      await APIHelper.delete(`/products/${products[index].id}`); // Replace with your endpoint
      const updatedProducts = products.filter((_, i) => i !== index);
      setProducts(updatedProducts);
      setNotification('Product deleted successfully!');
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Error deleting product. Please try again.');
    }
  };

  const handleUpdate = async (index) => {
    const selectedProduct = products[index];
    const updatedProduct = { ...selectedProduct, productType: selectedProduct.productType };

    const formData = new FormData();
    formData.append('name', updatedProduct.name);
    formData.append('description', updatedProduct.description);
    formData.append('price', updatedProduct.price);
    formData.append('location', updatedProduct.location);
    formData.append('contactNumber', updatedProduct.contactNumber);
    formData.append('stockCount', updatedProduct.stockCount);
    formData.append('productType', updatedProduct.productType);
    formData.append('userId', userId);

    try {
      await APIHelper.put(`/products/${selectedProduct.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }); // Replace with your endpoint
      const updatedProducts = [...products];
      updatedProducts[index] = updatedProduct;
      setProducts(updatedProducts);
      setNotification('Product updated successfully!');
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Error updating product. Please try again.');
    }
  };

  return (
    <div className="vendor-manager">
      {notification && <div className="notification">{notification}</div>}
      {error && <div className="error-card">{error}</div>}

      <h1>Manage Listings</h1>
      <p>Here you can manage your fertilizer products.</p>

      <div className="centered-button">
        <button className="add-product-button" onClick={() => setShowPopup(true)}>Add Product</button>
      </div>

      {showPopup && (
        <div className="popup-modal">
          <div className="popup-content">
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit} className="add-product-form">
              <div>
                <label>Product Name:</label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Description:</label>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Price:</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Location:</label>
                <input
                  type="text"
                  name="location"
                  value={product.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Contact Number:</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={product.contactNumber}
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
              <div>
                <label>Stock Count:</label>
                <input
                  type="number"
                  name="stockCount"
                  value={product.stockCount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Product Type:</label>
                <select
                  name="productType"
                  value={product.productType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Product Type</option>
                  <option value="Fertilizer">Fertilizer</option>
                  <option value="Machine">Machine</option>
                </select>
              </div>
              <button type="submit" className="submit-product-button">Submit</button>
              <button type="button" className="close-popup-button" onClick={() => setShowPopup(false)}>Close</button>
            </form>
          </div>
        </div>
      )}

      {/* Table to show products */}
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Stock Count</th>
            <th>Image</th>
            <th>Product Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr key={index}>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.stockCount}</td>
              <td>
                {p.image && (
                  <img
                    src={URL.createObjectURL(p.image)}
                    alt={p.name}
                    style={{ width: '100px', height: 'auto' }}
                  />
                )}
              </td>
              <td>{p.productType}</td>
              <td>
                <button className="update-product-button" onClick={() => handleUpdate(index)}>Update</button>
                <button className="delete-product-button" onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Listings;
