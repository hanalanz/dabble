'use client';

import React from 'react';

interface TimeSelectorProps {
  selected: number | null;
  onChange: (time: number | null) => void;
}

export function TimeSelector({ selected, onChange }: TimeSelectorProps) {
  // Default to 60 minutes if nothing selected
  const currentTime = selected ?? 60;
  
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    if (minutes === 60) return '60 min';
    if (minutes < 120) return `${Math.floor(minutes / 60)} hr ${minutes % 60} min`;
    return '2+ Hours';
  };
  
  return (
    <div className="time-selector">
      <label className="time-selector-label">
        <h3>Do you have a moment to spare?</h3>
      </label>
      <p className="time-instruction">
        Select the range of time you want to spend on your craft.
      </p>
      
      <div className="time-slider-container">
        <div className="time-slider-labels">
          <span className="time-label">15 min</span>
          <span className="time-label">2+ Hours</span>
        </div>
        
        <div className="time-slider-wrapper">
          <input
            type="range"
            min="15"
            max="180"
            step="5"
            value={currentTime}
            onChange={(e) => onChange(Number(e.target.value))}
            className="time-slider"
          />
          <div 
            className="time-slider-value"
            style={{ left: `${((currentTime - 15) / (180 - 15)) * 100}%` }}
          >
            <span className="time-value-text">
              <span className="clock-icon">🕐</span>
              {formatTime(currentTime)}
            </span>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .time-selector {
          margin-bottom: 2rem;
        }
        
        .time-selector-label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-text);
        }
        
        .time-instruction {
          font-size: 0.95rem;
          color: var(--color-text-light);
          margin-bottom: 1.5rem;
        }
        
        .time-slider-container {
          position: relative;
        }
        
        .time-slider-labels {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: var(--color-text-light);
        }
        
        .time-slider-wrapper {
          position: relative;
          padding: 1rem 0 2rem;
        }
        
        .time-slider {
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(to right, #FF6B9D 0%, #FFB6C1 100%);
          outline: none;
          -webkit-appearance: none;
          position: relative;
          z-index: 1;
        }
        
        .time-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          border: 3px solid #FF6B9D;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          position: relative;
          z-index: 2;
        }
        
        .time-slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          border: 3px solid #FF6B9D;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .time-slider::-moz-range-track {
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(to right, #FF6B9D 0%, #FFB6C1 100%);
        }
        
        .time-slider-value {
          position: absolute;
          top: 0;
          transform: translateX(-50%);
          z-index: 3;
        }
        
        .time-value-text {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background-color: white;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          white-space: nowrap;
        }
        
        .clock-icon {
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}
