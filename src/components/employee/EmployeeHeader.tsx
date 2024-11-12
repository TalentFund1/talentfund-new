import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EmployeeHeaderProps {
  id: string;
  employee: {
    name: string;
    role: string;
    location: string;
    image: string;
  };
}

export const EmployeeHeader = ({ id, employee }: EmployeeHeaderProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="outline" 
          className="flex items-center gap-2 bg-white border-border hover:bg-background"
          onClick={() => navigate('/employees')}
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
        <div className="flex items-center gap-2 bg-white rounded-lg border border-border px-3 py-1.5">
          <ChevronLeft className="h-4 w-4 text-foreground cursor-pointer hover:text-primary-accent" />
          <span className="text-sm text-foreground">2/7</span>
          <ChevronRight className="h-4 w-4 text-foreground cursor-pointer hover:text-primary-accent" />
        </div>
      </div>

      <div className="flex items-start justify-between mb-8">
        <div className="flex gap-8">
          <Avatar className="h-28 w-28 rounded-full border-4 border-border">
            <img 
              src={`https://images.unsplash.com/${employee.image}?auto=format&fit=crop&w=96&h=96`}
              alt={employee.name}
              className="object-cover"
            />
          </Avatar>
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">{employee.name}</h1>
                <span className="text-sm text-muted-foreground bg-background px-2 py-1 rounded">ID: {id}</span>
              </div>
              <h2 className="text-lg font-medium text-foreground/90">{employee.role}</h2>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{employee.location}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white">Export</Button>
          <Button>Edit</Button>
        </div>
      </div>
    </>
  );
};