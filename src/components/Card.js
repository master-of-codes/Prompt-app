// src/components/Card.js

import React from 'react';

function Card({ title, description, imageUrl, onCopy, categories }) {
    const handleCopy = () => {
        onCopy(description);
    };

    return (
        <div className="card">
            <img src={imageUrl} alt={`${title} Prompt`} />
            <h3>{title}</h3>
            <p className="card-description">{description}</p>
            <button className="copy-btn" onClick={handleCopy}>Copy prompt</button>
            <span className='category-name' >Categories: {categories.join(', ')}</span>
        </div>
    );
}

export default Card;