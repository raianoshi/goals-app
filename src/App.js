import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  // Load goals from local storage on initial render
  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem('goals');
    return savedGoals ? JSON.parse(savedGoals) : [];
  });

  const [newGoal, setNewGoal] = useState('');
  const [hours, setHours] = useState(0);

  // Save goals to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    if (newGoal.trim() !== '' && hours > 0) {
      setGoals([...goals, { name: newGoal, hours: parseInt(hours) }]);
      setNewGoal('');
      setHours(0);
    }
  };

  const deleteGoal = (index) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
  };

  const data = {
    labels: goals.map(goal => goal.name),
    datasets: [
      {
        label: 'Hours',
        data: goals.map(goal => goal.hours),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="w-1/2 p-8">
        <h1 className="text-2xl font-bold font-lato mb-6">Goals Tracker</h1>
        <div className="mb-6">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Enter a goal"
            className="border p-2 mr-2"
          />
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="Hours"
            className="border p-2 mr-2"
          />
          <button onClick={addGoal} className="bg-blue-500 text-white p-2">
            Add Goal
          </button>
        </div>
        <ul>
          {goals.map((goal, index) => (
            <li key={index} className="mb-3 flex justify-between items-center">
              <span>
                {goal.name} - {goal.hours} hours
              </span>
              <button
                onClick={() => deleteGoal(index)}
                className="bg-red-400 text-white p-1 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-1/2 p-8">
        <h2 className="text-2xl font-bold font-lato mb-6">Time Allocation</h2>
        <div className="transform scale-75">
          <Pie data={data} />
        </div>
        
      </div>
    </div>
  );
}

export default App;