'use client';

import React, { useState, useMemo } from 'react';
import { getAllMaterials } from '@/utils/filterCrafts';
import { useApp } from '@/context/AppContext';

interface MaterialSelectorProps {
  selected: string[];
  onChange: (materials: string[]) => void;
}

export function MaterialSelector({ selected, onChange }: MaterialSelectorProps) {
  const { crafts } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  
  const allMaterials = useMemo(() => getAllMaterials(crafts), [crafts]);
  
  const filteredMaterials = useMemo(() => {
    if (!searchTerm) return allMaterials;
    return allMaterials.filter(material =>
      material.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allMaterials, searchTerm]);
  
  const toggleMaterial = (material: string) => {
    if (selected.includes(material)) {
      onChange(selected.filter(m => m !== material));
    } else {
      onChange([...selected, material]);
    }
  };
  
  return (
    <div className="material-selector">
      <label className="material-selector-label">
        <h3>Tell us what you got!</h3>
      </label>
      <p className="material-instruction">
        Select all the materials you have available or want to work with.
      </p>
      
      <input
        type="text"
        placeholder="Search materials..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="material-search"
      />
      
      <div className="material-chips">
        {filteredMaterials.map(material => {
          const isSelected = selected.includes(material);
          return (
            <button
              key={material}
              type="button"
              onClick={() => toggleMaterial(material)}
              className={`material-chip ${isSelected ? 'selected' : ''}`}
            >
              {material}
              {isSelected && <span className="chip-check">✓</span>}
            </button>
          );
        })}
      </div>
      
      {selected.length > 0 && (
        <div className="selected-count">
          {selected.length} selected
        </div>
      )}
      
      <style jsx>{`
        .material-selector {
          margin-bottom: 2rem;
        }
        
        .material-selector-label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-text);
        }
        
        .material-instruction {
          font-size: 0.95rem;
          color: var(--color-text-light);
          margin-bottom: 1rem;
        }
        
        .material-search {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid var(--color-border);
          border-radius: 8px;
          font-size: 1rem;
          margin-bottom: 1rem;
          transition: border-color 0.2s;
        }
        
        .material-search:focus {
          outline: none;
          border-color: var(--color-primary);
        }
        
        .material-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          max-height: 300px;
          overflow-y: auto;
          padding: 1rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          background-color: var(--color-surface);
        }
        
        .material-chip {
          padding: 0.75rem 1.25rem;
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          background-color: var(--color-surface);
          color: var(--color-text);
          font-size: 0.9rem;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .material-chip:hover {
          border-color: var(--color-primary);
          background-color: #FFF0F5;
        }
        
        .material-chip.selected {
          background-color: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
        }
        
        .chip-check {
          font-weight: bold;
        }
        
        .selected-count {
          margin-top: 0.5rem;
          font-size: 0.9rem;
          color: var(--color-text-light);
        }
      `}</style>
    </div>
  );
}

