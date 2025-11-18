// src/components/Toast.js

import React, { useState, useEffect } from 'react';
// CSS-ஐ style.css லிருந்து எடுத்து இங்கே inline style-ஆக பயன்படுத்துகிறேன்.

const useToast = () => {
    const [toast, setToast] = useState(null);

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => {
            setToast(null);
        }, 3000);
    };

    const ToastComponent = () => (
        <div
            style={{
                display: toast ? 'block' : 'none',
                position: 'fixed',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '5px',
                zIndex: '10000',
                fontFamily: 'sans-serif', // Use a default system font or import Poppins
                fontSize: '1rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                opacity: toast ? '1' : '0',
                transition: 'opacity 0.3s ease',
            }}
        >
            {toast}
        </div>
    );

    return [ToastComponent, showToast];
};

export default useToast;