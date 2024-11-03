import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { Table } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SkillsProfile = () => {
  return (
    <div className="flex-1 p-6 ml-16 transition-all duration-300">
      <div className="max-w-7xl mx-auto space-y-6 bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground">Skill Profiles</h1>
          <div className="space-x-2">
            <Button variant="outline">Export Data</Button>
            <Button>Add Profile</Button>
          </div>
        </div>

        <div className="space-y-4">
          <label htmlFor="search" className="block text-sm font-medium text-foreground">
            Skills
          </label>
          <Input id="search" type="search" placeholder="Search..." className="max-w-sm" />
          
          <div className="flex flex-wrap gap-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Job Title" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engineer">Engineer</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Function" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="design">Design</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">Clear All</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total number of Profiles"
            value="56"
          />
          <StatCard
            title="Open Roles"
            value="5"
          />
          <StatCard
            title="Share of Female Employees"
            value="50%"
          />
          <StatCard
            title="Average Tenure (Years)"
            value="1.09"
          />
        </div>

        <Card className="p-6">
          <Table>
            <thead>
              <tr>
                <th className="w-12">
                  <input type="checkbox" />
                </th>
                <th>Role Name</th>
                <th>Function</th>
                <th>Skill Count</th>
                <th>People with the Job</th>
                <th>People that match the Job</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox" /></td>
                <td>AI Engineer</td>
                <td>Engineering</td>
                <td>16</td>
                <td>2</td>
                <td>0</td>
                <td>10/20/24</td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>Backend Engineer</td>
                <td>Engineering</td>
                <td>12</td>
                <td>3</td>
                <td>4</td>
                <td>10/20/24</td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>Frontend Engineer</td>
                <td>Engineering</td>
                <td>17</td>
                <td>0</td>
                <td>5</td>
                <td>10/20/24</td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>Engineering Manager</td>
                <td>Engineering</td>
                <td>11</td>
                <td>2</td>
                <td>5</td>
                <td>10/20/24</td>
              </tr>
            </tbody>
          </Table>
          <div className="flex justify-between items-center mt-4">
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
            <div>1-4 of 4</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SkillsProfile;
