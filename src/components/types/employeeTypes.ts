export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  skillCount: number;
  benchmark: number;
  lastUpdated: string;
  location: string;
  sex: 'male' | 'female';
  category: string;
  manager?: string;
  startDate?: string;
  office: string;
  termDate: string;
}