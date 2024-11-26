import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface EmployeeNameCellProps {
  id: string;
  name: string;
  imageUrl: string;
  shouldShowExactMatch: boolean;
}

export const EmployeeNameCell = ({ id, name, imageUrl, shouldShowExactMatch }: EmployeeNameCellProps) => {
  return (
    <td className="px-4 py-4 w-[200px]">
      <div className="flex items-center gap-2">
        <img 
          src={imageUrl}
          alt={name}
          className="w-6 h-6 rounded-full object-cover"
        />
        <div className="flex items-center gap-2">
          <Link to={`/employee/${id}`} className="text-primary hover:text-primary-accent transition-colors text-sm">
            {name}
          </Link>
          {shouldShowExactMatch && (
            <Badge 
              variant="secondary" 
              className="text-xs bg-primary-accent/10 text-primary-accent border border-primary-accent/20 hover:bg-primary-accent/15 flex items-center gap-1.5 px-2 py-0.5 font-medium animate-fade-in"
            >
              <CheckCircle2 className="w-3 h-3" />
              Exact Match
            </Badge>
          )}
        </div>
      </div>
    </td>
  );
};