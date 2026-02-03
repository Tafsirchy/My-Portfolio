// Portfolio Data
export const personalInfo = {
  name: "Tafsir Chowdhury",
  tagline: "Web Developer",
  headline: "Building amazing web experiences with modern technologies",
  email: "tafsirchy1000@gmail.com",
  phone: "+880 1633996633",
  whatsapp: "+880 1633996633", // Added for direct contact
  location: "Dhaka, Bangladesh",
  bio: "I'm a passionate web developer with expertise in building modern, responsive, and user-friendly web applications. I love working with cutting-edge technologies and creating seamless user experiences.",
  resume: "/assets/React & Next.js Resume.pdf",
};

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/Tafsirchy",
    icon: "Github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/tafsirchy/",
    icon: "Linkedin",
  },
  {
    name: "Twitter",
    url: "https://x.com/chy_tafsir",
    icon: "Twitter",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/tafsir.chowdhury.973567",
    icon: "Facebook",
  },
];

export const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React", icon: "⚛️", level: 90 },
      { name: "JavaScript", icon: "🟨", level: 95 },
      { name: "TypeScript", icon: "🔷", level: 85 },
      { name: "HTML5", icon: "🟧", level: 95 },
      { name: "CSS3", icon: "🎨", level: 90 },
      { name: "Tailwind CSS", icon: "💨", level: 90 },
    ],
  },
  {
    category: "Backend & Tools",
    items: [
      { name: "Node.js", icon: "🟢", level: 80 },
      { name: "Express", icon: "⚡", level: 75 },
      { name: "MongoDB", icon: "🍃", level: 70 },
      { name: "Git", icon: "🔀", level: 90 },
      { name: "VS Code", icon: "💻", level: 95 },
      { name: "Figma", icon: "🎨", level: 80 },
    ],
  },
];

export const education = [
  {
    id: 1,
    institution: "International University of Business Agriculture and Technology",
    degree: "Bachelor of Science in Computer Science",
    duration: "2023 - 2027",
    description: "Currently completing graduation with a focus on web development, software engineering, and data structures. Continuously working on practical projects using modern web technologies.",
    gpa: "3.5/4.0",
  },
  {
    id: 2,
    institution: "Programming Hero",
    degree: "MERN Stack Development Certification",
    duration: "2025",
    description: "Comprehensive certification covering modern web technologies, including React, Node.js, Next.js, MongoDB, and Firebase, along with hands-on experience in deploying applications using Vercel, Netlify, Firebase Hosting, Surge, and cloud platforms.",
  },
];

export const experience = [
  {
  id: 1,
  company: "University Project",
  position: "Backend Developer",
  duration: "2025",
  description: "Developed a backend-focused Hotel Management System as a university project using PHP and MySQL, with HTML and CSS for the user interface. Implemented core features for managing hotel operations and data handling.",
  achievements: [
    "Designed and implemented a relational database using MySQL",
    "Built CRUD functionality for hotel rooms, bookings, and customer records",
    "Integrated server-side logic using PHP for data validation and processing",
  ],
},

  {
    id: 2,
    company: "Startup Name",
    position: "Web Developer Intern",
    duration: "2021 - 2022",
    description: "Assisted in building responsive web interfaces and implementing new features for the company's main product.",
    achievements: [
      "Built 5+ reusable components",
      "Fixed critical bugs",
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "MotruBi",
    description: "A modern, full-stack e-commerce application built with Next.js 16, featuring a comprehensive motorcycle shopping experience, cart management, checkout system, and user dashboards.",
    images: [
      "/assets/MotruBi1.png",
      "/assets/MotruBi2.png"
    ], 
    technologies: ["Next.js", "React", "Tailwind CSS", "Express", "Stripe", "NextAuth.js", "shadcn/ui"],
    liveUrl: "https://motrubi.vercel.app/",
    githubUrl: "https://github.com/Tafsirchy/Nextjs-Project",
    githubServerUrl: "https://github.com/Tafsirchy/MotruBi-Backend",
    challenges: "Managing complex user roles and secure payment processing with Stripe while maintaining a high-performance Next.js application.",
    futurePlans: "Google OAuth, Real database (MongoDB/PostgreSQL), Email notifications, Bike comparison tool.",
    featured: true,
  },
  {
    id: 2,
    title: "Habit Tracker",
    description: "A full-stack MERN application that helps users build and maintain daily habits effectively. Users can create, update, delete, and mark habits as completed with detailed history, visual statistics, and reminders through a clean and responsive interface.",
    images: [
      "/assets/Project1.1.png",
      "/assets/Project1.2.png",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "DaisyUI", "Node.js", "Express.js", "MongoDB"],
    liveUrl: "https://habit-tracker-4a192.web.app/",
    githubUrl: "https://github.com/Tafsirchy/Habit-Tracker-ClientSide.git",
    githubServerUrl: "https://github.com/Tafsirchy/Habit-Tracker-ServerSide.git",
    challenges: "Designing a complex database schema for tracking habit frequency and history while maintaining high performance for real-time statistical updates.",
    futurePlans: "Adding social features for community habit challenges and developing a mobile application using React Native.",
    featured: true,
  },
  {
    id: 3,
    title: "VitalFlow",
    description: "An efficient emergency blood search platform allowing users to find donors based on blood group and district/Upazila. Features include blood requests, real-time notifications, role-based access for Admins and Volunteers, and secure payment integration via Stripe.",
    images: [
      "/assets/Project2.1.png",
      "/assets/Project2.2.png"
    ],
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Firebase", "Stripe", "Tailwind CSS", "DaisyUI"],
    liveUrl: "https://vitalflow-9b72a.web.app/",
    githubUrl: "https://github.com/Tafsirchy/VitalFlow-Frontend.git",
    githubServerUrl: "https://github.com/Tafsirchy/VitalFlow-BackendNew.git",
    challenges: "Managing complex user roles and implementing a secure, error-tolerant search algorithm for emergency blood matching.",
    futurePlans: "Adding a map-based donor location feature and integrating with local hospital APIs for real-time inventory tracking.",
    featured: true,
  },
  {
    id: 4,
    title: "GreenNest",
    description: "A modern, responsive web application focused on plant discovery and care. Users can explore indoor plants, view detailed plant information, book expert consultations, and manage their profiles through secure authentication with Firebase.",
    images: [
      "/assets/Project3.1.png",
      "/assets/Project3.2.png"
    ], 
    technologies: ["React", "Vite", "Firebase", "Tailwind CSS", "DaisyUI", "Framer Motion", "React Router"],
    liveUrl: "https://greennest-3d484.web.app/",
    githubUrl: "https://github.com/Tafsirchy/GreenNest",
    challenges: "Implementing a seamless real-time consultation booking system while ensuring secure user authentication and data persistence across sessions.",
    futurePlans: "Integrating an AI-powered plant health diagnostic tool and expanding the marketplace to include local nursery partnerships.",
    featured: true,
  },
];

