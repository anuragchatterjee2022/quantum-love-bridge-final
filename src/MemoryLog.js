import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'loveBridgeMemories';
// --- CUSTOMIZATION REQUIRED: Define Unique Keywords for Nostalgia Bonus ---
const NOSTALGIA_KEYWORDS = [
    'pizza', 'coffee', 'sunset', 'ankita', 'anurag', 'trip', 'our song' 
];

function MemoryLog() {
  const [memories, setMemories] = useState([]);
  const [newMemory, setNewMemory] = useState('');
  const [nostalgiaScore, setNostalgiaScore] = useState(0);
  const [scoreMessage, setScoreMessage] = useState("Start logging memories to power our bridge!");

  // --- I. LOAD/SAVE LOGIC (Local Storage) ---
  useEffect(() => {
    const storedMemories = localStorage.getItem(STORAGE_KEY);
    if (storedMemories) {
      const loadedMemories = JSON.parse(storedMemories);
      setMemories(loadedMemories);
      calculateNostalgiaScore(loadedMemories);
    }
  }, []); 

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
    calculateNostalgiaScore(memories);
  }, [memories]); 

  // --- II. SCORING LOGIC ---
  const calculateNostalgiaScore = (currentMemories) => {
      let score = 0;
      const today = Date.now();
      const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
      let keywordHits = 0;

      currentMemories.forEach(memory => {
          score += 10;
          
          if (today - memory.id < oneWeekInMs) {
              score += 20;
          }

          const lowerText = memory.text.toLowerCase();
          NOSTALGIA_KEYWORDS.forEach(keyword => {
              if (lowerText.includes(keyword)) {
                  score += 50;
                  keywordHits++;
              }
          });
      });

      setNostalgiaScore(score);
      updateScoreMessage(score, currentMemories.length, keywordHits);
  };

  const updateScoreMessage = (score, count, hits) => {
      let message = "";
      if (count === 0) {
          message = "Start logging memories to power our bridge!";
      } else if (score < 150) {
          message = "Nostalgia Score: 0.5 Units. Our memories are building the connection!";
      } else if (score < 350) {
          message = `Nostalgia Score: 1.2 Entanglements. You've logged ${hits} unique moments!`;
      } else {
          message = "Nostalgia Score: 2.5 Quantum Max! Our love is stable across dimensions!";
      }
      setScoreMessage(message);
  };

  const handleAddMemory = (e) => {
    e.preventDefault();
    if (newMemory.trim() !== '') {
      const newEntry = {
        id: Date.now(),
        text: newMemory,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };
      setMemories(prevMemories => [newEntry, ...prevMemories]); 
      setNewMemory(''); 
    }
  };

  const handleDeleteMemory = (id) => {
    setMemories(prevMemories => prevMemories.filter(memory => memory.id !== id));
  };

  return (
    <section id="memory-log">
      <h2>Emotional State Logger & Nostalgia Meter 🧠</h2>
      <p>A place for you to jot down thoughts, moments, or how you feel. It powers our bridge!</p>
      
      <div className="nostalgia-display">
          <p className="score-value text-glow">{nostalgiaScore}</p>
          <p className="score-message">{scoreMessage}</p>
      </div>

      <form onSubmit={handleAddMemory} className="memory-form">
        <input
          type="text"
          value={newMemory}
          onChange={(e) => setNewMemory(e.target.value)}
          placeholder="What's a sweet thought you had today?"
          className="memory-input"
        />
        <button type="submit" className="memory-button">Save Memory 💾</button>
      </form>
      
      <div className="memory-list">
        {memories.length === 0 ? (
          <p className="text-glow">Start logging your first memory! (Try keywords like 'pizza' or 'sunset')</p>
        ) : (
          memories.map((memory) => (
            <div key={memory.id} className="memory-item">
              <span className="memory-text">"{memory.text}"</span>
              <span className="memory-date">— Logged on {memory.date}</span>
              <button onClick={() => handleDeleteMemory(memory.id)} className="delete-button">X</button>
            </div>
          ))
        )}
      </div>

      <style jsx="true">{`
        .nostalgia-display { background-color: rgba(255, 105, 180, 0.1); border: 2px solid var(--primary-color); border-radius: 10px; padding: 15px; margin-bottom: 25px; }
        .score-value { font-size: 3em; font-weight: 700; margin: 0; animation: pulse 1s infinite alternate; }
        .score-message { margin-top: 5px; font-style: italic; }
        @keyframes pulse { from { text-shadow: 0 0 5px var(--primary-color); } to { text-shadow: 0 0 20px var(--primary-color); } }
        .memory-form { display: flex; gap: 10px; margin-bottom: 20px; }
        .memory-input { flex-grow: 1; padding: 12px; border: 1px solid var(--secondary-color); border-radius: 8px; background-color: #2a2a2a; color: var(--text-light); }
        .memory-button { padding: 12px 20px; background-color: var(--primary-color); color: var(--text-dark); border: none; border-radius: 8px; cursor: pointer; transition: background-color 0.3s; font-weight: 700; }
        .memory-button:hover { background-color: #ffb6c1; }
        .memory-item { background-color: rgba(138, 43, 226, 0.1); border-left: 5px solid var(--secondary-color); padding: 15px; margin-bottom: 10px; border-radius: 5px; text-align: left; display: flex; justify-content: space-between; align-items: center; }
        .memory-text { font-style: italic; }
        .memory-date { font-size: 0.8em; color: #ccc; margin-left: auto; margin-right: 15px; }
        .delete-button { background: none; border: none; color: var(--primary-color); font-weight: 700; cursor: pointer; }
      `}</style>
    </section>
  );
}

export default MemoryLog;