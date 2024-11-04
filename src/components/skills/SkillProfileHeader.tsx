import { Button } from "@/components/ui/button";
import { Briefcase, Building2, DollarSign, FileText } from "lucide-react";

export const SkillProfileHeader = () => {
  return (
    <div className="flex justify-between items-start">
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">AI Engineer</h1>
            <span className="text-sm text-muted-foreground bg-background px-2 py-1 rounded">ID: 123</span>
          </div>
          <h2 className="text-lg font-medium text-foreground/90">Artificial Engineer</h2>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="text-sm text-muted-foreground">Function</span>
                <p className="font-medium">Engineering</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="text-sm text-muted-foreground">Mapped Title</span>
                <p className="font-medium">Software Developer</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="text-sm text-muted-foreground">Salary Range</span>
                <p className="font-medium">$130-170K</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl flex gap-2">
          <FileText className="h-4 w-4 text-muted-foreground mt-1.5" />
          <div>
            <span className="text-sm text-muted-foreground">Job Description</span>
            <p className="mt-1 text-sm text-foreground/90">
              ERPRISING is at the forefront of digital reinvention, helping clients reimagine how they serve their connected customers and operate enterprises. 
              We're looking for an experienced artificial intelligence engineer to join the revolution, using deep learning, neuro-linguistic programming (NLP), 
              computer vision, chatbots, and robotics to help us improve various business outcomes and drive innovation.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline">Export</Button>
        <Button>Edit</Button>
      </div>
    </div>
  );
};