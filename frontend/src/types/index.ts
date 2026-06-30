// ─── Types ─────────────────────────────────────────────────────────────────

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  gradient: string;
}

export interface TechNode {
  id: string;
  label: string;
  description: string;
  useCases: string[];
  technologies: string[];
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
}

export interface GrowthStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
  stats: { label: string; value: string }[];
  color: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  description: string;
  metrics: { label: string; value: string; prefix?: string; suffix?: string }[];
  tags: string[];
  gradient: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface KPI {
  label: string;
  value: string;
  icon: string;
  delay: number;
}

export type GPUTier = "high" | "medium" | "low";
