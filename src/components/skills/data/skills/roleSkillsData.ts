import { skills } from './baseSkills';
import type { RoleSkills } from './roleSkillsTypes';

export const roleSkills: Record<string, RoleSkills> = {
  "123": {
    specialized: skills.slice(0, 5).map(skill => ({
      ...skill,
      salary: "$120,000",
      benchmarks: { J: true, B: true, O: true }
    })),
    common: skills.slice(5, 10).map(skill => ({
      ...skill,
      salary: "$110,000",
      benchmarks: { J: true, B: false, O: true }
    })),
    certifications: skills.slice(10, 15).map(skill => ({
      ...skill,
      salary: "$130,000",
      benchmarks: { J: false, B: true, O: true }
    }))
  },
  "124": {
    specialized: skills.slice(3, 8).map(skill => ({
      ...skill,
      salary: "$125,000",
      benchmarks: { J: true, B: true, O: false }
    })),
    common: skills.slice(8, 13).map(skill => ({
      ...skill,
      salary: "$115,000",
      benchmarks: { J: true, B: false, O: true }
    })),
    certifications: skills.slice(13, 18).map(skill => ({
      ...skill,
      salary: "$135,000",
      benchmarks: { J: true, B: true, O: true }
    }))
  }
};