import Link from "next/link"
import { notFound } from "next/navigation"
import { projectsData } from "@/lib/projects"
import ProjectBento from "@/components/ProjectBento"

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = projectsData.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <header className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-border/50">
        <Link
          href="/#projects"
          className="group flex items-center gap-2 text-muted-foreground hover:text-cyan-400 transition-colors duration-300"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span className="text-sm font-medium">Back to Portfolio</span>
        </Link>
        
        <div className="flex gap-4">
          <Link
            href={project.github}
            className="p-2 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 hover:bg-muted/50"
            aria-label="View GitHub repository"
          >
            <svg className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </Link>
          <Link
            href={project.link}
            className="p-2 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300 hover:bg-muted/50"
            aria-label="Visit project website"
          >
            <svg className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>
      </header>

      <main className="max-w-full mx-auto px-6 sm:px-12 lg:px-16 pt-32 pb-12">
        <div className="grid lg:grid-cols-[45fr_55fr] gap-12 lg:gap-16 items-start">
          {/* Left Side: Project Info */}
          <div className="space-y-10 animate-fade-in-up">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-foreground leading-[1.1]">
                {project.title.split(" — ")[0]}
                <br />
                <span className="text-muted-foreground text-2xl sm:text-3xl mt-4 block font-light">
                  {project.title.split(" — ")[1] || "Project Overview"}
                </span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.description}
              </p>

              <div className="pt-4 space-y-4">
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/60">Technologies Used</div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 text-sm border border-border rounded-full bg-muted/10 text-foreground hover:border-muted-foreground/50 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block pt-10 border-t border-border/30">
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/40 mb-2">Navigation Hint</div>
              <p className="text-xs text-muted-foreground/60">Hover over the feature cards to explore technical details.</p>
            </div>
          </div>

          {/* Right Side: Bento Grid */}
          <div className="space-y-8 animate-fade-in-up [animation-delay:200ms]">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-px bg-border/50 flex-1"></div>
              <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-muted-foreground/60">Detailed Breakdown</h2>
              <div className="h-px bg-border/50 flex-1"></div>
            </div>
            
            <ProjectBento items={project.bentoItems} />
          </div>
        </div>
      </main>
    </div>
  )
}
