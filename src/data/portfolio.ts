export const profile = {
  name: "Isaiah Saul F. Serrano",
  firstName: "ISAIAH",
  lastName: "SERRANO",
  role: "Web Developer / IT Support",
  summary:
    "I build practical web and desktop tools, and keep hardware, systems, and people running. BSIT graduate with academic distinction, based in Santa Rosa, Laguna.",
  email: "saulisaiah24@gmail.com",
  emailHref: "https://mail.google.com/mail/?view=cm&fs=1&to=saulisaiah24@gmail.com",
  github: "https://github.com/Cartiace24",
  githubLabel: "github.com/Cartiace24",
  phone: "+63 995 654 2892",
  location: "Santa Rosa, Laguna, PH",
  photo: "/profile.png",
};

export const projects = [
  {
    index: "01",
    title: "Sortly — File Organizer",
    status: "DESKTOP",
    description:
      "Desktop file organizer that automatically sorts files into categorized folders for cleaner workspace management.",
    tech: ["Electron Builder", "Node.js", "JavaScript", "HTML", "CSS"],
  },
  {
    index: "02",
    title: "#HopeAI (Thesis)",
    status: "THESIS",
    description:
      "A chatbot providing counseling and emotional support to LGBTQ+ individuals, built as an undergraduate thesis.",
    tech: ["PHP", "SQL", "JavaScript", "API", "HTML", "CSS"],
  },
  {
    index: "03",
    title: "Personal Portfolio",
    status: "LIVE",
    description:
      "Responsive portfolio site showcasing projects, technical skills, certifications, and work experience through a modern interface.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  },
  {
    index: "04",
    title: "Job Application Tracker",
    status: "DESKTOP",
    description:
      "Desktop tracker to organize applications, monitor statuses, store notes, and manage job links in one responsive interface.",
    tech: ["Electron Builder", "Node.js", "JavaScript", "HTML", "CSS"],
  },
];

export const experience = [
  {
    period: "Jun 2024 — May 2026",
    title: "IT Technician",
    org: "Freelance",
    current: true,
    bullets: [
      "Delivered technical consultation for repairs and upgrades.",
      "Performed system restoration, troubleshooting, and root-cause diagnosis for hardware and software issues.",
      "Installed and configured operating systems, drivers, and essential applications for end-users.",
    ],
  },
  {
    period: "Jan 2024 — Jul 2024",
    title: "Data Entry",
    org: "Freelance",
    current: false,
    bullets: [
      "Recorded website marketing strategies using Loom.",
      "Managed and organized recording links in Google Sheets.",
      "Ensured accurate and consistent data entry.",
    ],
  },
  {
    period: "Jan 2024 — May 2024",
    title: "IT Support / Customer Service",
    org: "General Tinio Municipal Police Station · Internship",
    current: false,
    bullets: [
      "Troubleshot both software and hardware issues.",
      "Assisted with minor tasks as a social media handler.",
      "Handled customer service for individuals obtaining Police Clearance.",
    ],
  },
];

export const education = {
  degree: "BS in Information Technology",
  school: "Nueva Ecija University of Science and Technology",
  period: "2020 — 2024",
  place: "Cabanatuan City, Nueva Ecija",
  honor: "Academic Distinction",
};

export const certifications = [
  {
    title: "IT Specialist in HTML and CSS",
    issuer: "Certiport — A Pearson Business",
    date: "Nov 2023",
  },
  {
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "Sep 2023",
  },
  {
    title: "Python Essentials 2",
    issuer: "Cisco Networking Academy",
    date: "Sep 2023",
  },
];

export const skillGroups = [
  {
    label: "Web Stack",
    items: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  },
  { label: "Core Languages", items: ["JavaScript", "Python", "PHP", "SQL", "HTML", "CSS"] },
  { label: "Desktop & Runtime", items: ["Electron", "Node.js", "Electron Builder"] },
  { label: "Tools & Workflow", items: ["Git", "GitHub", "VS Code", "REST APIs", "AI-Assisted Dev"] },
  { label: "IT & Admin", items: ["Technical Support", "Data Entry", "Customer Service"] },
  { label: "Languages", items: ["English", "Filipino"] },
];
