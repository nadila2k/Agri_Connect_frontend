import React from "react";
import "./ProductDetailComponent.css";

const ProductDetailComponent = ({ product, onBackClick }) => {
  return (
    <div className="product-detail-section">
      <button className="back-button" onClick={onBackClick}>Back to Products</button>
      <div className="product-detail-content">
        <img src={product.image} alt={product.name} className="product-detail-image" />
        <div className="product-detail-info">
          <h2 className="product-detail-title">{product.name}</h2>
          <p className="product-detail-intro">{product.details.intro}</p>
          <ul className="product-detail-items">
            {product.details.items.map((item, index) => (
              <li key={index}>
                <strong>{item.name}:</strong> {item.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailComponent;
