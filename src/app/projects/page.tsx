import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsPage() {
  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto">
      {/* Hero section */}
      <section id="hero" className="mb-12">
        <div className="mx-auto w-full space-y-8">
          <div className="gap-2 flex flex-col">
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
              yOffset={8}
              text="i like to build things"
            />
            <BlurFadeText
              className="max-w-[600px] text-muted-foreground md:text-xl"
              delay={BLUR_FADE_DELAY * 2}
              text="i've built a variety of projects ranging from web apps, Hardware coding, AI models, and more. There are a few of my favorites."
            />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {DATA.projects.map((project, index) => (
          <BlurFade
            key={project.title}
            delay={BLUR_FADE_DELAY * 3 + index * 0.05}
          >
            <ProjectCard
              href={project.href}
              title={project.title}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              image={project.image}
              video={project.video}
              links={project.links}
            />
          </BlurFade>
        ))}
      </div>
    </main>
  );
} 