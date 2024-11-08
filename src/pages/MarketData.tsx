import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sidebar } from '@/components/Sidebar';
import { CompensationAnalysis } from '@/components/market/CompensationAnalysis';
import { GlobalLocationInsights } from '@/components/market/GlobalLocationInsights';
import { jobTitles, companies, skills } from '@/components/market/FilterData';
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilterSection } from '@/components/market/FilterSection';

const MarketData = () => {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-8 ml-16">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-primary">Market Data</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="flex items-center gap-2"
                >
                  {isFiltersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  Filters
                </Button>
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
                    Supply and Demand Analysis
                  </TabsTrigger>
                </TabsList>

                <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                  <CollapsibleContent>
                    <div className="py-8">
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
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <div className="mt-8 bg-background p-8 rounded-lg">
                  <TabsContent value="location" className="space-y-8 mt-0">
                    <GlobalLocationInsights />
                  </TabsContent>
                  
                  <TabsContent value="compensation" className="mt-0">
                    <CompensationAnalysis />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketData;