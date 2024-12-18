import { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { useParams } from 'react-router-dom';
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { roleSkills } from './data/roleSkills';
import { SkillTypeFilters } from './filters/SkillTypeFilters';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { ChevronUp, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { getUnifiedSkillData } from './data/skillDatabaseService';

export const SkillProfileMatrix = () => {
  const [sortBy, setSortBy] = useState("benchmark");
  const [skillType, setSkillType] = useState("all");
  const [sortField, setSortField] = useState<'growth' | 'salary' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const { id } = useParams();
  const { toggledSkills, setToggledSkills } = useToggledSkills();

  console.log('Current toggled skills:', Array.from(toggledSkills));

  const getSkillsByType = () => {
    const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];
    
    // Get all toggled skills data
    const toggledSkillsData = Array.from(toggledSkills).map(skillTitle => 
      getUnifiedSkillData(skillTitle)
    );

    console.log('Filtered skills with type:', skillType);
    
    if (skillType === "all") {
      return toggledSkillsData;
    }
    
    return toggledSkillsData.filter(skill => {
      if (skillType === "specialized") {
        return skill.category === 'specialized';
      }
      if (skillType === "common") {
        return skill.category === 'common';
      }
      if (skillType === "certification") {
        return skill.category === 'certification';
      }
      return true;
    });
  };

  const handleSort = (field: 'growth' | 'salary') => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const renderSortArrow = (field: 'growth' | 'salary') => {
    if (sortField !== field) {
      return <ChevronUp className="h-4 w-4 text-muted-foreground opacity-50" />;
    }
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4 text-primary" />
    ) : (
      <ChevronUp className="h-4 w-4 text-primary rotate-180 transform" />
    );
  };

  const sortedSkills = getSkillsByType().sort((a, b) => {
    if (sortField === 'growth') {
      const aGrowth = parseFloat(a.growth);
      const bGrowth = parseFloat(b.growth);
      return sortDirection === 'asc' ? aGrowth - bGrowth : bGrowth - aGrowth;
    }
    if (sortField === 'salary') {
      const aSalary = parseFloat(a.salary.replace(/[^0-9.-]+/g, ""));
      const bSalary = parseFloat(b.salary.replace(/[^0-9.-]+/g, ""));
      return sortDirection === 'asc' ? aSalary - bSalary : bSalary - aSalary;
    }
    return 0;
  });

  return (
    <Card className="p-6 space-y-6">
      <SkillTypeFilters
        skillType={skillType}
        setSkillType={setSkillType}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-background text-left">
              <TableHead className="w-[30%]">Skill Title</TableHead>
              <TableHead className="w-[30%]">Subcategory</TableHead>
              <TableHead className="w-[20%]">
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium"
                  onClick={() => handleSort('growth')}
                >
                  Projected Growth
                  {renderSortArrow('growth')}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top" align="start" className="max-w-[300px] p-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-left">Projected Growth:</h4>
                          <p className="text-sm text-left font-normal">
                            Indicates the projected growth rate for this skill over the next year based on market demand and industry trends.
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Button>
              </TableHead>
              <TableHead className="w-[10%]">
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium"
                  onClick={() => handleSort('salary')}
                >
                  Skill Pricer
                  {renderSortArrow('salary')}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top" align="start" className="max-w-[300px] p-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-left">Skill Pricer:</h4>
                          <p className="text-sm text-left font-normal">
                            Reflects the Nationwide Median Advertised Salary for the past year based on the selected Job Title and the Skill.
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Button>
              </TableHead>
              <TableHead className="text-center whitespace-nowrap">
                Appears In <ChevronUp className="h-4 w-4 inline-block ml-1" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedSkills.map((skill) => (
              <TableRow 
                key={skill.title}
                className="border-t border-border hover:bg-muted/50 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={toggledSkills.has(skill.title)}
                      onCheckedChange={() => {
                        const newToggledSkills = new Set(toggledSkills);
                        if (newToggledSkills.has(skill.title)) {
                          newToggledSkills.delete(skill.title);
                        } else {
                          newToggledSkills.add(skill.title);
                        }
                        setToggledSkills(newToggledSkills);
                      }}
                      className="data-[state=checked]:bg-primary"
                    />
                    <span className="text-sm">{skill.title}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm block truncate" title={skill.subcategory}>
                    {skill.subcategory}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-sm`}>
                    ↗ {skill.growth}
                  </span>
                </TableCell>
                <TableCell className="text-sm">{skill.salary}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-1">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-medium">B</span>
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-800 flex items-center justify-center text-sm font-medium">R</span>
                    <span className="w-6 h-6 rounded-full bg-[#E5DEFF] text-[#6E59A5] flex items-center justify-center text-sm font-medium">M</span>
                    <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center text-sm font-medium">O</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};