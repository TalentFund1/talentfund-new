import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Users, UserPlus, Equal, Clock, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sidebar } from "@/components/Sidebar";

const Employees = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground">Employees</h1>
            <div className="space-x-2">
              <Button variant="outline">Export Data</Button>
              <Button>Add Employee</Button>
            </div>
          </div>

          <Card className="p-6">
            <div className="space-y-4">
              <label htmlFor="search" className="block text-sm font-medium text-foreground">
                Search
              </label>
              <Input id="search" type="search" placeholder="Search..." className="max-w-sm bg-white" />
              
              <div className="flex flex-wrap gap-4">
                <Select>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Job Title" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="engineer">Engineer</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="p4">P4</SelectItem>
                    <SelectItem value="m3">M3</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Office" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="canada">Canada</SelectItem>
                    <SelectItem value="us">US</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Employment Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="fulltime">Full Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline">Clear All</Button>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total number of Employees"
              value="112"
              icon={<Users className="h-6 w-6 text-primary-icon" />}
            />
            <StatCard
              title="Employee Added in Past 1 Year"
              value="24"
              icon={<UserPlus className="h-6 w-6 text-primary-icon" />}
            />
            <StatCard
              title="Share of Female Employees"
              value="38%"
              icon={<Equal className="h-6 w-6 text-primary-icon" />}
            />
            <StatCard
              title="Average Tenure (Years)"
              value="1.9"
              icon={<Clock className="h-6 w-6 text-primary-icon" />}
            />
          </div>

          <Card className="p-6">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-12">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableHead>
                  <TableHead>Employee Name</TableHead>
                  <TableHead>Current Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Skill Count</TableHead>
                  <TableHead>Benchmark</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                    Victor Smith
                  </TableCell>
                  <TableCell>AI Engineer: P4</TableCell>
                  <TableCell>Engineering</TableCell>
                  <TableCell>16</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-800">89%</span>
                  </TableCell>
                  <TableCell>10/20/24</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                    Jennie Richards
                  </TableCell>
                  <TableCell>Backend Engineer: P4</TableCell>
                  <TableCell>Engineering</TableCell>
                  <TableCell>12</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-800">85%</span>
                  </TableCell>
                  <TableCell>10/20/24</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                    Anna Vyselva
                  </TableCell>
                  <TableCell>Frontend Developer: P4</TableCell>
                  <TableCell>Engineering</TableCell>
                  <TableCell>17</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-800">74%</span>
                  </TableCell>
                  <TableCell>10/20/24</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                    Suz Manu
                  </TableCell>
                  <TableCell>Engineering Manager: M3</TableCell>
                  <TableCell>Engineering</TableCell>
                  <TableCell>11</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-800">68%</span>
                  </TableCell>
                  <TableCell>10/20/24</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Separator className="my-4" />
            <div className="flex justify-between items-center">
              <Select>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="10 rows" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 rows</SelectItem>
                  <SelectItem value="20">20 rows</SelectItem>
                  <SelectItem value="50">50 rows</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">1-4 of 4</span>
                <div className="flex gap-1">
                  <Button variant="outline" size="icon" className="w-8 h-8">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="w-8 h-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Employees;