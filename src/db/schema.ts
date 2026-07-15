import { pgTable, serial, text, timestamp, varchar, boolean, integer } from "drizzle-orm/pg-core";

/* ── Admin Users ── */
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ── Blog Posts ── */
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 500 }).notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  readTime: varchar("read_time", { length: 50 }).notNull(),
  gradient: varchar("gradient", { length: 100 }).notNull().default("from-red-500/20 to-red-400/20"),
  published: boolean("published").notNull().default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ── Projects / Work ── */
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 500 }).notNull(),
  client: varchar("client", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  description: text("description").notNull(),
  challenge: text("challenge").notNull(),
  solution: text("solution").notNull(),
  image: varchar("image", { length: 500 }).notNull().default("/images/work/novapay-dashboard.jpg"),
  gradient: varchar("gradient", { length: 100 }).notNull().default("from-red-500/20 to-red-400/20"),
  tags: text("tags").notNull().default(""),
  metricsJson: text("metrics_json").notNull().default("[]"),
  published: boolean("published").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ── Job Openings ── */
export const jobOpenings = pgTable("job_openings", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  department: varchar("department", { length: 100 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  type: varchar("type", { length: 100 }).notNull().default("Full-time"),
  description: text("description").notNull(),
  requirements: text("requirements").notNull().default(""),
  published: boolean("published").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ── Contact Submissions ── */
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  service: varchar("service", { length: 255 }),
  budget: varchar("budget", { length: 100 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ── Career Applications ── */
export const careerApplications = pgTable("career_applications", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  position: varchar("position", { length: 255 }).notNull(),
  experience: varchar("experience", { length: 100 }),
  portfolio: varchar("portfolio", { length: 500 }),
  coverLetter: text("cover_letter").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
