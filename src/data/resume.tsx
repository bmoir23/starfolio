import { Icons } from "@/components/icons";
import {
  House,
  Library,
  Workflow,
  Network,
  Database,
  Sparkles,
  Bot,
  Cloud,
  Server,
  BrainCircuit,
} from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";

export const DATA = {
  name: "Brian Moir",
  initials: "BM",
  url: "https://portfolio.brianmoir.dev",
  location: "Knoxville, TN (Remote, US)",
  locationLink: "https://www.google.com/maps/place/knoxville+tn",
  description:
    "AI Solutions Architect specializing in multi-agent systems, RAG pipelines, and enterprise AI orchestration.",
  summary:
    "I'm the CTO & Principal AI Architect at [Liink'd](/#work), where I designed the Syncc Executive Agent OS — a production multi-agent AI platform built on LangChain orchestration, the MCP protocol, n8n agentic workflows, and vector database retrieval. I bring [7+ years of customer-facing technical experience](/#work) across SaaS, enterprise solutions, and platform consulting, and I'm currently [advancing my studies in Computer Science & AI Engineering at the University of Maryland](/#education). I specialize in [agentic system design, advanced prompt engineering, and AI orchestration](/#skills) on modern cloud infrastructure including GCP and Vertex AI.",
  avatarUrl: "/brian-moir.png",
  resumeUrl:
    "https://docs.google.com/document/d/1b1bkDDj_6spetyCchz22X0rbsx7bbKB1bb2YbwD3JYI/edit?usp=sharing",
  ogImage: "/og_image.png",
  sections: {
    about: { order: 1, enabled: true, heading: "About" },
    work: { order: 2, enabled: true, heading: "Work Experience", presentLabel: "Present" },
    education: { order: 3, enabled: true, heading: "Education & Certifications" },
    skills: { order: 4, enabled: true, heading: "Skills" },
    projects: {
      order: 5, enabled: true,
      label: "My Work",
      heading: "Things I've architected & shipped",
      text: "A selection of AI platforms and pipelines I've designed and built — from multi-agent orchestration systems to production RAG and data-extraction infrastructure.",
    },
    hackathons: {
      order: 7, enabled: false,
      label: "Hackathons",
      heading: "I like building things",
      text: "",
    },
    photos: {
      order: 6, enabled: false,
      heading: "My Recent Travels",
    },
    contact: {
      order: 8, enabled: true,
      label: "Contact",
      heading: "Get in Touch",
      text: "Open to AI architecture, agentic systems, and AI engineering roles. Connect with me on LinkedIn or email me directly and I'll get back to you.",
    },
  },
  photos: [],
  skills: [
    { name: "Python", icon: Python },
    { name: "TypeScript", icon: Typescript },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "React", icon: ReactLight },
    { name: "Node.js", icon: Nodejs },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "LangChain", icon: Workflow },
    { name: "LangGraph", icon: Network },
    { name: "n8n", icon: Workflow },
    { name: "MCP Protocol", icon: Network },
    { name: "RAG Pipelines", icon: Database },
    { name: "Vector Databases", icon: Database },
    { name: "OpenAI", icon: Sparkles },
    { name: "Anthropic Claude", icon: Bot },
    { name: "AWS Lambda", icon: Cloud },
    { name: "Terraform", icon: Server },
    { name: "Cloudflare Workers", icon: Cloud },
    { name: "Supabase", icon: Database },
    { name: "Vertex AI", icon: BrainCircuit },
    { name: "Docker", icon: Docker },
  ],
  navbar: [
    { href: "/", icon: House, label: "Home" },
    { href: "/blog", icon: Library, label: "Blog" },
  ],
  contact: {
    email: "hireme@brianmoir.dev",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/bmoir23",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/brian-moir",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:hireme@brianmoir.dev",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Liink'd",
      href: "https://get.liinkd.xyz",
      badges: ["CTO"],
      location: "Knoxville, TN (Remote)",
      title: "CTO & Principal AI Architect",
      logoUrl: "https://www.google.com/s2/favicons?domain=liinkd.xyz&sz=128",
      start: "January 2023",
      end: undefined,
      description:
        "Lead all technical strategy, AI architecture, and platform engineering for a creator-infrastructure startup building agentic AI tooling. Architected the Syncc Executive Agent OS — a production multi-agent AI platform integrating LangChain orchestration, MCP servers, n8n automation, and vector retrieval with configurable human-in-the-loop oversight and behavioral governance. Designed RAG document Q&A pipelines with DeepEval-based evaluation, a Terraform/AWS Lambda structured data-extraction pipeline, and advanced prompt-engineering frameworks across GPT-4, Claude, and open-source models. Established MLOps standards with AI Gateway routing for cost governance, observability, and latency optimization across cloud providers.",
    },
    {
      company: "Benzinga",
      href: "https://www.benzinga.com",
      badges: [],
      location: "Detroit Lakes, MN (Remote)",
      title: "Customer Success & Technical Solutions Manager",
      logoUrl: "https://www.google.com/s2/favicons?domain=benzinga.com&sz=128",
      start: "January 2020",
      end: "May 2022",
      description:
        "Served as the primary technical bridge between enterprise customers and core engineering teams for a leading financial data and trading SaaS platform. Ran end-to-end technical discovery with enterprise clients, translating complex trading and data requirements into integration roadmaps that drove churn reduction and expansion revenue. Architected an in-house customer-facing ticketing and feedback system for feature tracking, real-time bug triage, and CX analytics. Led CXO-level technical pursuits as the SME during sales cycles, and expanded the Web3/blockchain vertical to 100K+ subscribers and 1M+ views.",
    },
    {
      company: "Storetasker / Ask Lorem",
      href: "https://www.storetasker.com",
      badges: [],
      location: "New York, NY (Remote)",
      title: "Customer Success Manager & Project Manager",
      logoUrl: "https://www.google.com/s2/favicons?domain=storetasker.com&sz=128",
      start: "August 2019",
      end: "January 2020",
      description:
        "Managed technical project scoping and expert-client matching on a Shopify development marketplace, overseeing end-to-end delivery of web development and e-commerce integration engagements across a network of 200+ developers. Resolved complex platform escalations, defined SOPs for technical quality review, and partnered with the Director of Operations on workflow optimization and capacity planning.",
    },
    {
      company: "Ketamine Media / Upwork",
      href: "https://www.upwork.com",
      badges: ["Freelance"],
      location: "Remote",
      title: "Full-Stack Developer & Digital Marketing Consultant",
      logoUrl: "https://www.google.com/s2/favicons?domain=upwork.com&sz=128",
      start: "January 2018",
      end: "December 2020",
      description:
        "Built custom WordPress themes, RESTful API integrations, and client-side JavaScript/React applications. Managed Google Ads campaigns, SEO strategy, and PPC optimization across multiple client accounts.",
    },
  ],
  education: [
    {
      school: "University of Maryland",
      href: "https://www.umd.edu",
      degree: "B.S. Computer Science — AI Engineering",
      logoUrl: "https://www.google.com/s2/favicons?domain=umd.edu&sz=128",
      start: "2023",
      end: "Present",
    },
    {
      school: "Coursera",
      href: "https://www.credly.com/users/bmoir",
      degree: "Google AI Professional Certificate",
      logoUrl: "https://www.google.com/s2/favicons?domain=coursera.org&sz=128",
      start: "",
      end: "",
    },
    {
      school: "Coursera",
      href: "https://www.credly.com/users/bmoir",
      degree: "Google DeepMind for Developers Certification",
      logoUrl: "https://www.google.com/s2/favicons?domain=coursera.org&sz=128",
      start: "",
      end: "",
    },
    {
      school: "Coursera",
      href: "https://www.credly.com/users/bmoir",
      degree: "Microsoft AI / ML Certification",
      logoUrl: "https://www.google.com/s2/favicons?domain=coursera.org&sz=128",
      start: "",
      end: "",
    },
    {
      school: "Coursera",
      href: "https://www.credly.com/users/bmoir",
      degree: "Google Project Management Certificate",
      logoUrl: "https://www.google.com/s2/favicons?domain=coursera.org&sz=128",
      start: "",
      end: "",
    },
    {
      school: "SkillShare / University of the People",
      href: "https://www.credly.com/users/bmoir",
      degree: "IBM Cybersecurity Certification",
      logoUrl: "https://www.google.com/s2/favicons?domain=ibm.com&sz=128",
      start: "",
      end: "",
    },
  ],
  projects: [
    {
      title: "Syncc Executive Agent OS",
      href: "https://get.liinkd.xyz",
      dates: "2023 - Present",
      active: true,
      description:
        "A production-grade multi-agent AI platform enabling enterprise autonomous task execution. Integrates LangChain orchestration, MCP servers, n8n automation, and vector retrieval, with configurable human-in-the-loop oversight, behavioral governance, and AI Gateway routing for cost and latency control.",
      technologies: [
        "LangChain",
        "MCP Protocol",
        "n8n",
        "Next.js 15",
        "Supabase",
        "Cloudflare Workers",
        "AI Gateway",
        "Vector DB",
      ],
      links: [
        {
          type: "Website",
          href: "https://get.liinkd.xyz",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "RAG Document Q&A Pipeline",
      href: "https://get.liinkd.xyz",
      dates: "2024",
      active: true,
      description:
        "A retrieval-augmented generation pipeline for high-fidelity enterprise knowledge extraction, built with a DeepEval-based evaluation framework. Implements OpenAI embeddings, cosine-similarity search, and tuned chunking strategies for accurate, grounded document Q&A.",
      technologies: [
        "Python",
        "LangChain",
        "OpenAI Embeddings",
        "DeepEval",
        "Vector DB",
        "RAG",
      ],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Structured Data Extraction Pipeline",
      href: "https://get.liinkd.xyz",
      dates: "2024",
      active: true,
      description:
        "An MLOps-style pipeline that turns unstructured inputs into governed, schema-validated data outputs. Runs on AWS Lambda with Terraform infrastructure-as-code, automated quality controls, and CI/CD deployment — analogous to production data-orchestration patterns.",
      technologies: [
        "AWS Lambda",
        "Terraform",
        "Python",
        "CI/CD",
        "Schema Validation",
      ],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "MCP Enterprise Integration Layer",
      href: "https://get.liinkd.xyz",
      dates: "2024",
      active: true,
      description:
        "An integration layer built on the MCP server protocol that connects AI agents to Notion, Jira, ClickUp, and Confluence — enabling cross-system agentic orchestration with governed data access and full audit logging.",
      technologies: [
        "MCP Protocol",
        "TypeScript",
        "Notion",
        "Jira",
        "ClickUp",
        "Confluence",
      ],
      links: [],
      image: "",
      video: "",
    },
  ],
  hackathons: [],
} as const;
