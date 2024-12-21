import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, BookOpenIcon } from "lucide-react";
import type { Course } from "@/types/course";

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
    { href: "/notes", icon: BookOpenIcon, label: "Notes" },
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
  courses: [
    {
      code: "COMP4920",
      name: "Professional Issues and Ethics",
      university: "University of new south wales",
      description: "Professional practice in a global context: ethical, legal, social and environmental issues. Professional ethics, codes of conduct, risk and liability, intellectual property, privacy and civil liberties, social implications of IT, environmental issues and IT, professional communication, ergonomics, occupational health and safety.",
      type: ["Software Engineering"],
      link: "https://github.com/lzy-0321/comp4920"
    },
    {
      code: "COMP4601",
      name: "Design Project B",
      university: "University of new south wales",
      description: " A team-based project development course involving the analysis, design and implementation of embedded, high performance or low power FPGA-based accelerators using high-level synthesis.",
      type: ["Design", "Hardware"],
      link: "https://github.com/lzy-0321/comp4601"
    },
    {
      code: "COMP9312",
      name: "Data Analytics for Graphs",
      university: "University of new south wales",
      description: "Graph analytics and mining techniques for processing, analyzing and modeling graph-structured data. Topics include graph theory, graph patterns and statistics, link analysis and centrality measures, community detection, graph neural networks, and graph embeddings.",
      type: ["Database"],
      link: ""
    },
    {
      code: "COMP3411",
      name: "Artificial Intelligence",
      university: "University of new south wales",
      description: "Core techniques in artificial intelligence. Topics include: AI methodology and fundamentals; intelligent agents; search algorithms; game-playing; knowledge representation and reasoning; probabilistic reasoning; planning; machine learning.",
      type: ["AI"],
      link: "https://github.com/lzy-0321/comp3411"
    },
    {
      code: "COMP3211",
      name: "Computer Architecture",
      university: "University of new south wales",
      description: "Processor architecture, instruction set design, pipelining, memory hierarchy, cache, virtual memory, I/O systems, parallel processing. Performance evaluation. Contemporary computer designs.",
      type: ["Systems", "Hardware"],
      link: "https://github.com/lzy-0321/comp3211"
    },
    {
      code: "COMP3601",
      name: "Design Project A",
      university: "University of new south wales",
      description: "It is a project-based course, students will be put into groups and tasked with carrying out a real-world hardware/software co-design project.",
      type: ["Design", "Hardware"],
      link: "https://github.com/lzy-0321/comp3601"
    },
    {
      code: "COMP3311",
      name: "Database Systems",
      university: "University of new south wales",
      description: "Data models: entity-relationship, relational, object-oriented. Relational database management systems. Database design: normalization, integrity constraints, triggers. SQL programming: views, functions, stored procedures. Database application design and development.",
      type: ["Database"],
      link: "https://github.com/lzy-0321/comp3311"
    },
    {
      code: "COMP9444",
      name: "Neural Networks, Deep Learning",
      university: "University of new south wales",
      description: "Neural networks and deep learning architectures, including convolutional networks, recurrent networks, and attention mechanisms. Applications in computer vision, natural language processing, and reinforcement learning.",
      type: ["AI"],
      link: "https://github.com/lzy-0321/comp9444"
    },
    {
      code: "COMP3121",
      name: "Algorithms & Programming Tech",
      university: "University of new south wales",
      description: "Design and analysis of algorithms. Complexity theory. Algorithmic strategies. Advanced data structures. Graph algorithms. String algorithms. Geometric algorithms. Selected advanced topics.",
      type: ["Theory"],
      link: "https://github.com/lzy-0321/comp3121"
    },
    {
      code: "COMP2511",
      name: "O-O Design & Programming",
      university: "University of new south wales",
      description: "Object-oriented design: software principles, design patterns, UML. Java programming: inheritance, polymorphism, interfaces, generics, collections, GUI programming. Software development practices: testing, version control, documentation.",
      type: ["Programming"],
      link: "https://github.com/lzy-0321/comp2511"
    },
    {
      code: "COMP3331",
      name: "Computer Networks&Applications",
      university: "University of new south wales",
      description: "Networking concepts, protocols and architectures. Internet protocols. Network programming. Client-server computing. Web technologies. Network security. Wireless and mobile networks.",
      type: ["Networks"],
      link: "https://github.com/lzy-0321/COMP3331"
    },
    {
      code: "COMP3231",
      name: "Operating Systems",
      university: "University of new south wales",
      description: "Operating system concepts: processes, threads, scheduling, synchronization, memory management, file systems, I/O, security. System programming in C. Case studies of real operating systems.",
      type: ["Systems"],
      link: "https://github.com/lzy-0321/cs3231"
    },
    {
      code: "COMP3222",
      name: "Digital Circuits and Systems",
      university: "University of new south wales",
      description: "Digital logic design, combinational and sequential circuits, hardware description languages (VHDL), finite state machines, digital system components, computer arithmetic, memory systems.",
      type: ["Hardware"],
      link: "https://github.com/lzy-0321/COMP3222"
    },
    {
      code: "COMP1531",
      name: "Software Eng Fundamentals",
      university: "University of new south wales",
      description: "Introduction to software engineering principles. JS programming, testing, version control, agile development methodologies, team collaboration, and basic web development.",
      type: ["Software Engineering"],
      link: "https://github.com/lzy-0321/COMP1531"
    },
    {
      code: "ELEC2133",
      name: "Analogue Electronics",    
      university: "University of new south wales",
      description: "Semiconductor devices, diodes, transistors, operational amplifiers. Circuit analysis and design. Frequency response. Feedback systems. Power electronics. Practical circuit implementation.",
      type: ["Hardware"],
      link: ""
    },
    {
      code: "DESN2000",
      name: "Engineering Design 2",
      university: "University of new south wales",
      description: "Engineering design process, project management, teamwork, communication skills, sustainable design, engineering ethics, and professional practice through hands-on design projects.",
      type: ["Design"],
      link: "https://github.com/lzy-0321/desn2000"
    },
    {
      code: "COMP2521",
      name: "Data Structures and Algorithms",
      university: "University of new south wales",
      description: "Fundamental data structures (lists, trees, graphs, hash tables), algorithm analysis, sorting and searching algorithms, recursive algorithms, abstract data types, implementation in C.",
      type: ["Theory"],
      link: "https://github.com/lzy-0321/COMP2521"
    },    
    {
      code: "COMP1521",
      name: "Computer Systems Fundamentals",
      university: "University of new south wales",
      description: "Computer organization and architecture, assembly language programming, system software, memory hierarchy, input/output systems, low-level programming in C.",
      type: ["Systems"],
      link: "https://github.com/lzy-0321/COMP1521"
    },
    {
      code: "DPST1081",
      name: "Elec and Telecoms Engineering",
      university: "University of new south wales",
      description: "Introduction to electrical and telecommunications engineering principles. Circuit theory, digital systems, signals and systems, telecommunications fundamentals.",
      type: ["Hardware"],
      link: ""
    },
    {
      code: "DPST1071",
      name: "Intro to Eng Des and Innov",
      university: "University of new south wales",
      description: "Introduction to engineering design thinking, innovation processes, problem-solving methodologies, and professional skills through practical design challenges.",
      type: ["Design"],
      link: ""
    },
    {
      code: "COMP1511",
      name: "Introduction to Programming",
      university: "University of new south wales",
      description: "Programming fundamentals using C, problem-solving techniques, basic data structures, algorithms, debugging skills, and software development principles.",
      type: ["Programming"],
      link: "https://github.com/lzy-0321/COMP1511"
    }
  ] satisfies Course[],
} as const;
