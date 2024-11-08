import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { CompensationAnalysis } from '@/components/market/CompensationAnalysis';
import { GlobalLocationInsights } from '@/components/market/GlobalLocationInsights';
import { jobTitles, companies, skills } from '@/components/market/FilterData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilterContainer } from '@/components/market/FilterContainer';

const MarketData = () => {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-16">
        <FilterContainer 
          isFiltersOpen={isFiltersOpen}
          setIsFiltersOpen={setIsFiltersOpen}
          selectedJobs={selectedJobs}
          setSelectedJobs={setSelectedJobs}
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
          selectedCompanies={selectedCompanies}
          setSelectedCompanies={setSelectedCompanies}
          jobTitles={jobTitles}
          skills={skills}
          companies={companies}
        />

        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-8">
              <Tabs defaultValue="location" className="w-full">
                <TabsList className="w-full flex h-12 items-center justify-start bg-transparent p-0 border-b border-border">
                  <TabsTrigger 
                    value="location" 
                    className="relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium hover:text-primary data-[state=active]:border-primary-accent data-[state=active]:text-primary"
                  >
                    Location Analysis
                  </TabsTrigger>
                  <TabsTrigger 
                    value="compensation" 
                    className="relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium hover:text-primary data-[state=active]:border-primary-accent data-[state=active]:text-primary"
                  >
                    Compensation Analysis
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="location" className="space-y-8 mt-8">
                  <GlobalLocationInsights />
                </TabsContent>
                
                <TabsContent value="compensation" className="mt-8">
                  <CompensationAnalysis />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketData;