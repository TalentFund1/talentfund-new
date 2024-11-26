import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { EmployeeFormFields } from "./form/EmployeeFormFields";
import { useEmployeeStore } from "./store/employeeStore";
import { UserPlus } from "lucide-react";

export const AddEmployeeDialog = () => {
  const [open, setOpen] = useState(false);
  const addEmployee = useEmployeeStore((state) => state.addEmployee);

  const handleSubmit = (data: any) => {
    console.log('Submitting employee data:', data);
    addEmployee(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
        </DialogHeader>
        <EmployeeFormFields onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};