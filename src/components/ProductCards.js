// components/ProductCards.js
import React from 'react';
import { ExternalLink } from 'lucide-react';
const ProductCards = ({ featuredProducts }) => (
  <>
   {featuredProducts.map((product) => (
        <div key={product.title} className="project-card">
            {" "}
            {/* Reusing project-card class */}
            <div className="project-card-image-container">
                {" "}
                {/* Reusing project-card-image-container class */}
                <img
                    src={product.image}
                    alt={product.title}
                    className="project-card-image"
                    loading="lazy"
                    width={600}
                    height={400}
                />
                <div className="project-card-overlay">
                    {" "}
                    {/* Reusing project-card-overlay class */}
                    <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card-link"
                        aria-label={`Xem chi tiết sản phẩm ${product.title}`}
                    >
                        <span>Xem Chi Tiết</span>
                        <ExternalLink size={18} aria-hidden="true" />
                    </a>
                </div>
            </div>
            <div className="project-card-content">
                {" "}
                {/* Reusing project-card-content class */}
                <h3 className="project-card-title">{product.title}</h3>
                <p className="project-card-description">{product.description}</p>
            </div>
        </div>
    ))}
  </>
);

export default ProductCards;