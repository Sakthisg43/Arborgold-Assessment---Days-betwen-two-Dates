import React from 'react';
import '../styles/DateInput.scss';

const DateInput = ({ startDate, endDate, onStartChange, onEndChange }) => {

    const formatDate = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

  return (
    <div className="date-input-container">
      <div className="input-group">
        <label htmlFor="start-date">Start Date:</label>
        <input
          type="date"
          id="start-date"
          value={formatDate(startDate) || ''}
          onChange={(e) => onStartChange(new Date(e.target.value))}
        />
      </div>

      <div className="input-group">
        <label htmlFor="end-date">End Date:</label>
        <input
          type="date"
          id="end-date"
          value={formatDate(endDate) || ''}
          onChange={(e) => onEndChange(new Date(e.target.value))}
        />
      </div>
    </div>
  );
};

export default DateInput;
