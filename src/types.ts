export interface TechSkill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'languages' | 'tools';
  level: string;
  experienceYears: string;
  icon: string;
  logoUrl?: string;
  color: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  image: string;
  screenshots?: string[];
  year: string;
  role: string;
  technologies: string[];
  metrics: string;
  githubUrl?: string;
  liveUrl?: string;
  downloadUrl?: string;
  caseStudy: {
    overview: string;
    architecture: string;
    keyFeatures: string[];
    results: string[];
  };
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  institution: string;
  location: string;
  description: string;
  skillsAcquired: string[];
  status: string;
}

export interface SoftSkill {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface LanguageItem {
  name: string;
  level: string;
  proficiency: number;
  flag: string;
  badge: string;
}
