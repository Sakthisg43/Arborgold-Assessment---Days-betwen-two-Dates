import React, { useState } from "react";
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  addDays,
  isBefore,
} from "date-fns";
import DateInput from "./components/DateInput";
import ResultDisplay from "./components/ResultDisplay";
import ToggleSwitch from "./components/ToggleSwitch";
import "./styles/global.scss";

const App = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [includeAllDays, setIncludeAllDays] = useState(true);
  const [includeEndDay, setIncludeEndDay] = useState(false);
  const [excludedDays, setExcludedDays] = useState(new Set());
  const [result, setResult] = useState(null);

  const toggleDay = (dayIndex) => {
    setExcludedDays((prev) => {
      const updated = new Set(prev);
      if (updated.has(dayIndex)) updated.delete(dayIndex);
      else updated.add(dayIndex);
      return updated;
    });
  };

  const calculateDifference = () => {
    if (!startDate || !endDate) return;

    let adjustedEndDate = includeEndDay ? endDate : addDays(endDate, -1);
    if (isBefore(adjustedEndDate, startDate)) {
      setResult({ days: 0, months: 0, years: 0 });
      return;
    }

    let days;
    if (includeAllDays) {
      days = differenceInDays(adjustedEndDate, startDate) + 1;
    } else {
      days = countDaysExcluding(startDate, adjustedEndDate, excludedDays);
    }

    const months = differenceInMonths(adjustedEndDate, startDate);
    const years = differenceInYears(adjustedEndDate, startDate);

    setResult({ days, months, years });
  };

  const countDaysExcluding = (start, end, excludedDays) => {
    let count = 0;
    let current = new Date(start);
    while (isBefore(current, addDays(end, 1))) {
      if (!excludedDays.has(current.getDay())) count++;
      current = addDays(current, 1);
    }
    return count;
  };

  return (
    <div className="app-container">
      <h1>Days Between Dates Calculator</h1>

      <DateInput
        startDate={startDate}
        endDate={endDate}
        onStartChange={setStartDate}
        onEndChange={setEndDate}
      />

      <div className="toggle-container">
        <ToggleSwitch
          label="Include all days?"
          isOn={includeAllDays}
          handleToggle={() => setIncludeAllDays(!includeAllDays)}
        />
        <ToggleSwitch
          label="Include end day?"
          isOn={includeEndDay}
          handleToggle={() => setIncludeEndDay(!includeEndDay)}
        />
      </div>

      {!includeAllDays && (
        <div className="days-selection">
          <div className="day-box-container">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => {
              const isSelected = !excludedDays.has(index);
              return (
                <div
                  key={index}
                  className={`day-box ${isSelected ? "selected" : ""}`}
                  onClick={() => toggleDay(index)}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <button disabled={!startDate || !endDate} className="calculate-btn" onClick={calculateDifference}>
        Calculate
      </button>

      {result && <ResultDisplay result={result} />}
    </div>
  );
};

export default App;
