// src/components/Navigation.js

import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
    "All", "90's Cartoon", "Aesthetic", "Barbie", "Birthday", "Bollywood", "Boys", "Cars", 
    "Childhood", "Couple", "Divine", "DSLR style AI photos", "Ethereal Indian Woman AI", 
    "Fairytale", "Flower Tree AI Edits", "Forest Photoshoot AI", "Garba", 
    "Gemini AI photography", "Girl", "Mafia", "Men", "Mirror selfie", "Modern", 
    "Nano Banana prompts", "Nostalgia", "Photoshoot", "Radhakrishna", "RadhaRani", 
    "Romance", "Royal", "Saree", "Saree AI prompts", "South Indian", "Traditional", 
    "Vintage", "Wedding"
];

const categoryPaths = (category) => {
    if (category === "All") return "/prompts";
    return `/prompts/${category.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`;
};

function Navigation({ position = 'top' }) {

    const scrollRef = useRef(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
    };

    return (
        <nav className={`${position === 'footer' ? 'footer-nav' : ''} nav-wrapper`}>
            
            {/* LEFT ARROW */}
            <button className="nav-arrow left" onClick={scrollLeft}>
                <ChevronLeft size={24} />
            </button>

            {/* SCROLLABLE LIST */}
            <div className="nav-container" ref={scrollRef}>
                <ul>
                    {categories.map(category => (
                        <li key={category}>
                            <NavLink 
                                to={categoryPaths(category)} 
                                data-category={category}
                                className={({ isActive }) => isActive ? "active-link" : ""}
                            >
                                {category}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            {/* RIGHT ARROW */}
            <button className="nav-arrow right" onClick={scrollRight}>
                <ChevronRight size={24} />
            </button>

        </nav>
    );
}

export default Navigation;
