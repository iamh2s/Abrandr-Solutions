"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, FileText, Briefcase, FolderOpen, Mail, Users,
  LogOut, Plus, Pencil, Trash2, Eye, EyeOff, Save, X, ChevronRight,
  Menu, ArrowLeft, ExternalLink,
} from "lucide-react";

type Tab = "dashboard" | "blog" | "projects" | "jobs" | "contacts" | "applications";

interface AdminUser { id: number; name: string; email: string }

export default function AdminPage() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/me").then(async (r) => {
      if (!r.ok) { router.push("/admin/login"); return; }
      setUser(await r.json());
      setLoading(false);
    });
  }, [router]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  function switchTab(t: Tab) {
    setTab(t);
    setSidebarOpen(false);
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-dark-text">
      <div className="w-6 h-6 border-2 border-brand/30 border-t-brand rounded-full animate-spin" />
    </div>
  );

  const tabs: { key: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "blog", label: "Blog Posts", icon: FileText },
    { key: "projects", label: "Projects", icon: FolderOpen },
    { key: "jobs", label: "Job Openings", icon: Briefcase },
    { key: "contacts", label: "Contact Inbox", icon: Mail },
    { key: "applications", label: "Applications", icon: Users },
  ];

  const sidebarContent = (
    <>
      <div className="p-5 border-b border-dark-border flex items-center justify-between">
        <div>
          <span className="text-xl font-bold tracking-tight font-display">
            <span className="text-dark-heading">a</span><span className="text-brand">Brand</span><span className="text-dark-heading">r</span>
          </span>
          <p className="text-[10px] text-dark-text mt-0.5 uppercase tracking-wider">Admin Panel</p>
        </div>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-dark-text hover:text-dark-heading">
          <X size={20} />
        </button>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => switchTab(t.key)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              tab === t.key ? "bg-brand/10 text-brand" : "text-dark-text hover:text-dark-heading hover:bg-dark-border/30"
            }`}>
            <t.icon size={18} /> {t.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-dark-border space-y-2">
        <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-dark-text hover:text-brand hover:bg-brand/10 transition-colors">
          <ExternalLink size={16} /> View Site
        </Link>
        <div className="px-3 py-1">
          <p className="text-xs text-dark-text truncate">{user?.name}</p>
          <p className="text-[10px] text-dark-text/60 truncate">{user?.email}</p>
        </div>
        <button onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-dark-text hover:text-red-400 hover:bg-red-400/10 transition-colors">
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-dark">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-64 bg-dark-card border-r border-dark-border flex-col shrink-0 fixed inset-y-0 left-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-dark-card border-r border-dark-border flex flex-col animate-[slideIn_0.2s_ease-out]">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        {/* Top bar for mobile */}
        <div className="lg:hidden sticky top-0 z-20 bg-dark-card/90 backdrop-blur-xl border-b border-dark-border px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="p-1.5 text-dark-heading rounded-lg hover:bg-dark-border/50">
            <Menu size={20} />
          </button>
          <span className="text-sm font-semibold text-dark-heading font-display truncate">
            {tabs.find(t => t.key === tab)?.label}
          </span>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {tab === "dashboard" && <DashboardTab />}
          {tab === "blog" && <CrudPanel endpoint="/api/admin/blog" label="Blog Post" fields={blogFields} />}
          {tab === "projects" && <CrudPanel endpoint="/api/admin/projects" label="Project" fields={projectFields} />}
          {tab === "jobs" && <CrudPanel endpoint="/api/admin/jobs" label="Job Opening" fields={jobFields} />}
          {tab === "contacts" && <SubmissionsPanel type="contact" />}
          {tab === "applications" && <SubmissionsPanel type="career" />}
        </div>
      </main>
    </div>
  );
}

/* ── Dashboard Tab ── */
function DashboardTab() {
  const [stats, setStats] = useState({ blog: 0, projects: 0, jobs: 0, contacts: 0, applications: 0 });
  useEffect(() => {
    Promise.all([
      fetch("/api/admin/blog").then(r => r.json()),
      fetch("/api/admin/projects").then(r => r.json()),
      fetch("/api/admin/jobs").then(r => r.json()),
      fetch("/api/admin/submissions?type=contact").then(r => r.json()),
      fetch("/api/admin/submissions?type=career").then(r => r.json()),
    ]).then(([b, p, j, c, a]) => {
      setStats({
        blog: Array.isArray(b) ? b.length : 0,
        projects: Array.isArray(p) ? p.length : 0,
        jobs: Array.isArray(j) ? j.length : 0,
        contacts: Array.isArray(c) ? c.length : 0,
        applications: Array.isArray(a) ? a.length : 0,
      });
    });
  }, []);
  const cards = [
    { label: "Blog Posts", value: stats.blog, icon: FileText },
    { label: "Projects", value: stats.projects, icon: FolderOpen },
    { label: "Job Openings", value: stats.jobs, icon: Briefcase },
    { label: "Contact Inquiries", value: stats.contacts, icon: Mail },
    { label: "Career Applications", value: stats.applications, icon: Users },
  ];
  return (
    <>
      <h1 className="text-xl sm:text-2xl font-bold text-dark-heading font-display mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {cards.map((c) => (
          <div key={c.label} className="glass-card rounded-xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
              <c.icon className="text-brand" size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-xl sm:text-2xl font-bold text-dark-heading font-display">{c.value}</p>
              <p className="text-[10px] sm:text-xs text-dark-text truncate">{c.label}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Field definitions ── */
interface Field { name: string; label: string; type: "text" | "textarea" | "checkbox" | "number" | "select"; options?: string[] }

const blogFields: Field[] = [
  { name: "title", label: "Title", type: "text" },
  { name: "slug", label: "Slug", type: "text" },
  { name: "category", label: "Category", type: "text" },
  { name: "readTime", label: "Read Time", type: "text" },
  { name: "gradient", label: "Gradient", type: "select", options: [
    "from-red-500/20 to-red-400/20", "from-zinc-500/20 to-zinc-400/20",
    "from-red-500/20 to-red-400/20", "from-neutral-500/20 to-neutral-400/20",
    "from-red-500/20 to-rose-400/20", "from-neutral-500/20 to-neutral-400/20",
  ]},
  { name: "excerpt", label: "Excerpt", type: "textarea" },
  { name: "content", label: "Content (paragraphs separated by double newline)", type: "textarea" },
  { name: "published", label: "Published", type: "checkbox" },
];

const projectFields: Field[] = [
  { name: "title", label: "Title", type: "text" },
  { name: "slug", label: "Slug", type: "text" },
  { name: "client", label: "Client", type: "text" },
  { name: "category", label: "Category", type: "text" },
  { name: "image", label: "Image Path", type: "text" },
  { name: "gradient", label: "Gradient", type: "select", options: [
    "from-red-500/20 to-red-400/20", "from-zinc-500/20 to-zinc-400/20",
    "from-red-500/20 to-red-400/20", "from-neutral-500/20 to-neutral-400/20",
    "from-red-500/20 to-rose-400/20", "from-neutral-500/20 to-neutral-400/20",
  ]},
  { name: "tags", label: "Tags (comma-separated)", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "challenge", label: "Challenge", type: "textarea" },
  { name: "solution", label: "Solution", type: "textarea" },
  { name: "metricsJson", label: "Metrics JSON", type: "textarea" },
  { name: "sortOrder", label: "Sort Order", type: "number" },
  { name: "published", label: "Published", type: "checkbox" },
];

const jobFields: Field[] = [
  { name: "title", label: "Job Title", type: "text" },
  { name: "department", label: "Department", type: "select", options: ["Design", "Engineering", "Strategy", "Growth", "Operations"] },
  { name: "location", label: "Location", type: "text" },
  { name: "type", label: "Type", type: "select", options: ["Full-time", "Part-time", "Contract", "Internship"] },
  { name: "description", label: "Description", type: "textarea" },
  { name: "requirements", label: "Requirements (one per line)", type: "textarea" },
  { name: "sortOrder", label: "Sort Order", type: "number" },
  { name: "published", label: "Published", type: "checkbox" },
];

/* ── Generic CRUD Panel ── */
function CrudPanel({ endpoint, label, fields }: { endpoint: string; label: string; fields: Field[] }) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const load = useCallback(() => {
    fetch(endpoint).then(r => r.json()).then(d => { if (Array.isArray(d)) setItems(d); });
  }, [endpoint]);

  useEffect(() => { load(); }, [load]);

  function startNew() {
    const blank: Record<string, unknown> = {};
    fields.forEach(f => { blank[f.name] = f.type === "checkbox" ? false : f.type === "number" ? 0 : ""; });
    setEditing(blank);
    setIsNew(true);
  }

  function startEdit(item: Record<string, unknown>) {
    setEditing({ ...item });
    setIsNew(false);
  }

  async function save() {
    if (!editing) return;
    const method = isNew ? "POST" : "PUT";
    await fetch(endpoint, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    setEditing(null);
    load();
  }

  async function remove(id: number) {
    if (!confirm(`Delete this ${label.toLowerCase()}?`)) return;
    await fetch(`${endpoint}?id=${id}`, { method: "DELETE" });
    load();
  }

  // Edit / Create form
  if (editing) {
    return (
      <>
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setEditing(null)} className="text-dark-text hover:text-dark-heading p-1.5 rounded-lg hover:bg-dark-border/30">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-dark-heading font-display">
            {isNew ? `New ${label}` : `Edit ${label}`}
          </h1>
        </div>
        <div className="glass-card rounded-xl p-4 sm:p-6 space-y-4 max-w-3xl">
          {fields.map((f) => (
            <div key={f.name}>
              <label className="block text-xs sm:text-sm font-medium text-dark-heading mb-1">{f.label}</label>
              {f.type === "textarea" ? (
                <textarea value={String(editing[f.name] ?? "")} rows={f.name === "content" ? 8 : 3}
                  onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                  className="w-full bg-dark border border-dark-border rounded-lg px-3 py-2 text-dark-heading text-sm focus:outline-none focus:border-brand resize-y min-h-[60px]" />
              ) : f.type === "checkbox" ? (
                <label className="flex items-center gap-2 cursor-pointer py-1">
                  <input type="checkbox" checked={!!editing[f.name]}
                    onChange={(e) => setEditing({ ...editing, [f.name]: e.target.checked })}
                    className="w-4 h-4 rounded border-dark-border accent-brand" />
                  <span className="text-sm text-dark-text">{f.label}</span>
                </label>
              ) : f.type === "select" ? (
                <select value={String(editing[f.name] ?? "")}
                  onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                  className="w-full bg-dark border border-dark-border rounded-lg px-3 py-2 text-dark-heading text-sm focus:outline-none focus:border-brand appearance-none">
                  <option value="">Select...</option>
                  {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input type={f.type} value={String(editing[f.name] ?? "")}
                  onChange={(e) => setEditing({ ...editing, [f.name]: f.type === "number" ? Number(e.target.value) : e.target.value })}
                  className="w-full bg-dark border border-dark-border rounded-lg px-3 py-2 text-dark-heading text-sm focus:outline-none focus:border-brand" />
              )}
            </div>
          ))}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button onClick={save}
              className="bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <Save size={16} /> {isNew ? `Create ${label}` : `Save Changes`}
            </button>
            <button onClick={() => setEditing(null)}
              className="text-dark-text hover:text-dark-heading font-medium px-6 py-2.5 rounded-lg border border-dark-border hover:bg-dark-border/30 transition-colors text-center">
              Cancel
            </button>
          </div>
        </div>
      </>
    );
  }

  // List view
  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-dark-heading font-display">{label}s</h1>
        <button onClick={startNew}
          className="bg-brand hover:bg-brand-dark text-white font-semibold px-3 sm:px-4 py-2 rounded-lg flex items-center gap-1.5 text-sm transition-colors shrink-0">
          <Plus size={16} /> <span className="hidden sm:inline">Add {label}</span><span className="sm:hidden">Add</span>
        </button>
      </div>
      {items.length === 0 ? (
        <div className="glass-card rounded-xl p-8 sm:p-12 text-center text-dark-text text-sm">
          No {label.toLowerCase()}s yet. Click &quot;Add&quot; to create one.
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={String(item.id)} className="glass-card rounded-xl px-4 sm:px-5 py-3 sm:py-4 flex items-center gap-3 sm:gap-4 group hover:border-brand/20 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-dark-heading truncate">{String(item.title || item.name || "")}</p>
                  {"published" in item && (
                    item.published
                      ? <span className="flex items-center gap-1 text-[10px] text-green-400 shrink-0"><Eye size={10} /> Live</span>
                      : <span className="flex items-center gap-1 text-[10px] text-dark-text shrink-0"><EyeOff size={10} /> Draft</span>
                  )}
                </div>
                {"slug" in item && <p className="text-xs text-dark-text truncate mt-0.5">{String(item.slug)}</p>}
                {"department" in item && <p className="text-xs text-dark-text mt-0.5">{String(item.department)} &middot; {String(item.location)}</p>}
              </div>
              <div className="flex items-center gap-0.5">
                <button onClick={() => startEdit(item)} className="p-2 text-dark-text hover:text-brand rounded-lg hover:bg-brand/10 transition-colors" title="Edit">
                  <Pencil size={15} />
                </button>
                <button onClick={() => remove(item.id as number)} className="p-2 text-dark-text hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-colors" title="Delete">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ── Submissions Panel ── */
function SubmissionsPanel({ type }: { type: "contact" | "career" }) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  useEffect(() => {
    fetch(`/api/admin/submissions?type=${type}`).then(r => r.json()).then(d => { if (Array.isArray(d)) setItems(d); });
  }, [type]);

  const title = type === "contact" ? "Contact Inquiries" : "Career Applications";

  return (
    <>
      <h1 className="text-xl sm:text-2xl font-bold text-dark-heading font-display mb-6">{title}</h1>
      {items.length === 0 ? (
        <div className="glass-card rounded-xl p-8 sm:p-12 text-center text-dark-text text-sm">No submissions yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={String(item.id)} className="glass-card rounded-xl p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-dark-heading truncate">{String(item.name)}</p>
                  <p className="text-xs text-brand truncate">{String(item.email)}</p>
                </div>
                <p className="text-[10px] text-dark-text shrink-0">
                  {new Date(String(item.createdAt)).toLocaleDateString()}
                </p>
              </div>
              {type === "contact" && (
                <>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2">
                    {String(item.company || "") !== "" && <p className="text-xs text-dark-text">Company: {String(item.company)}</p>}
                    {String(item.service || "") !== "" && <p className="text-xs text-dark-text">Service: {String(item.service)}</p>}
                    {String(item.budget || "") !== "" && <p className="text-xs text-dark-text">Budget: {String(item.budget)}</p>}
                  </div>
                  <p className="text-sm text-dark-text bg-dark/50 rounded-lg p-3 break-words">{String(item.message)}</p>
                </>
              )}
              {type === "career" && (
                <>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2">
                    <p className="text-xs text-dark-text">Position: {String(item.position)}</p>
                    {String(item.experience || "") !== "" && <p className="text-xs text-dark-text">Exp: {String(item.experience)}</p>}
                  </div>
                  {String(item.portfolio || "") !== "" && <p className="text-xs text-brand mb-2 truncate">{String(item.portfolio)}</p>}
                  <p className="text-sm text-dark-text bg-dark/50 rounded-lg p-3 break-words">{String(item.coverLetter)}</p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
