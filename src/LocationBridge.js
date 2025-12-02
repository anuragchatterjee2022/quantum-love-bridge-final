import React, { useState, useEffect } from 'react';

function LocationBridge({ yourLocation, herLocation }) { 
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (time, timezone) => {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: timezone,
        };
        const localTime = time.toLocaleTimeString('en-US', options);
        const hour = parseInt(time.toLocaleTimeString('en-US', { hour: 'numeric', hour12: false, timeZone: timezone }));
        const isDay = hour >= 6 && hour < 19; 
        return {
            time: localTime,
            indicator: isDay ? '☀️ Day' : '🌙 Night',
        };
    };

    const yourTimeData = formatTime(currentTime, yourLocation.timezone);
    const herTimeData = formatTime(currentTime, herLocation.timezone);

    return (
        <section id="location-bridge">
            <h2>The Location Bridge 🌉</h2>
            <p className="time-synced-message">
                We are separated by distance, but perfectly **synchronized in time** ({yourLocation.timezone.split('/')[1]}).
            </p>

            <div className="time-cards-container">
                <div className="time-card">
                    <h3>{yourLocation.city} (You)</h3>
                    <p className="time-value text-glow">{yourTimeData.time}</p>
                    <p className="time-indicator">{yourTimeData.indicator}</p>
                </div>

                <div className="time-card">
                    <h3>{herLocation.city} (Her)</h3>
                    <p className="time-value text-glow">{herTimeData.time}</p>
                    <p className="time-indicator">{herTimeData.indicator}</p>
                </div>
            </div>

            <style jsx="true">{`
                .time-synced-message {
                    font-style: italic;
                    font-size: 1.1em;
                    margin-bottom: 25px;
                    color: var(--primary-color);
                }
                .time-cards-container {
                    display: flex;
                    justify-content: center;
                    gap: 30px;
                    margin-top: 20px;
                }
                .time-card {
                    background-color: rgba(255, 255, 255, 0.05);
                    border: 1px solid var(--secondary-color);
                    border-radius: 10px;
                    padding: 20px;
                    min-width: 40%;
                    text-align: center;
                }
                .time-card h3 {
                    margin-top: 0;
                    color: var(--primary-color);
                }
                .time-value {
                    font-size: 2.5em;
                    margin: 5px 0;
                    font-weight: 700;
                }
                .time-indicator {
                    font-size: 1.2em;
                    margin-top: 10px;
                    color: #fff;
                }
            `}</style>
        </section>
    );
}

export default LocationBridge;