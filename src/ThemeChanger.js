import React, { useState, useEffect } from 'react';

const THEME_STORAGE_KEY = 'loveBridgeTheme';

// --- Mood/Color Definitions ---
const MOODS = [
    { name: "Excited", primary: "#00ccff", secondary: "#006699" }, 
    { name: "In Love", primary: "#ff69b4", secondary: "#8a2be2" }, 
    { name: "Missing You", primary: "#ff4500", secondary: "#800000" }, 
    { name: "Calm", primary: "#50c878", secondary: "#3b9b5f" }, 
    { name: "Cozy", primary: "#ff9900", secondary: "#cc7a00" }, 
];

function ThemeChanger() {
    const [activeTheme, setActiveTheme] = useState(MOODS[1].name);

    // --- I. LOAD THEME on Mount ---
    useEffect(() => {
        const storedThemeName = localStorage.getItem(THEME_STORAGE_KEY);
        if (storedThemeName) {
            const theme = MOODS.find(m => m.name === storedThemeName);
            if (theme) {
                applyTheme(theme);
                setActiveTheme(theme.name);
            }
        } else {
            // Apply default theme if none is stored
            applyTheme(MOODS[1]); 
        }
    }, []);

    // --- II. APPLY THEME FUNCTIONALITY ---
    const applyTheme = (theme) => {
        document.documentElement.style.setProperty('--primary-color', theme.primary);
        document.documentElement.style.setProperty('--secondary-color', theme.secondary);
        localStorage.setItem(THEME_STORAGE_KEY, theme.name);
    };

    const handleThemeChange = (themeName) => {
        const theme = MOODS.find(m => m.name === themeName);
        if (theme) {
            applyTheme(theme);
            setActiveTheme(themeName);
        }
    };

    return (
        <section id="theme-changer">
            <h2>Set Your Mood Theme 🎨</h2>
            <div className="theme-options">
                {MOODS.map((theme) => (
                    <button 
                        key={theme.name} 
                        onClick={() => handleThemeChange(theme.name)}
                        className={`theme-button ${activeTheme === theme.name ? 'active' : ''}`}
                        style={{ backgroundColor: theme.primary }}
                    >
                        {theme.name}
                    </button>
                ))}
            </div>

            <style jsx="true">{`
                .theme-options {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    margin-top: 20px;
                    flex-wrap: wrap;
                }
                .theme-button {
                    padding: 8px 15px;
                    border: 2px solid transparent;
                    border-radius: 50px;
                    color: black; 
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s ease-in-out;
                    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
                }
                .theme-button:hover {
                    opacity: 0.8;
                }
                .theme-button.active {
                    border: 2px solid white;
                    transform: scale(1.1);
                    box-shadow: 0 0 15px currentColor; 
                }
            `}</style>
        </section>
    );
}

export default ThemeChanger;