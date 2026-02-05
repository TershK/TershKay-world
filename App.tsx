
import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Code, 
  Briefcase, 
  GraduationCap, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  Menu, 
  X, 
  ChevronRight,
  FileText,
  Download,
  Zap,
  Loader2,
  Phone,
  AlertCircle,
  FileDown,
  UserCheck,
  Layout
} from 'lucide-react';
import { PERSONAL_INFO, SKILLS, PROJECTS, EXPERIENCE, EDUCATION } from './constants';
import { GoogleGenAI } from "@google/genai";

// --- Utilities ---

/**
 * Utility to handle API calls with optional staggering and basic retry logic for 429s.
 */
const safeGenerateImage = async (prompt: string, aspectRatio: "1:1" | "16:9" | "4:3" | "3:4" | "9:16" = "1:1", delay: number = 0) => {
  if (delay > 0) {
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  const callApi = async () => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    return await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio
        }
      }
    });
  };

  try {
    return await callApi();
  } catch (error: any) {
    // If rate limited, wait 2 seconds and try one more time
    if (error?.message?.includes('429') || error?.status === 429) {
      console.warn("Rate limited. Retrying in 2s...");
      await new Promise(resolve => setTimeout(resolve, 2000));
      return await callApi();
    }
    throw error;
  }
};

// --- Components ---

const AIProjectImage: React.FC<{ prompt: string; fallbackUrl: string; title: string; index: number }> = ({ prompt, fallbackUrl, title, index }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateImage = async () => {
      setLoading(true);
      try {
        // Stagger project images by 1.5s each to avoid hitting concurrent limits
        const response = await safeGenerateImage(prompt, "16:9", index * 1500 + 1000);

        const imagePart = response.candidates?.[0]?.content?.parts.find(part => part.inlineData);
        if (imagePart?.inlineData) {
          setImageUrl(`data:image/png;base64,${imagePart.inlineData.data}`);
        } else {
          setImageUrl(fallbackUrl);
        }
      } catch (error) {
        console.error(`Failed to generate image for ${title}:`, error);
        setImageUrl(fallbackUrl);
      } finally {
        setLoading(false);
      }
    };

    if (prompt) {
      generateImage();
    } else {
      setImageUrl(fallbackUrl);
      setLoading(false);
    }
  }, [prompt, fallbackUrl, title, index]);

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-purple-900/20 space-y-2">
        <Loader2 className="text-purple-400 animate-spin" size={24} />
        <span className="text-[10px] font-mono text-purple-300 uppercase tracking-widest">Imagining...</span>
      </div>
    );
  }

  return (
    <img 
      src={imageUrl || fallbackUrl} 
      alt={title} 
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
    />
  );
};

const CapstoneGraphic: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800";

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      try {
        // Capstone loads after a short delay
        const prompt = "A high-fidelity 3D stylized illustration of a sleek smartphone with a vibrant red holographic alarm signal or siren bursting out of the screen. Cinematic lighting, deep red glow, digital data particles, futuristic IT aesthetic, dark purple background, professional finish.";
        const response = await safeGenerateImage(prompt, "1:1", 500);

        const imagePart = response.candidates?.[0]?.content?.parts.find(part => part.inlineData);
        if (imagePart?.inlineData) {
          setImageUrl(`data:image/png;base64,${imagePart.inlineData.data}`);
        } else {
          setImageUrl(FALLBACK_IMAGE);
        }
      } catch (error) {
        console.error("Failed to generate capstone image (using fallback):", error);
        setImageUrl(FALLBACK_IMAGE);
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      <div className="relative w-72 h-72 lg:w-80 lg:h-80 group">
        <div className="absolute inset-0 bg-red-600/20 rounded-full blur-[60px] animate-pulse"></div>
        <div className="absolute inset-0 bg-red-600/10 rounded-full blur-[100px] animate-[pulse_3s_infinite] scale-125"></div>
        
        <div className="relative w-full h-full bg-gradient-to-br from-red-900/40 to-[#0a0510] rounded-3xl border border-red-500/20 rotate-3 p-4 overflow-hidden shadow-2xl shadow-red-900/20">
          {loading ? (
            <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
              <Loader2 className="text-red-500 animate-spin" size={32} />
              <p className="text-[10px] font-mono text-red-400 uppercase tracking-widest">Generating Visual...</p>
            </div>
          ) : (
            <img 
              src={imageUrl || FALLBACK_IMAGE} 
              alt="AI Alarm Concept" 
              className="w-full h-full object-cover rounded-2xl animate-float" 
            />
          )}
          
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,0,0,0)_50%,rgba(255,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(255,0,0,0.01),rgba(255,0,0,0.02))] bg-[length:100%_4px,4px_100%]"></div>
        </div>
        
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-600/50 animate-bounce">
          <Zap size={20} className="text-white fill-white" />
        </div>
      </div>
    </div>
  );
};

