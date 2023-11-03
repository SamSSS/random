import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./LotteryGenerator.css";

function LotteryGenerator() {
  const [selectedNumbers, setSelectedNumbers] = useState([]); //checked numbers
  const [generatedResults, setGeneratedResults] = useState([]); //

  const handleReset = () => {
    setGeneratedResults([]); // Reset the generatedResults state to an empty array
  };

  const handleResetSelected = () => {
    setSelectedNumbers([]); // Reset the selectedNumbers state to an empty array
  };

  const handleSelectLastResult = () => {
    if (generatedResults.length === 0) return;
    const newSelectedNumbers = Array.from(new Set([...selectedNumbers, ...generatedResults[0]]));
    
    setSelectedNumbers(newSelectedNumbers);
  };

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
      <h1>
        <i class="bi bi-ban"></i>
        &nbsp;{selectedNumbers.length}&nbsp;
        <i class="bi bi-check-circle"></i>
        &nbsp;{49-selectedNumbers.length}
      </h1>
      <div className="number-grid">
        {Array.from({ length: 49 }, (_, i) => i + 1).map((number) => (
          <div
            key={number}
            role="button"
            tabIndex={0}
            className={`number-checkbox ${
              selectedNumbers.includes(number) ? "selected" : ""
            }`}
            onClick={() => handleCheckboxChange(number)}
          >
            <input
              type="checkbox"
              value={number}
              checked={selectedNumbers.includes(number)}
              readOnly
            />
            {number}
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleGenerate}>Generate</button>
        <button onClick={handleSelectLastResult}>Select Last Result</button>
        <button onClick={handleReset}>Reset History</button>
        <button onClick={handleResetSelected}>Reset Selected</button>        
      </div>
      <div className="results">
        {generatedResults.map((result, index) => (
          <div key={index} className="result">
            <span className="row-number">{index + 1}. </span>
            {result.join(", ")}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LotteryGenerator;
