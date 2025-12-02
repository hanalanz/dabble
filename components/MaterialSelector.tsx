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
    <div className="mb-8">
      <label className="block mb-2 text-xl font-semibold text-text">
        <h3>Tell us what you got!</h3>
      </label>
      <p className="text-base text-text mb-4">
        Select all the materials you have available or want to work with.
      </p>
      
      <input
        type="text"
        placeholder="Search materials..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full py-3 px-3 border-2 border-black rounded-full text-base mb-4 transition-colors focus:outline-none focus:border-primary"
        style={{ borderRadius: '9999px' }}
      />
      
      <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto p-4 border-2 border-black rounded-xl bg-white">
        {filteredMaterials.map(material => {
          const isSelected = selected.includes(material);
          return (
            <button
              key={material}
              type="button"
              onClick={() => toggleMaterial(material)}
              className={`px-5 py-3 border rounded-lg text-sm transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-primary border-primary text-white'
                  : 'bg-white border-black/20 text-text hover:border-primary hover:bg-primary/20'
              }`}
            >
              {material}
              {isSelected && <span className="font-bold">✓</span>}
            </button>
          );
        })}
      </div>
      
      {selected.length > 0 && (
        <div className="mt-2 text-sm text-text-light">
          {selected.length} selected
        </div>
      )}
    </div>
  );
}