const HeroIllustration: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  const HERO_FALLBACK = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000";

  useEffect(() => {
    const generateHeroImage = async () => {
      setIsGenerating(true);
      try {
        // Hero image takes priority (0 delay)
        const prompt = "A high-fidelity, stylized 3D animation illustration of a confident Black woman in an IT role. She is wearing a professional white jacket, a light gray top, and dark gray pants. She is in a high-tech workspace with clean code monitors and abstract data charts. The background features subtle neural network connections. The lighting is cinematic with a purple and lavender glow. Transparent-friendly style, professional and modern.";
        const response = await safeGenerateImage(prompt, "1:1", 0);

        const imagePart = response.candidates?.[0]?.content?.parts.find(part => part.inlineData);
        if (imagePart?.inlineData) {
          setGeneratedImage(`data:image/png;base64,${imagePart.inlineData.data}`);
        } else {
          setGeneratedImage(HERO_FALLBACK);
        }
      } catch (error) {
        console.error("Hero image generation failed (using fallback):", error);
        setGeneratedImage(HERO_FALLBACK);
      } finally {
        setIsGenerating(false);
      }
    };

    generateHeroImage();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    setRotation({ x: rotateX, y: rotateY });
  };

  const resetRotation = () => setRotation({ x: 0, y: 0 });

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
      className="relative w-full max-w-xl aspect-square perspective-1000 group transition-transform duration-300 ease-out"
      style={{ 
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="absolute inset-0 -z-10 opacity-20">
        <svg viewBox="0 0 400 400" className="w-full h-full text-purple-500 animate-pulse">
          <circle cx="100" cy="100" r="2" fill="currentColor" />
          <circle cx="300" cy="100" r="2" fill="currentColor" />
          <circle cx="200" cy="200" r="4" fill="currentColor" />
          <circle cx="100" cy="300" r="2" fill="currentColor" />
          <circle cx="300" cy="300" r="2" fill="currentColor" />
          <path d="M100 100 L200 200 L300 100 M100 300 L200 200 L300 300" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="relative w-full h-full flex items-center justify-center p-8">
        <div className="relative w-full h-full rounded-[40px] overflow-hidden border border-purple-500/20 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 shadow-2xl">
          {isGenerating ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-purple-900/20 backdrop-blur-sm">
              <Loader2 className="text-purple-400 animate-spin" size={40} />
              <p className="text-xs font-mono text-purple-300 tracking-widest uppercase animate-pulse">Synthesizing Persona...</p>
            </div>
          ) : (
            <img 
              src={generatedImage || HERO_FALLBACK} 
              alt="Tersh B Kgaphola AI Persona" 
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" 
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0510] via-transparent to-purple-900/20"></div>
        </div>
      </div>
      
      {/* Code Snippets */}
      <div className="absolute top-4 left-4 p-3 bg-[#1e0b36]/80 backdrop-blur-md border border-purple-500/20 rounded-xl shadow-xl animate-float-slow z-10">
        <code className="text-purple-300 text-[10px] font-mono">&lt;AI /&gt;</code>
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0510]/95 backdrop-blur-md py-4 shadow-lg shadow-purple-900/10 border-b border-purple-900/20' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-100 tracking-tighter">
          Tersh<span className="text-purple-400">.AI</span>
        </a>
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-xs font-bold text-purple-200/70 hover:text-purple-400 transition-colors uppercase tracking-[0.2em]">
              {link.name}
            </a>
          ))}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-purple-200 focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

