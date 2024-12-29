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
  const [showLocationResults, setShowLocationResults] = useState(false);
  const [showCompensationResults, setShowCompensationResults] = useState(false);
  const [activeTab, setActiveTab] = useState('location');

  const handleRun = () => {
    if (activeTab === 'location') {
      setShowLocationResults(true);
    } else if (activeTab === 'compensation') {
      setShowCompensationResults(true);
    }
  };

  const handleClearAll = () => {
    setSelectedJobs([]);
    setSelectedCompanies([]);
    setSelectedSkills([]);
    setSelectedLocations([]);
    setShowLocationResults(false);
    setShowCompensationResults(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-8 ml-16">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-8 space-y-8">
              <div className="flex justify-between items-center">
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

              <Tabs defaultValue="location" onValueChange={setActiveTab} className="space-y-8">
                <TabsList className="w-full flex h-14 items-center justify-start bg-transparent p-0 border-b border-border">
                  <TabsTrigger 
                    value="location" 
                    className="relative h-14 rounded-none border-b-2 border-transparent px-8 pb-4 pt-2 font-medium hover:text-primary data-[state=active]:border-primary-accent data-[state=active]:text-primary"
                  >
                    Location Analysis
                  </TabsTrigger>
                  <TabsTrigger 
                    value="compensation" 
                    className="relative h-14 rounded-none border-b-2 border-transparent px-8 pb-4 pt-2 font-medium hover:text-primary data-[state=active]:border-primary-accent data-[state=active]:text-primary"
                  >
                    Market Analysis
                  </TabsTrigger>
                </TabsList>

                <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                  <CollapsibleContent className="py-6">
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
                      onRun={handleRun}
                      onClearAll={handleClearAll}
                      activeTab={activeTab}
                    />
                  </CollapsibleContent>
                </Collapsible>

                <TabsContent value="location" className="space-y-8 mt-8">
                  {showLocationResults && <GlobalLocationInsights />}
                </TabsContent>
                
                <TabsContent value="compensation" className="mt-8">
                  <CompensationAnalysis isVisible={showCompensationResults} />
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