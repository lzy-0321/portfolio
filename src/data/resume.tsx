import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Ziyao Lu",
  initials: "ZL",
  url: "https://dillion.io",
  location: "Sydney, NSW",
  locationLink: "https://www.google.com/maps/place/sydney",
  description:
    "I am still an undergraduate student studying computer engineering (Honours) and am expected to graduate in the second quarter of 2025.",
  summary:
    "In early 2021, [I entered UNSW to study computer engineering](/#education). By chance, at the end of 2023, I joined [4px express (AU) PTY LTD](https://www.4px.com/), engaged in HR and finance, and began a two-way life of work and study. At the same time during my undergraduate years, I was developing a project of my own to implement graph database interaction without code, named '[To Draw Is Human: Towards No-Code Subgraph Search](https://github.com/lzy-0321/Thesis)'.",
  avatarUrl: "/me.JPG",
  skills: [
    "VHDL",
    "Python",
    "Java",
    "Typescript",
    "React",
    "Next.js",
    "Node.js",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "luziyao020321@gmail.com",
    tel: "+61 0402379690",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/lzy-0321",
        icon: Icons.github,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/intent/follow?screen_name=Ziyao_Amao",
        icon: Icons.x,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "4px express (AU) PTY LTD",
      href: "https://www.4px.com/",
      badges: [],
      location: "InPerson",
      title: "HR and Finance Administrator",
      logoUrl: "/4px.png",
      start: "Aug 2023",
      end: "Jan 2025",
      description:
        "Responsible for the daily management of the company's human resources and finance, including employee recruitment, payroll accounting, financial record maintenance and statement preparation, to ensure efficient and compliant operations.",
    },
    {
      company: "Cainiao",
      badges: [],
      href: "https://global.cainiao.com/",
      location: "InPerson",
      title: "HR and Finance Administrator",
      logoUrl: "/cainiao.gif",
      start: "Jan 2025",
      end: "Now",
      description:
        "Responsible for the daily management of the company's human resources and finance, including employee recruitment, payroll accounting, financial record maintenance and statement preparation, to ensure efficient and compliant operations.",
    },
  ],
  education: [
    {
      school: "University of new south wales",
      href: "https://www.unsw.edu.au/",
      degree: "Master of Artificial Intelligence in Information Technology",
      logoUrl: "/unsw.png",
      start: "2025",
      end: "Now",
    },
    {
      school: "University of new south wales",
      href: "https://www.unsw.edu.au/",
      degree: "Bachelor of Engineering (Honours) in Computer Engineering",
      logoUrl: "/unsw.png",
      start: "2021",
      end: "2025",
    },
  ],
  projects: [
    {
      title: "Chat Collect",
      href: "https://chatcollect.com",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        "With the release of the [OpenAI GPT Store](https://openai.com/blog/introducing-the-gpt-store), I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://chatcollect.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
    },
    {
      title: "Magic UI",
      href: "https://magicui.design",
      dates: "June 2023 - Present",
      active: true,
      description:
        "Designed, developed and sold animated UI components for developers.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://magicui.design",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/magicuidesign/magicui",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.magicui.design/bento-grid.mp4",
    },
  ],
} as const;
