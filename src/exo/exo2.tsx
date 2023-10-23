import React, { useState } from 'react';
import '../App.css';

function Exo2() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="counter">
      <h2>Compteur: {count}</h2>
      <button onClick={handleIncrement} className="increment-button">+</button>
      <button onClick={handleReset} className="reset-button">Reset</button>
    </div>
  );
}

export default Exo2;