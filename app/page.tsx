"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([
    { role: "assistant", content: "Hi! How can I help you today?" },
  ])
  const [chatInput, setChatInput] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const newMessages = [
      ...chatMessages,
      { role: "user", content: chatInput },
      { role: "assistant", content: "Thanks for your message! I'll get back to you soon." },
    ]
    setChatMessages(newMessages)
    setChatInput("")
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <header className="fixed top-0 right-0 z-50 p-6 flex items-center gap-3">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
          aria-label="Toggle chat"
        >
          <svg
            className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
          </svg>
        </button>

        <button
          onClick={toggleTheme}
          className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <svg
              className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </header>

      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "experience", "projects", "achievements", "skills", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="intro"
          ref={(el) => (sectionsRef.current[0] = el)}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / 2025</div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  Susan
                  <br />
                  <span className="text-muted-foreground">Fernandes</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Full Stack Developer specializing in
                  <span className="text-foreground"> AI/ML</span>,<span className="text-foreground"> React</span>, and
                  <span className="text-foreground"> modern web technologies</span>. Passionate about building intelligent, user-centric applications.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-600 rounded-full animate-pulse"></div>
                    Open to opportunities
                  </div>
                  <div>Mumbai, India</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-foreground">Full Stack Developer</div>
                  <div className="text-muted-foreground">@ SAT Club</div>
                  <div className="text-xs text-muted-foreground">Dec 2025 — Present</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
                  {["Next.js", "React", "AI/ML", "TypeScript", "Supabase"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="experience"
          ref={(el) => (sectionsRef.current[1] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Experience</h2>
              <div className="text-sm text-muted-foreground font-mono">2023 — 2025</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2025",
                  role: "Full Stack Developer",
                  company: "SAT Club",
                  description:
                    "Redesigned UI with complex state-driven components. Implemented SAT-style Eliminator feature. Built Operations page with secure Markdown + LaTeX rendering using KaTeX and DOM sanitization.",
                  tech: ["React", "TypeScript", "KaTeX", "Canvas"],
                },
                {
                  year: "2025",
                  role: "Tech Intern",
                  company: "Ajanta International",
                  description:
                    "Migrated legacy WordPress site to Next.js with TypeScript and Tailwind CSS. Integrated Quicksell for product display and improved UI with Framer Motion animations.",
                  tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
                },
                {
                  year: "2023-2024",
                  role: "Graphic Design Intern",
                  company: "Lavleen V and Team",
                  description:
                    "Designed 100+ digital and marketing assets. Collaborated with cross-functional remote teams on branding and design projects.",
                  tech: ["Figma", "Canva", "Design"],
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                      <div className="text-muted-foreground">{job.company}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="projects"
          ref={(el) => (sectionsRef.current[2] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Featured Projects</h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  title: "ReFast — AI Research Companion",
                  description:
                    "AI platform for analyzing, summarizing, and comparing research papers using Retrieval-Augmented Generation (RAG). Implemented Google OAuth, chat memory, and cloud LLM inference.",
                  tech: ["Next.js", "Supabase", "Crawl4AI", "ChromaDB"],
                  github: "#",
                  link: "#",
                },
                {
                  title: "ResQ AI — Emergency Response Platform",
                  description:
                    "Agentic AI platform for assisting 112 emergency calls with real-time speech pipeline using Vosk. Features context-aware emergency classification and live caller location visualization.",
                  tech: ["Next.js", "NLP", "Vosk", "ChromaDB", "MapBox"],
                  github: "#",
                  link: "#",
                },
                {
                  title: "LifeAxis — Smart Healthcare Platform",
                  description:
                    "Healthcare platform connecting doctors, patients, and nurses. Built role-based dashboards with RBAC. Ranked Top 90 out of 10,000 in Google AI for Impact. Integrated AI assistant using Gemini API.",
                  tech: ["Next.js", "Tailwind", "Gemini API", "RBAC"],
                  github: "#",
                  link: "#",
                },
              ].map((project, index) => (
                <article
                  key={index}
                  className="group relative p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg"
                >
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Link
                      href={project.github}
                      className="p-2 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 hover:bg-muted/50"
                      aria-label="View GitHub repository"
                    >
                      <svg
                        className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </Link>
                    <Link
                      href={project.link}
                      className="p-2 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 hover:bg-muted/50"
                      aria-label="Visit project"
                    >
                      <svg
                        className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </Link>
                  </div>

                  <div className="space-y-4 pr-16">
                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-muted/50 text-muted-foreground rounded group-hover:bg-muted transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="achievements"
          ref={(el) => (sectionsRef.current[3] = el)}
          className="py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Achievements</h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Hackathon Wins</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    {[
                      "Winner – Super Hack 2025 (AWS)",
                      "Winner – Neural Nexus AI/ML",
                      "2nd Place – AI for India (Lyzr)",
                      "Top 3 – MIT Madras",
                      "Runner-up – SunHacks 2025",
                      "Bounty – Zypherpunk 2025",
                    ].map((achievement) => (
                      <li key={achievement} className="flex items-start gap-3">
                        <span className="text-cyan-400 mt-1">→</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Research & Recognition</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <div>
                      <div className="font-medium text-foreground">Published Research</div>
                      <div className="text-sm">
                        <em>TechLib: Plagiarism-Free Project Management</em> at Hinweis ASIT-2024 using Vectorization and Cosine Similarity
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Google Cloud Certification</div>
                      <div className="text-sm">Develop GenAI Apps with Gemini + Streamlit & Prompt Design in Vertex AI (2024)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" ref={(el) => (sectionsRef.current[4] = el)} className="py-20 sm:py-32 opacity-0">
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Technical Skills</h2>

            <div className="grid gap-8 sm:gap-12 lg:grid-cols-3">
              {[
                {
                  category: "Languages",
                  items: ["Python", "Java", "SQL", "TypeScript"],
                },
                {
                  category: "Frameworks & Tools",
                  items: ["Next.js", "React", "Supabase", "Tailwind CSS", "Framer Motion", "KaTeX"],
                },
                {
                  category: "AI / Data",
                  items: ["ChromaDB", "NLP Pipelines", "RAG", "Gemini API", "LLM Integration"],
                },
              ].map((skillGroup) => (
                <div key={skillGroup.category} className="space-y-4">
                  <h3 className="text-sm font-mono text-muted-foreground tracking-wider">{skillGroup.category.toUpperCase()}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="connect" ref={(el) => (sectionsRef.current[5] = el)} className="py-20 sm:py-32 opacity-0">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Get In Touch</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Always interested in new opportunities, collaborations, and conversations about AI, web development, and technology.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:susanfernandes1305@gmail.com"
                    className="group flex items-center gap-3 text-foreground hover:text-cyan-400 transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">susanfernandes1305@gmail.com</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">FIND ME ONLINE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "GitHub", handle: "@SusanFernandes", url: "https://github.com/SusanFernandes" },
                  { name: "LinkedIn", handle: "susanfernandes13", url: "https://linkedin.com/in/susanfernandes13" },
                  { name: "Call", handle: "+91 8591279665", url: "tel:+918591279665" },
                  { name: "Location", handle: "Mumbai, India", url: "#" },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className="group p-4 border border-border rounded-lg hover:border-cyan-400/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-cyan-400 transition-colors duration-300">{social.name}</div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2025 Susan Fernandes. All rights reserved.</div>
              <div className="text-xs text-muted-foreground">Contact for opportunities and collaborations</div>
            </div>

            <Link
              href="https://github.com/SusanFernandes"
              className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
              aria-label="Visit GitHub"
            >
              <svg
                className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </Link>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>

      {isChatOpen && (
        <div className="fixed bottom-8 right-8 w-96 max-h-96 bg-muted rounded-lg border border-border shadow-lg flex flex-col z-50">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-medium text-foreground">Chat with me</h3>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-foreground text-background rounded-br-none"
                      : "bg-background text-foreground border border-border rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleChatSubmit} className="border-t border-border p-4 flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 bg-background text-foreground border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
              aria-label="Send message"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