const SkillBar: React.FC<{ name: string; percentage: number }> = ({ name, percentage }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-2">
      <span className="text-sm font-medium text-purple-200/80">{name}</span>
      <span className="text-xs font-mono text-purple-400">{percentage}%</span>
    </div>
    <div className="w-full bg-purple-900/30 h-1.5 rounded-full overflow-hidden">
      <div className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-1000 ease-out" style={{ width: `${percentage}%` }} />
    </div>
  </div>
);

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-16">
    <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-white">{title}</h2>
    {subtitle && <p className="text-purple-400 font-mono tracking-[0.3em] uppercase text-[10px]">{subtitle}</p>}
    <div className="w-16 h-1 bg-purple-500 mt-6 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
  </div>
);

const ProjectCard: React.FC<{ project: typeof PROJECTS[0]; index: number }> = ({ project, index }) => (
  <div className="group relative bg-[#1e0b36]/40 border border-purple-500/10 rounded-2xl overflow-hidden hover:border-purple-400/30 transition-all duration-500 shadow-xl flex flex-col h-full">
    <div className="h-48 overflow-hidden relative bg-black/40">
      <AIProjectImage 
        prompt={project.generationPrompt || ""} 
        fallbackUrl={project.imageUrl} 
        title={project.title}
        index={index}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1e0b36] to-transparent opacity-80"></div>
    </div>
    <div className="p-8 flex flex-col flex-1">
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-purple-900/40 text-purple-300 text-[9px] font-mono rounded-full border border-purple-700/20">{tag}</span>
        ))}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">{project.title}</h3>
      <p className="text-purple-100/60 text-sm leading-relaxed mb-6 flex-1">{project.description}</p>
      <div className="flex items-center space-x-6 pt-6 border-t border-purple-500/10">
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-[10px] font-bold text-purple-200 hover:text-purple-400 transition-colors tracking-widest">LIVE DEMO <ExternalLink size={14} className="ml-2" /></a>
        )}
        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-[10px] font-bold text-purple-200 hover:text-purple-400 transition-colors tracking-widest">VIEW APP <Layout size={14} className="ml-2" /></a>
      </div>
    </div>
  </div>
);

