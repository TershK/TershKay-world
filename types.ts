
export interface Skill {
  name: string;
  percentage: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  generationPrompt?: string; // New field for AI generation
  demoUrl: string;
  repoUrl: string;
  documentation: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Education {
  degree: string;
  institution: string;
  gpa: string;
  period: string;
}
