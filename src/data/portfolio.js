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
  resume: "/path-to-your-resume.pdf",
};

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/yourusername",
    icon: "Github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    icon: "Linkedin",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/yourusername",
    icon: "Twitter",
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
    title: "GreenNest",
    description: "A modern, responsive web application focused on plant discovery and care. Users can explore indoor plants, view detailed plant information, book expert consultations, and manage their profiles through secure authentication with Firebase.",
    image: "https://placehold.co/800x600/0f172a/06b6d4?text=GreenNest", 
    technologies: ["React", "Vite", "Firebase", "Tailwind CSS", "DaisyUI", "Framer Motion", "React Router"],
    liveUrl: "https://greennest-3d484.web.app/",
    githubUrl: "https://github.com/Tafsirchy/GreenNest",
    challenges: "Implementing a seamless real-time consultation booking system while ensuring secure user authentication and data persistence across sessions.",
    futurePlans: "Integrating an AI-powered plant health diagnostic tool and expanding the marketplace to include local nursery partnerships.",
    featured: true,
    codeSnippet: `// Clone repository
git clone https://github.com/Tafsirchy/GreenNest.git

// Install dependencies
cd GreenNest && npm install

// Configure Firebase (.env)
VITE_API_KEY=your_firebase_api_key

// Run development server
npm run dev`,
  },
  {
    id: 2,
    title: "Habit Tracker",
    description: "A full-stack MERN application that helps users build and maintain daily habits effectively. Users can create, update, delete, and mark habits as completed with detailed history, visual statistics, and reminders through a clean and responsive interface.",
    images: [
      "/assets/Project2.1.png",
      "/assets/Project2.2.png",
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
    title: "Green Earth",
    description: "A responsive web application focused on environmental sustainability. The platform allows users to explore different tree categories, view detailed plant information, add trees to a donation cart, and contribute to global tree plantation efforts.",
    image: "https://placehold.co/800x600/020617/6366f1?text=Green+Earth", 
    technologies: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "DaisyUI", "Font Awesome"],
    liveUrl: "https://my-sixth-assignment-tc.netlify.app/",
    githubUrl: "https://github.com/Tafsirchy/my-sixth-assignment",
    challenges: "Creating an intuitive donation flow and managing a dynamic cart state without using complex state management libraries.",
    futurePlans: "Implementing a real-time global impact dashboard and adding support for multi-currency donations.",
    featured: false,
    codeSnippet: `// Clone repository
git clone https://github.com/Tafsirchy/my-sixth-assignment

// Navigate to folder
cd green-earth

// Open in browser
// Simply open index.html
// No server or build tools required`,
  },
  {
    id: 4,
    title: "VitalFlow",
    description: "An efficient emergency blood search platform allowing users to find donors based on blood group and district/Upazila. Features include blood requests, real-time notifications, role-based access for Admins and Volunteers, and secure payment integration via Stripe.",
    images: [
      "/assets/Project4.1.png",
      "/assets/Project4.2.png"
    ],
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Firebase", "Stripe", "Tailwind CSS", "DaisyUI"],
    liveUrl: "https://vitalflow-9b72a.web.app/",
    githubUrl: "https://github.com/Tafsirchy/VitalFlow-Frontend.git",
    githubServerUrl: "https://github.com/Tafsirchy/VitalFlow-BackendNew.git",
    challenges: "Managing complex user roles and implementing a secure, error-tolerant search algorithm for emergency blood matching.",
    futurePlans: "Adding a map-based donor location feature and integrating with local hospital APIs for real-time inventory tracking.",
    featured: true,
  },
];

export const stats = [
  { label: "Years Experience", value: "2+" },
  { label: "Projects Completed", value: "20+" },
  { label: "Happy Clients", value: "15+" },
  { label: "Code Commits", value: "1000+" },
];