export default function App() {
  const [clickPopup, setClickPopup] = useState<{ text: string, x: number, y: number } | null>(null);
  const [isCvMenuOpen, setIsCvMenuOpen] = useState(false);
  const cvMenuRef = useRef<HTMLDivElement>(null);
  
  const handleSocialClick = (e: React.MouseEvent, url: string) => {
    setClickPopup({ text: url, x: e.clientX, y: e.clientY });
    setTimeout(() => setClickPopup(null), 2500);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cvMenuRef.current && !cvMenuRef.current.contains(event.target as Node)) {
        setIsCvMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Placeholder file URIs
  const PDF_CV_URI = "#"; 
  const DOCX_CV_URI = "#";

  return (
    <div className="bg-[#0a0510] min-h-screen selection:bg-purple-500/30 selection:text-purple-200">
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes popup-fade {
          0% { opacity: 0; transform: translate(-50%, -100%) scale(0.95); }
          10% { opacity: 1; transform: translate(-50%, -120%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -140%) scale(0.95); }
        }
        @keyframes menu-in { 0% { opacity: 0; transform: translateY(10px) scale(0.95); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .perspective-1000 { perspective: 1000px; }
        .animate-popup { animation: popup-fade 2.5s forwards ease-out; }
        .animate-menu-in { animation: menu-in 0.2s forwards ease-out; }
      `}</style>
      
      {clickPopup && (
        <div className="fixed z-[9999] pointer-events-none px-4 py-2 bg-purple-600/90 backdrop-blur-md border border-purple-400/30 rounded-lg text-white font-mono text-[10px] animate-popup whitespace-nowrap shadow-xl" style={{ left: clickPopup.x, top: clickPopup.y }}>{clickPopup.text}</div>
      )}

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-800/10 blur-[150px] -z-10 rounded-full animate-pulse"></div>
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 bg-purple-900/40 border border-purple-700/30 rounded-full text-purple-300 text-[10px] font-mono mb-8 tracking-[0.2em] uppercase">Pioneering AI Systems Automation</span>
              <h1 className="text-5xl md:text-8xl font-black text-white mb-6 leading-tight tracking-tighter">Tersh B <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-200">Kgaphola</span></h1>
              <h2 className="text-lg md:text-2xl font-mono text-purple-400/80 mb-8 tracking-wide">{PERSONAL_INFO.title}</h2>
              <p className="text-lg text-purple-100/50 mb-12 max-w-xl leading-relaxed font-light italic">"{PERSONAL_INFO.brandingStatement}"</p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-5 relative">
                <div className="relative" ref={cvMenuRef}>
                  <button onClick={() => setIsCvMenuOpen(!isCvMenuOpen)} className="px-10 py-4.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-purple-600/30 active:scale-95 flex items-center group overflow-hidden">
                    <Download className="mr-3 group-hover:translate-y-1 transition-transform" size={18} /> DOWNLOAD CV
                    <ChevronRight className={`ml-3 transition-transform duration-300 ${isCvMenuOpen ? 'rotate-90' : ''}`} size={16} />
                  </button>
                  {isCvMenuOpen && (
                    <div className="absolute top-full left-0 mt-3 w-56 bg-[#1e0b36]/95 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl z-50 animate-menu-in">
                      <div className="p-2 space-y-1">
                        <a href={PDF_CV_URI} download="Tersh_B_Kgaphola_CV.pdf" className="flex items-center space-x-3 px-4 py-3 hover:bg-purple-500/20 rounded-xl transition-colors text-purple-100 text-sm"><div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 border border-red-500/20"><FileDown size={16} /></div><span className="font-bold">PDF Format</span></a>
                        <a href={DOCX_CV_URI} download="Tersh_B_Kgaphola_CV.docx" className="flex items-center space-x-3 px-4 py-3 hover:bg-purple-500/20 rounded-xl transition-colors text-purple-100 text-sm"><div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/20"><FileDown size={16} /></div><span className="font-bold">DOCX Format</span></a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-1 w-full max-w-lg"><HeroIllustration /></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeader title="Professional Profile" subtitle="Biography & Objectives" />
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="space-y-8">
              <p className="text-xl text-purple-100/70 leading-relaxed font-light">{PERSONAL_INFO.summary}</p>
              <div className="p-8 bg-gradient-to-br from-purple-900/20 to-indigo-900/10 rounded-3xl border border-purple-500/10">
                <h4 className="text-lg font-bold text-white mb-6 flex items-center"><GraduationCap className="mr-3 text-purple-400" /> Education</h4>
                {EDUCATION.map((edu, idx) => (
                  <div key={idx} className="mb-6 last:mb-0 relative pl-6 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-0.5 before:bg-purple-500/50">
                    <h5 className="font-bold text-purple-100">{edu.degree}</h5>
                    <p className="text-purple-300/60 text-sm mt-1">{edu.institution}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-purple-400 text-[10px] font-mono uppercase tracking-widest">{edu.period}</p>
                      <p className="text-white font-bold text-sm bg-purple-600/20 px-3 py-1 rounded-full border border-purple-500/30">GPA: {edu.gpa}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <h4 className="text-xl font-bold text-white tracking-tight">Technical Competencies</h4>
              <div className="grid gap-6">
                {Object.entries(SKILLS).slice(0, 2).map(([key, skills]) => (
                  <div key={key} className="bg-[#1e0b36]/30 p-8 rounded-3xl border border-purple-500/5">
                    <h5 className="text-white font-bold text-sm mb-6 uppercase tracking-widest text-purple-400">{key.replace('_', ' & ')}</h5>
                    {skills.map(skill => <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} />)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeader title="Career Trajectory" subtitle="Work Experience & Impact" />
          <div className="max-w-5xl space-y-16">
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="relative pl-16 md:pl-24 group">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 to-transparent"></div>
                <div className="absolute left-[-6px] top-1.5 w-3 h-3 rounded-full bg-purple-500 shadow-xl group-hover:scale-150 transition-transform"></div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div>
                    <h4 className="text-3xl font-black text-white group-hover:text-purple-300 transition-colors">{exp.role}</h4>
                    <p className="text-purple-400 font-bold text-lg mt-1">{exp.company}</p>
                  </div>
                  <span className="inline-block px-5 py-2 bg-purple-900/30 border border-purple-700/20 text-purple-100 font-mono text-[10px] uppercase tracking-widest rounded-xl">{exp.period}</span>
                </div>
                <ul className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="text-purple-100/50 flex items-start text-sm leading-relaxed"><span className="text-purple-500 mr-4 font-bold text-lg leading-none mt-0.5">•</span> {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 bg-[#1e0b36]/20">
        <div className="container mx-auto px-6">
          <SectionHeader title="Portfolio Showcase" subtitle="Featured AI & Dev Ventures" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PROJECTS.map((project, idx) => <ProjectCard key={project.id} project={project} index={idx} />)}
          </div>
          <div className="mt-24 relative p-1 md:p-1.5 bg-gradient-to-r from-purple-600/30 via-indigo-500/20 to-purple-600/30 rounded-[2.5rem] overflow-hidden">
            <div className="bg-[#0a0510] rounded-[2.3rem] p-12 text-center md:text-left md:flex items-center gap-16">
              <div className="flex-1">
                <h4 className="text-3xl font-black text-white mb-6">RSA Republica Safety AI Agent</h4>
                <p className="text-purple-100/50 text-lg leading-relaxed mb-8 max-w-2xl">A specialized AI safety agent engineered to monitor and govern automated systems within the South African regulatory framework. This system ensures alignment with national safety standards and implements proactive ethical AI practices for digital infrastructure.</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <a href="https://drive.google.com/file/d/1aS8nSBP7-EXRGPF3VZc4iWmeSmNErGC3/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-2xl transition-all shadow-xl flex items-center"><ExternalLink className="mr-3" size={18} /> LIVE DEMO</a>
                  <a href="https://rsa-agent.vercel.app/" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-transparent hover:bg-purple-900/20 border border-purple-800/30 text-purple-200 font-bold rounded-2xl transition-all flex items-center"><ChevronRight className="mr-3" size={18} /> VIEW MORE</a>
                </div>
              </div>
              <div className="hidden lg:block"><CapstoneGraphic /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-black/40">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-24">
            <div>
              <SectionHeader title="Let's Connect" subtitle="Collaboration & Inquiries" />
              <div className="space-y-10">
                <div className="flex items-center space-x-8 group">
                  <div className="w-16 h-16 bg-purple-900/30 rounded-2xl flex items-center justify-center border border-purple-800/30 group-hover:bg-purple-600 group-hover:border-purple-400 transition-all"><Mail className="text-purple-400 group-hover:text-white" size={24} /></div>
                  <div><p className="text-[10px] font-mono text-purple-500 uppercase tracking-widest mb-1.5">Direct Channel</p><a href={`mailto:${PERSONAL_INFO.email}`} className="text-xl font-bold text-white hover:text-purple-400 transition-colors">{PERSONAL_INFO.email}</a></div>
                </div>
                <div className="flex items-center space-x-8 group cursor-pointer" onClick={(e) => handleSocialClick(e, PERSONAL_INFO.phone)}>
                  <div className="w-16 h-16 bg-purple-900/30 rounded-2xl flex items-center justify-center border border-purple-800/30 group-hover:bg-purple-600 group-hover:border-purple-400 transition-all"><Phone className="text-purple-400 group-hover:text-white" size={24} /></div>
                  <div><p className="text-[10px] font-mono text-purple-500 uppercase tracking-widest mb-1.5">Voice Channel</p><a href={`tel:${PERSONAL_INFO.phone}`} className="text-xl font-bold text-white hover:text-purple-400 transition-colors">{PERSONAL_INFO.phone}</a></div>
                </div>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-8 group cursor-pointer" onClick={(e) => handleSocialClick(e, "LinkedIn Profile")}>
                  <div className="w-16 h-16 bg-purple-900/30 rounded-2xl flex items-center justify-center border border-purple-800/30 group-hover:bg-purple-600 group-hover:border-purple-400 transition-all"><Linkedin className="text-purple-400 group-hover:text-white" size={24} /></div>
                  <div><p className="text-[10px] font-mono text-purple-500 uppercase tracking-widest mb-1.5">Professional Network</p><div className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors tracking-tight">LinkedIn Profile</div></div>
                </a>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-8 group cursor-pointer" onClick={(e) => handleSocialClick(e, "GitHub Repositories")}>
                  <div className="w-16 h-16 bg-purple-900/30 rounded-2xl flex items-center justify-center border border-purple-800/30 group-hover:bg-purple-600 group-hover:border-purple-400 transition-all"><Github className="text-purple-400 group-hover:text-white" size={24} /></div>
                  <div><p className="text-[10px] font-mono text-purple-500 uppercase tracking-widest mb-1.5">Source Control</p><div className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors tracking-tight">GitHub Repositories</div></div>
                </a>
              </div>
            </div>
            <div className="bg-[#1e0b36]/40 p-12 rounded-[2.5rem] border border-purple-500/10 shadow-3xl">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-6">
                  <input type="text" className="w-full bg-black/30 border border-purple-900/40 rounded-xl px-6 py-4.5 text-white focus:outline-none focus:border-purple-400 text-sm" placeholder="Full Name" />
                  <input type="email" className="w-full bg-black/30 border border-purple-900/40 rounded-xl px-6 py-4.5 text-white focus:outline-none focus:border-purple-400 text-sm" placeholder="Email" />
                </div>
                <input type="text" className="w-full bg-black/30 border border-purple-900/40 rounded-xl px-6 py-4.5 text-white focus:outline-none focus:border-purple-400 text-sm" placeholder="Subject" />
                <textarea rows={5} className="w-full bg-black/30 border border-purple-900/40 rounded-xl px-6 py-4.5 text-white focus:outline-none focus:border-purple-400 text-sm resize-none" placeholder="Detail your AI or systems automation needs..."></textarea>
                <button className="w-full py-5 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs tracking-widest rounded-2xl transition-all shadow-xl uppercase">Initialize Transmission</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 border-t border-purple-900/20 text-center bg-[#0a0510]">
        <div className="container mx-auto px-6">
          <div className="mb-8"><a href="#" className="text-3xl font-black text-white tracking-tighter">Tersh<span className="text-purple-400">.AI</span></a></div>
          <div className="flex justify-center space-x-6 mb-8">
             <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
             <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-white transition-colors"><Github size={20} /></a>
          </div>
          <p className="text-purple-400/30 text-[9px] font-mono tracking-[0.4em] uppercase max-w-lg mx-auto leading-relaxed">© 2025 Tersh B Kgaphola | AI Specialist & Software Engineer <br />Systems Automation • Data Analytics • AI Safety</p>
        </div>
      </footer>
    </div>
  );
}
