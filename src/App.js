// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import PromptPage from './pages/PromptPage';
// உங்களுடைய style.css-ஐ இங்கே import செய்யவும் (my-react-app/src/style.css என வைத்துக்கொண்டால்)
import './style.css'; // assuming you have style.css in src directory

function App() {
    return (
        <Router>
            <Routes>
                {/* Home page route for index.html content */}
                <Route path="/" element={<WelcomePage />} />
                
                {/* Default route for all prompts (prompt.html content) */}
                <Route path="/prompts" element={<PromptPage />} />

                {/* Dynamic route for specific categories (filter by slug) */}
                <Route path="/prompts/:categorySlug" element={<PromptPage />} />

                {/* Dynamic route for specific card (by id) */}
                <Route path="/prompts/card/:id" element={<PromptPage />} />

                {/* Redirect from old /prompt.html link to /prompts */}
                <Route path="/prompt.html" element={<Navigate to="/prompts" replace />} />
            </Routes>
        </Router>
    );
}

export default App;