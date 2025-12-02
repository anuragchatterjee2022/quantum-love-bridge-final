import React, { useEffect } from 'react';

// --- IMPORTANT: Place these images in your public/images/ folder ---
const BACKGROUNDS = {
    MORNING: '/images/bg-morning.jpg', // 6 AM - 11 AM
    DAY: '/images/bg-day.jpg',         // 11 AM - 5 PM
    EVENING: '/images/bg-evening.jpg', // 5 PM - 8 PM
    NIGHT: '/images/bg-night.jpg',     // 8 PM - 6 AM
};

const getThemeByTime = () => {
    const hour = new Date().getHours();
    
    if (hour >= 6 && hour < 11) return BACKGROUNDS.MORNING;
    if (hour >= 11 && hour < 17) return BACKGROUNDS.DAY;
    if (hour >= 17 && hour < 20) return BACKGROUNDS.EVENING;
    return BACKGROUNDS.NIGHT;
};

const BackgroundChanger = () => {
    useEffect(() => {
        const updateBackground = () => {
            const backgroundUrl = getThemeByTime();
            // Dynamically inject the background image URL into the body style
            document.body.style.backgroundImage = `url(${backgroundUrl})`;
        };

        // Run immediately and then check every 5 minutes (to catch hour changes)
        updateBackground();
        const intervalId = setInterval(updateBackground, 5 * 60 * 1000); 

        return () => clearInterval(intervalId);
    }, []);

    // This component renders nothing but executes logic via useEffect
    return null;
};

export default BackgroundChanger;