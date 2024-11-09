import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getGraduationYears } from "./utils/dateUtils";

export const GraduationSection = () => {
  const graduationYears = getGraduationYears();

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Graduation Year</label>
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-[120px] bg-white">
              <SelectValue placeholder="From" className="text-muted-foreground" />
            </SelectTrigger>
            <SelectContent>
              {graduationYears.map((year) => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm">to</span>
          <Select>
            <SelectTrigger className="w-[120px] bg-white">
              <SelectValue placeholder="To" className="text-muted-foreground" />
            </SelectTrigger>
            <SelectContent>
              {graduationYears.map((year) => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Graduation Program</label>
        <Select>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select a program" className="text-muted-foreground" />
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
  );
};