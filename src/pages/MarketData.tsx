import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { FilterSection } from '@/components/market/FilterSection';
import { CompensationAnalysis } from '@/components/market/CompensationAnalysis';
import { GlobalLocationInsights } from '@/components/market/GlobalLocationInsights';
import { CompensationSegment } from '@/components/market/CompensationSegment';
import { jobTitles, companies, skills } from '@/components/market/FilterData';

const MarketData = () => {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 p-8 ml-16">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-primary">Market Data</h2>
              </div>

              <Separator className="mb-6" />

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
                  <TabsTrigger 
                    value="filters" 
                    className="relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium hover:text-primary data-[state=active]:border-primary-accent data-[state=active]:text-primary"
                  >
                    Filters
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="location" className="space-y-8 mt-8">
                  <GlobalLocationInsights />
                </TabsContent>
                
                <TabsContent value="compensation" className="mt-8">
                  <CompensationAnalysis />
                </TabsContent>

                <TabsContent value="filters" className="mt-8">
                  <FilterSection 
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
                  <CompensationSegment />
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