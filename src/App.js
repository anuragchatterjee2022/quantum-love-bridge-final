import React, { useState } from 'react';
import Countdown from './Countdown';
import MemoryLog from './MemoryLog';
import GoalTracker from './GoalTracker'; 
import Timeline from './Timeline'; 
import ThemeChanger from './ThemeChanger'; 
import TimeCapsule from './TimeCapsule';  
import LocationBridge from './LocationBridge'; 
import MoodMirror from './MoodMirror'; 
import BackgroundChanger from './BackgroundChanger'; // <--- NEW IMPORT
import './index.css'; 

// --- 1. CENTRAL DATA: CUSTOMIZE ALL DATES AND NAMES! ---
const YOUR_NAME = "Anurag";
const HER_NAME = "Ankita Shona"; 

// Relationship Start Date (Anniversary) - 25/8/2025
const RELATIONSHIP_START_DATE = new Date('August 25, 2025'); 
// Next Visit Date (Must match Countdown.js)
const NEXT_VISIT_DATE = new Date('January 4, 2026'); 

// Phone Numbers - Use digits only, country code (91) included
const YOUR_PHONE = "919635406499";      // Your Number (Anurag)
const HER_PHONE = "919674374472";       // Her Number (Girlfriend)

// Location Data
const YOUR_LOCATION = { city: "Asansol, India", timezone: "Asia/Kolkata" };
const HER_LOCATION = { city: "Kolkata, India", timezone: "Asia/Kolkata" }; 

const EVENT_TIMELINE = [
{ type: 'Anniversary', date: RELATIONSHIP_START_DATE, title: 'The Day It Began', description: 'Our official start date, marking the first chapter.' },
    { type: 'Memory', date: new Date('September 14, 2025'), title: 'Victoria Memorial Plan', description: 'When we skipped freshers, and it was perfect.' },
    { type: 'Memory', date: new Date('September 16, 2025'), title: 'The Ganga Plan', description: 'When we skipped college, and it was perfect.' },
    { type: 'Memory', date: new Date('September 26, 2025'), title: 'Durga Puja Plan', description: 'When we went to Durga Puja pandals on the day of Chaturthi' },
    { type: 'Memory', date: new Date('October 27, 2025'), title: 'Baidika Birthday', description: 'I think i dont need to explain that day.' },
    { type: 'Memory', date: new Date('November 03, 2025'), title: 'Nalban Plan', description: 'When we went Nalban after exams and it became our fav place gradually' },
    { type: 'Visit', date: NEXT_VISIT_DATE, title: 'NEXT VISIT!', description: 'The day the distance finally closes, for a while.' },
];

// Image paths are relative to the 'public/images/' folder
const imagePaths = [
'/images/photo1.jpg', 
  '/images/photo2.jpg', 
  '/images/photo3.jpg',
  '/images/photo4.jpg',
  '/images/photo5.jpg',
  '/images/photo6.jpg',
   '/images/photo7.jpg',
    '/images/photo8.jpg',
     '/images/photo9.jpg',
      '/images/photo10.jpg',
       '/images/photo11.jpg',
        '/images/photo12.jpg',
]; 

// --- 2. PUZZLE CONFIGURATION ---
const GALLERY_UNLOCK_PHRASE = "rosedale"; 

