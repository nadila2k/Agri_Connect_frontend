import React, { useState } from "react";
import "./ProductComponent.css";
import ProductDetailComponent from "./Products/ProductDetailComponent.jsx";

const ProductComponent = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      name: "Fertilizer",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiqgJgqaEywqBtevXogPy-uj973YRTPPgl8w&s",
      description: "High-quality fertilizers to boost crop growth and yield.",
      details: {
        intro: "Explore our range of high-quality fertilizers that can enhance soil fertility and improve crop yields.",
        items: [
          { name: "Organic Fertilizer", description: "Rich in nutrients and environmentally friendly." },
          { name: "Chemical Fertilizer", description: "Quickly enhances soil fertility for immediate results." },
          { name: "Slow-Release Fertilizer", description: "Provides nutrients over an extended period for sustained growth." },
        ],
      },
    },
    {
      name: "Machinery",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuzT7YFSxwuN2q4I4lY01tHst2c7umokuY9g&s",
      description: "Reliable and efficient machinery for modern agriculture.",
      details: {
        intro: "Our selection of agricultural machinery includes tractors, plows, and harvesters designed for efficiency and durability.",
        items: [
          { name: "Tractor", description: "Versatile and powerful for various farming tasks." },
          { name: "Plow", description: "Essential for preparing soil for planting." },
          { name: "Harvester", description: "Efficiently collects crops with minimal effort." },
        ],
      },
    },
    {
      name: "Wholesale",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjsB2jNvewJDkC3uiz1AwscJYSb-3rxGY-pQ&s",
      description: "Bulk purchasing options for all your agricultural needs.",
      details: {
        intro: "Take advantage of our wholesale options to save on bulk purchases.",
        items: [
          { name: "Bulk Seeds", description: "Affordable prices for large quantities of seeds." },
          { name: "Bulk Fertilizers", description: "Competitive pricing for bulk fertilizer purchases." },
          { name: "Bulk Equipment", description: "Discounted rates on large orders of agricultural machinery." },
        ],
      },
    },
  ];

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBackClick = () => {
    setSelectedProduct(null);
  };

  return (
    <section className="product-section">
      {!selectedProduct ? (
        <>
          <h2 className="product-title">Our Products</h2>
          <p className="product-subtitle">
            Explore our range of essential agricultural products.
          </p>
          <div className="product-content">
            {products.map((product, index) => (
              <div
                className="product-card"
                key={index}
                onClick={() => handleCardClick(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-card-content">
                  <h3 className="product-card-title">{product.name}</h3>
                  <p className="product-card-description">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <ProductDetailComponent product={selectedProduct} onBackClick={handleBackClick} />
      )}
    </section>
  );
};

export default ProductComponent;
