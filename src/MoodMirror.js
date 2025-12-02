import React, { useState, useEffect } from 'react';

const MOOD_STORAGE_KEY_YOU = 'dailyMoodAnurag'; 
const MOOD_STORAGE_KEY_HER = 'dailyMoodAnkita'; 

const MOOD_OPTIONS = [
    { label: "Happy/Excited", color: "#50c878", emoji: "😊" },
    { label: "Calm/Cozy", color: "#00ccff", emoji: "😌" },
    { label: "Missing You", color: "#ff4500", emoji: "🥺" },
    { label: "Focused/Busy", color: "#ff9900", emoji: "🤓" },
];

function MoodMirror({ yourName, herName }) {
    const [yourMood, setYourMood] = useState(null);
    const [herMood, setHerMood] = useState(null);
    const [isYourInputLocked, setIsYourInputLocked] = useState(false);
    const [statusMessage, setStatusMessage] = useState("Log your mood to check the bridge status!");

    // --- Daily Check and Initial Load ---
    useEffect(() => {
        const twelveHours = 12 * 60 * 60 * 1000;
        const lastLogTime = localStorage.getItem(MOOD_STORAGE_KEY_YOU + '_time');
        const now = Date.now();

        if (lastLogTime && (now - parseInt(lastLogTime) < twelveHours)) {
            setIsYourInputLocked(true);
        }
        
        setYourMood(localStorage.getItem(MOOD_STORAGE_KEY_YOU));
        setHerMood(localStorage.getItem(MOOD_STORAGE_KEY_HER));

    }, []);

    useEffect(() => {
        synchronizeMoods();
    }, [yourMood, herMood]);

    // --- Synchronization Logic ---
    const synchronizeMoods = () => {
        if (!yourMood || !herMood) {
            setStatusMessage("Awaiting mood log from both sides...");
        } else if (yourMood === herMood) {
            setStatusMessage(`💖 EMOTIONAL SYNCHRONIZATION ACHIEVED! You both feel: ${yourMood}!`);
        } else {
            const yourLabel = MOOD_OPTIONS.find(m => m.label === yourMood)?.emoji || yourMood;
            const herLabel = MOOD_OPTIONS.find(m => m.label === herMood)?.emoji || herMood;
            setStatusMessage(`Current Moods: ${yourLabel} vs ${herLabel}. Send a sweet message to sync!`);
        }
    };

    // --- Handler for Logging Your Mood ---
    const handleMoodLog = (moodLabel) => {
        localStorage.setItem(MOOD_STORAGE_KEY_YOU, moodLabel);
        localStorage.setItem(MOOD_STORAGE_KEY_YOU + '_time', Date.now());
        setYourMood(moodLabel); 
        setIsYourInputLocked(true);
        
        // Placeholder for Her Mood (For testing synchronization)
        localStorage.setItem(MOOD_STORAGE_KEY_HER, 'Missing You'); 
        setHerMood('Missing You');
    };

    return (
        <section id="mood-mirror">
            <h2>The Emotional Mirror 🫂</h2>
            <div className="status-display">
                <p className="status-message text-glow">{statusMessage}</p>
            </div>

            <div className="mood-log-container">
                <div className="mood-card">
                    <h3>{yourName}'s Current Mood: {yourMood || 'Not Logged'}</h3>
                    <div className="mood-options-container">
                        {MOOD_OPTIONS.map(mood => (
                            <button
                                key={mood.label}
                                onClick={() => handleMoodLog(mood.label)}
                                disabled={isYourInputLocked}
                                className={`mood-button ${yourMood === mood.label ? 'active' : ''}`}
                                style={{ backgroundColor: mood.color, opacity: isYourInputLocked ? 0.6 : 1 }}
                            >
                                {mood.emoji} {mood.label}
                            </button>
                        ))}
                    </div>
                    {isYourInputLocked && <p className="log-lock-message">Logged! Check back tomorrow to update.</p>}
                </div>
                
                <div className="mood-card her-mood-card">
                    <h3>{herName}'s Last Log: {herMood || 'Not Logged'}</h3>
                    {herMood && 
                        <p style={{ color: MOOD_OPTIONS.find(m => m.label === herMood)?.color || 'white' }}>
                            {herMood}
                        </p>
                    }
                </div>
            </div>

            <style jsx="true">{`
                .status-display { text-align: center; margin-bottom: 25px; }
                .status-message { font-size: 1.4em; font-weight: 700; }
                .mood-log-container { display: flex; justify-content: space-around; gap: 20px; }
                .mood-card { padding: 20px; border: 1px solid var(--primary-color); border-radius: 10px; flex: 1; text-align: center; }
                .mood-card h3 { color: var(--secondary-color); font-size: 1.1em; }
                .mood-options-container { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 15px; }
                .mood-button {
                    padding: 10px 15px; border: none; border-radius: 50px; color: white; font-weight: 700;
                    cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
                }
                .mood-button:hover:not(:disabled) { transform: scale(1.05); box-shadow: 0 0 10px currentColor; }
                .mood-button.active { border: 2px solid white; transform: scale(1.08); }
                .log-lock-message { margin-top: 10px; font-style: italic; color: #aaa; }
                .her-mood-card { border-color: var(--secondary-color); }
            `}</style>
        </section>
    );
}

export default MoodMirror;