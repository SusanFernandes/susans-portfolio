export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  link: string;
  bentoItems: { title: string; description: string; label: string }[];
}

export const projectsData: Project[] = [
  {
    id: "refast",
    title: "ReFast — AI Research Companion",
    description:
      "AI platform for analyzing, summarizing, and comparing research papers using Retrieval-Augmented Generation (RAG). Implemented Google OAuth, chat memory, and cloud LLM inference.",
    tech: ["Next.js", "Supabase", "Crawl4AI", "ChromaDB"],
    github: "#",
    link: "#",
    bentoItems: [
      { title: "Retrieval", description: "RAG with ChromaDB", label: "Architecture" },
      { title: "OAuth", description: "Google authentication", label: "Security" },
      { title: "Inference", description: "Cloud LLM reasoning", label: "AI" },
      { title: "Automation", description: "Crawling using Crawl4AI", label: "Data" },
    ],
  },
  {
    id: "resq-ai",
    title: "ResQ AI — Emergency Response Platform",
    description:
      "Agentic AI platform for assisting 112 emergency calls with real-time speech pipeline using Vosk. Features context-aware emergency classification and live caller location visualization.",
    tech: ["Next.js", "NLP", "Vosk", "ChromaDB", "MapBox"],
    github: "#",
    link: "#",
    bentoItems: [
      { title: "Speech", description: "Real-time speech pipeline with Vosk", label: "Audio" },
      { title: "NLP", description: "Emergency classification", label: "Intelligence" },
      { title: "Mapping", description: "Live caller location via MapBox", label: "Geo" },
      { title: "Agents", description: "Agentic AI responders", label: "System" },
    ],
  },
  {
    id: "lifeaxis",
    title: "LifeAxis — Smart Healthcare Platform",
    description:
      "Healthcare platform connecting doctors, patients, and nurses. Built role-based dashboards with RBAC. Ranked Top 90 out of 10,000 in Google AI for Impact. Integrated AI assistant using Gemini API.",
    tech: ["Next.js", "Tailwind", "Gemini API", "RBAC"],
    github: "#",
    link: "#",
    bentoItems: [
      { title: "Dashboards", description: "Role-Based Access Control", label: "UI / UX" },
      { title: "Gemini", description: "AI healthcare assistant", label: "Integration" },
      { title: "Achievement", description: "Top 90 Google AI for Impact", label: "Award" },
      { title: "Connect", description: "Doctors, Patients, Nurses", label: "Platform" },
    ],
  },
];
