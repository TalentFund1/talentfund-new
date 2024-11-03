import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { SkillsTable } from "@/components/SkillsTable";
import { Badge } from "@/components/ui/badge";

const EmployeeProfile = () => {
  return (
    <div className="flex-1 p-6 ml-16 transition-all duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <Button variant="outline" className="flex items-center gap-2 bg-white border-border hover:bg-background">
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>
          <div className="flex items-center gap-2 bg-white rounded-lg border border-border px-3 py-1.5">
            <ChevronLeft className="h-4 w-4 text-foreground cursor-pointer hover:text-primary-accent" />
            <span className="text-sm text-foreground">2/7</span>
            <ChevronRight className="h-4 w-4 text-foreground cursor-pointer hover:text-primary-accent" />
          </div>
        </div>

        <Card className="p-6 bg-white">
          <div className="flex items-start justify-between">
            <div className="flex gap-6">
              <Avatar className="h-24 w-24">
                <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=96&h=96" alt="Kate Smith" />
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">Kate Smith</h1>
                  <span className="text-sm text-muted-foreground">Employee ID: 123</span>
                </div>
                <h2 className="text-lg">Senior Frontend Engineer: P4</h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Toronto, ON</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-white">Export</Button>
              <Button>Edit</Button>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-4 gap-8">
            <div>
              <span className="text-sm text-muted-foreground">Department</span>
              <p className="font-medium">Engineering</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Office</span>
              <p className="font-medium">Toronto</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Category</span>
              <p className="font-medium">Full-time</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Start Date</span>
              <p className="font-medium">2024-01-01</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Term Date</span>
              <p className="font-medium">-</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Tenure (Years)</span>
              <p className="font-medium">1.9</p>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="experience" className="w-full">
          <TabsList className="w-full flex h-12 items-center justify-start space-x-8 border-b bg-transparent p-0">
            <TabsTrigger 
              value="experience" 
              className="border-b-2 border-transparent px-0 pb-4 pt-2 data-[state=active]:border-[#8073ec] data-[state=active]:text-primary font-medium"
            >
              Experience
            </TabsTrigger>
            <TabsTrigger 
              value="benchmark"
              className="border-b-2 border-transparent px-0 pb-4 pt-2 data-[state=active]:border-[#8073ec] data-[state=active]:text-primary font-medium"
            >
              Role Benchmark
            </TabsTrigger>
          </TabsList>

          <TabsContent value="experience" className="space-y-6">
            <Card className="p-6 bg-white">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span>Search Skills</span>
                  <Button variant="outline" size="sm" className="bg-white">Clear</Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="gap-2">
                    Python x
                  </Badge>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold">Experience</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Specialized Skills 66</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {["React", "JavaScript", "Git", "GraphQL", "HTML and CSS3"].map((skill) => (
                          <Badge key={skill} variant="outline" className="gap-2">
                            {skill} <span className="h-2 w-2 rounded-full bg-primary-accent" />
                          </Badge>
                        ))}
                        <Button variant="link" size="sm">See More 12</Button>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Common Skills 14</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {["UI/UX Design Principles", "Communication", "Microsoft Excel"].map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Certifications 1</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Cybersecurity License</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <SkillsTable />
          </TabsContent>

          <TabsContent value="benchmark">
            <Card className="p-6 bg-white">
              <p>Role Benchmark content here</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployeeProfile;