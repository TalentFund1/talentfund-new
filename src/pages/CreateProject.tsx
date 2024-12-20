import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CreateProject = () => {
  const [formData, setFormData] = useState({
    description: "",
    selectedRoles: [] as string[],
    roleSkills: {} as Record<string, string[]>
  });

  const [searchQuery, setSearchQuery] = useState("");
  
  console.log('Current form state:', formData);

  const matchingRoles = [
    "Project Manager",
    "UX/UI Designer",
    "Engineering Manager"
  ];

  const matchingSkills = [
    "Swift",
    "SwiftUI",
    "Objective-C",
    "MVC"
  ];

  const handleRemoveRole = (role: string) => {
    setFormData(prev => ({
      ...prev,
      selectedRoles: prev.selectedRoles.filter(r => r !== role)
    }));
  };

  const handleAddRole = (role: string) => {
    if (!formData.selectedRoles.includes(role)) {
      setFormData(prev => ({
        ...prev,
        selectedRoles: [...prev.selectedRoles, role]
      }));
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-foreground">Create a Project</h1>
            <Button variant="outline">Save Project</Button>
          </div>

          <Card className="p-6 space-y-8">
            {/* Project Description Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium">1. Describe what you're looking for in a sentence or two.</h2>
              <textarea 
                className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter project description..."
              />
            </div>

            <Separator />

            {/* Project Roles Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium">2. Add Project Roles</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="pl-10"
                  placeholder="Search roles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {formData.selectedRoles.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Selected Roles</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.selectedRoles.map((role) => (
                      <Badge 
                        key={role}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {role}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => handleRemoveRole(role)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Matching Roles</h3>
                <div className="flex flex-wrap gap-2">
                  {matchingRoles.map((role) => (
                    <Badge 
                      key={role}
                      variant="outline"
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => handleAddRole(role)}
                    >
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

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
                      <div className="flex flex-wrap gap-2">
                        {matchingSkills.map((skill) => (
                          <Badge 
                            key={skill}
                            variant="outline"
                            className="cursor-pointer hover:bg-accent"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                roleSkills: {
                                  ...prev.roleSkills,
                                  [role]: [...(prev.roleSkills[role] || []), skill]
                                }
                              }));
                            }}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Separator />

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
                      <TableRow>
                        <TableCell>
                          <input type="checkbox" className="rounded border-gray-300" />
                        </TableCell>
                        <TableCell>Jennie Richards</TableCell>
                        <TableCell>Backend Engineer: P4</TableCell>
                        <TableCell>Engineering</TableCell>
                        <TableCell>0/1</TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                          <Badge variant="outline">Objective-C</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
            )}

            <Separator />

            {/* L&D Recommendations Section - Only shown if matches are reviewed */}
            {Object.keys(formData.roleSkills).length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium">5. L&D Recommendations</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Timeline with Learning Resources:</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">1. Basic Proficiency (1-2 weeks):</h4>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Focus: Learn Swift syntax (e.g., optionals, type inference) and basic features like structs, enums, and error handling</li>
                          <li>
                            Recommendations:
                            <ul className="list-disc pl-6">
                              <li>Apple's Swift Playground: Hands-on, interactive learning for Swift syntax.</li>
                              <li>Swift.org Documentation: Comprehensive guide to Swift basics.</li>
                              <li>Book: Swift Programming: The Big Nerd Ranch Guide (ideal for quick immersion).</li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;