import { Button } from "@/components/ui/button";
import { SearchFilter } from '@/components/market/SearchFilter';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LocationFilter } from '@/components/market/LocationFilter';
import { Card } from "@/components/ui/card";

interface MarketFiltersProps {
  selectedJobs: string[];
  setSelectedJobs: (jobs: string[]) => void;
  selectedSkills: string[];
  setSelectedSkills: (skills: string[]) => void;
  selectedLocations: string[];
  setSelectedLocations: (locations: string[]) => void;
  selectedCompanies: string[];
  setSelectedCompanies: (companies: string[]) => void;
}

export const MarketFilters = ({
  selectedJobs,
  setSelectedJobs,
  selectedSkills,
  setSelectedSkills,
  selectedLocations,
  setSelectedLocations,
  selectedCompanies,
  setSelectedCompanies,
}: MarketFiltersProps) => {
  return (
    <Card className="p-6 bg-white">
      <div className="space-y-4">
        <SearchFilter
          label="Job Title"
          placeholder="Search job titles..."
          items={["Software Engineer", "Product Manager", "Designer", "Data Scientist"]}
          selectedItems={selectedJobs}
          onItemsChange={setSelectedJobs}
          singleSelect={true}
        />

        <SearchFilter
          label="Skills"
          placeholder="Search skills..."
          items={["React", "TypeScript", "Python", "Java", "SQL"]}
          selectedItems={selectedSkills}
          onItemsChange={setSelectedSkills}
        />

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

        <LocationFilter 
          selectedLocations={selectedLocations}
          onLocationChange={setSelectedLocations}
        />

        <SearchFilter
          label="Companies"
          placeholder="Search companies..."
          items={["Google", "Microsoft", "Apple", "Amazon", "Meta"]}
          selectedItems={selectedCompanies}
          onItemsChange={setSelectedCompanies}
        />

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

        <div className="flex justify-end gap-2 pt-4">
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
      </div>
    </Card>
  );
};