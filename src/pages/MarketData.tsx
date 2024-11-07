import React, { useState } from 'react';
import { MarketDataMap } from '@/components/market/MarketDataMap';
import { MarketDataTable } from '@/components/market/MarketDataTable';
import { Sidebar } from '@/components/Sidebar';
import { MarketDataSearch } from '@/components/market/MarketDataSearch';

const MarketData = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [anySkills, setAnySkills] = useState('');
  const [allSkills, setAllSkills] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6 bg-white rounded-lg p-6 shadow-sm">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Market Data</h2>
            
            <MarketDataSearch 
              jobTitle={jobTitle}
              setJobTitle={setJobTitle}
              anySkills={anySkills}
              setAnySkills={setAnySkills}
              allSkills={allSkills}
              setAllSkills={setAllSkills}
              company={company}
              setCompany={setCompany}
              location={location}
              setLocation={setLocation}
            />

            <MarketDataMap />
            <MarketDataTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketData;