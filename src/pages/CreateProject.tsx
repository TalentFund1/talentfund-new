import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Sidebar } from "@/components/Sidebar";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { DescriptionSection } from "@/components/project/sections/DescriptionSection";
import { RolesSection } from "@/components/project/sections/RolesSection";
import { SkillsSection } from "@/components/project/sections/SkillsSection";
import { MatchesSection } from "@/components/project/sections/MatchesSection";
import { LearningSection } from "@/components/project/sections/LearningSection";

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

  const handleAddSkill = (role: string, skill: string) => {
    setFormData(prev => ({
      ...prev,
      roleSkills: {
        ...prev.roleSkills,
        [role]: [...(prev.roleSkills[role] || []), skill]
      }
    }));
  };

  const handleRemoveSkill = (role: string, skill: string) => {
    setFormData(prev => ({
      ...prev,
      roleSkills: {
        ...prev.roleSkills,
        [role]: prev.roleSkills[role].filter(s => s !== skill)
      }
    }));
  };

  const handleEmployeeSelect = (employeeName: string) => {
    setFormData(prev => ({
      ...prev,
      selectedEmployees: prev.selectedEmployees.includes(employeeName)
        ? prev.selectedEmployees.filter(name => name !== employeeName)
        : [...prev.selectedEmployees, employeeName]
    }));
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-white border border-border">
            <div className="max-w-5xl mx-auto p-8">
              <ProjectHeader />
              
              <div className="mt-8 space-y-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-[#CCDBFF]"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-2 text-sm text-secondary-foreground bg-white">Step 1</span>
                  </div>
                </div>

                <DescriptionSection 
                  description={formData.description}
                  onDescriptionChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                />

                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-[#CCDBFF]"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-2 text-sm text-secondary-foreground bg-white">Step 2</span>
                  </div>
                </div>

                <RolesSection 
                  searchTerm={searchQuery}
                  setSearchTerm={setSearchQuery}
                  selectedRoles={formData.selectedRoles}
                  onRoleAdd={handleAddRole}
                  onRoleRemove={handleRemoveRole}
                />

                {formData.selectedRoles.map(role => (
                  <div key={role}>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-[#CCDBFF]"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-2 text-sm text-secondary-foreground bg-white">Step 3</span>
                      </div>
                    </div>

                    <SkillsSection
                      roleTitle={role}
                      selectedSkills={formData.roleSkills[role] || []}
                      onSkillAdd={(skill) => handleAddSkill(role, skill)}
                      onSkillRemove={(skill) => handleRemoveSkill(role, skill)}
                    />
                  </div>
                ))}

                {formData.selectedRoles.length > 0 && (
                  <>
                    <MatchesSection 
                      selectedEmployees={formData.selectedEmployees}
                      onEmployeeSelect={handleEmployeeSelect}
                    />
                    
                    <LearningSection learningPlan={mockLearningPlan} />
                  </>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
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

export default CreateProject;