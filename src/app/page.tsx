export const dynamic = 'force-dynamic';
export const revalidate = 3600;

import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { Gallery } from "@/components/gallery";
import { EntertainmentCarousel } from "@/components/entertainment-carousel";
import { getCachedGames, CACHE_EXPIRY } from '@/lib/cache';
import { getRecentGames } from '@/lib/steam';

const BLUR_FADE_DELAY = 0.04;

const galleryImages = [
  {
    src: "/gallery/cse.jpg",
    alt: "cse building enter",
    description: "CSE Building @ UNSW"
  },
  {
    src: "/gallery/mel.jpg",
    alt: "mel building",
    description: "Melbourne Central"
  },
  {
    src: "/gallery/desert.jpg",
    alt: "my car",
    description: "Anna bay"
  },
  {
    src: "/gallery/myself.jpg",
    alt: "me",
    description: "Exploring the world"
  },
  {
    src: "/gallery/haru.jpg",
    alt: "haru",
    description: "My friend's corgi Haru 🐕"
  },
  {
    src: "/gallery/workplace.jpg",
    alt: "Workspace setup",
    description: "My workspace setup"
  },
  {
    src: "/gallery/fishing.jpg",
    alt: "fishing",
    description: "Fishing at Brighton"
  },
  {
    src: "/gallery/meltrain.JPG",
    alt: "mel train",
    description: "Melbourne Train Station"
  },
  {
    src: "/gallery/everything.jpg",
    alt: "everything",
    description: "Everything will be OK"
  },
  {
    src: "/gallery/view1.jpg",
    alt: "view",
    description: "Corgis on the beach"
  },
  {
    src: "/gallery/mycar.jpg",
    alt: "my car",
    description: "My car"
  }
];

const movies = [
  {
    id: "1",
    title: "Inception",
    category: "Movies",
    image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    description: "A mind-bending journey through dreams within dreams.",
    tags: ["Sci-Fi", "Action", "Thriller"]
  }
];

const books = [
  {
    id: "1",
    title: "Dune",
    category: "Books",
    image: "https://m.media-amazon.com/images/I/81ym3QUd3KL._AC_UF1000,1000_QL80_.jpg",
    description: "A masterpiece of science fiction literature.",
    tags: ["Sci-Fi", "Fantasy", "Classic"]
  }
];