function App() {
  const [isSimpleMessageVisible, setSimpleMessageVisible] = useState(false); 
  const [isGalleryLocked, setGalleryLocked] = useState(true);
  const [puzzleInput, setPuzzleInput] = useState('');
  const [puzzleError, setPuzzleError] = useState('');

  // --- PUZZLE HANDLER ---
  const handlePuzzleSubmit = (e) => {
    e.preventDefault();
    setPuzzleError('');
    if (puzzleInput.toLowerCase().trim() === GALLERY_UNLOCK_PHRASE.toLowerCase()) {
        setGalleryLocked(false);
        setPuzzleError("ACCESS GRANTED! Welcome to our private dimension. ❤️");
    } else {
        setPuzzleError("INCORRECT. Hint: Where did we had our first kiss?");
    }
    setPuzzleInput('');
  };

  // --- FEATURE: Personalized Greeting ---
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return `Good Morning, ${HER_NAME}!`;
    if (hour < 17) return `Good Afternoon, ${HER_NAME}!`;
    return `Good Evening, ${HER_NAME}!`;
  };

  return (
    <div className="app-container">
      {/* 0. Background Changer - Must be the first element */}
      <BackgroundChanger /> 
      <header>
        <h1>{getGreeting()}</h1> 
        <p className="text-glow">Bridging the distance until <span className="text-glow">{YOUR_NAME}</span> and <span className="text-glow">{HER_NAME}</span> meet.</p>
      </header>
      
      {/* 1. Dynamic Countdown Component */}
      <Countdown />

      {/* 2. Mood-Driven Theme Changer */}
      <ThemeChanger />

      {/* 3. Location Bridge */}
      <LocationBridge yourLocation={YOUR_LOCATION} herLocation={HER_LOCATION} /> 

      {/* 4. Mood Mirror */}
      <MoodMirror yourName={YOUR_NAME} herName={HER_NAME} />

      {/* 5. Timeline Projection System & Date Finder */}
      <Timeline 
          events={EVENT_TIMELINE} 
          startDate={RELATIONSHIP_START_DATE} 
          nextVisitDate={NEXT_VISIT_DATE}
      />

      {/* 6. Digital Time Capsule (NEW!) */}
      <TimeCapsule />

      {/* 7. Dynamic Memory Logger Component (Nostalgia Score) */}
      <MemoryLog />

      {/* 8. Shared Future Goal Tracker Component */}
      <GoalTracker />

      {/* 9. INSIDE JOKE PUZZLE & GALLERY */}
      <section id="gallery-puzzle">
        <h2>Quantum Entanglement Gallery 🔒</h2>
        
        {isGalleryLocked ? (
          <div className="puzzle-box">
              <h3>Gallery Lock Engaged!</h3>
              <p>To view our photos, prove your memory by entering the password:</p>
              <p className="text-glow">**Hint: Where did we had our first kiss? (one word, lowercase)**</p>
              
              <form onSubmit={handlePuzzleSubmit} className="puzzle-form">
                  <input
                      type="text"
                      value={puzzleInput}
                      onChange={(e) => setPuzzleInput(e.target.value)}
                      placeholder="Enter the secret word..."
                      className="puzzle-input"
                  />
                  <button type="submit" className="secret-button-advanced">Unlock Gallery</button>
              </form>
              
              {puzzleError && <p className={`puzzle-message ${puzzleError.includes('GRANTED') ? 'success' : 'error'}`}>{puzzleError}</p>}
          </div>
        ) : (
          <div className="photo-grid-advanced">
            {imagePaths.map((path, index) => (
              <img 
                key={index} 
                src={path}
                alt={`Shared Memory ${index + 1}`} 
                className="gallery-image-advanced"
              />
            ))}     
          </div>
        )}
      </section>

      {/* 10. SIMPLE "OPEN WHEN..." MESSAGE (Includes Call Buttons) */}
      <section id="simple-open-when">
        <h2>A Simple Message for Your Heart 💖</h2>
        <button 
          onClick={() => setSimpleMessageVisible(!isSimpleMessageVisible)} 
          className="secret-button-advanced"
        >
          {isSimpleMessageVisible ? 'Hide Message' : 'Open When You Miss Me'}
        </button>
        
        <div className={`secret-message-box ${isSimpleMessageVisible ? 'visible' : 'hidden'}`}>
          <p>***</p>
          <p>When you feel lonely, remember this: I am thinking of you, right now, as you read this. My heart is yours, and distance can't change that. Call me anytime. ❤️</p>
          
          <div className="connection-buttons">
              {/* BUTTON 1: ANKITA CALLS ANURAG */}
              <div className="button-set">
                  <p>If **Ankita** needs Anurag:</p>
                  <a href={`tel:+${YOUR_PHONE}`} className="instant-button call-button">
                      📱 Call ANURAG
                  </a>
                  <a href={`https://wa.me/${YOUR_PHONE}?text=I%20miss%20you%20so%20much!%20Thinking%20of%20you.`} 
                    className="instant-button whatsapp-button" target="_blank" rel="noopener noreferrer">
                      💬 WhatsApp ANURAG
                  </a>
              </div>

              {/* BUTTON 2: ANURAG CALLS ANKITA */}
              <div className="button-set reciprocal">
                  <p>If **Anurag** needs Ankita:</p>
                  <a href={`tel:+${HER_PHONE}`} className="instant-button call-button">
                      📱 Call ANKITA
                  </a>
                  <a href={`https://wa.me/${HER_PHONE}?text=I%20just%20needed%20to%20say%20I%20love%20you.`} 
                    className="instant-button whatsapp-button" target="_blank" rel="noopener noreferrer">
                      💬 WhatsApp ANKITA
                  </a>
              </div>
          </div>
          <p>***</p>
        </div>
      </section>
      
      {/* 11. ADVANCED QUANTUM MESSAGE */}
      <section id="quantum-message-advanced">
        <h2>A Secret Quantum Message (Advanced)</h2>
        <button 
          onClick={() => setSimpleMessageVisible(!isSimpleMessageVisible)} 
          className="secret-button-advanced"
        >
          Click for the Physics of Our Love!
        </button>
        <div className={`secret-message-box ${isSimpleMessageVisible ? 'visible' : 'hidden'}`}>
          <p>***</p>
          <h3>LOVE CONSTANT: $L/D = C$</h3>
          <p>My love (<span className="text-glow">L</span>) divided by the distance (<span className="text-glow">D</span>) equals a **Constant Value** (<span className="text-glow">C</span>). This proves that **no matter how far apart we are, the intensity of my love for you never diminishes.** It is a universal truth. I miss you!</p>
          <p>***</p>
        </div>
      </section>
      
      {/* --- LOCAL STYLES (Includes all custom styles) --- */}
<style jsx="true">{`
        /* --- General Layout & Boxes --- */
        .puzzle-box { padding: 30px; border: 2px dashed var(--secondary-color); border-radius: 10px; text-align: center; }
        .puzzle-form { display: flex; justify-content: center; gap: 10px; margin-top: 15px; }
        .puzzle-input { padding: 10px; border: 1px solid var(--secondary-color); border-radius: 5px; background-color: #2a2a2a; color: var(--text-light); width: 300px; text-align: center; }
        .puzzle-message { margin-top: 15px; font-weight: 700; }
        .puzzle-message.error { color: #ff4d4f; }
        .puzzle-message.success { color: #4aff4a; }
        .photo-grid-advanced { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px; margin-top: 20px; }
        .gallery-image-advanced { width: 100%; height: 300px; object-fit: cover; border-radius: 10px; box-shadow: 0 0 10px rgba(255, 105, 180, 0.4); transition: all 0.5s ease-in-out; }
        .gallery-image-advanced:hover { transform: scale(1.05) rotate(2deg); z-index: 10; }
        .secret-button-advanced { background-color: var(--secondary-color); color: white; padding: 15px 30px; border: none; border-radius: 50px; font-size: 1.1em; cursor: pointer; margin-top: 15px; transition: all 0.3s; }
        .secret-button-advanced:hover { background-color: #b19cd9; box-shadow: 0 0 20px var(--secondary-color); }
        .secret-message-box { margin-top: 25px; padding: 30px; border: 3px solid var(--primary-color); border-radius: 15px; background-color: #2a0050; font-style: italic; color: var(--text-light); opacity: 0; height: 0; overflow: hidden; transition: opacity 0.5s ease-in-out, height 0.5s ease-in-out, padding 0.5s ease-in-out; }
        .secret-message-box.visible { opacity: 1; height: auto; padding: 30px; }
        
        /* --- DUAL BUTTON FEATURE STYLES (Modernized) --- */
        .connection-buttons { 
            display: flex; 
            justify-content: space-around; 
            gap: 30px; 
            margin-top: 25px; 
            padding: 10px; 
            /* Subtle perspective for 3D effect */
            perspective: 1000px; 
        }
        .button-set { 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            padding: 15px; 
            border-radius: 15px; /* Sharper corners for a modern look */
            min-width: 45%;
            background: rgba(255, 255, 255, 0.05); /* Light translucent background */
            border: 1px solid rgba(255, 105, 180, 0.5); /* Primary color border glow */
            box-shadow: 0 0 15px rgba(255, 105, 180, 0.3); /* Soft pink neon shadow */
            transition: all 0.4s ease-in-out;
        }
        .button-set:hover {
            transform: translateY(-5px) rotateX(5deg); /* Lift and subtle rotation */
            box-shadow: 0 10px 30px rgba(255, 105, 180, 0.6); /* Stronger shadow on hover */
        }

        .button-set p { 
            font-size: 1.0em; /* Slightly larger text */
            font-weight: 700; 
            color: var(--primary-color); 
            margin-bottom: 15px; 
            text-shadow: 0 0 5px var(--primary-color);
        }

        .instant-button { 
            text-decoration: none; 
            padding: 12px 25px; /* More padding */
            border-radius: 8px; /* Square/Modern button corners */
            font-size: 1.1em; /* Larger font */
            font-weight: 700; 
            margin: 10px 0; 
            width: 90%; 
            text-align: center;
            color: var(--text-dark); /* Ensure text is dark for contrast */
            border: none;
            cursor: pointer;
            
            /* Transition for color change and depth */
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            position: relative;
            overflow: hidden;
        }
        
        .instant-button:hover { 
            transform: scale(1.02); 
            letter-spacing: 0.5px; /* Subtle text animation */
        }
        
        /* Custom Button Colors and Shadows */
        .call-button { 
            background-color: #50c878; /* Brighter, vibrant green */
            box-shadow: 0 5px 0 #3b9b5f; /* 3D effect shadow */
        }
        .whatsapp-button { 
            background-color: #4CAF50; /* Standard WhatsApp green */
            box-shadow: 0 5px 0 #388e3c; /* 3D effect shadow */
        }

        .call-button:hover {
            background-color: #40a060;
            box-shadow: 0 2px 0 #3b9b5f; /* Flatten on hover */
            transform: translateY(3px) scale(1.02);
        }
        .whatsapp-button:hover {
            background-color: #388e3c;
            box-shadow: 0 2px 0 #388e3c; /* Flatten on hover */
            transform: translateY(3px) scale(1.02);
        }
        
        .instant-button span { /* For icons */
            margin-right: 5px;
        }
      `}</style>
    </div>
  );
}

export default App;