import { Employee } from "../types/employeeTypes";
import { useState } from "react";

export const useEmployeeTableState = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleSelectAll = (employees: Employee[], e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(employees.map(emp => emp.name));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectEmployee = (name: string) => {
    setSelectedRows(prev => {
      if (prev.includes(name)) {
        return prev.filter(n => n !== name);
      }
      return [...prev, name];
    });
  };

  return {
    selectedRows,
    handleSelectAll,
    handleSelectEmployee
  };
};