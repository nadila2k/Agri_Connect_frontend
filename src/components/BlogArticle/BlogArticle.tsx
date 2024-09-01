import React from "react";
import "./BlogArticle.css";

const BlogComponent = () => {
  const blogPosts = [
    {
      title: "Exploring Sustainable Agriculture",
      image:
        "https://online.maryville.edu/wp-content/uploads/sites/97/2022/01/agricultural-manager.jpg",
      text: "Learn how sustainable agriculture is reshaping the farming industry and promoting healthier ecosystems.",
    },
    {
      title: "Organic Farming: A Growing Trend",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjK909CclDOCfl6Rs7Xy5X03OBP0WpNRabdQ&s",
      text: "Discover why more farmers are turning to organic practices and how it benefits our health and the environment.",
    },
    {
      title: "The Future of Farm-to-Table",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ2buFhStThxSt7QKBptHPB-dwpGANrinELw&s",
      text: "Explore the rising popularity of farm-to-table dining and its impact on local communities and food quality.",
    },
    {
      title: "Innovative Techniques in Crop Rotation",
      image:
        "https://media.licdn.com/dms/image/D4E12AQG2vW0BPJR9fw/article-cover_image-shrink_720_1280/0/1684936936409?e=2147483647&v=beta&t=ZvYpex_zsbk5llYg33dzCWl5kl33v4QSIGTyCIzE7qk",
      text: "Delve into the latest advancements in crop rotation techniques that are helping farmers increase yield sustainably.",
    },
  ];

  return (
    <section className="blog-section">
      <h2 className="blog-title">Latest Insights</h2>
      <p className="blog-subtitle">
        Stay updated with the latest trends and insights in sustainable and
        organic farming.
      </p>
      <div className="blog-content">
        {blogPosts.map((post, index) => (
          <div className="blog-card" key={index}>
            <img src={post.image} alt={post.title} className="blog-image" />
            <div className="blog-card-content">
              <h3 className="blog-card-title">{post.title}</h3>
              <p className="blog-card-text">{post.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogComponent;
