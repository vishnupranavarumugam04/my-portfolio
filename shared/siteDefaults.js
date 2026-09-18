/**
 * Default content schema & seed data for Vishnu Pranav Arumugam's Portfolio
 */
const DEFAULT_SITE_DATA = {
  hero: {
    fullName: "Vishnu Pranav Arumugam",
    eyebrow: "MECHATRONICS ENGINEERING & ROBOTICS",
    headline: "Building intelligent robotic systems & embedded",
    headlineHighlight: "AI automation.",
    body: "Mechatronics Engineering student passionate about fusing mechanical hardware, embedded systems, ROS 2, computer vision, and edge AI to engineer high-impact autonomous solutions.",
    ctaPrimary: {
      label: "Explore Projects",
      url: "#projects"
    },
    ctaSecondary: {
      label: "Get in Touch",
      url: "#connect"
    },
    imageUrl: "/avatar.jpg"
  },
  theme: {
    mode: "dark", // 'dark' | 'light'
    bgColor: "#090D14",
    accentColor: "#38BDF8", // Cyan / Electric Blue
    surfaceColor: "#111827",
    textColor: "#F3F4F6",
    mutedTextColor: "#9CA3AF",
    fontHeading: "Playfair Display",
    fontBody: "Plus Jakarta Sans"
  },
  stats: [
    { id: "stat-1", label: "HACKATHONS & AWARDS", value: "6+" },
    { id: "stat-2", label: "CORE PROJECTS", value: "5+" },
    { id: "stat-3", label: "ENGINEERING FOCUS", value: "Robotics & AI" },
    { id: "stat-4", label: "ACADEMIC YEAR", value: "3rd Year (BIT)" }
  ],
  github: {
    username: "vishnupranavarumugam04"
  },
  linkedin: {
    profileUrl: "https://www.linkedin.com/in/vishnupranavarumugam04"
  },
  customProjects: [
    {
      id: "proj-1",
      name: "LearnBeyond",
      type: "AI-Powered Adaptive Learning Platform",
      role: "Developer / Team Member (Team: Gowsika S)",
      description: "Personalized education platform featuring adaptive learning algorithms, intelligent companion tutor, and student performance analytics.",
      html_url: "https://learnbeyond.netlify.app",
      stargazers_count: 18,
      language: "TypeScript",
      topics: ["ai", "adaptive-learning", "edtech", "react"]
    },
    {
      id: "proj-2",
      name: "LearnLoop",
      type: "AI Reverse-Learning & Teach-Back Engine",
      role: "Team Leader & Developer (Team: Cognivault)",
      description: "Innovative teach-back platform combining Gemini API, voice AI, peer discussion modules, and mastery-based evaluation.",
      html_url: "https://github.com/vishnupranavarumugam04/Learn-Loop",
      stargazers_count: 24,
      language: "Python",
      topics: ["gemini-api", "voice-ai", "reverse-learning", "fastapi"]
    },
    {
      id: "proj-3",
      name: "Secure AI Health Companion",
      type: "Smart Health & Environmental Monitor (SIH 26181)",
      role: "Core Developer (Team: KPS PLAYZ)",
      description: "Wearable Smart Ring and monitoring ecosystem using ESP32, MAX30102, MPU6050, MAX30205 sensors with Edge AI emergency detection.",
      html_url: "https://github.com/vishnupranavarumugam04/health-companion",
      stargazers_count: 32,
      language: "C++",
      topics: ["esp32", "embedded-c", "iot", "edge-ai", "sensors"]
    },
    {
      id: "proj-4",
      name: "Robocon 2026 R2 Robot",
      type: "Autonomous Robotics System",
      role: "Robotics & Computer Vision Developer",
      description: "Autonomous robot system built on ROS 2 and Gazebo, featuring YOLOv8 object classification, Intel RealSense D435i vision, and A* path planning.",
      html_url: "https://github.com/vishnupranavarumugam04",
      stargazers_count: 45,
      language: "C++",
      topics: ["ros2", "gazebo", "yolov8", "realsense", "path-planning"]
    },
    {
      id: "proj-5",
      name: "LAURA",
      type: "Local AI Personal Assistant",
      role: "Solo Developer",
      description: "Autonomous local voice assistant capable of OS automation, memory persistence, and tool execution powered by Ollama and FastAPI.",
      html_url: "https://github.com/vishnupranavarumugam04/LAURA-Agent",
      stargazers_count: 29,
      language: "Python",
      topics: ["ollama", "local-ai", "fastapi", "react", "automation"]
    }
  ],
  skillsCategories: [
    {
      category: "Programming Languages",
      skills: ["C", "C++", "Python", "Embedded C", "JavaScript", "TypeScript"]
    },
    {
      category: "Robotics & Autonomous Navigation",
      skills: ["ROS 2", "Gazebo", "Autonomous Navigation", "A* Path Planning", "Mecanum Drive", "Mobile Robots", "Robot Simulation"]
    },
    {
      category: "Embedded Systems & IoT",
      skills: ["ESP32", "Arduino", "Microcontrollers", "Sensors & Actuators", "Motor Control", "I2C / UART / SPI", "BLE", "IoT Protocols"]
    },
    {
      category: "Computer Vision & Edge AI",
      skills: ["Computer Vision", "OpenCV", "YOLOv8", "Edge AI", "Object Detection", "Image Processing", "AI/ML Integration"]
    },
    {
      category: "Industrial Automation",
      skills: ["PLC Programming", "Industrial Automation", "Control Systems", "Industrial Communication", "Camera Vision Systems"]
    },
    {
      category: "Tools & Platforms",
      skills: ["GitHub", "VS Code", "ROS 2", "Gazebo", "Arduino IDE", "Wokwi", "Cirkit Designer", "Vercel", "Netlify"]
    }
  ],
  achievements: [
    {
      title: "1st Prize — BIT Hackathon 2025",
      badge: "Winner",
      organization: "Robotics & Automation Season 1",
      description: "Awarded 1st place for designing and deploying an autonomous industrial automation prototype."
    },
    {
      title: "2nd Prize — BIT Hackathon Season 2",
      badge: "Runner-Up",
      organization: "Robotics & Automation",
      description: "Secured 2nd place for high-performance embedded control and vision-guided robotic workflow."
    },
    {
      title: "Smart India Hackathon (SIH) 2K26 — Round 2",
      badge: "Advanced",
      organization: "SIH Problem Statement 26181",
      description: "Qualified College Round 1 and advanced to Round 2 with the Secure AI-Powered Health Companion."
    },
    {
      title: "2nd Place — CodeFusion",
      badge: "Podium",
      organization: "Team KPS Playz",
      description: "Recognized for rapid problem solving, embedded systems development, and software architecture."
    },
    {
      title: "CIT Robo Rally — Participant & Competitor",
      badge: "Competitor",
      organization: "Robotics Challenge",
      description: "Engineered and raced a custom robotics platform competing across complex obstacle terrain."
    }
  ],
  education: {
    degree: "Bachelor’s Degree in Mechatronics Engineering",
    institution: "Bannari Amman Institute of Technology (BIT), Sathyamangalam",
    year: "3rd Year (Semester 5)",
    location: "Tamil Nadu, India"
  },
  about: {
    fullName: "Vishnu Pranav Arumugam",
    preferredName: "Pranav",
    role: "Mechatronics Engineering Student | Robotics & Automation Enthusiast | Computer Vision & Embedded AI",
    bio: "Mechatronics Engineering student passionate about building intelligent robotic and automation systems. Combining mechanical mechanisms, electronics, microcontrollers, ROS 2, computer vision, and edge AI to solve complex real-world challenges.",
    email: "vishnupranavarumugam04@gmail.com",
    location: "Tamil Nadu, India",
    statusBadge: "Available for Robotics & AI Roles",
    socialLinks: [
      { id: "soc-1", platform: "GitHub", url: "https://github.com/vishnupranavarumugam04" },
      { id: "soc-2", platform: "LinkedIn", url: "https://www.linkedin.com/in/vishnupranavarumugam04" },
      { id: "soc-3", platform: "Email", url: "mailto:vishnupranavarumugam04@gmail.com" }
    ]
  }
};

module.exports = {
  DEFAULT_SITE_DATA
};
