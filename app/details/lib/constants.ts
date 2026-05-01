import { 
  Monitor, Briefcase, ShoppingCart, Code, LayoutTemplate, Layers, Sparkles, 
  UserPlus, Sliders, FileText, CreditCard, Calendar, MessageSquare, 
  LineChart, Zap, Search, Shield, Smartphone, Wrench, Rocket, Award 
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface Selections {
  projectType: string | null;
  designLevel: string | null;
  features: string[];
  performance: string[];
  maintenance: string | null;
}

export interface PricingItem {
  id: string;
  name: string;
  icon: LucideIcon;
  price: number;
  desc: string;
  category?: string;
  hours?: [number, number];
  recommended?: boolean;
  label?: string;
  bullets?: string[];
}

export const projectTypes: PricingItem[] = [
  { id: "landing", name: "Landing Page", icon: Monitor, price: 9000, desc: "High-impact single-page experience\nDesigned for conversions and lead generation\nBest for campaigns and quick launches", hours: [20, 50] },
  { id: "business", name: "Business Website", icon: Briefcase, price: 14000, desc: "Professional multi-page architecture\nBuilt for credibility and business growth\nIdeal for startups and service companies", recommended: true, label: "Most chosen by businesses", hours: [60, 120] },
  { id: "ecommerce", name: "E-commerce Store", icon: ShoppingCart, price: 24000, desc: "Full-scale digital storefront\nProduct management, payments, and checkout\nBuilt for selling and scaling online", hours: [120, 250] },
  { id: "custom", name: "Custom Platform", icon: Code, price: 35000, desc: "Advanced web application or portal\nCustom workflows, dashboards, and integrations\nBuilt for complex business systems", hours: [200, 400] },
];

export const designLevels: PricingItem[] = [
  { id: "basic", name: "Standard Design", icon: LayoutTemplate, price: 0, desc: "Clean, professional foundation\nFast setup with essential branding\nBest for simple and quick launches", label: "Quick Launch", hours: [10, 30] },
  { id: "custom_ui", name: "Custom UI Design", icon: Layers, price: 5000, desc: "Tailored visual identity\nStructured layout for better engagement\nDesigned to match your brand presence", label: "Brand-Focused", hours: [30, 70] },
  { id: "premium_uiux", name: "Premium UI/UX", icon: Sparkles, price: 10000, desc: "High-end visuals with refined interactions\nConversion-optimized design with enhanced user engagement\nCrafted for premium digital experiences", recommended: true, hours: [60, 120] },
];

export const features: PricingItem[] = [
  { id: "auth", name: "User Accounts & Profiles", icon: UserPlus, price: 4000, desc: "Secure login and profile management for personalized user experiences", category: "User & Access", label: "Popular", hours: [10, 25] },
  { id: "admin", name: "Admin Dashboard", icon: Sliders, price: 6000, desc: "Centralized control panel to manage content, users, and operations", category: "User & Access", label: "Popular", hours: [25, 60] },
  { id: "cms", name: "Blog & Content System", icon: FileText, price: 3000, desc: "Dynamic publishing system for easy content updates and management", category: "Content & Engagement", hours: [10, 20] },
  { id: "contact", name: "Lead Capture", icon: MessageSquare, price: 800, desc: "Strategic forms designed to convert visitors into qualified leads", category: "Content & Engagement", hours: [2, 6] },
  { id: "whatsapp", name: "Direct Connect", icon: MessageSquare, price: 500, desc: "Direct customer communication via WhatsApp business integration", category: "Content & Engagement", hours: [1, 4] },
  { id: "booking", name: "Scheduling System", icon: Calendar, price: 7000, desc: "Automated booking for services, consultations, or rentals", category: "Business Operations", hours: [30, 70] },
  { id: "payments", name: "Payment Gateway", icon: CreditCard, price: 5000, desc: "Secure online payments with Razorpay or Stripe integration", category: "Business Operations", label: "Essential", hours: [12, 30] },
  { id: "analytics", name: "Analytics & Insights", icon: LineChart, price: 1500, desc: "Track visitor behavior and measure conversion performance", category: "Insights & Analytics", hours: [3, 8] },
];

export const performanceOptions: PricingItem[] = [
  { id: "speed", name: "Turbo Optimization", icon: Zap, price: 2500, desc: "Faster load times for better user experience and SEO", label: "Performance Boost", hours: [8, 20] },
  { id: "seo", name: "SEO Foundation", icon: Search, price: 3000, desc: "Optimized structure to improve search visibility on Google", label: "Essential", hours: [10, 25] },
  { id: "security", name: "Security Shield", icon: Shield, price: 2500, desc: "Protect your website from vulnerabilities and threats", recommended: true, label: "Recommended", hours: [8, 18] },
  { id: "mobile", name: "Cross-Device Polish", icon: Smartphone, price: 1800, desc: "Seamless experience across mobile, tablet, and desktop", label: "User Experience", hours: [5, 12] },
];

export const maintenancePlans: PricingItem[] = [
  { 
    id: "basic", 
    name: "Basic Care", 
    icon: Wrench, 
    price: 1499, 
    desc: "Essential maintenance for peace of mind.",
    bullets: [
      "Saves ₹1,500 on upfront cost",
      "Keeps your website updated and secure",
      "Monthly stability check"
    ]
  },
  { 
    id: "growth", 
    name: "Growth Care", 
    icon: Rocket, 
    price: 2999, 
    desc: "Active optimization for growing businesses.",
    recommended: true,
    bullets: [
      "Saves ₹2,000 on upfront cost",
      "Faster updates & priority support",
      "Performance monitoring included",
      "Quick content updates"
    ]
  },
  { 
    id: "premium", 
    name: "Premium Care", 
    icon: Award, 
    price: 5999, 
    desc: "Full-scale managed digital experience.",
    recommended: true,
    label: "Top Tier",
    bullets: [
      "Saves ₹2,500 on upfront cost",
      "Feature updates included",
      "Dedicated account manager",
      "Ongoing stability and issue resolution"
    ]
  },
];
