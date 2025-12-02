import React, { useState, useEffect } from 'react';

const GOAL_STORAGE_KEY = 'loveBridgeGoals';

function GoalTracker() {
  const [goals, setGoals] = useState([]);
  const [newGoalText, setNewGoalText] = useState('');

  // --- I. LOAD/SAVE LOGIC ---
  useEffect(() => {
    const storedGoals = localStorage.getItem(GOAL_STORAGE_KEY);
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals));
    }
  }, []); 

  useEffect(() => {
    localStorage.setItem(GOAL_STORAGE_KEY, JSON.stringify(goals));
  }, [goals]); 

  // --- II. GOAL HANDLERS ---
  const handleAddGoal = (e) => {
    e.preventDefault();
    if (newGoalText.trim() !== '') {
      const newGoal = {
        id: Date.now(),
        text: newGoalText,
        progress: 0, 
        completed: false,
      };
      setGoals(prevGoals => [newGoal, ...prevGoals]);
      setNewGoalText('');
    }
  };

  const handleUpdateProgress = (id, newProgress) => {
    setGoals(goals.map(goal => 
      goal.id === id 
        ? { ...goal, 
            progress: Math.min(100, Math.max(0, newProgress)), 
            completed: newProgress >= 100 
          }
        : goal
    ));
  };
  
  const handleDeleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <section id="goal-tracker">
      <h2>Our Shared Future Dreams ✨</h2>
      <p>Let's plan the future! Add a goal and track our progress towards achieving it.</p>

      <form onSubmit={handleAddGoal} className="goal-form">
        <input
          type="text"
          value={newGoalText}
          onChange={(e) => setNewGoalText(e.target.value)}
          placeholder="Add a dream (e.g., Go hiking in Nepal)"
          className="goal-input"
        />
        <button type="submit" className="goal-button">Add Dream</button>
      </form>
      
      <div className="goal-list">
        {goals.length === 0 ? (
          <p className="text-glow">What adventures should we plan next?</p>
        ) : (
          goals.map((goal) => (
            <div key={goal.id} className={`goal-item ${goal.completed ? 'completed' : ''}`}>
              <div className="goal-header">
                <span className="goal-text">{goal.text}</span>
                <button onClick={() => handleDeleteGoal(goal.id)} className="delete-button">🗑️</button>
              </div>

              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${goal.progress}%` }}></div>
                <span className="progress-label">{goal.completed ? 'Achieved!' : `${goal.progress}%`}</span>
              </div>
              
              <div className="progress-controls">
                <button onClick={() => handleUpdateProgress(goal.id, goal.progress + 10)}>+</button>
                <button onClick={() => handleUpdateProgress(goal.id, goal.progress - 10)}>-</button>
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx="true">{`
        .goal-form { display: flex; gap: 10px; margin-bottom: 30px; justify-content: center; }
        .goal-input { padding: 10px; border: 1px solid var(--secondary-color); border-radius: 5px; background-color: #2a2a2a; color: var(--text-light); width: 350px; }
        .goal-button { background-color: #50c878; color: var(--text-dark); padding: 10px 15px; border: none; border-radius: 5px; cursor: pointer; font-weight: 700; transition: background-color 0.3s; }
        .goal-button:hover { background-color: #6ed194; }
        .goal-item { 
            background-color: rgba(138, 43, 226, 0.1); 
            padding: 15px; 
            margin-bottom: 15px; 
            border-radius: 10px; 
            border-left: 5px solid var(--secondary-color);
        }
        .goal-item.completed { border-left: 5px solid #50c878; opacity: 0.8; }
        .goal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;}
        .goal-text { font-weight: 700; color: var(--text-light); }
        .progress-container { width: 100%; background-color: #333; border-radius: 50px; margin: 5px 0; position: relative; }
        .progress-bar { height: 25px; background-color: var(--primary-color); border-radius: 50px; transition: width 0.5s ease-in-out; }
        .progress-label { position: absolute; width: 100%; text-align: center; line-height: 25px; color: white; font-weight: 700; text-shadow: 1px 1px 2px #000; }
        .progress-controls button { background-color: var(--secondary-color); color: white; border: none; padding: 5px 10px; margin: 5px 5px 0 0; border-radius: 5px; cursor: pointer; }
      `}</style>
    </section>
  );
}

export default GoalTracker;