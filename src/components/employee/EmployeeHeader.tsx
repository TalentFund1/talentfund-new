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

  const employees = [
    { id: "123", name: "Victor Smith" },
    { id: "124", name: "Jennie Richards" },
    { id: "125", name: "Anna Vyselva" },
    { id: "126", name: "Suz Manu" }
  ];

  const currentIndex = employees.findIndex(emp => emp.id === id);
  const totalEmployees = employees.length;

  const handleNavigation = (direction: 'prev' | 'next') => {
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : employees.length - 1;
    } else {
      newIndex = currentIndex < employees.length - 1 ? currentIndex + 1 : 0;
    }
    navigate(`/employee/${employees[newIndex].id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          className="flex items-center gap-2 bg-background hover:bg-background/90"
          onClick={() => navigate('/employees')}
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
        <div className="flex items-center gap-2 bg-background rounded-lg border px-3 py-1.5">
          <ChevronLeft 
            className="h-4 w-4 cursor-pointer hover:text-primary-accent" 
            onClick={() => handleNavigation('prev')}
          />
          <span className="text-sm">
            {currentIndex + 1}/{totalEmployees}
          </span>
          <ChevronRight 
            className="h-4 w-4 cursor-pointer hover:text-primary-accent" 
            onClick={() => handleNavigation('next')}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg p-8 border border-border">
        <div className="flex items-start justify-between">
          <div className="flex gap-6">
            <Avatar className="h-24 w-24 rounded-full">
              <img 
                src={`https://images.unsplash.com/${employee.image}?auto=format&fit=crop&w=96&h=96`}
                alt={employee.name}
                className="object-cover"
              />
            </Avatar>
            <div className="space-y-2">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-semibold">{employee.name}</h1>
                  <span className="text-sm text-muted-foreground bg-background px-2 py-1 rounded">ID: {id}</span>
                </div>
                <h2 className="text-lg text-gray-700">{employee.role}</h2>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{employee.location}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white hover:bg-gray-50">Export</Button>
            <Button className="bg-[#1F2144] hover:bg-[#1F2144]/90">Edit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};