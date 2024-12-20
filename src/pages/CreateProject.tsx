import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Sidebar";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { DescriptionSection } from "@/components/project/sections/DescriptionSection";
import { RolesSection } from "@/components/project/sections/RolesSection";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const CreateProject = () => {
  const [formData, setFormData] = useState({
    description: "",
    selectedRoles: [] as string[],
    roleSkills: {} as Record<string, string[]>
  });

  const [searchQuery, setSearchQuery] = useState("");
  
  console.log('Current form state:', formData);

  const handleAddRole = (role: string) => {
    if (!formData.selectedRoles.includes(role)) {
      setFormData(prev => ({
        ...prev,
        selectedRoles: [...prev.selectedRoles, role]
      }));
    }
  };

  const handleRemoveRole = (role: string) => {
    setFormData(prev => ({
      ...prev,
      selectedRoles: prev.selectedRoles.filter(r => r !== role)
    }));
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16">
        <div className="max-w-4xl mx-auto">
          <ProjectHeader />
          
          <Card className="p-6 space-y-6 border-border shadow-sm hover:shadow-md transition-shadow">
            <DescriptionSection 
              description={formData.description}
              onDescriptionChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
            />

            <RolesSection 
              searchTerm={searchQuery}
              setSearchTerm={setSearchQuery}
              selectedRoles={formData.selectedRoles}
              onRoleAdd={handleAddRole}
              onRoleRemove={handleRemoveRole}
            />

            {/* Skills Section - Only shown if roles are selected */}
            {formData.selectedRoles.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium">3. Add Project Skills for each Role</h2>
                {formData.selectedRoles.map((role) => (
                  <div key={role} className="space-y-4">
                    <h3 className="text-md font-medium">{role}</h3>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {(formData.roleSkills[role] || []).map((skill) => (
                          <Badge 
                            key={skill}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {skill}
                            <X 
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  roleSkills: {
                                    ...prev.roleSkills,
                                    [role]: prev.roleSkills[role].filter(s => s !== skill)
                                  }
                                }));
                              }}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Matches Section - Only shown if skills are selected */}
            {Object.keys(formData.roleSkills).length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium">4. Review your Matches</h2>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Generate L&D Plan</Button>
                  <Button variant="outline">Search Talent Pool</Button>
                </div>
                <ScrollArea className="h-[300px] rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[30px]"></TableHead>
                        <TableHead>Employee Name</TableHead>
                        <TableHead>Current Role</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Skill Count</TableHead>
                        <TableHead>Skill Match</TableHead>
                        <TableHead>Adjacent Skills</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <input type="checkbox" className="rounded border-gray-300" />
                        </TableCell>
                        <TableCell>Victor Smith</TableCell>
                        <TableCell>AI Engineer: P4</TableCell>
                        <TableCell>Engineering</TableCell>
                        <TableCell>1/1</TableCell>
                        <TableCell>
                          <Badge variant="outline">Swift</Badge>
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;