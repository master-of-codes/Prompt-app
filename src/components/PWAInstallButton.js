import React, { useState, useEffect } from 'react';

function PWAInstallButton() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handler);

        // Check if the app is already installed
        setIsInstalled(window.matchMedia('(display-mode: standalone)').matches);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = () => {
        if (!deferredPrompt) return; // Do nothing if prompt is not available
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
                setIsInstalled(true); // Mark as installed after acceptance
            } else {
                console.log('User dismissed the install prompt');
            }
            setDeferredPrompt(null);
        });
    };

    // Show button and text only if not installed
    if (isInstalled) {
        return null;
    }

    return (
        <div className="install-container">
            <span className="install-text">Install the web app to view content updates regularly</span>
            <button id="install-btn" className="install-btn" onClick={handleInstallClick}>
                Install
            </button>
        </div>
    );
}

export default PWAInstallButton;
