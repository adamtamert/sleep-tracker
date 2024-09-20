import React, { useState } from 'react';
import './App.css';

function App() {
  const [sleepTime, setSleepTime] = useState('');
  const [wakeTimes, setWakeTimes] = useState([]);

  const calculateWakeTimes = () => {
    const sleepDate = new Date(`1970-01-01T${convertTo24Hour(sleepTime)}`);
    const cycleLength = 90 * 60 * 1000; // 90 minutes in milliseconds
    const newWakeTimes = [];

    for (let cycles = 5; cycles <= 6; cycles++) {
      const wakeTime = new Date(sleepDate.getTime() + (cycles * cycleLength));
      newWakeTimes.push(wakeTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }

    setWakeTimes(newWakeTimes);
  };

  const convertTo24Hour = (time) => {
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":");
    if (modifier === "PM" && hours !== "12") hours = parseInt(hours, 10) + 12;
    if (modifier === "AM" && hours === "12") hours = "00";
    return `${hours}:${minutes}`;
  };

  return (
    <div className="container">
      <h1>Sleep Cycle Tracker</h1>
      <label htmlFor="sleepTime">Enter your sleep time (HH:MM AM/PM):</label>
      <input 
        type="text" 
        id="sleepTime" 
        value={sleepTime} 
        onChange={(e) => setSleepTime(e.target.value)} 
        placeholder="e.g., 10:00 PM" 
      />
      <button onClick={calculateWakeTimes}>Calculate Wake-Up Times</button>
      <h3>Possible Wake-Up Times:</h3>
      <ul>
        {wakeTimes.map((time, index) => (
          <li key={index}>{time}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
