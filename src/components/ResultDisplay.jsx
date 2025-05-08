import React from 'react';
import '../styles/ResultDisplay.scss';

const ResultDisplay = ({ result }) => {
  const { days, months, years } = result;

  return (
    <div className="result-container">
      <h2>Difference</h2>
      <p><strong>Days:</strong> {days}</p>
      <p><strong>Months:</strong> {months}</p>
      <p><strong>Years:</strong> {years}</p>
    </div>
  );
};

export default ResultDisplay;
