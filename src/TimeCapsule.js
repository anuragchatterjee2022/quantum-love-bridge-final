import React, { useState, useEffect } from 'react';

const CAPSULE_STORAGE_KEY = 'loveBridgeTimeCapsule';

// --- Simple Simulated Encryption Function (ROT13-like Character Swap) ---
const scrambleText = (text) => {
    return text.split('').map(char => {
        if (char >= 'a' && char <= 'z') return String.fromCharCode((char.charCodeAt(0) - 97 + 13) % 26 + 97);
        if (char >= 'A' && char <= 'Z') return String.fromCharCode((char.charCodeAt(0) - 65 + 13) % 26 + 65);
        return char;
    }).join('');
};

function TimeCapsule() {
    const [capsule, setCapsule] = useState(null);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [message, setMessage] = useState('');
    const [unlockDateInput, setUnlockDateInput] = useState('');

    useEffect(() => {
        const storedCapsule = localStorage.getItem(CAPSULE_STORAGE_KEY);
        if (storedCapsule) {
            const data = JSON.parse(storedCapsule);
            setCapsule(data);
            checkLockStatus(data);
        }
    }, []);

    const checkLockStatus = (data) => {
        if (data && new Date(data.unlockDate) <= new Date()) {
            setIsUnlocked(true);
            setMessage(scrambleText(data.content));
        }
    };

    const handleSaveCapsule = (e) => {
        e.preventDefault();
        if (!message || !unlockDateInput) {
            alert("Please provide both a message and an unlock date!");
            return;
        }

        const newCapsule = {
            content: scrambleText(message), 
            unlockDate: unlockDateInput,
            creationDate: new Date().toLocaleDateString(),
        };

        localStorage.setItem(CAPSULE_STORAGE_KEY, JSON.stringify(newCapsule));
        setCapsule(newCapsule);
        setMessage(''); 
        setUnlockDateInput('');
        setIsUnlocked(false); 
    };

    const handleDeleteCapsule = () => {
        if (window.confirm("Are you sure you want to delete this capsule? This cannot be undone.")) {
            localStorage.removeItem(CAPSULE_STORAGE_KEY);
            setCapsule(null);
            setIsUnlocked(false);
            setMessage('');
        }
    };

    if (capsule) {
        return (
            <section id="time-capsule" className="capsule-view">
                <h2>Digital Time Capsule ⏳</h2>
                {isUnlocked ? (
                    <div className="capsule-unlocked">
                        <h3>🔑 MESSAGE UNLOCKED! ({new Date(capsule.unlockDate).toLocaleDateString()})</h3>
                        <div className="unlocked-content">"{message}"</div>
                        <button onClick={handleDeleteCapsule} className="delete-button-capsule">Reset & Create New</button>
                    </div>
                ) : (
                    <div className="capsule-locked">
                        <h3>Capsule is Locked!</h3>
                        <p>This message was written on: {capsule.creationDate}</p>
                        <p>It will unlock on: <span className="unlock-date-glow">{new Date(capsule.unlockDate).toLocaleDateString()}</span></p>
                        <p className="scrambled-text">
                            **Encrypted Content Preview:** {capsule.content.substring(0, 50)}...
                        </p>
                        <button onClick={handleDeleteCapsule} className="delete-button-capsule">Delete Capsule (DANGER)</button>
                    </div>
                )}
            </section>
        );
    }

    return (
        <section id="time-capsule" className="capsule-input">
            <h2>Digital Time Capsule ✍️</h2>
            <p>Write a message now to be automatically revealed on a future special date.</p>
            <form onSubmit={handleSaveCapsule} className="capsule-form">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your emotional message or memory here..."
                    required
                />
                <input
                    type="date"
                    value={unlockDateInput}
                    onChange={(e) => setUnlockDateInput(e.target.value)}
                    min={new Date().toISOString().split('T')[0]} 
                    required
                />
                <button type="submit" className="save-capsule-button">Lock & Save Capsule</button>
            </form>
            <style jsx="true">{`
                .capsule-form { display: flex; flex-direction: column; gap: 15px; }
                .capsule-form textarea {
                    min-height: 150px; padding: 15px; border-radius: 8px; border: 1px solid var(--secondary-color);
                    background-color: #2a2a2a; color: var(--text-light); font-family: 'Lato', sans-serif; resize: vertical;
                }
                .capsule-form input[type="date"] {
                    padding: 10px; border-radius: 8px; border: 1px solid var(--secondary-color);
                    background-color: #2a2a2a; color: var(--text-light); font-size: 1em;
                }
                .save-capsule-button { background-color: #ff9900; color: var(--text-dark); padding: 15px; border: none; border-radius: 50px; font-weight: 700; cursor: pointer; transition: background-color 0.3s; }
                .save-capsule-button:hover { background-color: #ffb84d; }
                .capsule-locked, .capsule-unlocked { text-align: center; padding: 25px; border-radius: 15px; }
                .capsule-locked { border: 2px solid var(--secondary-color); }
                .capsule-unlocked { border: 3px solid var(--primary-color); background-color: rgba(255, 105, 180, 0.1); }
                .unlock-date-glow { color: #ff9900; font-weight: 700; text-shadow: 0 0 5px #ff9900; }
                .unlocked-content { font-size: 1.1em; font-style: italic; margin: 20px 0; padding: 15px; border-left: 5px solid var(--primary-color); text-align: left; white-space: pre-wrap; }
                .scrambled-text { font-family: monospace; font-size: 0.9em; color: #aaa; }
                .delete-button-capsule { background-color: #cc0000; color: white; padding: 10px 20px; border: none; border-radius: 50px; margin-top: 10px; cursor: pointer; }
            `}</style>
        </section>
    );
}

export default TimeCapsule;