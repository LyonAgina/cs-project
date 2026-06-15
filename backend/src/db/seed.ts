import "dotenv/config";
import db from "./connection";
import { opportunity } from "./schema";

async function seed() {
  await db.insert(opportunity).values([
    {
      id: "opp_001",
      adminId: "2",
      title: "Software Engineering Internship",
      category: "Internship",
      organization: "Safaricom",
      location: "Nairobi, Kenya",
      requirements:
        "Basic knowledge of React, TypeScript, Git, and REST APIs. Good problem-solving skills required.",
      deadline: new Date("2026-08-30"),
      status: "active",
    },
    {
      id: "opp_002",
      adminId: "2",
      title: "Data Science Scholarship",
      category: "Scholarship",
      organization: "Mastercard Foundation",
      location: "Remote",
      requirements:
        "Interest in data science, Python basics, statistics, and strong academic performance.",
      deadline: new Date("2026-09-15"),
      status: "active",
    },
    {
      id: "opp_003",
      adminId: "2",
      title: "Frontend Developer Attachment",
      category: "Attachment",
      organization: "Andela Kenya",
      location: "Hybrid - Nairobi",
      requirements:
        "HTML, CSS, JavaScript, React, Tailwind CSS, and ability to work in a team.",
      deadline: new Date("2026-07-20"),
      status: "active",
    },
    {
      id: "opp_004",
      adminId: "2",
      title: "Cybersecurity Bootcamp",
      category: "Training",
      organization: "Strathmore iLabAfrica",
      location: "Nairobi, Kenya",
      requirements:
        "Interest in cybersecurity, networking basics, Linux basics, and willingness to complete practical labs.",
      deadline: new Date("2026-08-10"),
      status: "active",
    },
    {
      id: "opp_005",
      adminId: "2",
      title: "Cloud Computing Internship",
      category: "Internship",
      organization: "Microsoft ADC",
      location: "Nairobi, Kenya",
      requirements:
        "Basic cloud knowledge, AWS or Azure fundamentals, backend development, and database skills.",
      deadline: new Date("2026-09-01"),
      status: "active",
    },
  ]);

  console.log("Seed data inserted successfully");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});