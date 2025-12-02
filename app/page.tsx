'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MaterialSelector } from '@/components/MaterialSelector';
import { TimeSelector } from '@/components/TimeSelector';
import { useApp } from '@/context/AppContext';

export default function HomePage() {
  const router = useRouter();
  const { filterState, setFilterState } = useApp();
  const [logoError, setLogoError] = useState(false);
  
  const handleSearch = () => {
    router.push('/results');
  };
  
  return (
    <>
      <main className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12 py-8">
            <h2 className="text-4xl md:text-6xl font-semibold mb-4 text-text">
              Wanna{' '}
              {!logoError ? (
                <span className="inline-block align-middle mx-1">
                  <Image
                    src="/dabble.svg"
                    alt="Dabble"
                    width={180}
                    height={60}
                    priority
                    className="h-auto w-auto max-h-14 max-w-[250px] align-middle object-contain"
                    onError={() => setLogoError(true)}
                    unoptimized
                  />
                </span>
              ) : (
                <span className="inline-flex items-center align-middle mx-1">
                  <span className="text-[#4A90E2]">D</span>
                  <span className="text-[#FF6B9D]">a</span>
                  <span className="text-[#98D8C8]">b</span>
                  <span className="text-[#F493A9]">b</span>
                  <span className="text-[#4A90E2]">l</span>
                  <span className="text-[#98D8C8]">e</span>
                </span>
              )}{' '}
              in a new craft?
            </h2>
            <p className="text-lg text-text-light max-w-2xl mx-auto leading-relaxed">
              Tell us what materials you have and how much time you've got, 
              and we'll find the perfect craft for you!
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div 
              className="bg-secondary p-8 md:p-12 rounded-2xl shadow-lg"
              style={{
                borderColor: '#000000',
                borderTopWidth: '2px',
                borderLeftWidth: '2px',
                borderBottomWidth: '8px',
                borderRightWidth: '8px',
                borderStyle: 'solid'
              }}
            >
              <MaterialSelector
                selected={filterState.materialsHave}
                onChange={(materials) => 
                  setFilterState({ ...filterState, materialsHave: materials })
                }
              />
              
              <TimeSelector
                selected={filterState.timeAvailable}
                onChange={(time) => 
                  setFilterState({ ...filterState, timeAvailable: time })
                }
              />
              
              <button
                onClick={handleSearch}
                className="bg-primary text-white rounded-full border-black border-t-2 border-b-4 border-r-4 border-l-2 w-full py-4 px-8 text-lg font-semibold hover:opacity-90 hover:-translate-y-0.5 transition-transform"
                style={{ borderRadius: '9999px' }}
                disabled={filterState.materialsHave.length === 0}
              >
                find my perfect craft!
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
