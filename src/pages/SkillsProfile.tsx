import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Users, Briefcase, Equal, Clock, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sidebar } from "@/components/Sidebar";

const SkillsProfile = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground">Skill Profiles</h1>
            <div className="space-x-2">
              <Button variant="outline">Export Data</Button>
              <Button>Add Profile</Button>
            </div>
          </div>

          <Card className="p-6">
            <div className="space-y-4">
              {/* Removed the "Skills" label */}
              <Input id="search" type="search" placeholder="Search Skills..." className="max-w-sm bg-white" />
              
              <div className="flex flex-wrap gap-4">
                <Select>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Job Title" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Function" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline">Clear All</Button>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total number of Profiles"
              value="56"
              icon={<Users className="h-6 w-6 text-primary-icon" />}
            />
            <StatCard
              title="Open Roles"
              value="5"
              icon={<Briefcase className="h-6 w-6 text-primary-icon" />}
            />
            <StatCard
              title="Share of Female Employees"
              value="50%"
              icon={<Equal className="h-6 w-6 text-primary-icon" />}
            />
            <StatCard
              title="Average Tenure (Years)"
              value="1.09"
              icon={<Clock className="h-6 w-6 text-primary-icon" />}
            />
          </div>

          <Card className="p-6">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[5%]">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableHead>
                  <TableHead className="w-[25%]">
                    <div className="flex items-center gap-1">
                      Role Name <ChevronDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[15%]">Function</TableHead>
                  <TableHead className="w-[10%] text-center">Skill Count</TableHead>
                  <TableHead className="w-[15%] text-center">People with the Job</TableHead>
                  <TableHead className="w-[20%] text-center">People that match the Job</TableHead>
                  <TableHead className="w-[10%] text-right">Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell className="text-blue-500 hover:underline cursor-pointer">AI Engineer</TableCell>
                  <TableCell>Engineering</TableCell>
                  <TableCell className="text-center">16</TableCell>
                  <TableCell className="text-center">2</TableCell>
                  <TableCell className="text-center">0</TableCell>
                  <TableCell className="text-right">10/20/24</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell className="text-blue-500 hover:underline cursor-pointer">Backend Engineer</TableCell>
                  <TableCell>Engineering</TableCell>
                  <TableCell className="text-center">12</TableCell>
                  <TableCell className="text-center">3</TableCell>
                  <TableCell className="text-center">4</TableCell>
                  <TableCell className="text-right">10/20/24</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell className="text-blue-500 hover:underline cursor-pointer">Frontend Engineer</TableCell>
                  <TableCell>Engineering</TableCell>
                  <TableCell className="text-center">17</TableCell>
                  <TableCell className="text-center">0</TableCell>
                  <TableCell className="text-center">5</TableCell>
                  <TableCell className="text-right">10/20/24</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell className="text-blue-500 hover:underline cursor-pointer">Engineering Manager</TableCell>
                  <TableCell>Engineering</TableCell>
                  <TableCell className="text-center">11</TableCell>
                  <TableCell className="text-center">2</TableCell>
                  <TableCell className="text-center">5</TableCell>
                  <TableCell className="text-right">10/20/24</TableCell>
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
                <span className="text-sm text-gray-600">1-5 of 5</span>
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

export default SkillsProfile;