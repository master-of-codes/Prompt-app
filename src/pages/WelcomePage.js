// src/pages/WelcomePage.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PWAInstallButton from '../components/PWAInstallButton';

function WelcomePage() {
    const navigate = useNavigate();

    // Service Worker registration from the original index.html
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => console.log('SW registered'))
                .catch(error => console.log('SW registration failed:', error));
        }
    }, []);

    return (
        <div className="index-page">
            <header>
                <h1>Welcome to Prompt website</h1>
            </header>
            <main>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <button onClick={() => navigate('/prompts')}>Get prompts</button>
            </main>
            <PWAInstallButton />
        </div>
    );
}

export default WelcomePage;