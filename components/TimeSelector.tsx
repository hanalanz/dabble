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
    // If at the very end (180), show "3+ Hours"
    if (minutes >= 180) return '3+ Hours';
    
    // Show "60 min" when at exactly 60 or close to it (center-ish position)
    if (minutes >= 55 && minutes <= 65) return '60 min';
    
    // For values less than 60, show minutes
    if (minutes < 60) return `${minutes} min`;
    
    // For values greater than 60, show hours and minutes
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) return `${hours} hr`;
    return `${hours} hr ${mins} min`;
  };
  
  return (
    <div className="mb-8">
      <label className="block mb-2 text-xl font-semibold text-text">
        <h3>Do you have a moment to spare?</h3>
      </label>
      <p className="text-base text-text mb-6">
        Select the range of time you want to spend on your craft.
      </p>
      
      <div className="relative">
        <div className="bg-white border-2 border-black rounded-xl p-4">
          <div className="relative">
            <div className="relative mb-3">
              {/* Background track (lighter pink) */}
              <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 rounded-full bg-[#FFB6C1] z-0"></div>
              
              {/* Selected portion (darker pink) */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 h-2 rounded-l-full bg-primary z-10"
                style={{ width: `${((currentTime - 15) / (180 - 15)) * 100}%` }}
              ></div>
              
              {/* Slider input */}
              <input
                type="range"
                min="15"
                max="180"
                step="5"
                value={currentTime}
                onChange={(e) => onChange(Number(e.target.value))}
                className="time-slider w-full h-2 rounded outline-none relative z-20 bg-transparent"
              />
            </div>
            
            {/* Time labels directly under the slider */}
            <div className="relative">
              <div className="flex justify-between text-sm text-text mb-2">
                <span>15 min</span>
                <span>3+ Hours</span>
              </div>
              
              {/* Time indicator positioned under the slider, following the thumb */}
              <div className="relative h-8 mt-1">
                <div 
                  className="absolute -translate-x-1/2"
                  style={{ left: `${((currentTime - 15) / (180 - 15)) * 100}%` }}
                >
                  <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg text-sm font-semibold text-text border-2 border-black whitespace-nowrap">
                    <span className="text-base">🕐</span>
                    {formatTime(currentTime)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .time-slider {
          -webkit-appearance: none;
          appearance: none;
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
      `}</style>
    </div>
  );
}
