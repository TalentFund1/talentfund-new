import { Button } from "@/components/ui/button";
import { Building2, DollarSign } from "lucide-react";

export const SkillProfileHeader = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-foreground">AI Engineer</h1>
            <span className="text-sm text-muted-foreground bg-background px-2 py-1 rounded">ID: 123</span>
          </div>
          <h2 className="text-lg text-foreground/80">Artificial Engineer</h2>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="bg-white">Export</Button>
          <Button className="bg-[#1F2144]">Edit</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Function</span>
            <p className="font-medium">Engineering</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Mapped Title</span>
            <p className="font-medium">Software Developer</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Salary Range</span>
            <p className="font-medium">$130-170K</p>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <span className="text-sm text-muted-foreground">Job Description</span>
        <p className="text-sm text-foreground/80">
          ERPRISING is at the forefront of digital reinvention, helping clients reimagine how they serve their connected customers and operate enterprises. We're looking for an experienced artificial intelligence engineer to join the revolution, using deep learning, neuro-linguistic programming (NLP), computer vision, chatbots, and robotics to help us improve various business outcomes and drive innovation.
        </p>
      </div>
    </div>
  );
};