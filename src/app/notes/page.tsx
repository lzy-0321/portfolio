import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Course, CourseType } from "@/data/types/course";
import { ExternalLinkIcon } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

// 定义标签颜色映射
const typeColors: Record<CourseType, string> = {
  'AI': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  'Database': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Systems': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'Networks': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'Programming': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'Hardware': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'Design': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  'Theory': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  'Software Engineering': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
};

export default function NotesPage() {
  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto">
      {/* Hero section - full width */}
      <section id="hero" className="mb-12">
        <div className="mx-auto w-full space-y-8">
          <div className="gap-2 flex flex-col">
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
              yOffset={8}
              text="i like to learn"
            />
            <BlurFadeText
              className="max-w-[600px] text-muted-foreground md:text-xl"
              delay={BLUR_FADE_DELAY * 2}
              text="i study a lot, write notes, and share them with friends. here are some of my notes from school."
            />
          </div>
        </div>
      </section>

      <div className="space-y-8">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">University of new south wales</h2>
            <div className="grid gap-4">
              {DATA.courses
                .filter(c => c.university === "University of new south wales")
                .map((course, index) => (
                <BlurFade key={course.code} delay={BLUR_FADE_DELAY * (4 + index * 0.5)}>
                  <div className={cn(
                    "p-4 rounded-lg border bg-card",
                    course.link ? "hover:bg-accent transition-colors cursor-pointer" : "opacity-80"
                  )}>
                    {course.link ? (
                      <Link href={course.link} target="_blank">
                        <CourseContent course={course} />
                      </Link>
                    ) : (
                      <CourseContent course={course} />
                    )}
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </BlurFade>
      </div>
    </main>
  );
}

// 抽取课程内容为单独的组件
function CourseContent({ course }: { course: Course }) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium">{course.code}</span>
          <span>-</span>
          <span>{course.name}</span>
        </div>
        <div className="flex items-center gap-2">
          {course.type.map((t) => (
            <Badge 
              key={t}
              variant="secondary" 
              className={cn(
                "font-medium",
                typeColors[t]
              )}
            >
              {t}
            </Badge>
          ))}
          {course.handbookUrl && (
            <Link
              href={course.handbookUrl}
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLinkIcon className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {course.description}
      </p>
    </div>
  );
} 