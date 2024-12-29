import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { getSkillProfileId } from "../../EmployeeTable";

interface EmployeeBasicInfoProps {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  isExactMatch: boolean;
  selectedJobTitle: string[];
}

export const EmployeeBasicInfo = ({ 
  id, 
  name, 
  role, 
  imageUrl, 
  isExactMatch, 
  selectedJobTitle 
}: EmployeeBasicInfoProps) => {
  return (
    <>
      <td className="px-4 py-4 w-[48px]">
        <input 
          type="checkbox" 
          className="rounded border-gray-300"
          checked={isExactMatch}
          onChange={() => {}} // Handled by parent
        />
      </td>
      <td className={`px-10 py-4 ${selectedJobTitle.length > 0 ? 'w-[600px]' : 'w-[400px]'}`}>
        <div className="flex items-center gap-2">
          <img 
            src={imageUrl}
            alt={name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <div className="flex items-center gap-2">
            <Link to={`/employee/${id}`} className="text-primary hover:text-primary-accent transition-colors text-sm whitespace-nowrap">
              {name}
            </Link>
            {isExactMatch && selectedJobTitle.length > 0 && (
              <Badge 
                variant="secondary" 
                className="text-xs bg-primary-accent/10 text-primary-accent border border-primary-accent/20 hover:bg-primary-accent/15 flex items-center gap-1.5 px-2 py-0.5 font-medium animate-fade-in"
              >
                <CheckCircle2 className="w-3 h-3" />
                Role Match
              </Badge>
            )}
          </div>
        </div>
      </td>
      <td className={`px-6 py-4 ${selectedJobTitle.length > 0 ? 'w-[600px]' : 'w-[350px]'}`}>
        <Link 
          to={`/skills/${getSkillProfileId(role)}`} 
          className="text-sm text-primary hover:text-primary-accent transition-colors whitespace-nowrap"
        >
          {role}
        </Link>
      </td>
    </>
  );
};