export default async function Page() {
  const cached = getCachedGames();
  const now = Date.now();
  
  let steamGames = cached.games;
  if (steamGames.length === 0 || (now - cached.lastUpdate) > CACHE_EXPIRY) {
    console.log('Cache expired or empty, fetching new data...');
    steamGames = await getRecentGames();
  }

  const games = steamGames.map(game => ({
    ...game,
  }));

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      {/* Hero section - full width */}
      <section id="hero">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 border">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Two column layout */}
      <div className="flex flex-col lg:flex-row lg:gap-x-8">
        {/* Left column */}
        <div className="flex-1 space-y-10">
          <section id="about">
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <h2 className="text-xl font-bold">About</h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
                {DATA.summary}
              </Markdown>
            </BlurFade>
          </section>
          
          <section id="gallery" className="w-full">
            <Gallery images={galleryImages} delay={BLUR_FADE_DELAY * 4.5} />
          </section>
        </div>

        {/* Right column */}
        <div className="flex-1 space-y-10">
          <section id="work">
            <div className="flex min-h-0 flex-col gap-y-3">
              <BlurFade delay={BLUR_FADE_DELAY * 5}>
                <h2 className="text-xl font-bold">Work Experience</h2>
              </BlurFade>
              {DATA.work.map((work, id) => (
                <BlurFade
                  key={work.company}
                  delay={BLUR_FADE_DELAY * 6 + id * 0.05}
                >
                  <ResumeCard
                    key={work.company}
                    logoUrl={work.logoUrl}
                    altText={work.company}
                    title={work.company}
                    subtitle={work.title}
                    href={work.href}
                    badges={work.badges}
                    period={`${work.start} - ${work.end ?? "Present"}`}
                    description={work.description}
                  />
                </BlurFade>
              ))}
            </div>
          </section>
          
          <section id="education">
            <div className="flex min-h-0 flex-col gap-y-3">
              <BlurFade delay={BLUR_FADE_DELAY * 7}>
                <h2 className="text-xl font-bold">Education</h2>
              </BlurFade>
              {DATA.education.map((education, id) => (
                <BlurFade
                  key={education.school}
                  delay={BLUR_FADE_DELAY * 8 + id * 0.05}
                >
                  <ResumeCard
                    key={education.school}
                    href={education.href}
                    logoUrl={education.logoUrl}
                    altText={education.school}
                    title={education.school}
                    subtitle={education.degree}
                    period={`${education.start} - ${education.end}`}
                  />
                </BlurFade>
              ))}
            </div>
          </section>
          
          <section id="skills">
            <div className="flex min-h-0 flex-col gap-y-3">
              <BlurFade delay={BLUR_FADE_DELAY * 9}>
                <h2 className="text-xl font-bold">Skills</h2>
              </BlurFade>
              <div className="flex flex-wrap gap-1">
                {DATA.skills.map((skill, id) => (
                  <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                    <Badge key={skill}>{skill}</Badge>
                  </BlurFade>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Full width sections */}
      <div className="space-y-10">
        <section id="projects">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-12 w-full py-12">
              <BlurFade delay={BLUR_FADE_DELAY * 11}>
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                      My Projects
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                      Check out my latest work
                    </h2>
                    <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      I&apos;ve worked on a variety of projects, from simple
                      websites to complex web applications. Here are a few of my
                      favorites.
                    </p>
                  </div>
                </div>
              </BlurFade>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 max-w-[1200px] mx-auto">
                {DATA.projects.map((project, id) => (
                  <BlurFade
                    key={project.title}
                    delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                  >
                    <ProjectCard
                      href={project.href}
                      key={project.title}
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
                
                {/* Coming Soon Card */}
                <BlurFade delay={BLUR_FADE_DELAY * 12 + DATA.projects.length * 0.05}>
                  <div className="relative group rounded-xl border bg-card text-card-foreground shadow overflow-hidden h-full">
                    <div className="h-full flex flex-col justify-center items-center p-6 space-y-4">
                      <div className="text-4xl animate-bounce">🚀</div>
                      <h3 className="text-2xl font-semibold tracking-tight">Coming Soon</h3>
                      <p className="text-sm text-muted-foreground">
                        More exciting projects are on the way! Stay tuned...
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="secondary">???</Badge>
                        <Badge variant="secondary">敬请期待</Badge>
                        <Badge variant="secondary">Coming Soon</Badge>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </BlurFade>
              </div>
            </div>
          </div>
        </section>
        
        <section id="entertainment" className="space-y-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <BlurFade delay={BLUR_FADE_DELAY * 13}>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                    Entertainment
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    What I Enjoy
                  </h2>
                  <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    A glimpse into my entertainment world - games, movies, and books that inspire me.
                  </p>
                </div>
              </div>
            </BlurFade>
            
            <div className="mt-8 space-y-8">
              <BlurFade delay={BLUR_FADE_DELAY * 14}>
                <EntertainmentCarousel items={games} category="Games I'm Playing" />
              </BlurFade>
              
              <BlurFade delay={BLUR_FADE_DELAY * 15}>
                <EntertainmentCarousel items={movies} category="Movies & TV Shows" />
              </BlurFade>
              
              <BlurFade delay={BLUR_FADE_DELAY * 16}>
                <EntertainmentCarousel items={books} category="Books I Read" />
              </BlurFade>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center justify-center gap-4 text-center w-full py-12">
              <BlurFade delay={BLUR_FADE_DELAY * 16}>
                <div className="space-y-3">
                  <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                    Contact
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Get in Touch
                  </h2>
                  <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Want to chat? Just shoot me a dm{" "}
                    <Link
                      href={DATA.contact.social.X.url}
                      className="text-blue-500 hover:underline"
                    >
                      with a direct question on twitter
                    </Link>{" "}
                    and I&apos;ll respond whenever I can. I will ignore all
                    soliciting.
                  </p>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
