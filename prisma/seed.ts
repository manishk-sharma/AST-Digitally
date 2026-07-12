import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is required");

const adapter = new PrismaNeon({ connectionString });
const db = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Create super admin user
  const password = await bcrypt.hash("admin@123", 12);

  const superAdmin = await db.user.upsert({
    where: { email: "admin@astdigitally.com" },
    update: {},
    create: {
      name: "Asif Siddique",
      email: "admin@astdigitally.com",
      password,
      role: "SUPER_ADMIN",
    },
  });

  console.log(`✅ Super admin created: ${superAdmin.email}`);

  // Seed FAQs from constants
  const faqs = [
    {
      question: "What services does AST Digitally offer?",
      answer: "We offer Digital Marketing, SEO, Google & Meta Ads, Social Media Marketing, Website Design & Development, E-commerce Development, Graphic Design, Video Editing, Custom Dashboard Designing, Business Web Applications, App Deployment, Online Reputation Management (ORM), and Website Maintenance & Support.",
    },
    {
      question: "Do you redesign existing websites?",
      answer: "Yes, we redesign and revamp existing websites to improve performance, user experience, and conversion rates while retaining your brand identity.",
    },
    {
      question: "Do you provide SEO services?",
      answer: "Yes, we provide comprehensive SEO services including technical audits, on-page optimization, local SEO, and content strategy to improve your search rankings and organic traffic.",
    },
    {
      question: "Do you provide ongoing support after launch?",
      answer: "Yes, we offer long-term maintenance contracts, continuous performance monitoring, regular updates, and dedicated support to ensure your website and applications run smoothly.",
    },
    {
      question: "What is your pricing model?",
      answer: "We offer flexible pricing based on project scope and requirements. Each proposal clearly outlines deliverables, timelines, and costs with no hidden charges.",
    },
  ];

  for (let i = 0; i < faqs.length; i++) {
    await db.fAQ.upsert({
      where: { id: `seed-faq-${i}` },
      update: {},
      create: {
        id: `seed-faq-${i}`,
        question: faqs[i].question,
        answer: faqs[i].answer,
        order: i,
        isVisible: true,
      },
    });
  }

  console.log(`✅ Seeded ${faqs.length} FAQs`);

  // Seed testimonials
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO",
      company: "FinVault Technologies",
      review: "AST Digitally transformed our entire risk assessment pipeline. Their AI expertise is world-class, and the results speak for themselves — 78% fraud reduction in just 3 months.",
      rating: 5,
      isFeatured: true,
    },
    {
      name: "Marcus Rivera",
      role: "CEO",
      company: "LuxeSpace Interiors",
      review: "The 3D shopping experience they built is unlike anything in our industry. Our customers love it, and our conversion rates have never been higher.",
      rating: 5,
      isFeatured: true,
    },
    {
      name: "Emily Okafor",
      role: "VP Marketing",
      company: "CloudMetrics Pro",
      review: "The growth engine AST built for us is a game-changer. AI-driven lead scoring alone increased our qualified pipeline by 200%. Incredible team to work with.",
      rating: 5,
      isFeatured: true,
    },
  ];

  for (let i = 0; i < testimonials.length; i++) {
    await db.testimonial.upsert({
      where: { id: `seed-t-${i}` },
      update: {},
      create: {
        id: `seed-t-${i}`,
        ...testimonials[i],
        order: i,
        isVisible: true,
      },
    });
  }

  console.log(`✅ Seeded ${testimonials.length} testimonials`);

  console.log("\n🎉 Seeding complete!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Admin login:");
  console.log("  Email:    admin@astdigitally.com");
  console.log("  Password: admin@123");
  console.log("  URL:      http://localhost:3000/admin/login");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("⚠️  Change the password after first login!");
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
