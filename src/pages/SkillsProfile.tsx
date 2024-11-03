import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Sidebar";
import { ChevronDown, ChevronLeft, ChevronRight, HelpCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const SkillsProfile = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Roles</h1>
            <div className="flex items-center gap-2">
              <Select defaultValue="0">
                <SelectTrigger className="w-[150px] bg-gray-100">
                  <SelectValue placeholder="0 Selected" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0 Selected</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    Export Data <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Export Role Data</DropdownMenuItem>
                  <DropdownMenuItem>Export Tags/Aliases</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button className="bg-[#4F46E5]">Add Role</Button>
            </div>
          </div>

          <div className="mb-6">
            <Input type="search" placeholder="Search Roles" className="max-w-full bg-white" />
          </div>

          <Card className="w-full">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="w-12 p-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="text-left p-4 font-medium">
                    <div className="flex items-center gap-2">
                      Role Name
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th className="text-left p-4 font-medium">Mapped Title</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">
                    <div className="flex items-center gap-1">
                      Confidence Score
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Confidence score indicates match accuracy</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </th>
                  <th className="text-left p-4 font-medium">Job Family</th>
                  <th className="text-left p-4 font-medium">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="p-4 text-blue-600">AI Engineer</td>
                  <td className="p-4">Artificial Intelligence Engineer</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded text-amber-800 bg-amber-100">Needs Approval</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded text-green-800 bg-green-100">High</span>
                  </td>
                  <td className="p-4">n/a</td>
                  <td className="p-4">10/20/24</td>
                </tr>
                {/* ... Additional rows would follow the same pattern */}
              </tbody>
            </table>
            <div className="flex justify-between items-center p-4 border-t">
              <Select defaultValue="10">
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
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
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