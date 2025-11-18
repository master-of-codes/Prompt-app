// src/components/SubscribeForm.js

import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

function SubscribeForm({ showToast }) {
    const [email, setEmail] = useState('');

    const handleSubscribe = async () => {
        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            showToast('Please enter a valid email.');
            return;
        }

        try {
            await addDoc(collection(db, 'subscribers'), {
                email: trimmedEmail,
                timestamp: new Date()
            });
            showToast('Subscribed successfully!');
            setEmail('');
        } catch (error) {
            console.error('Error adding document: ', error);
            showToast('Error subscribing. Please try again.');
        }
    };

    return (
        <footer>
            <input
                type="email"
                id="subscribe-email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button id="subscribe-btn" onClick={handleSubscribe}>Subscribe</button>
        </footer>
    );
}

export default SubscribeForm;