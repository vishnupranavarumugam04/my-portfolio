const mongoose = require('mongoose');

const StatSchema = new mongoose.Schema({
  id: { type: String, default: () => Math.random().toString(36).substring(2, 9) },
  label: { type: String, required: true },
  value: { type: String, required: true }
}, { _id: false });

const SocialLinkSchema = new mongoose.Schema({
  id: { type: String, default: () => Math.random().toString(36).substring(2, 9) },
  platform: { type: String, required: true },
  url: { type: String, required: true }
}, { _id: false });

const CustomProjectSchema = new mongoose.Schema({
  id: { type: String, default: () => Math.random().toString(36).substring(2, 9) },
  name: { type: String, required: true },
  type: { type: String, default: '' },
  role: { type: String, default: '' },
  description: { type: String, default: '' },
  html_url: { type: String, default: '' },
  stargazers_count: { type: Number, default: 0 },
  language: { type: String, default: 'C++' },
  topics: { type: [String], default: [] }
}, { _id: false });

const SkillCategorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  skills: { type: [String], default: [] }
}, { _id: false });

const AchievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  badge: { type: String, default: 'Winner' },
  organization: { type: String, default: '' },
  description: { type: String, default: '' }
}, { _id: false });

const SiteSchema = new mongoose.Schema({
  hero: {
    eyebrow: { type: String, default: "MECHATRONICS ENGINEERING & ROBOTICS" },
    headline: { type: String, default: "Building intelligent robotic systems & embedded" },
    headlineHighlight: { type: String, default: "AI automation." },
    body: { type: String, default: "Mechatronics Engineering student passionate about fusing mechanical hardware, embedded systems, ROS 2, computer vision, and edge AI to engineer high-impact autonomous solutions." },
    ctaPrimary: {
      label: { type: String, default: "Explore Projects" },
      url: { type: String, default: "#projects" }
    },
    ctaSecondary: {
      label: { type: String, default: "Get in Touch" },
      url: { type: String, default: "#connect" }
    },
    imageUrl: { type: String, default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80" }
  },
  theme: {
    mode: { type: String, default: "dark" }, // 'dark' | 'light'
    bgColor: { type: String, default: "#090D14" },
    accentColor: { type: String, default: "#38BDF8" },
    surfaceColor: { type: String, default: "#111827" },
    textColor: { type: String, default: "#F3F4F6" },
    mutedTextColor: { type: String, default: "#9CA3AF" },
    fontHeading: { type: String, default: "Playfair Display" },
    fontBody: { type: String, default: "Plus Jakarta Sans" }
  },
  stats: {
    type: [StatSchema],
    default: [
      { id: "stat-1", label: "HACKATHONS & AWARDS", value: "6+" },
      { id: "stat-2", label: "CORE PROJECTS", value: "5+" },
      { id: "stat-3", label: "ENGINEERING FOCUS", value: "Robotics & AI" },
      { id: "stat-4", label: "ACADEMIC YEAR", value: "3rd Year (BIT)" }
    ]
  },
  github: {
    username: { type: String, default: "vishnupranavarumugam04" }
  },
  linkedin: {
    profileUrl: { type: String, default: "https://www.linkedin.com/in/vishnupranavarumugam04" }
  },
  customProjects: {
    type: [CustomProjectSchema],
    default: []
  },
  skillsCategories: {
    type: [SkillCategorySchema],
    default: []
  },
  achievements: {
    type: [AchievementSchema],
    default: []
  },
  education: {
    degree: { type: String, default: "Bachelor’s Degree in Mechatronics Engineering" },
    institution: { type: String, default: "Bannari Amman Institute of Technology (BIT), Sathyamangalam" },
    year: { type: String, default: "3rd Year (Semester 5)" },
    location: { type: String, default: "Tamil Nadu, India" }
  },
  about: {
    fullName: { type: String, default: "Vishnu Pranav Arumugam" },
    preferredName: { type: String, default: "Pranav" },
    roleTitle: { type: String, default: "3rd-Year Mechatronics Engineering Student | Bannari Amman Institute of Technology" },
    role: { type: String, default: "Mechatronics Engineering Student | Robotics & Automation Enthusiast | Computer Vision & Embedded AI" },
    bio: { type: String, default: "Mechatronics Engineering student passionate about building intelligent robotic and automation systems. Combining mechanical mechanisms, electronics, microcontrollers, ROS 2, computer vision, and edge AI to solve complex real-world challenges." },
    email: { type: String, default: "vishnupranavarumugam04@gmail.com" },
    location: { type: String, default: "Tamil Nadu, India" },
    statusBadge: { type: String, default: "Available for Robotics & AI Roles" },
    socialLinks: {
      type: [SocialLinkSchema],
      default: [
        { id: "soc-1", platform: "GitHub", url: "https://github.com/vishnupranavarumugam04" },
        { id: "soc-2", platform: "LinkedIn", url: "https://www.linkedin.com/in/vishnupranavarumugam04" },
        { id: "soc-3", platform: "Email", url: "mailto:vishnupranavarumugam04@gmail.com" }
      ]
    }
  }
}, { timestamps: true, strict: false });

module.exports = mongoose.model('Site', SiteSchema);

