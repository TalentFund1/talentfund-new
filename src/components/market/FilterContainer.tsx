import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { FilterSection } from "./FilterSection";

interface FilterContainerProps {
  isFiltersOpen: boolean;
  setIsFiltersOpen: (value: boolean) => void;
  selectedJobs: string[];
  setSelectedJobs: (value: string[]) => void;
  selectedSkills: string[];
  setSelectedSkills: (value: string[]) => void;
  selectedLocations: string[];
  setSelectedLocations: (value: string[]) => void;
  selectedCompanies: string[];
  setSelectedCompanies: (value: string[]) => void;
  jobTitles: string[];
  skills: string[];
  companies: string[];
}

export const FilterContainer = ({
  isFiltersOpen,
  setIsFiltersOpen,
  selectedJobs,
  setSelectedJobs,
  selectedSkills,
  setSelectedSkills,
  selectedLocations,
  setSelectedLocations,
  selectedCompanies,
  setSelectedCompanies,
  jobTitles,
  skills,
  companies,
}: FilterContainerProps) => {
  return (
    <div className="bg-primary/5 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-8 py-6">
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

        <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <CollapsibleContent>
            <div className="py-4">
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
      </div>
    </div>
  );
};