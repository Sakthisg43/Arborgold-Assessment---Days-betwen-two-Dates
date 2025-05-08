import React from 'react';
import '../styles/toggleSwitch.scss';

const ToggleSwitch = ({ label, isOn, handleToggle }) => {
  return (
    <div className="toggle-switch">
      <span>{label}</span>
      <div className={`switch ${isOn ? 'on' : ''}`} onClick={handleToggle}>
        <div className="slider" />
      </div>
    </div>
  );
};

export default ToggleSwitch;
