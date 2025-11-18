import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import promptsData from '../data/prompts.json';
import Card from '../components/Card';
import Navigation from '../components/Navigation';
import SubscribeForm from '../components/SubscribeForm';
import PWAInstallButton from '../components/PWAInstallButton';
import useToast from '../components/Toast';

// Firebase Messaging setup (from original script.js)
import { messaging } from '../firebaseConfig';
import { getToken, onMessage } from 'firebase/messaging';

// VAPID Key: Replace 'YOUR_VAPID_KEY_HERE' with your actual key
const VAPID_KEY = 'BAPApf7b6fLOpJ7ixt8eCloeQisJ1kkgXZNQIdWiM4ylzul57gY9nWpJPTTk16_DAYX7hXkQ-N4Iz5eEjWsJFhY'; 

const registerMessaging = () => {
    if ('serviceWorker' in navigator && messaging) {
        // Service Worker is already registered in index.js for PWA part.
        // We only handle messaging here.
        navigator.serviceWorker.ready.then(registration => {
            console.log('SW ready for messaging');

            getToken(messaging, { vapidKey: VAPID_KEY }).then((currentToken) => {
                if (currentToken) {
                    console.log('Registration token available:', currentToken);
                    // Send token to server for notifications
                } else {
                    console.log('No registration token available.');
                }
            }).catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
            });

            // Handle foreground messages
            onMessage(messaging, (payload) => {
                console.log('Foreground message received. ', payload);
                alert(`New Notification: ${payload.notification.title}`); // Simple alert for demo
            });
        });
    }
};


function PromptPage() {
    const { categorySlug, id } = useParams(); // URL parameters for category and card id
    const location = useLocation(); // Get current location
    const [searchInput, setSearchInput] = useState('');
    const [ToastComponent, showToast] = useToast();

    // PromptPage load ஆகும் போது Firebase Messaging-ஐ ஆரம்பிக்கிறது
    useEffect(() => {
        registerMessaging();
    }, []);

    // Scroll to top when navigating to a new page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // FIX: ஸ்க்ரோல் பொசிஷனை (Scroll Position) மீட்டமைக்க, categorySlug அல்லது id மாறும் போது
    // பக்கத்தை மேல்நோக்கி (0, 0) ஸ்க்ரோல் செய்கிறது.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categorySlug, id]);

    // Filter Logic
    let filteredPrompts = promptsData.filter(prompt => {
        // 1. Card ID Filter: If id is present, show only that card
        if (id) {
            return prompt.id === parseInt(id);
        }

        // 2. Category Filter: categorySlug-க்கு ஏற்றவாறு கார்டுகளை வடிகட்டுகிறது
        const isCategoryMatch = categorySlug
            ? prompt.categories.some(cat => cat.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() === categorySlug)
            : true; // categorySlug இல்லை என்றால், 'All' என்று அர்த்தம்

        // 3. Search Filter: தலைப்பை (title) வைத்து தேடலை வடிகட்டுகிறது
        const isSearchMatch = prompt.title.toLowerCase().includes(searchInput.toLowerCase().trim());

        return isCategoryMatch && isSearchMatch;
    });
    
    // Copy functionality
    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            showToast('Prompt copied!');
        } catch (err) {
            console.error('Failed to copy: ', err);
            showToast('Failed to copy prompt.');
        }
    };
    
    // Current Category Header Title (for display)
    const currentCategory = id
        ? 'Specific Prompt'
        : categorySlug
        ? promptsData.find(p => p.categories.some(cat => cat.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() === categorySlug))?.categories.join(', ') || 'All Prompts'
        : 'All Prompts';


    return (
        <>
            <Navigation position="top" />

            <header>
                <h1>Prompt Website</h1>
                <Navigation position="footer" />
                <div className="search-bar">
                    <input
                        type="text"
                        id="search-input"
                        placeholder="Search prompts..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
                
            </header>

            <main id="main">
                <div className="category-section">
                    <h2 className="category-header">{currentCategory}</h2>
                    <div className="cards-container">
                        <div className="cards-grid">
                            {filteredPrompts.length > 0 ? (
                                filteredPrompts.map(prompt => (
                                    <Card
                                        key={prompt.id}
                                        {...prompt}
                                        onCopy={copyToClipboard}
                                    />
                                ))
                            ) : (
                                <p>No prompts found for this category or search.</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            
            
            <SubscribeForm showToast={showToast} />
            <PWAInstallButton />
            <ToastComponent />
        </>
    );
}

export default PromptPage;
