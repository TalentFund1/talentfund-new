import { Button } from "@/components/ui/button";
import { Building2, DollarSign } from "lucide-react";
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

interface JobTitle {
  title: string;
  mappedTitle: string;
  soc: string;
}

const jobTitles: { [key: string]: JobTitle } = {
  "123": { title: "AI Engineer", mappedTitle: "Machine Learning Engineer", soc: "15-2051" },
  "124": { title: "Backend Engineer", mappedTitle: "Server-Side Developer", soc: "15-1252" },
  "125": { title: "Frontend Engineer", mappedTitle: "UI Developer", soc: "15-1254" },
  "126": { title: "Engineering Manager", mappedTitle: "Technical Project Lead", soc: "11-9041" },
  "127": { title: "DevOps Engineer", mappedTitle: "Infrastructure Engineer", soc: "15-1251" }
};

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

  const roleDescriptions = {
    "AI Engineer": "ERPRISING is at the forefront of digital reinvention, helping clients reimagine how they serve their connected customers and operate enterprises. We're looking for an experienced artificial intelligence engineer to join the revolution, using deep learning, neuro-linguistic programming (NLP), computer vision, chatbots, and robotics to help us improve various business outcomes and drive innovation.",
    "Backend Engineer": "We are seeking a skilled Backend Engineer to design and implement scalable server-side solutions. You will work with various databases, APIs, and server architectures to support our growing platform.",
    "Frontend Engineer": "Join our team as a Frontend Engineer to create responsive and intuitive user interfaces. You will collaborate with designers and backend engineers to deliver seamless web applications.",
    "Engineering Manager": "We're looking for an Engineering Manager to lead and mentor our technical teams. You will drive technical decisions, manage project deliverables, and foster a culture of innovation and growth."
  };

  const fullDescription = roleDescriptions[jobTitle as keyof typeof roleDescriptions] || roleDescriptions["AI Engineer"];
  const averagePrice = calculateAveragePrice();
  const currentRole = roleSkills[currentRoleId as keyof typeof roleSkills];
  const occupation = currentRole?.occupation || "Not specified";
  const mappedTitle = jobTitles[currentRoleId]?.mappedTitle || jobTitle;
  const socCode = jobTitles[currentRoleId]?.soc || "";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-foreground">{formatTitle(jobTitle)}</h1>
            <span className="text-sm text-muted-foreground bg-background px-2 py-1 rounded">ID: {currentRoleId}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="bg-white">Export</Button>
          <Button className="bg-[#1F2144]">Edit</Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8">
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Function</span>
            <p className="font-medium">Engineering</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Mapped Title</span>
            <div className="flex items-center gap-2">
              <p className="font-medium">{mappedTitle}</p>
              <span className="text-sm text-muted-foreground">({socCode})</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Occupation</span>
            <p className="font-medium">{occupation}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Market Pricer</span>
            <p className="font-medium">${averagePrice.toLocaleString()}</p>
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

export const SkillProfileHeader = (props: SkillProfileHeaderProps) => {
  return (
    <ToggledSkillsProvider>
      <SkillProfileHeaderContent {...props} />
    </ToggledSkillsProvider>
  );
};