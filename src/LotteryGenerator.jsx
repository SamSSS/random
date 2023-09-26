import React, { useState } from "react";
import "./LotteryGenerator.css";

function LotteryGenerator() {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [generatedResults, setGeneratedResults] = useState([]);

  const handleCheckboxChange = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const handleGenerate = () => {
    const newResult = generateLottery(selectedNumbers);
    setGeneratedResults([newResult, ...generatedResults]);
  };

  const generateLottery = (excludedNumbers) => {
    let possibleNumbers = Array.from({ length: 49 }, (_, i) => i + 1).filter(
      (num) => !excludedNumbers.includes(num)
    );

    const result = [];
    for (let i = 0; i < 6; i++) {
      if (possibleNumbers.length === 0) break; // Break if there are no possible numbers left

      const randomIndex = Math.floor(Math.random() * possibleNumbers.length);
      result.push(possibleNumbers[randomIndex]);
      possibleNumbers.splice(randomIndex, 1); // Remove the selected number from possibleNumbers
    }

    return result.sort((a, b) => a - b);
  };

  return (
    <div>
      <h1>tor</h1>
      <div className="number-grid">
        {Array.from({ length: 49 }, (_, i) => i + 1).map((number) => (
          <label
            key={number}
            className={`number-checkbox ${
              selectedNumbers.includes(number) ? "selected" : ""
            }`}
            onClick={() => handleCheckboxChange(number)} // Apply onClick handler to the label
          >
            <input
              type="checkbox"
              value={number}
              checked={selectedNumbers.includes(number)}
            />
            {number}
          </label>
        ))}
      </div>
      <div>
        <button onClick={handleGenerate}>Generate</button>
      </div>
      <div className="results">
        {generatedResults.map((result, index) => (
          <div key={index} className="result">
            {result.join(", ")}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LotteryGenerator;
