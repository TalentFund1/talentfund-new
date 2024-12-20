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
    roleSkills: {} as Record<string, string[]>,
    selectedEmployees: [] as string[]
  });

  const [searchQuery, setSearchQuery] = useState("");
  
  console.log('Current form state:', formData);

  const handleAddRole = (role: string) => {
    if (!formData.selectedRoles.includes(role)) {
      setFormData(prev => ({
        ...prev,
        selectedRoles: [...prev.selectedRoles, role],
        roleSkills: {
          ...prev.roleSkills,
          [role]: []
        }
      }));
    }
  };

  const handleRemoveRole = (role: string) => {
    setFormData(prev => {
      const { [role]: removedSkills, ...remainingSkills } = prev.roleSkills;
      return {
        ...prev,
        selectedRoles: prev.selectedRoles.filter(r => r !== role),
        roleSkills: remainingSkills
      };
    });
  };

  const handleEmployeeSelect = (employeeName: string) => {
    setFormData(prev => ({
      ...prev,
      selectedEmployees: prev.selectedEmployees.includes(employeeName)
        ? prev.selectedEmployees.filter(name => name !== employeeName)
        : [...prev.selectedEmployees, employeeName]
    }));
  };

  const mockLearningPlan = {
    timeline: [
      {
        level: "Basic Proficiency",
        duration: "1-2 weeks",
        focus: "Learn Swift syntax (e.g., optionals, type inference) and basic features like structs, enums, and error handling",
        recommendations: [
          {
            title: "Apple's Swift Playground",
            description: "Hands-on, interactive learning for Swift syntax."
          },
          {
            title: "Swift.org Documentation",
            description: "Comprehensive guide to Swift basics."
          },
          {
            title: "Book: Swift Programming: The Big Nerd Ranch Guide",
            description: "(ideal for quick immersion)"
          }
        ]
      },
      {
        level: "Intermediate Proficiency",
        duration: "3-4 weeks",
        focus: "Understand Swift paradigms like protocol-oriented programming, closures, and generics. Learn SwiftUI and Combine for modern development.",
        recommendations: [
          {
            title: "Hacking with Swift (HWS)",
            description: "Detailed tutorials covering SwiftUI and advanced Swift topics."
          },
          {
            title: "Raywenderlich.com",
            description: "Tutorials on Swift-specific frameworks like SwiftUI and Combine."
          }
        ]
      },
      {
        level: "Advanced Proficiency",
        duration: "1-3 months",
        focus: "Write idiomatic Swift code, refactor Objective-C projects to Swift, and master advanced features like result builders and memory management.",
        recommendations: [
          {
            title: "Swift by Sundell Blog & Podcast",
            description: "Focuses on advanced Swift patterns and techniques."
          },
          {
            title: "Advanced Swift (Book by objc.io)",
            description: "Deep dive into advanced Swift features and best practices."
          }
        ]
      }
    ],
    keyRecommendations: [
      {
        title: "Hands-On Practice",
        description: "Encourage small projects or converting parts of an Objective-C codebase into Swift to reinforce learning."
      },
      {
        title: "Mixed Project Work",
        description: "Use bridging headers to integrate Swift into existing Objective-C projects gradually."
      },
      {
        title: "Mentorship",
        description: "Pair programming with a more experienced Swift developer, if available."
      }
    ],
    outcome: "With these resources and a structured learning approach, your employee can become proficient in Swift for daily tasks within 1 month and master it for advanced projects within 3 months."
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <ProjectHeader />
          
          <Card className="p-6 space-y-8 border-border shadow-sm hover:shadow-md transition-shadow">
            <DescriptionSection 
              description={formData.description}
              onDescriptionChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
            />

            <Separator className="my-6" />

            <RolesSection 
              searchTerm={searchQuery}
              setSearchTerm={setSearchQuery}
              selectedRoles={formData.selectedRoles}
              onRoleAdd={handleAddRole}
              onRoleRemove={handleRemoveRole}
            />

            {formData.selectedRoles.length > 0 && (
              <>
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <h2 className="text-lg font-medium text-primary">3. Add Project Skills for each Role</h2>
                  <p className="text-sm text-primary/60">Define the required skills for each role in your project.</p>
                  
                  {formData.selectedRoles.map((role) => (
                    <div key={role} className="space-y-4 p-4 rounded-lg border border-border bg-background/40">
                      <h3 className="text-md font-medium text-primary">{role}</h3>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {(formData.roleSkills[role] || []).map((skill) => (
                            <Badge 
                              key={skill}
                              variant="secondary"
                              className="bg-primary-accent/10 text-primary border-primary-accent/20 hover:bg-primary-accent/15 flex items-center gap-1"
                            >
                              {skill}
                              <X 
                                className="h-3 w-3 cursor-pointer hover:text-primary-accent"
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
              </>
            )}

            {Object.keys(formData.roleSkills).length > 0 && (
              <>
                <Separator className="my-6" />
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-medium text-primary">4. Review your Matches</h2>
                      <p className="text-sm text-primary/60">Find the perfect team members for your project.</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="border-primary-accent text-primary-accent hover:bg-primary-accent/10"
                      >
                        Generate L&D Plan
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-primary-accent text-primary-accent hover:bg-primary-accent/10"
                      >
                        Search Talent Pool
                      </Button>
                    </div>
                  </div>

                  <ScrollArea className="h-[300px] rounded-lg border border-border">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-background/40">
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
                        <TableRow className="hover:bg-muted/50">
                          <TableCell>
                            <input 
                              type="checkbox" 
                              checked={formData.selectedEmployees.includes('Victor Smith')}
                              onChange={() => handleEmployeeSelect('Victor Smith')}
                              className="rounded border-gray-300"
                            />
                          </TableCell>
                          <TableCell className="font-medium">Victor Smith</TableCell>
                          <TableCell>AI Engineer: P4</TableCell>
                          <TableCell>Engineering</TableCell>
                          <TableCell>1/1</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-primary-accent/10 text-primary border-primary-accent/20">
                              Swift
                            </Badge>
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>

                <Separator className="my-6" />

                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-medium text-primary">5. L&D Recommendations</h2>
                    <p className="text-sm text-primary/60">Learning and development plan for skill transition.</p>
                  </div>

                  <div className="space-y-6 p-6 rounded-lg border border-border bg-background/40">
                    <h3 className="font-medium text-primary">Timeline with Learning Resources:</h3>
                    
                    {mockLearningPlan.timeline.map((phase, index) => (
                      <div key={index} className="space-y-4">
                        <h4 className="font-medium text-primary">
                          {index + 1}. {phase.level} ({phase.duration}):
                        </h4>
                        <div className="ml-4 space-y-2">
                          <p className="text-sm text-primary/80">
                            <span className="font-medium">Focus:</span> {phase.focus}
                          </p>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-primary/80">Recommendations:</p>
                            <ul className="ml-4 space-y-2">
                              {phase.recommendations.map((rec, recIndex) => (
                                <li key={recIndex} className="text-sm text-primary/70">
                                  • <span className="font-medium">{rec.title}:</span> {rec.description}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="space-y-4 mt-8">
                      <h3 className="font-medium text-primary">Key Recommendations for Transition:</h3>
                      <ul className="space-y-3">
                        {mockLearningPlan.keyRecommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-primary/70">
                            • <span className="font-medium">{rec.title}:</span> {rec.description}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 p-4 rounded-lg bg-primary-accent/5 border border-primary-accent/20">
                      <p className="text-sm text-primary/80">
                        <span className="font-medium">Outcome:</span> {mockLearningPlan.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;