import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sidebar } from '@/components/Sidebar';
import { LocationFilter } from '@/components/market/LocationFilter';
import { SearchFilter } from '@/components/market/SearchFilter';
import { MarketAnalysisTabs } from '@/components/market/MarketAnalysisTabs';
import { jobTitles, companies, skills } from '@/components/market/FilterData';
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

const MarketData = () => {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
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

            <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <CollapsibleContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <SearchFilter
                    label="Job Titles"
                    placeholder="Search job titles..."
                    items={jobTitles}
                    selectedItems={selectedJobs}
                    onItemsChange={setSelectedJobs}
                  />

                  <SearchFilter
                    label="Skills"
                    placeholder="Search skills..."
                    items={skills}
                    selectedItems={selectedSkills}
                    onItemsChange={setSelectedSkills}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Graduation Year</label>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="2020">
                        <SelectTrigger className="w-[120px] bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2020">2020</SelectItem>
                          <SelectItem value="2021">2021</SelectItem>
                          <SelectItem value="2022">2022</SelectItem>
                          <SelectItem value="2023">2023</SelectItem>
                        </SelectContent>
                      </Select>
                      <span className="text-sm">to</span>
                      <Select defaultValue="2024">
                        <SelectTrigger className="w-[120px] bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2025">2025</SelectItem>
                          <SelectItem value="2026">2026</SelectItem>
                          <SelectItem value="2027">2027</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Graduation Program</label>
                    <Select defaultValue="">
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select a program" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                        <SelectItem value="masters">Master's Degree</SelectItem>
                        <SelectItem value="phd">Ph.D.</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                        <SelectItem value="certificate">Certificate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <LocationFilter 
                    selectedLocations={selectedLocations}
                    onLocationChange={setSelectedLocations}
                  />

                  <SearchFilter
                    label="Companies"
                    placeholder="Search companies..."
                    items={companies}
                    selectedItems={selectedCompanies}
                    onItemsChange={setSelectedCompanies}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Timeframe</label>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="may2023">
                      <SelectTrigger className="w-[120px] bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="may2023">May 2023</SelectItem>
                        <SelectItem value="jun2023">Jun 2023</SelectItem>
                        <SelectItem value="jul2023">Jul 2023</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm">to</span>
                    <Select defaultValue="may2024">
                      <SelectTrigger className="w-[120px] bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="may2024">May 2024</SelectItem>
                        <SelectItem value="jun2024">Jun 2024</SelectItem>
                        <SelectItem value="jul2024">Jul 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedJobs([]);
                      setSelectedCompanies([]);
                      setSelectedSkills([]);
                      setSelectedLocations([]);
                    }}
                  >
                    Clear All
                  </Button>
                  <Button>Run</Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
          
          <MarketAnalysisTabs />
        </div>
      </div>
    </div>
  );
};

export default MarketData;