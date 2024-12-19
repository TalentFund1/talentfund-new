import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { roleSkills } from './data/roleSkills';
import { useParams } from 'react-router-dom';
import { getCategoryForSkill } from './utils/skillCountUtils';
import { ToggledSkillsProvider } from "./context/ToggledSkillsContext";

interface SkillProfileHeaderProps {
  jobTitle: string;
}

const SkillProfileHeaderContent = ({ jobTitle = "AI Engineer" }: SkillProfileHeaderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toggledSkills } = useToggledSkills();
  const { id } = useParams<{ id: string }>();
  const currentRoleId = id || '';

  const formatTitle = (title: string) => {
    return title.split(' ').map(word => {
      if (word.toLowerCase() === 'ai') return 'AI';
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
  };

  const calculateAveragePrice = () => {
    const currentRoleSkills = roleSkills[currentRoleId as keyof typeof roleSkills];
    if (!currentRoleSkills) {
      console.warn('No skills found for role:', currentRoleId);
      return 0;
    }

    const allSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ];

    const toggledSkillsList = Array.from(toggledSkills);
    const toggledSkillsData = allSkills.filter(skill => 
      toggledSkillsList.includes(skill.title) && 
      getCategoryForSkill(skill, currentRoleId) === 'critical'
    );

    if (toggledSkillsData.length === 0) return 0;

    const totalPrice = toggledSkillsData.reduce((sum, skill) => {
      const price = parseFloat(skill.salary.replace(/[^0-9.-]+/g, ""));
      return sum + price;
    }, 0);

    return Math.round(totalPrice / toggledSkillsData.length);
  };

  const roleDescriptions: { [key: string]: string } = {
    "AI Engineer": "ERPRISING is at the forefront of digital reinvention, helping clients reimagine how they serve their connected customers and operate enterprises. We're looking for an experienced artificial intelligence engineer to join the revolution, using deep learning, neuro-linguistic programming (NLP), computer vision, chatbots, and robotics to help us improve various business outcomes and drive innovation.",
    "Backend Engineer": "We are seeking a skilled Backend Engineer to design and implement scalable server-side solutions. You will work with various databases, APIs, and server architectures to support our growing platform.",
    "Frontend Engineer": "Join our team as a Frontend Engineer to create responsive and intuitive user interfaces. You will collaborate with designers and backend engineers to deliver seamless web applications.",
    "Engineering Manager": "We're looking for an Engineering Manager to lead and mentor our technical teams. You will drive technical decisions, manage project deliverables, and foster a culture of innovation and growth.",
    "DevOps Engineer": "We are looking for a DevOps Engineer to help us build and maintain our cloud infrastructure. You will work with our engineering teams to implement CI/CD pipelines and ensure system reliability."
  };

  const fullDescription = roleDescriptions[jobTitle] || roleDescriptions["AI Engineer"];
  const averagePrice = calculateAveragePrice();
  const currentRole = roleSkills[currentRoleId as keyof typeof roleSkills];
  const occupation = currentRole?.title || "Not specified";
  const mappedTitle = currentRole ? `${currentRole.title} Specialist` : jobTitle;
  const soc = currentRole?.soc || "(11-9041)";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-foreground">{formatTitle(jobTitle)}</h1>
            <span className="text-sm text-muted-foreground bg-background px-2 py-1 rounded-md border border-border">ID: {currentRoleId}</span>
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

      <div className="grid grid-cols-5 gap-6">
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
            <p className="font-medium">{mappedTitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-white hover:border-white transition-colors">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Occupation</span>
            <p className="font-medium">{occupation}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col bg-[#F7F9FF] p-3 rounded-lg border-2 border-primary-accent/30 hover:border-primary-accent/50 transition-all duration-300 shadow-sm hover:shadow-md w-full">
            <span className="text-sm text-muted-foreground font-medium">Market Pricer</span>
            <p className="font-semibold text-lg text-primary-accent">${averagePrice.toLocaleString()}</p>
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

// Export the wrapped version directly
export const SkillProfileHeader = (props: SkillProfileHeaderProps) => {
  return (
    <ToggledSkillsProvider>
      <SkillProfileHeaderContent {...props} />
    </ToggledSkillsProvider>
  );
};
