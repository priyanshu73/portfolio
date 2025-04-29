"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, ExternalLink, Mail, Linkedin, Send } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Typewriter } from "@/components/typewriter" // Assuming this component exists
import { useEffect, useState } from "react"

const projects = [
  {
    id: 1,
    title: "Sphere",
    description: "A no-code platform empowering retail investors to access hedge fund-like tools to create, automate, and deploy trading strategies without coding expertise",
    image: "/placeholderimage1.gif", // Replace with actual image path
    github: "https://github.com/priyanshu73/sphereFrontend", // Replace with actual GitHub link
    demo: "https://github.com/priyanshu73/sphereFrontend", // Replace with actual demo link
  },
  {
    id: 2,
    title: "Immersion Nepal",
    description: "A sleek website crafted with Next.js and Tailwind CSS, showcasing modern UI/UX design, responsive layouts, and optimized performance for an exceptional user experience.",
    image: "/placeholderimage5.gif",
    github: "https://github.com/priyanshu73",
    demo: "https://www.immersionnepal.com",
  },
  {
    id: 3,
    title: "Faras",
    description: "A 3 Card Poker game utilizing Object-Oriented Programming (OOP) principles to deliver modular, maintainable code for a dynamic, casino-style card game experience.",
    image: "/placeholderimage2.gif",
    github: "https://github.com/priyanshu73/3card-poker",
    demo: "https://github.com/priyanshu73/3card-poker",
  },
  {
    id: 4,
    title: "Shape Editor",
    description: "A JavaFX-based Shape Editor that allows users to create and edit various shapes with fill/outline options, supporting delete, move, group, copy, and file save/load features.",
    image: "/placeholderimage3.gif",
    github: "https://github.com/priyanshu73",
    demo: "https://github.com/priyanshu73",
  },{
    id: 5,
    title: "Dermafyr",
    description: "Dermafyr uses AI for 91% accurate skin analysis, offering personalized skincare and product recommendations. Built with React and TensorFlow, it runs offline on Raspberry Pi kiosks and online",
    image: "/placeholderimage4.gif",
    github: "https://github.com/priyanshu73/ycp2024",
    demo: "https://github.com/priyanshu73/ycp2024",
  },
  {
    id: 6,
    title: "This",
    description: "Welcome to my portfolio. The base case was never reached.",
    image: "/placeholderimage6.gif",
    github: "https://github.com/priyanshu73",
    demo: "/",
  },
];

// --- Devicon Skill Data ---
const languages = [
  { name: "JavaScript", iconClass: "devicon-javascript-plain colored" },
  { name: "TypeScript", iconClass: "devicon-typescript-plain colored" },
  { name: "Python", iconClass: "devicon-python-plain colored" },
  { name: "Java", iconClass: "devicon-java-plain colored" },
  { name: "C++", iconClass: "devicon-cplusplus-plain colored" },
  { name: "SQL", iconClass: "devicon-azuresqldatabase-plain colored" }, // Generic SQL or specific DB like PostgreSQL
  { name: "HTML5", iconClass: "devicon-html5-plain colored" },
  { name: "CSS3", iconClass: "devicon-css3-plain colored" },
];

const frontend = [
  { name: "React", iconClass: "devicon-react-original colored" },
  { name: "Next.js", iconClass: "devicon-nextjs-original colored" }, // Use 'colored' for dark mode too
  { name: "TailwindCSS", iconClass: "devicon-tailwindcss-plain colored" },
  { name: "Redux", iconClass: "devicon-redux-original colored" },
  { name: "Vue.js", iconClass: "devicon-vuejs-plain colored" },
  { name: "Angular", iconClass: "devicon-angularjs-plain colored" },
  { name: "SASS", iconClass: "devicon-sass-original colored" },
  { name: "Webpack", iconClass: "devicon-webpack-plain colored" },
];

const backend = [
  { name: "Node.js", iconClass: "devicon-nodejs-plain colored" },
  { name: "Express", iconClass: "devicon-express-original colored" }, // Use 'colored' for dark mode too
  { name: "Django", iconClass: "devicon-django-plain colored" },
  { name: "Flask", iconClass: "devicon-flask-original colored" }, // Use 'colored' for dark mode too
  { name: "Spring", iconClass: "devicon-spring-plain colored" },
  { name: "MongoDB", iconClass: "devicon-mongodb-plain colored" },
  { name: "PostgreSQL", iconClass: "devicon-postgresql-plain colored" },
  { name: "Firebase", iconClass: "devicon-firebase-plain colored" },
];

