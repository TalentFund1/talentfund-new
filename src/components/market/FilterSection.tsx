import { Button } from "@/components/ui/button";
import { SearchFilter } from '@/components/market/SearchFilter';
import { Separator } from "@/components/ui/separator";
import { LocationFilter } from '@/components/market/LocationFilter';
import { toast } from "sonner";
import { GraduationSection } from "./GraduationSection";
import { TimeframeSection } from "./TimeframeSection";

interface FilterSectionProps {
  selectedJobs: string[];
  setSelectedJobs: (jobs: string[]) => void;
  selectedSkills: string[];
  setSelectedSkills: (skills: string[]) => void;
  selectedLocations: string[];
  setSelectedLocations: (locations: string[]) => void;
  selectedCompanies: string[];
  setSelectedCompanies: (companies: string[]) => void;
  jobTitles: string[];
  skills: string[];
  companies: string[];
  onRun: () => void;
  onClearAll: () => void;
  activeTab?: string;
}

export const FilterSection = ({
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
  onRun,
  onClearAll,
  activeTab = 'location',
}: FilterSectionProps) => {
  const handleRun = () => {
    if (selectedJobs.length === 0) {
      toast.error("Please select a job title before running the report");
      return;
    }

    if (activeTab === 'compensation' && selectedLocations.length === 0) {
      toast.error("Please select a location before running the market analysis report");
      return;
    }

    onRun();
  };

  const isRunDisabled = selectedJobs.length === 0 || 
    (activeTab === 'compensation' && selectedLocations.length === 0);

  return (
    <div className="mt-4 border rounded-lg p-4 space-y-4">
      <SearchFilter
        label="Job Title"
        placeholder="Search job titles..."
        items={jobTitles}
        selectedItems={selectedJobs}
        onItemsChange={setSelectedJobs}
        singleSelect={true}
        required={true}
      />

      <SearchFilter
        label="Skills"
        placeholder="Search skills..."
        items={skills}
        selectedItems={selectedSkills}
        onItemsChange={setSelectedSkills}
      />

      <GraduationSection />

      <Separator className="my-4" />

      <LocationFilter 
        selectedLocations={selectedLocations}
        onLocationChange={setSelectedLocations}
        required={activeTab === 'compensation'}
      />

      {activeTab === 'compensation' && (
        <SearchFilter
          label="Companies"
          placeholder="Search companies..."
          items={companies}
          selectedItems={selectedCompanies}
          onItemsChange={setSelectedCompanies}
        />
      )}

      <TimeframeSection />

      <Separator className="my-4" />

      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          onClick={onClearAll}
        >
          Clear All
        </Button>
        <Button 
          onClick={handleRun}
          disabled={isRunDisabled}
        >
          Run
        </Button>
      </div>
    </div>
  );
};