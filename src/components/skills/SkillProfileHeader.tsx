import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { roleSkills } from './data/roleSkills';

interface SkillProfileHeaderProps {
  jobTitle: string;
}

export const SkillProfileHeader = ({ jobTitle = "AI Engineer" }: SkillProfileHeaderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { id } = useParams<{ id: string }>();
  const currentRole = roleSkills[id as keyof typeof roleSkills];
  const occupation = currentRole ? `${currentRole.title} Specialist` : jobTitle;
  const soc = currentRole?.soc || "(11-9041)";

  const roleDescriptions: { [key: string]: string } = {
    "AI Engineer": "ERPRISING is at the forefront of digital reinvention, helping clients reimagine how they serve their connected customers and operate enterprises. We're looking for an experienced artificial intelligence engineer to join the revolution, using deep learning, neuro-linguistic programming (NLP), computer vision, chatbots, and robotics to help us improve various business outcomes and drive innovation.",
    "Backend Engineer": "We are seeking a skilled Backend Engineer to design and implement scalable server-side solutions. You will work with various databases, APIs, and server architectures to support our growing platform.",
    "Frontend Engineer": "Join our team as a Frontend Engineer to create responsive and intuitive user interfaces. You will collaborate with designers and backend engineers to deliver seamless web applications.",
    "Engineering Manager": "We're looking for an Engineering Manager to lead and mentor our technical teams. You will drive technical decisions, manage project deliverables, and foster a culture of innovation and growth.",
    "DevOps Engineer": "We are looking for a DevOps Engineer to help us build and maintain our cloud infrastructure. You will work with our engineering teams to implement CI/CD pipelines and ensure system reliability."
  };

  const fullDescription = roleDescriptions[jobTitle] || roleDescriptions["AI Engineer"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-foreground">{jobTitle}</h1>
            <span className="text-sm text-muted-foreground bg-background px-2 py-1 rounded-md border border-border">ID: {id}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="bg-white hover:bg-background">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-white hover:border-white transition-colors">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Function</span>
            <p className="font-medium">Engineering</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-white hover:border-white transition-colors">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">SOC</span>
            <p className="font-medium">{soc}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-white hover:border-white transition-colors">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Mapped Title</span>
            <p className="font-medium">{occupation}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-white hover:border-white transition-colors">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Occupation</span>
            <p className="font-medium">{currentRole?.title || jobTitle}</p>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-1">
        <span className="text-sm text-muted-foreground font-medium">Job Description</span>
        <div className="space-y-2">
          <p className={`text-sm text-foreground/80 transition-all duration-300 ${isExpanded ? '' : 'line-clamp-2'}`}>
            {fullDescription}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-primary-accent hover:text-primary-accent/80 transition-colors"
          >
            {isExpanded ? 'See less' : 'See more'}
          </button>
        </div>
      </div>
    </div>
  );
};