const tools = [
  { name: "Git", iconClass: "devicon-git-plain colored" },
  { name: "Docker", iconClass: "devicon-docker-plain colored" },
  { name: "AWS", iconClass: "devicon-amazonwebservices-original colored" },
  { name: "Vercel", iconClass: "devicon-vercel-original colored" }, // Use 'colored' for dark mode too
  { name: "VS Code", iconClass: "devicon-vscode-plain colored" },
  { name: "Figma", iconClass: "devicon-figma-plain colored" },
  { name: "Jira", iconClass: "devicon-jira-plain colored" },
  { name: "GitHub Actions", iconClass: "devicon-githubactions-plain colored" }, // Check if this exists or use GitHub icon
];
// --- End Devicon Skill Data ---


export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        const data = await response.json();
        setError(data.message || "Failed to send message");
      }
    } catch (err)
    {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      // Adjusted sections list to remove 'experience'
      const sections = ["hero", "projects", "skills", /* "experience", */ "contact"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Adjust scroll detection threshold if needed
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    
    <div className="min-h-screen font-mono bg-background text-foreground flex flex-col">
      
     
      {/* macOS Dock-style navigation at the top */}
      <div className="sticky top-0 z-50 pt-4 pb-2 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="bg-card/80 backdrop-blur-md border rounded-full px-4 py-2 shadow-lg flex items-center space-x-4 max-w-3xl">
              {/* About Button */}
              <button
                onClick={() => scrollToSection("hero")}
                className={`p-2 rounded-full transition-all duration-200 dock-icon ${
                  activeSection === "hero" ? "bg-primary/20 text-primary scale-110" : "hover:bg-muted"
                }`}
                aria-label="About Me"
              >
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-xs mt-1">About</span>
                </div>
              </button>
              {/* Projects Button */}
              <button
                onClick={() => scrollToSection("projects")}
                className={`p-2 rounded-full transition-all duration-200 dock-icon ${
                  activeSection === "projects" ? "bg-primary/20 text-primary scale-110" : "hover:bg-muted"
                }`}
                aria-label="Projects"
              >
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path
                        fillRule="evenodd"
                        d="M14.447 3.027a.75.75 0 01.527.92l-4.5 16.5a.75.75 0 01-1.448-.394l4.5-16.5a.75.75 0 01.921-.526zM16.72 6.22a.75.75 0 011.06 0l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 010-1.06zm-9.44 0a.75.75 0 010 1.06L2.56 12l4.72 4.72a.75.75 0 11-1.06 1.06L.97 12.53a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-xs mt-1">Projects</span>
                </div>
              </button>
              {/* Skills Button */}
              <button
                onClick={() => scrollToSection("skills")}
                className={`p-2 rounded-full transition-all duration-200 dock-icon ${
                  activeSection === "skills" ? "bg-primary/20 text-primary scale-110" : "hover:bg-muted"
                }`}
                aria-label="Skills"
              >
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                      <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                      <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                    </svg>
                  </div>
                  <span className="text-xs mt-1">Skills</span>
                </div>
              </button>

              {/* --- Experience Button Commented Out --- */}
              {/*
              <button
                onClick={() => scrollToSection("experience")}
                className={`p-2 rounded-full transition-all duration-200 dock-icon ${
                  activeSection === "experience" ? "bg-primary/20 text-primary scale-110" : "hover:bg-muted"
                }`}
                aria-label="Experience"
              >
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path
                        fillRule="evenodd"
                        d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                      />
                      <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
                    </svg>
                  </div>
                  <span className="text-xs mt-1">Experience</span>
                </div>
              </button>
              */}
              {/* --- End Experience Button Commented Out --- */}

              {/* Contact Button */}
              <button
                onClick={() => scrollToSection("contact")}
                className={`p-2 rounded-full transition-all duration-200 dock-icon ${
                  activeSection === "contact" ? "bg-primary/20 text-primary scale-110" : "hover:bg-muted"
                }`}
                aria-label="Contact"
              >
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                  </div>
                  <span className="text-xs mt-1">Contact</span>
                </div>
              </button>
              {/* Theme Toggle */}
              <div className="ml-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 container py-6 pt-8">
        {/* Hero Section */}
        <section id="hero" className="py-10 md:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-lg border bg-card shadow-lg overflow-hidden">
              {/* Mac window controls */}
              <div className="flex items-center p-3 border-b bg-muted/30">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-sm font-medium">Terminal — whoami</div>
              </div>

              <div className="p-6">
                <div className="grid gap-8 md:grid-cols-[1fr_auto]">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="inline-block text-foreground/60">
                        <Typewriter text="$ whoami" delay={80} onComplete={() => {}} />
                      </div>
                      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl relative">
                        <Typewriter text="Priyanshu Pyakurel" delay={80} className="inline-flex" />
                      </h1>
                      <p className="text-lg text-foreground/80">Computer Science Student | Developer</p>
                    </div>

                    <div className="space-y-4">
                    <p>
  Hey! I'm a Computer Science student who loves learning new tech and building cool stuff. Right now, I’m focused on an automated trading platform, but I’m always open to new challenges.
</p>
<p>
  I have a deep passion for math, particularly linear algebra, and I admire how it applies to technology and the real world. I’m also passionate about cinema, with filmmaking being one of my hobbies. Some of my favorite films include <em>Se7en</em>, <em>The Truman Show</em>, <em>The Shining</em>, <em>Terminator 2</em>, <em>Fargo</em>, <em>Goodfellas</em>, and many more.
</p>

                    </div>

                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="icon">
                        <Link href="https://github.com/priyanshu73" target="_blank">
                          <Github className="h-4 w-4" />
                          <span className="sr-only">GitHub</span>
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="icon">
                        <Link href="https://www.linkedin.com/in/priyanshu-pyakurel/" target="_blank">
                          <Linkedin className="h-4 w-4" />
                          <span className="sr-only">LinkedIn</span>
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="icon">
                        <Link href="mailto:pyakurelpriyanshu73@gmail.com">
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">Email</span>
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="relative h-[200px] w-[200px] overflow-hidden rounded-full border-2 border-foreground/10 bg-muted">
                      <Image
                        // Replace with your actual image path or use a placeholder service properly
                        src="/dp1.png" // Using a local placeholder or update path
                        alt="Profile"
                        width={200}
                        height={200}
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-10">
          <div className="space-y-6">
            <div className="inline-block text-foreground/60">
              <span className="text-primary">$</span> ls -la ./projects
            </div>
            <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {projects.map((project) => (
                <Card key={project.id} className="flex flex-col overflow-hidden border bg-card">
                  <CardHeader className="p-4">
                    <div className="flex items-center">
                      <div className="flex space-x-2">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      </div>
                      <CardTitle className="ml-4 text-sm">project-{project.title}.sh</CardTitle>
                    </div>
                  </CardHeader>
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <Image
                      // Replace with actual project images or use a placeholder service properly
                      src ={project.image} // Using a local placeholder or update path
                      alt={`Project ${project.id}`}
                      width={400}
                      height={225} // Maintain aspect ratio
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-4 flex-grow">
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {project.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-4 pt-0">
                    <Button asChild variant="outline" size="sm">
                      <Link href= {project.github} target="_blank">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={project.demo} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section (with Devicons) */}
        <section id="skills" className="py-10">
          <div className="space-y-6">
            <div className="inline-block text-foreground/60">
              <span className="text-primary">$</span> grep -r "skills" ./
            </div>
            <div className="rounded-lg border bg-card shadow-lg overflow-hidden">
              {/* Mac window controls */}
              <div className="flex items-center p-3 border-b bg-muted/30">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-sm font-medium">Terminal — skills.json</div>
              </div>
              <div className="p-6">
                <Tabs defaultValue="languages" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4"> {/* Adjusted grid cols */}
                    <TabsTrigger value="languages">Languages</TabsTrigger>
                    <TabsTrigger value="frontend">Frontend</TabsTrigger>
                    <TabsTrigger value="backend">Backend</TabsTrigger>
                    <TabsTrigger value="tools">Tools</TabsTrigger>
                  </TabsList>

                  {/* Languages Tab */}
                  <TabsContent value="languages" className="mt-6"> {/* Increased margin top */}
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-4"> {/* Adjusted gap */}
                      {languages.map((skill) => (
                        <div key={skill.name} className="flex flex-col items-center gap-2 w-20 text-center" title={skill.name}>
                          <i className={`${skill.iconClass} text-4xl transition-transform duration-200 hover:scale-110`}></i>
                          <span className="text-xs text-muted-foreground">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Frontend Tab */}
                  <TabsContent value="frontend" className="mt-6">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-4">
                      {frontend.map((skill) => (
                         <div key={skill.name} className="flex flex-col items-center gap-2 w-20 text-center" title={skill.name}>
                          <i className={`${skill.iconClass} text-4xl transition-transform duration-200 hover:scale-110`}></i>
                          <span className="text-xs text-muted-foreground">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Backend Tab */}
                  <TabsContent value="backend" className="mt-6">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-4">
                      {backend.map((skill) => (
                         <div key={skill.name} className="flex flex-col items-center gap-2 w-20 text-center" title={skill.name}>
                          <i className={`${skill.iconClass} text-4xl transition-transform duration-200 hover:scale-110`}></i>
                          <span className="text-xs text-muted-foreground">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Tools Tab */}
                  <TabsContent value="tools" className="mt-6">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-4">
                      {tools.map((skill) => (
                         <div key={skill.name} className="flex flex-col items-center gap-2 w-20 text-center" title={skill.name}>
                          <i className={`${skill.iconClass} text-4xl transition-transform duration-200 hover:scale-110`}></i>
                          <span className="text-xs text-muted-foreground">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        {/* --- Experience Section Commented Out --- */}
        {/*
        <section id="experience" className="py-10">
          <div className="space-y-6">
            <div className="inline-block text-foreground/60">
              <span className="text-primary">$</span> cat ./experience.log
            </div>
            <div className="rounded-lg border bg-card shadow-lg overflow-hidden">
              <div className="flex items-center p-3 border-b bg-muted/30">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-sm font-medium">Terminal — experience.log</div>
              </div>
              <div className="p-6 space-y-6">
                {[
                  {
                    title: "Software Engineer Intern",
                    company: "Tech Company",
                    period: "Jun 2023 - Aug 2023",
                    description:
                      "Developed and maintained web applications using React and Node.js. Collaborated with the team to implement new features and fix bugs.",
                  },
                  {
                    title: "Research Assistant",
                    company: "University Lab",
                    period: "Jan 2023 - May 2023",
                    description:
                      "Assisted in research on machine learning algorithms. Implemented and tested models for data analysis.",
                  },
                  {
                    title: "Web Developer",
                    company: "Student Organization",
                    period: "Sep 2022 - Dec 2022",
                    description:
                      "Designed and developed the organization's website. Maintained and updated content regularly.",
                  },
                ].map((exp, index) => (
                  <Card key={index} className="border bg-card">
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{exp.title}</CardTitle>
                          <CardDescription>{exp.company}</CardDescription>
                        </div>
                        <Badge variant="outline">{exp.period}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p>{exp.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
        */}
        {/* --- End Experience Section Commented Out --- */}

        {/* Contact Section */}
        <section id="contact" className="py-10">
          <div className="space-y-6">
            <div className="inline-block text-foreground/60">
              <span className="text-primary">$echo "Let's connect"  ./contact.txt</span> 
            </div>
            <div className="rounded-lg border bg-card shadow-lg overflow-hidden">
              {/* Mac window controls */}
              <div className="flex items-center p-3 border-b bg-muted/30">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-sm font-medium">Terminal — contact.form</div>
              </div>
              <div className="p-6">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="Your name"
                        value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="Your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                   
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="Your message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                 
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Sending..." : <><Send className="mr-2 h-4 w-4" /> Send Message</>}
      </Button>
      {success && <p className="text-green-500 mt-2">Message sent successfully!</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
                  </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Priyanshu Pyakurel. All rights reserved.</p>
          <div className="flex items-center space-x-1">
            <div className="text-sm text-muted-foreground">
              <span className="text-primary">$</span> exit
            </div>
            <div className="h-4 w-2 animate-blink bg-primary"></div>
          </div>
        </div>
      </footer>
    </div>
  )
}
