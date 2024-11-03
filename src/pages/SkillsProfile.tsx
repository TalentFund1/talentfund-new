import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { Table } from "@/components/ui/table";

const SkillsProfile = () => {
  return (
    <div className="flex-1 p-6 ml-16 transition-all duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground">Skill Profiles</h1>
          <div className="space-x-2">
            <Button variant="outline">Export Data</Button>
            <Button>Add Profile</Button>
          </div>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <Input type="search" placeholder="Search..." className="max-w-sm" />
            
            <div className="flex flex-wrap gap-4">
              <Select>
                <option value="">Job Title</option>
                <option value="engineer">Engineer</option>
                <option value="manager">Manager</option>
              </Select>
              
              <Select>
                <option value="">Level</option>
                <option value="junior">Junior</option>
                <option value="senior">Senior</option>
              </Select>
              
              <Select>
                <option value="">Function</option>
                <option value="engineering">Engineering</option>
                <option value="design">Design</option>
              </Select>

              <Button variant="outline">Clear All</Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <Select className="w-24">
              <option value="10">Rows 10</option>
              <option value="20">Rows 20</option>
              <option value="50">Rows 50</option>
            </Select>
            <div>1-4 of 4</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SkillsProfile;