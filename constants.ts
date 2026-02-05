
import { Skill, Project, Experience, Education } from './types';

export const COLORS = {
  darkPurple: '#1e0b36', // Deep purple
  lavender: '#d8b4fe',   // Soft lavender
  accent: '#a855f7',     // Vibrant purple
  bg: '#0a0510',        // Near black background
};

export const PERSONAL_INFO = {
  name: 'Tersh B Kgaphola',
  email: 'tershbkgaphola@gmail.com',
  phone: '+27794814664',
  location: 'Pretoria, Gauteng',
  linkedin: 'https://www.linkedin.com/in/tersh-kgaphola-330b79159',
  github: 'https://github.com/TershK',
  title: 'AI Specialist & Software Engineer',
  brandingStatement: 'Expertise in Systems Automation, Data Analytics, and AI Safety. Pioneering transformative AI solutions within the South African landscape.',
  summary: 'Ambitious AI Specialist with a focus on Systems Automation and Data Analytics. Proven expertise in building end-to-end applications and leveraging AI prompt engineering to streamline development workflows. Deeply committed to AI Safety and Regulatory Compliance, as explored in my published insights on "Transformative AI in the South African Landscape". Technically proficient in modern automation tools and cloud-native logic, I bridge the gap between complex data insights and scalable system architecture.',
  careerObjectives: [
    { 
      title: 'AI & Automation', 
      desc: 'Apply prompt engineering expertise to build robust, scalable automated systems.' 
    },
    { 
      title: 'Data-Driven Solutions', 
      desc: 'Bridge data insights with architecture to create actionable business intelligence.' 
    },
    { 
      title: 'Ethical AI Leadership', 
      desc: 'Champion AI Safety and Regulatory Compliance within the South African technological landscape.' 
    }
  ]
};

export const SKILLS: Record<string, Skill[]> = {
  programming: [
    { name: 'JavaScript', percentage: 85 },
    { name: 'Python', percentage: 80 },
    { name: 'HTML', percentage: 90 },
    { name: 'CSS', percentage: 85 },
    { name: 'TypeScript', percentage: 75 },
  ],
  ai_automation: [
    { name: 'Prompt Engineering', percentage: 95 },
    { name: 'AI Systems Automation', percentage: 90 },
    { name: 'AI Safety & Compliance', percentage: 85 },
    { name: 'Data Analytics', percentage: 85 },
    { name: 'Cloud-Native Logic', percentage: 75 },
  ],
  tools: [
    { name: 'Software Development', percentage: 85 },
    { name: 'End-to-End Applications', percentage: 80 },
    { name: 'Modern Automation Tools', percentage: 85 },
    { name: 'Jupyter (Databases)', percentage: 70 },
  ],
  soft: [
    { name: 'Leadership', percentage: 95 },
    { name: 'Stakeholder Management', percentage: 85 },
    { name: 'Business Liaison', percentage: 90 },
    { name: 'Conflict Resolution', percentage: 85 },
  ]
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Archvision: Homebuilder',
    description: 'An advanced platform leveraging AI and computer vision to analyze architectural landscapes, providing insights into urban development and heritage preservation in South African cities.',
    tags: ['AI Safety', 'Computer Vision', 'React', 'Urban Tech'],
    imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800',
    generationPrompt: "A high-fidelity 3D stylized illustration of a futuristic, sun-drenched dream house with glass walls, floating balconies, and lush vertical gardens. Cinematic lighting, architectural masterpiece, hyper-realistic textures, vibrant sky, purple and lavender highlights.",
    demoUrl: '',
    repoUrl: 'https://archvision-roan.vercel.app/',
    documentation: 'A comprehensive technical framework utilizing computer vision models to catalog architectural styles and predict urban growth patterns while ensuring data integrity and safety compliance.'
  },
  {
    id: '2',
    title: 'Talu Future Assist',
    description: 'A stakeholder management dashboard using natural language processing to automate communication logs, sentiment tracking, and conflict resolution scheduling.',
    tags: ['Automation', 'TypeScript', 'React', 'Business Intelligence'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    generationPrompt: "A high-fidelity 3D stylized illustration of a diverse group of joyful graduates in caps and gowns, throwing their caps into the air. Golden hour lighting, digital data particles floating around, celebratory atmosphere, professional 3D finish, purple and lavender accents.",
    demoUrl: 'https://drive.google.com/file/d/1FwsvA49uiAppn-BZDWvmZqdYLRR-oMEn/view',
    repoUrl: 'https://arena-berry-21220384.figma.site/',
    documentation: 'Technical blueprint for reducing project oversight overhead by 40% through intelligent automation.'
  },
  {
    id: '3',
    title: 'SentimentIQ',
    description: 'A visualization suite designed to analyze socio-economic trends within the South African landscape using custom-trained data models.',
    tags: ['Data Analytics', 'Python', 'Jupyter', 'Visualization'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800',
    generationPrompt: "A high-fidelity 3D stylized illustration of a cloud of floating emojis with various vibrant emotive expressions—happy, surprised, thinking, curious. Glowing neon outlines, digital social media aesthetic, cinematic depth of field, purple and indigo background.",
    demoUrl: 'https://capeitinitiative-my.sharepoint.com/:v:/g/personal/lebogang_molepo_capaciti_org_za/IQCeFBNN4FbLSo0nkC8yq30AAQVfvq4cVNSblpJW6rbbFd8?e=ja8L6L&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D',
    repoUrl: 'https://word-whisperer-dash.vercel.app/',
    documentation: 'Full dataset lifecycle documentation, from raw collection to cloud-native visualization.'
  }
];

export const EXPERIENCE: Experience[] = [
  {
    role: 'AI Prompt Engineer and Software Developer',
    company: 'Capaciti',
    period: 'October 2025 - Present',
    description: [
      'Researched emerging AI tools, frameworks, and best practices to support team innovation.',
      'Maintained clear documentation for prompts, code changes, and development processes.',
      'Assisted in designing and refining AI prompts to improve accuracy, relevance, and usability of AI-driven solutions.',
      'Collaborated with cross-functional teams to understand user requirements and translate them into prompt and system logic.',
      'Conducted prompt testing and performance evaluations, documenting results and suggested improvements.'
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    degree: 'Higher Certificate in Business Management',
    institution: 'University of Johannesburg • Johannesburg, Gauteng',
    gpa: '4.0',
    period: 'Feb 2023 - Oct 2024'
  },
  {
    degree: 'Certificate in Transformative AI',
    institution: 'AI Safety and Governance South Africa',
    gpa: '4.0',
    period: 'April 2024 - November 2024'
  },
  {
    degree: 'Certificate in AI Bootcamp',
    institution: 'Coursera + Capaciti',
    gpa: '4.0',
    period: 'November 2025 - February 2026'
  }
];
