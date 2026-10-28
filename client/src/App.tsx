import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { supabase } from "./lib/supabase";
import {
  ArrowRight,
  Bot,
  Send,
  ImagePlus,
  LoaderCircle,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  CloudSun,
  Droplets,
  FileText,
  Gauge,
  Grid2X2,
  Handshake,
  Home as HomeIcon,
  Leaf,
  LineChart,
  Menu,
  MessageCircle,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sprout,
  Store,
  Tractor,
  TrendingUp,
  UserRound,
  Users,
  WalletCards,
  Wheat,
  X,
  Zap,
} from "lucide-react";

type Role = "farmer" | "landlord";
type ViewKey = string;

const HERO_IMAGE = "/assets/inspo.jpg";

const farmerNav = [
  { label: "Overview", key: "overview", icon: Grid2X2, section: "Workspace" },
  { label: "AI Farm Guide", key: "ai-guide", icon: Bot, section: "AI tools" },
  { label: "Crop Calendar", key: "calendar", icon: CalendarDays, section: "Workspace" },
  { label: "Farm Actions", key: "actions", icon: Zap, section: "Workspace" },
  { label: "Weather", key: "weather", icon: CloudSun, section: "Tools" },
  { label: "Bazar Intelligence", key: "bazar", icon: Store, section: "Tools" },
  { label: "Should I Grow This?", key: "planner", icon: TrendingUp, section: "Tools" },
  { label: "Profit Tracker", key: "profit", icon: CircleDollarSign, section: "Tools" },
  { label: "History", key: "history", icon: FileText, section: "Tools" },
];

const landlordNav = [
  { label: "Portfolio overview", key: "overview", icon: Grid2X2, section: "Portfolio" },
  { label: "AI Land Guide", key: "ai-guide", icon: Bot, section: "AI tools" },
  { label: "My fields & tenants", key: "fields", icon: Wheat, section: "Portfolio" },
  { label: "Lease insights", key: "leases", icon: Handshake, section: "Portfolio" },
  { label: "Maintenance requests", key: "maintenance", icon: Tractor, section: "Portfolio" },
  { label: "Payments & documents", key: "payments", icon: WalletCards, section: "Portfolio" },
  { label: "Field performance", key: "performance", icon: LineChart, section: "Insights" },
  { label: "Weather & risk", key: "weather", icon: CloudSun, section: "Insights" },
  { label: "Messages", key: "messages", icon: MessageCircle, section: "Insights" },
];

const farmerModules = [
  { key: "calendar", title: "Crop Calendar", eyebrow: "Plan the season", description: "Stage timelines, fertilizer windows and a harvest view.", icon: CalendarDays, tone: "sage" },
  { key: "actions", title: "Farm Actions Today", eyebrow: "Decide with confidence", description: "A clear list of what to do, skip or watch today.", icon: Zap, tone: "gold" },
  { key: "weather", title: "Weather", eyebrow: "Local conditions", description: "A weather-aware spray and irrigation advisory.", icon: CloudSun, tone: "sky" },
  { key: "bazar", title: "Bazar Intelligence", eyebrow: "Sell smarter", description: "Compare mandi prices, demand and expected net revenue.", icon: Store, tone: "plum" },
  { key: "planner", title: "Should I Grow This?", eyebrow: "Before you plant", description: "Compare crops by profit, water need and weather risk.", icon: TrendingUp, tone: "olive" },
  { key: "profit", title: "Profit Tracker", eyebrow: "Know your numbers", description: "Log real costs and see a living profit range.", icon: CircleDollarSign, tone: "mint" },
];

const landlordModules = [
  { key: "fields", title: "My fields & tenants", eyebrow: "One calm view", description: "See every parcel, tenant and current season in one place.", icon: Wheat, tone: "sage" },
  { key: "leases", title: "Lease insights", eyebrow: "Stay ahead", description: "Renewal dates, rent status and lease health at a glance.", icon: Handshake, tone: "gold" },
  { key: "maintenance", title: "Maintenance requests", eyebrow: "Keep land ready", description: "Route irrigation, fencing and equipment requests without the back-and-forth.", icon: Tractor, tone: "rust" },
  { key: "payments", title: "Payments & documents", eyebrow: "Everything accounted for", description: "Rent collection, receipts and agreements in one secure space.", icon: WalletCards, tone: "blue" },
  { key: "performance", title: "Field performance", eyebrow: "Understand your land", description: "Season performance and field-level activity trends.", icon: LineChart, tone: "olive" },
  { key: "weather", title: "Weather & risk", eyebrow: "Protect your portfolio", description: "Weather alerts and crop risk signals across your properties.", icon: CloudSun, tone: "sky" },
];

const roleCopy = {
  farmer: {
    name: "Farmer workspace",
    shortName: "Farmer",
    greeting: "Good morning, Ramesh",
    subhead: "Your fields, decisions and next best actions — all in one place.",
    initials: "RK",
    location: "Anekal, Karnataka",
  },
  landlord: {
    name: "Landlord workspace",
    shortName: "Landlord",
    greeting: "Good morning, Meera",
    subhead: "Keep your land productive, your tenants supported and every lease on track.",
    initials: "MS",
    location: "Bengaluru Rural, Karnataka",
  },
};

function Mark({ light = false }: { light?: boolean }) {
  return (
    <div className={`brand-mark ${light ? "brand-mark-light" : ""}`} aria-label="Kheti Sahayak logo">
      <Sprout size={20} strokeWidth={2.4} />
    </div>
  );
}

function Splash({ onContinue }: { onContinue: () => void }) {
  return (
    <section className="splash-screen">
      <div className="splash-image" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
      <div className="splash-wash" />
      <header className="splash-topbar">
        <div className="splash-brand"><Mark light /><span>Kheti <em>Sahayak</em></span></div>
        <span className="splash-kicker">Farm intelligence, made human</span>
      </header>
      <div className="splash-content">
        <p className="eyebrow eyebrow-light">The easier way to run your land</p>
        <h1>Grow with<br /><span>clarity.</span></h1>
        <p className="splash-copy">Your farming companion, powered by AI.</p>
        <button className="button button-light splash-cta" onClick={onContinue}>Choose your workspace <ArrowRight size={18} /></button>
      </div>
      <div className="splash-bottom"><span>Built for Indian farms</span><span className="dot-separator" /><span>Simple by design</span><span className="dot-separator" /><span>Ready for every season</span></div>
    </section>
  );
}

function RoleSelect({ onSelect, onBack }: { onSelect: (role: Role) => void; onBack: () => void }) {
  return (
    <section className="role-screen">
      <div className="role-backdrop" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
      <div className="role-overlay" />
      <header className="role-topbar">
        <button className="plain-button back-button" onClick={onBack}><ArrowRight size={16} className="back-arrow" /> Back</button>
        <div className="splash-brand"><Mark light /><span>Kheti <em>Sahayak</em></span></div>
      </header>
      <div className="role-panel">
        <div className="role-intro">
          <p className="eyebrow eyebrow-light">A workspace for every side of farming</p>
          <h2>How will you use<br />Kheti Sahayak?</h2>
        </div>
        <div className="role-cards">
          <RoleCard role="farmer" icon={Sprout} title="I grow the crop" copy="Find farmland and get farming advice." onSelect={onSelect} />
          <RoleCard role="landlord" icon={HomeIcon} title="I manage the land" copy="Keep fields, leases, tenants and land performance in a single view." onSelect={onSelect} />
        </div>
      </div>
    </section>
  );
}

function RoleCard({ role, icon: Icon, title, copy, onSelect }: { role: Role; icon: typeof Sprout; title: string; copy: string; onSelect: (role: Role) => void }) {
  return (
  <button
    className="role-card"
    type="button"
    onClick={() => onSelect(role)}
  >
    <img
      src={role === "farmer" ? "/images/farmer.jpeg" : "/images/landlord.jpeg"}
      alt={role}
      className="role-card-image"
    />

    <div className="role-card-copy">
      <h3>{role === "farmer" ? "Farmer" : "Landlord"}</h3>
      <p>
        {role === "farmer"
          ? "Find farmland and get farming advice."
          : "List farmland and manage enquiries."}
      </p>
    </div>

    <span className="role-card-arrow">
      <ArrowRight size={17} />
    </span>
  </button>
);}

function App() {
  const [stage, setStage] = useState<"splash" | "roles" | "auth" | "app">("roles");
  const [role, setRole] = useState<Role>("farmer");
  const [activeView, setActiveView] = useState<ViewKey>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    const savedRole = window.localStorage.getItem("kheti-role") as Role | null;
    if (savedRole === "farmer" || savedRole === "landlord") setRole(savedRole);
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setStage("app");
      setSessionReady(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setStage("app");
      else setStage((current) => current === "app" ? "roles" : current);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const selectRole = (nextRole: Role) => {
    setRole(nextRole);
    window.localStorage.setItem("kheti-role", nextRole);
    setActiveView("overview");
    setStage("auth");
  };

  const signOutAndSwitch = async () => {
    await supabase.auth.signOut();
    setStage("roles");
  };

  if (!sessionReady) return <div className="auth-loading"><Mark /><span>Preparing your workspace…</span></div>;
  if (stage === "splash") return <Splash onContinue={() => setStage("roles")} />;
  if (stage === "roles") return <RoleSelect onSelect={selectRole} onBack={() => setStage("splash")} />;
  if (stage === "auth") return <AuthPanel role={role} onBack={() => setStage("roles")} onSuccess={() => setStage("app")} onRoleChange={setRole} />;

  return <Workspace role={role} activeView={activeView} setActiveView={setActiveView} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} onSwitchRole={signOutAndSwitch} />;
}

function AuthPanel({ role, onBack, onSuccess, onRoleChange }: { role: Role; onBack: () => void; onSuccess: () => void; onRoleChange: (role: Role) => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setError(""); setNotice("");
    try {
      if (mode === "signup") {
        const { data, error: authError } = await supabase.auth.signUp({
          email: email.trim(), password,
          options: { data: { role } },
        });
        if (authError) throw authError;
        if (!data.session) {
          setNotice("Account created. Check your email to verify your account, then sign in.");
          setMode("login");
        } else onSuccess();
      } else {
        const { data, error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (authError) throw authError;
        const savedRole = data.user.user_metadata?.role;
        if (savedRole === "farmer" || savedRole === "landlord") {
          onRoleChange(savedRole);
          window.localStorage.setItem("kheti-role", savedRole);
        }
        onSuccess();
      }
    } catch (err) { setError(err instanceof Error ? err.message : "Authentication failed. Please try again."); }
    finally { setBusy(false); }
  };

  return <section className="auth-screen">
    <div className="auth-visual" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
    <div className="auth-shade" />
    <button className="plain-button auth-back" onClick={onBack}><ArrowRight size={16} className="back-arrow" /> Back to workspace choice</button>
    <div className="auth-card">
      <div className="auth-brand"><Mark /><span>Kheti <em>Sahayak</em></span></div>
      <p className="eyebrow">{role === "farmer" ? "FARMER WORKSPACE" : "LANDLORD WORKSPACE"}</p>
      <h1>{mode === "login" ? "Welcome back." : "Let’s get started."}</h1>
      <p className="auth-subtitle">{mode === "login" ? "Sign in to continue to your Kheti Sahayak dashboard." : "Create your account to access your personalized workspace."}</p>
      <div className="auth-mode-tabs"><button className={mode === "login" ? "selected" : ""} onClick={() => { setMode("login"); setError(""); setNotice(""); }}>Sign in</button><button className={mode === "signup" ? "selected" : ""} onClick={() => { setMode("signup"); setError(""); setNotice(""); }}>Create account</button></div>
      <form className="auth-form" onSubmit={submit}>
        <label>Email address<input type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></label>
        <label>Password<input type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={6} required value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" /></label>
        {error && <div className="auth-message error">{error}</div>}{notice && <div className="auth-message success">{notice}</div>}
        <button className="button button-primary auth-submit" disabled={busy}>{busy ? <><LoaderCircle size={16} className="spin" /> Please wait…</> : <>{mode === "login" ? "Sign in" : "Create account"}<ArrowRight size={16} /></>}</button>
      </form>
      <p className="auth-footnote"><ShieldCheck size={15} /> Your account is secured by Supabase authentication.</p>
    </div>
  </section>;
}

function Workspace({ role, activeView, setActiveView, sidebarOpen, setSidebarOpen, onSwitchRole }: { role: Role; activeView: ViewKey; setActiveView: (view: ViewKey) => void; sidebarOpen: boolean; setSidebarOpen: (open: boolean) => void; onSwitchRole: () => void }) {
  const config = roleCopy[role];
  const nav = role === "farmer" ? farmerNav : landlordNav;
  const current = nav.find((item) => item.key === activeView) ?? nav[0];
  const grouped = nav.reduce<Record<string, typeof nav>>((acc, item) => { (acc[item.section] ||= []).push(item); return acc; }, {});

  const navigate = (key: string) => { setActiveView(key); setSidebarOpen(false); };

  return (
    <div className={`workspace ${role}`}>
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-head">
          <div className="app-brand"><Mark /><span>Kheti <em>Sahayak</em></span></div>
          <button className="icon-button mobile-only" onClick={() => setSidebarOpen(false)} aria-label="Close navigation"><X size={18} /></button>
        </div>
        <div className="workspace-switcher">
          <div className={`workspace-avatar ${role}`}><UserRound size={17} /></div>
          <div><span className="switcher-label">Current workspace</span><strong>{config.shortName}</strong></div>
          <ChevronDown size={15} className="muted-icon" />
        </div>
        <nav className="sidebar-nav">
          {Object.entries(grouped).map(([section, items]) => <div className="nav-group" key={section}><span className="nav-section-title">{section}</span>{items.map((item) => { const Icon = item.icon; return <button key={item.key} className={`nav-item ${activeView === item.key ? "active" : ""}`} onClick={() => navigate(item.key)}><Icon size={17} /><span>{item.label}</span>{item.key === "risk" && <span className="nav-alert">3</span>}</button>; })}</div>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-icon"><MessageCircle size={16} /></div><div><strong>Need a hand?</strong><span>Talk to your Kheti guide.</span></div><ArrowRight size={15} /></div>
          <button className="profile-row" onClick={onSwitchRole}><div className="profile-avatar">{config.initials}</div><div className="profile-copy"><strong>{role === "farmer" ? "Ramesh Kumar" : "Meera Shah"}</strong><span>Switch workspace</span></div><MoreHorizontal size={17} /></button>
        </div>
      </aside>
      {sidebarOpen && <button className="sidebar-scrim mobile-only" onClick={() => setSidebarOpen(false)} aria-label="Close navigation" />}
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left"><button className="icon-button mobile-only" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu size={19} /></button><div><span className="breadcrumb">Kheti Sahayak <span>/</span> {current.label}</span><h1>{current.label}</h1></div></div>
          <div className="topbar-actions"><div className="location-pill"><span className="status-dot" /> {config.location}</div><button className="icon-button"><Search size={18} /></button><button className="icon-button notification-button"><Bell size={18} /><span /></button><div className="top-avatar">{config.initials}</div></div>
        </header>
        <div className="page-content">{activeView === "overview" ? (role === "farmer" ? <FarmerOverview onNavigate={navigate} /> : <LandlordOverview onNavigate={navigate} />) : activeView === "ai-guide" ? <AIGuide role={role} /> : activeView === "calendar" ? <CropCalendar role={role} /> : activeView === "weather" ? <LiveWeather /> : activeView === "planner" || activeView === "profit" ? <FarmCalculator mode={activeView} onNavigate={navigate} /> : <ModuleView role={role} view={activeView} onNavigate={navigate} />}</div>
      </main>
    </div>
  );
}

function FarmerOverview({ onNavigate }: { onNavigate: (view: string) => void }) {
  return <>
    <section className="welcome-row"><div><p className="eyebrow">Tuesday, 24 October 2026 <span className="tiny-leaf">✦</span></p><h2>Good morning, Ramesh</h2><p className="subhead">Here’s what your farm needs today.</p></div><button className="button button-primary" onClick={() => onNavigate("actions")}><Zap size={16} /> View today’s actions</button></section>
    <section className="insight-banner farmer-banner"><div className="banner-orb"><CloudSun size={25} /></div><div className="banner-main"><span className="banner-label">Today’s field note</span><strong>Skip irrigation tomorrow</strong><p>12mm rain is expected. Your soil has enough moisture for the next 48 hours.</p></div><button className="banner-link" onClick={() => onNavigate("weather")}>See weather <ArrowRight size={15} /></button></section>
    <div className="metric-grid farmer-metrics"><MetricCard label="Active crop" value="Tomato" note="Flowering stage" icon={Sprout} accent="green" /><MetricCard label="Season progress" value="64%" note="Harvest in 37 days" icon={Gauge} accent="gold" progress={64} /><MetricCard label="Estimated savings" value="₹12,480" note="This season so far" icon={CircleDollarSign} accent="blue" /><MetricCard label="Risk level" value="Low" note="Watch humidity this week" icon={ShieldCheck} accent="olive" /></div>
    <div className="content-grid two-thirds"><section className="panel next-action-panel"><PanelHeading eyebrow="Recommended next" title="The important things first" action="See all actions" onAction={() => onNavigate("actions")} /><div className="action-list"><ActionItem icon={Droplets} title="Hold irrigation" copy="Rain likely tomorrow — save water and fuel." tag="Do tomorrow" tone="blue" /><ActionItem icon={Leaf} title="Scout lower leaves" copy="Humidity is up. Check for early blight spots." tag="Before 5 pm" tone="green" /><ActionItem icon={Store} title="Check tomato prices" copy="Kolar mandi is trending 6% lower today." tag="Price watch" tone="gold" /></div></section><section className="panel crop-card"><div className="crop-card-top"><div><span className="panel-eyebrow">Your active field</span><h3>Tomato · 4 acres</h3></div><button className="more-button"><MoreHorizontal size={18} /></button></div><div className="crop-visual"><div className="crop-visual-image" style={{ backgroundImage: `url(${HERO_IMAGE})` }} /><div className="crop-visual-overlay"><span>Season health</span><strong>Good</strong><small>+8% vs last week</small></div></div><div className="crop-footer"><div><span>Next milestone</span><strong>Flowering → Fruiting</strong></div><div><span>Harvest window</span><strong>30 Nov — 12 Dec</strong></div></div></section></div>
    <section className="section-heading"><div><p className="eyebrow">Your toolkit</p><h3>Farm intelligence, organized for you</h3></div><button className="text-button" onClick={() => onNavigate("history")}>View history <ArrowRight size={15} /></button></section>
    <div className="module-grid">{farmerModules.map((module) => <ModuleCard key={module.key} module={module} onClick={() => onNavigate(module.key)} />)}</div>
  </>;
}

function LandlordOverview({ onNavigate }: { onNavigate: (view: string) => void }) {
  return <>
    <section className="welcome-row"><div><p className="eyebrow">Tuesday, 24 October 2026 <span className="tiny-leaf">✦</span></p><h2>Good morning, Meera</h2><p className="subhead">Your land portfolio is steady. Here’s the view for today.</p></div><button className="button button-primary" onClick={() => onNavigate("fields")}><Plus size={16} /> Add a field</button></section>
    <section className="insight-banner landlord-banner"><div className="banner-orb"><Handshake size={25} /></div><div className="banner-main"><span className="banner-label">Portfolio note</span><strong>One lease renewal is coming up</strong><p>Green Valley plot · renewal window opens in 28 days. Start the conversation early.</p></div><button className="banner-link" onClick={() => onNavigate("leases")}>Review lease <ArrowRight size={15} /></button></section>
    <div className="metric-grid landlord-metrics"><MetricCard label="Managed area" value="38.5 ac" note="Across 6 fields" icon={Wheat} accent="green" /><MetricCard label="Occupied area" value="92%" note="Healthy occupancy" icon={Users} accent="gold" progress={92} /><MetricCard label="Rent collected" value="₹4.8L" note="This financial year" icon={WalletCards} accent="blue" /><MetricCard label="Open requests" value="3" note="2 need your attention" icon={Tractor} accent="rust" /></div>
    <div className="content-grid landlord-grid"><section className="panel portfolio-panel"><PanelHeading eyebrow="Portfolio pulse" title="How your fields are moving" action="Field performance" onAction={() => onNavigate("performance")} /><div className="portfolio-chart"><div className="chart-labels"><span>Field output</span><strong>+14.8%</strong></div><div className="fake-chart"><span className="chart-gridline line-one" /><span className="chart-gridline line-two" /><svg viewBox="0 0 500 150" preserveAspectRatio="none" aria-label="Field performance trend"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#87aa7c" stopOpacity=".35" /><stop offset="1" stopColor="#87aa7c" stopOpacity="0" /></linearGradient></defs><path d="M0 128 C38 114 44 118 72 104 S122 112 152 90 S207 95 234 86 S275 76 305 84 S344 64 372 70 S420 43 444 50 S477 22 500 32 L500 150 L0 150 Z" fill="url(#chartFill)" /><path d="M0 128 C38 114 44 118 72 104 S122 112 152 90 S207 95 234 86 S275 76 305 84 S344 64 372 70 S420 43 444 50 S477 22 500 32" fill="none" stroke="#557b50" strokeWidth="3" /></svg><div className="chart-axis"><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span></div></div></div><div className="portfolio-legend"><span><i className="legend-dot green" /> Yield value</span><span><i className="legend-dot gold" /> Rent health</span><span><i className="legend-dot blue" /> Activity</span></div></section><section className="panel tenant-panel"><PanelHeading eyebrow="People on your land" title="Tenant activity" action="See all tenants" onAction={() => onNavigate("fields")} /><div className="tenant-list"><Tenant initials="AK" name="Arjun Kumar" field="Green Valley · 8.2 ac" status="Crop is flowering" statusTone="good" /><Tenant initials="SP" name="Suma Patel" field="East Ridge · 6.5 ac" status="Needs a reply" statusTone="attention" /><Tenant initials="RK" name="Ramesh Kumar" field="Riverbend · 4.0 ac" status="Irrigation paused" statusTone="neutral" /></div><button className="outline-button full-button" onClick={() => onNavigate("messages")}><MessageCircle size={15} /> Open messages</button></section></div>
    <section className="section-heading"><div><p className="eyebrow">Your landlord toolkit</p><h3>Stay close to the land, without the busywork</h3></div><button className="text-button" onClick={() => onNavigate("payments")}>Open documents <ArrowRight size={15} /></button></section>
    <div className="module-grid landlord-modules">{landlordModules.map((module) => <ModuleCard key={module.key} module={module} onClick={() => onNavigate(module.key)} />)}</div>
  </>;
}


function AIGuide({ role }: { role: Role }) {
  const [question, setQuestion] = useState(() => window.localStorage.getItem("kheti-ai-prefill") || "");
  useEffect(() => { window.localStorage.removeItem("kheti-ai-prefill"); }, []);
  const [location, setLocation] = useState("Bengaluru Rural, Karnataka");
  const [crop, setCrop] = useState("Tomato");
  const [farmSize, setFarmSize] = useState("2 acres");
  const [soil, setSoil] = useState("Red soil");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [answer, setAnswer] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [history, setHistory] = useState<Array<{q:string;a:string}>>([]);
  const ask = async (preset?: string) => {
    const q = (preset || question).trim();
    if (!q && !image) return;
    setBusy(true); setError(""); setAnswer("");
    try {
      const body = new FormData();
      body.append("question", q || "Please inspect this crop image and describe visible symptoms, possible causes, and safe next steps.");
      body.append("role", role); body.append("location", location); body.append("crop", crop); body.append("farm_size", farmSize); body.append("soil", soil);
      if (image) body.append("image", image);
      const base = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "");
      const response = await fetch(`${base}/api/ask`, { method: "POST", body });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.detail || "AI service is unavailable. Check the backend and API key.");
      setAnswer(data.answer || "No answer returned.");
      setHistory(prev => [{ q: q || "Crop photo analysis", a: data.answer || "No answer returned." }, ...prev].slice(0, 5));
      setQuestion(""); setImage(null);
    } catch (e) { setError(e instanceof Error ? e.message : "Something went wrong."); }
    finally { setBusy(false); }
  };
  return <div className="ai-page">
    <section className="ai-intro"><div className="ai-orb"><Bot size={25}/></div><div><p className="eyebrow">GENAI FARM COPILOT</p><h2>Your farming questions, answered with context.</h2><p>Ask in plain language. Add your crop and location so advice can be more relevant.</p></div></section>
    <div className="ai-layout"><section className="panel ai-chat-panel"><div className="ai-chat-head"><div><span className="panel-eyebrow">Kheti AI</span><h3>How can I help your {role === "farmer" ? "farm" : "land"}?</h3></div><span className="ai-live"><i/> AI assistant</span></div>
      <div className="ai-suggestions"><button onClick={() => ask("Create a practical 7-day plan for my crop, considering weather uncertainty and water use.")}>Plan my next 7 days</button><button onClick={() => ask("What symptoms should I look for to detect common diseases in my crop, and what safe first steps can I take?")}>Check crop health</button><button onClick={() => ask("Help me compare crop profitability. Tell me which real costs and market prices I need before estimating profit.")}>Estimate crop profit</button></div>
      <div className="pipeline-panel"><div className="pipeline-title"><span className="panel-eyebrow">GENAI PIPELINE</span><span className="pipeline-badge">{busy ? "Running" : answer ? "Completed" : "Ready"}</span></div><div className="pipeline-steps"><div className={busy || answer ? "done" : ""}><b>01</b><span>Input & context</span></div><i>→</i><div className={busy || answer ? "done" : ""}><b>02</b><span>Prompt assembly</span></div><i>→</i><div className={answer ? "done" : ""}><b>03</b><span>Model inference</span></div><i>→</i><div className={answer ? "done" : ""}><b>04</b><span>Safety response</span></div></div></div>
      {answer && <div className="ai-answer"><div className="ai-answer-label"><Bot size={16}/> AI response</div><p>{answer}</p><small>AI-generated guidance can be wrong. Verify pesticide, disease and financial decisions with local experts and current sources.</small></div>}
      {error && <div className="ai-error">{error}<br/><small>Start the backend and set OPENAI_API_KEY in backend/.env. See README.</small></div>}
      <form className="ai-composer" onSubmit={e => { e.preventDefault(); void ask(); }}><textarea value={question} onChange={e => setQuestion(e.target.value)} placeholder="Ask about irrigation, pests, crop planning, leases…" rows={3}/><div className="ai-composer-bottom"><label className="ai-upload"><ImagePlus size={16}/> {image ? image.name : "Add crop photo"}<input type="file" accept="image/png,image/jpeg,image/webp" onChange={e => setImage(e.target.files?.[0] || null)} hidden/></label><button className="button button-primary" disabled={busy || (!question.trim() && !image)}>{busy ? <><LoaderCircle size={16} className="spin"/> Thinking…</> : <>Ask Kheti <Send size={15}/></>}</button></div></form>
    </section><aside className="panel ai-context"><span className="panel-eyebrow">Your context</span><h3>Personalize the answer</h3><label>Location<input value={location} onChange={e => setLocation(e.target.value)} placeholder="Village, district, state"/></label><label>Crop / land use<input value={crop} onChange={e => setCrop(e.target.value)} placeholder="e.g. tomato, paddy"/></label><label>Farm size<input value={farmSize} onChange={e => setFarmSize(e.target.value)} placeholder="e.g. 2 acres"/></label><label>Soil type<input value={soil} onChange={e => setSoil(e.target.value)} placeholder="e.g. red soil / unknown"/></label><div className="ai-privacy"><ShieldCheck size={16}/><span>Only include information you are comfortable sending to the configured AI provider.</span></div>{history.length > 0 && <div className="ai-history"><span className="panel-eyebrow">Recent questions</span>{history.map((h,i)=><button key={i} onClick={()=>{setQuestion(h.q);setAnswer(h.a)}}>{h.q}</button>)}</div>}</aside></div>
  </div>;
}

function CropCalendar({ role }: { role: Role }) {
  type CalendarEvent = { id: string; date: string; title: string; kind: string };
  const storageKey = `kheti-calendar-${role}`;
  const [cursor, setCursor] = useState(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); });
  const [selected, setSelected] = useState(() => new Date().toISOString().slice(0, 10));
  const [events, setEvents] = useState<CalendarEvent[]>(() => { try { return JSON.parse(localStorage.getItem(storageKey) || "[]"); } catch { return []; } });
  const [title, setTitle] = useState("");
  const [kind, setKind] = useState("Field task");
  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(events)); }, [events, storageKey]);
  const year = cursor.getFullYear(); const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1).getDay(); const days = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  const dayKey = (day: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const selectedEvents = events.filter(e => e.date === selected);
  const addEvent = (e: FormEvent) => { e.preventDefault(); if (!title.trim()) return; setEvents(prev => [...prev, { id: crypto.randomUUID(), date: selected, title: title.trim(), kind }]); setTitle(""); };
  return <div className="feature-page calendar-page"><section className="feature-heading"><div><p className="eyebrow">PLAN WITH CLARITY</p><h2>Crop calendar</h2><p className="subhead">Add field tasks, irrigation reminders, spray windows and harvest dates.</p></div><span className="feature-icon calendar-accent"><CalendarDays size={23}/></span></section><div className="calendar-layout"><section className="panel calendar-panel"><div className="calendar-month-head"><button className="outline-button" onClick={() => setCursor(new Date(year, month - 1, 1))}>← Previous</button><h3>{cursor.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</h3><button className="outline-button" onClick={() => setCursor(new Date(year, month + 1, 1))}>Next →</button></div><div className="calendar-grid">{["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => <div className="calendar-weekday" key={d}>{d}</div>)}{cells.map((day, i) => day === null ? <div key={`blank-${i}`} className="calendar-empty"/> : <button key={day} className={`calendar-day ${selected === dayKey(day) ? "selected" : ""} ${dayKey(day) === new Date().toISOString().slice(0,10) ? "today" : ""}`} onClick={() => setSelected(dayKey(day))}><span>{day}</span>{events.some(e => e.date === dayKey(day)) && <i/>}</button>)}</div><p className="calendar-legend"><i/> Days with saved tasks</p></section><aside className="panel calendar-side"><span className="panel-eyebrow">SELECTED DAY</span><h3>{new Date(`${selected}T12:00:00`).toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric"})}</h3><form className="calendar-add-form" onSubmit={addEvent}><label>Task or reminder<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Inspect tomato leaves" required/></label><label>Type<select value={kind} onChange={e=>setKind(e.target.value)}><option>Field task</option><option>Irrigation</option><option>Fertilizer</option><option>Crop protection</option><option>Harvest</option><option>Lease / land task</option></select></label><button className="button button-primary"><Plus size={15}/> Add to calendar</button></form><div className="calendar-events"><span className="panel-eyebrow">SCHEDULED TASKS ({selectedEvents.length})</span>{selectedEvents.length ? selectedEvents.map(event=><div className="calendar-event" key={event.id}><div><strong>{event.title}</strong><span>{event.kind}</span></div><button aria-label={`Delete ${event.title}`} onClick={()=>setEvents(prev=>prev.filter(e=>e.id!==event.id))}><X size={15}/></button></div>) : <p className="empty-state">Nothing planned for this day. Add a task above.</p>}</div></aside></div></div>;
}

function LiveWeather() {
  const [location, setLocation] = useState("Bengaluru"); const [data, setData] = useState<any>(null); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  const load = async (e?: FormEvent) => { e?.preventDefault(); setBusy(true); setError(""); try { const base=(import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/,""); const response=await fetch(`${base}/api/weather?location=${encodeURIComponent(location)}`); const result=await response.json(); if(!response.ok) throw new Error(result.detail || "Weather service unavailable."); setData(result); } catch(err) { setError(err instanceof Error ? err.message : "Could not load weather."); } finally { setBusy(false); } };
  useEffect(()=>{ void load(); },[]);
  const current=data?.current; const daily=data?.daily;
  return <div className="feature-page weather-page"><section className="feature-heading"><div><p className="eyebrow">LIVE CONDITIONS</p><h2>Weather & field planning</h2><p className="subhead">Use current conditions and forecast as inputs—not as a substitute for field checks.</p></div><span className="feature-icon weather-accent"><CloudSun size={23}/></span></section><form className="weather-search panel" onSubmit={load}><label>City, village or district<input value={location} onChange={e=>setLocation(e.target.value)} placeholder="e.g. Bengaluru, Karnataka"/></label><button className="button button-primary" disabled={busy}>{busy ? "Loading…" : "Get forecast"}</button></form>{error && <div className="auth-message error">{error} Make sure the backend is running on port 8000 and has internet access.</div>}{current && <><section className="weather-current panel"><div><span className="panel-eyebrow">{data.location?.name || location}</span><h3>{data.description || "Current conditions"}</h3><p>Feels like {Math.round(current.apparent_temperature ?? current.temperature_2m)}°C · Humidity {current.relative_humidity_2m}%</p></div><strong className="weather-temperature">{Math.round(current.temperature_2m)}°C</strong></section><section className="weather-forecast-grid">{(daily?.time || []).map((date:string,i:number)=><article className="panel forecast-card" key={date}><span>{new Date(`${date}T12:00:00`).toLocaleDateString(undefined,{weekday:"short",month:"short",day:"numeric"})}</span><strong>{Math.round(daily.temperature_2m_max[i])}° / {Math.round(daily.temperature_2m_min[i])}°</strong><small>{daily.precipitation_probability_max?.[i] ?? 0}% rain chance</small><small>{daily.precipitation_sum?.[i] ?? 0} mm precipitation</small></article>)}</section><p className="feature-disclaimer">Forecast data from Open-Meteo. Local microclimates and field conditions can differ.</p></>}</div>;
}

function FarmCalculator({ mode, onNavigate }: { mode: string; onNavigate: (view: string) => void }) {
  const [crop, setCrop] = useState("Tomato"); const [area, setArea] = useState(2); const [yieldPerAcre, setYieldPerAcre] = useState(8); const [price, setPrice] = useState(18000); const [costPerAcre, setCostPerAcre] = useState(42000);
  const revenue=area*yieldPerAcre*price; const costs=area*costPerAcre; const net=revenue-costs;
  const money=(n:number)=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n);
  const isProfit=mode==="profit";
  return <div className="feature-page calculator-page"><section className="feature-heading"><div><p className="eyebrow">{isProfit?"SEASON ECONOMICS":"DECISION SUPPORT"}</p><h2>{isProfit?"Profit tracker":"Should I grow this?"}</h2><p className="subhead">Change the assumptions to calculate an estimate. These are your inputs, not live market prices.</p></div><span className="feature-icon calculator-accent"><TrendingUp size={23}/></span></section><div className="calculator-layout"><section className="panel calculator-inputs"><h3>Crop assumptions</h3><label>Crop<input value={crop} onChange={e=>setCrop(e.target.value)} /></label><label>Area (acres)<input type="number" min="0.1" step="0.1" value={area} onChange={e=>setArea(Math.max(0,Number(e.target.value)))}/></label><label>Expected yield (tonnes / acre)<input type="number" min="0" step="0.1" value={yieldPerAcre} onChange={e=>setYieldPerAcre(Math.max(0,Number(e.target.value)))}/></label><label>Expected selling price (₹ / tonne)<input type="number" min="0" value={price} onChange={e=>setPrice(Math.max(0,Number(e.target.value)))}/></label><label>Estimated cost (₹ / acre)<input type="number" min="0" value={costPerAcre} onChange={e=>setCostPerAcre(Math.max(0,Number(e.target.value)))}/></label><button className="button button-primary" onClick={()=>{window.localStorage.setItem("kheti-ai-prefill",`Review this ${crop} estimate: ${area} acres, ${yieldPerAcre} tonnes per acre, ₹${price} per tonne, ₹${costPerAcre} cost per acre. Estimated revenue ${revenue}, costs ${costs}, net result ${net}. Identify missing risks; do not treat assumptions as live prices.`); onNavigate("ai-guide");}}>Review with AI copilot <ArrowRight size={15}/></button></section><section className="calculator-results"><article className="panel result-card"><span>Estimated revenue</span><strong>{money(revenue)}</strong><small>{area} acres × {yieldPerAcre} tonnes × {money(price)} / tonne</small></article><article className="panel result-card"><span>Estimated total cost</span><strong>{money(costs)}</strong><small>{area} acres × {money(costPerAcre)} / acre</small></article><article className={`panel result-card ${net>=0?"positive":"negative"}`}><span>Estimated {isProfit?"net profit":"net result"}</span><strong>{money(net)}</strong><small>{revenue>0?`Margin: ${(net/revenue*100).toFixed(1)}%`:"Revenue is zero"}</small></article><div className="panel calculator-note"><ShieldCheck size={18}/><p>Estimate only. Actual results depend on grade, losses, transport, labour, input timing, rainfall, and actual sale price. Confirm local prices before deciding.</p></div></section></div></div>;
}

function ModuleView({ role, view, onNavigate }: { role: Role; view: string; onNavigate: (view: string) => void }) {
  const content = useMemo(() => getModuleContent(role, view), [role, view]);
  return <>
    <section className="welcome-row module-welcome"><div><p className="eyebrow">{content.eyebrow}</p><h2>{content.title}</h2><p className="subhead">{content.subtitle}</p></div><button className="button button-primary" onClick={() => onNavigate("overview")}><Grid2X2 size={16} /> Back to overview</button></section>
    <section className={`module-hero module-hero-${role}`}><div className="module-hero-copy"><span className="hero-label">{content.statusLabel}</span><strong>{content.status}</strong><p>{content.statusCopy}</p></div><div className="module-hero-stat"><span>{content.statLabel}</span><strong>{content.stat}</strong><small>{content.statNote}</small></div><div className="module-hero-art"><div className="hero-art-glow" /><Sprout size={62} strokeWidth={1} /></div></section>
    <div className="content-grid two-thirds module-body"><section className="panel"><PanelHeading eyebrow="Your workspace" title={content.listTitle} action="Refresh" onAction={() => undefined} /><div className="detail-list">{content.items.map((item: { icon: typeof Sprout; label: string; copy: string; status: string; tone: string }, index: number) => <div className="detail-row" key={item.label}><div className={`detail-icon detail-icon-${index % 4}`}><item.icon size={17} /></div><div className="detail-copy"><strong>{item.label}</strong><span>{item.copy}</span></div><span className={`status-chip ${item.tone}`}>{item.status}</span><ChevronDown size={15} className="muted-icon" /></div>)}</div></section><section className="panel side-summary"><span className="panel-eyebrow">Quick actions</span><h3>Make the next decision easier</h3><p>{role === "farmer" ? "Your crop profile and local signals are already connected. Use these shortcuts to keep momentum." : "Keep the portfolio moving with a small, focused set of actions."}</p><button className="outline-button" onClick={() => onNavigate(role === "farmer" ? "actions" : "messages")}><Zap size={15} /> Open action list</button><div className="mini-note"><ShieldCheck size={16} /><span><strong>Everything is up to date</strong><small>Last synced 8 minutes ago</small></span></div></section></div>
  </>;
}

function getModuleContent(role: Role, view: string) {
  const farmer = {
    calendar: { eyebrow: "Plan the season", title: "Crop Calendar", subtitle: "A clear view of every stage, from seedling to harvest.", statusLabel: "Current stage", status: "Flowering", statusCopy: "Your tomato crop is entering the fruit-set window. Keep an eye on water stress.", statLabel: "Harvest window", stat: "37 days", statNote: "30 Nov — 12 Dec", listTitle: "Stage timeline", items: [{ icon: Sprout, label: "Flowering", copy: "12 Oct — 01 Nov · Potash + micronutrient spray", status: "Now", tone: "good" }, { icon: Leaf, label: "Fruiting", copy: "02 Nov — 27 Nov · Keep fruit load supported", status: "Next", tone: "attention" }, { icon: Wheat, label: "Maturity", copy: "28 Nov — 17 Dec · Reduce nitrogen, prepare harvest", status: "Upcoming", tone: "neutral" }] },
    actions: { eyebrow: "Decide with confidence", title: "Farm Actions Today", subtitle: "The weather has done the thinking. Here is the practical list.", statusLabel: "Best action", status: "Hold irrigation", statusCopy: "12mm rain is expected tomorrow. Save water, fuel and a field visit.", statLabel: "Actions today", stat: "3 of 5", statNote: "2 already complete", listTitle: "Your action list", items: [{ icon: Droplets, label: "Hold irrigation", copy: "Rain likely tomorrow · revisit after 9am", status: "Do tomorrow", tone: "good" }, { icon: Leaf, label: "Scout lower leaves", copy: "Humidity is up · check for early blight spots", status: "Before 5 pm", tone: "attention" }, { icon: Store, label: "Check tomato prices", copy: "Kolar mandi is trending lower today", status: "Price watch", tone: "neutral" }] },
    risk: { eyebrow: "Stay one step ahead", title: "Risk Radar", subtitle: "Early signals for disease and pest pressure before symptoms show.", statusLabel: "Current risk", status: "Low · 24/100", statusCopy: "Humidity is the only signal worth watching this week.", statLabel: "Action window", stat: "2 days", statNote: "Before the next rain", listTitle: "Reasoning trace", items: [{ icon: CloudSun, label: "Weather signal", copy: "Humidity above 65% favours fungal spread", status: "Watch", tone: "attention" }, { icon: Sprout, label: "Growth-stage signal", copy: "Flowering stage has moderate vulnerability", status: "Moderate", tone: "neutral" }, { icon: ShieldCheck, label: "Regional signal", copy: "No nearby tomato alerts in the last 7 days", status: "Clear", tone: "good" }] },
    diagnose: { eyebrow: "Spot a problem?", title: "AI Crop Diagnosis", subtitle: "Upload a photo and get a simple, practical treatment plan.", statusLabel: "Last diagnosis", status: "Early blight", statusCopy: "Tomato · moderate severity · 91% confidence", statLabel: "Cost avoided", stat: "₹3,200", statNote: "From one early action", listTitle: "Diagnosis history", items: [{ icon: Leaf, label: "Early blight", copy: "Tomato · 24 Oct · treatment saved", status: "Actioned", tone: "good" }, { icon: FileText, label: "Yellow rust", copy: "Wheat · 12 Oct · treatment saved", status: "Actioned", tone: "good" }, { icon: Plus, label: "Upload a new crop photo", copy: "JPG or PNG · under 10MB", status: "Start", tone: "attention" }] },
    weather: { eyebrow: "Local conditions", title: "Weather", subtitle: "Conditions translated into a clear farm decision.", statusLabel: "Today", status: "27° · Partly cloudy", statusCopy: "Humidity is 68%. Avoid spraying before the expected rain.", statLabel: "Rain tomorrow", stat: "12mm", statNote: "Good for soil, not for spray", listTitle: "7-day outlook", items: [{ icon: CloudSun, label: "Today", copy: "27° / 21° · Partly cloudy · 68% humidity", status: "Good", tone: "good" }, { icon: Droplets, label: "Tomorrow", copy: "26° / 20° · Light rain · 12mm expected", status: "Plan around", tone: "attention" }, { icon: Zap, label: "Thursday", copy: "28° / 20° · Clear morning · spray window", status: "Best window", tone: "good" }] },
    bazar: { eyebrow: "Sell smarter", title: "Bazar Intelligence", subtitle: "See the net value of your crop before you decide where to sell.", statusLabel: "Best current mandi", status: "Davangere", statusCopy: "Wheat is ₹2,310/quintal today, up 3% this week.", statLabel: "Price watch", stat: "+3%", statNote: "vs the 7-day average", listTitle: "Market comparison", items: [{ icon: Store, label: "Davangere, KA", copy: "Wheat · ₹2,310/quintal · 82km away", status: "Best net", tone: "good" }, { icon: TrendingUp, label: "Kolar, KA", copy: "Tomato · ₹1,840/quintal · arrivals high", status: "-6% today", tone: "attention" }, { icon: CircleDollarSign, label: "Estimated revenue", copy: "10 quintals after transport and fees", status: "₹22,640", tone: "neutral" }] },
    planner: { eyebrow: "Before you plant", title: "Should I Grow This?", subtitle: "Compare crops with the numbers that matter to your field.", statusLabel: "Best fit this season", status: "Tomato", statusCopy: "Highest profit range for your soil and current water outlook.", statLabel: "Profit range", stat: "₹48–62k", statNote: "per acre · estimated", listTitle: "Crop comparison", items: [{ icon: Sprout, label: "Tomato", copy: "Yield 8t · water medium · weather risk low", status: "Best fit", tone: "good" }, { icon: Wheat, label: "Wheat", copy: "Yield 2.8t · water low · weather risk medium", status: "₹31–40k", tone: "neutral" }, { icon: Droplets, label: "Rice", copy: "Yield 2.2t · water high · weather risk medium", status: "₹18–29k", tone: "attention" }] },
    profit: { eyebrow: "Know your numbers", title: "Profit Tracker", subtitle: "A living view of your season economics, without the spreadsheet.", statusLabel: "Season estimate", status: "₹1.92L profit", statusCopy: "Based on logged costs, current mandi prices and expected yield.", statLabel: "Costs logged", stat: "₹78,400", statNote: "12 entries this season", listTitle: "Recent entries", items: [{ icon: Droplets, label: "Irrigation diesel", copy: "23 Oct · Field 01", status: "₹2,400", tone: "neutral" }, { icon: Leaf, label: "Crop protection", copy: "18 Oct · Field 01", status: "₹5,800", tone: "neutral" }, { icon: Users, label: "Labour", copy: "15 Oct · Field 01", status: "₹8,200", tone: "neutral" }] },
    history: { eyebrow: "Learn from the season", title: "History", subtitle: "Your decisions, diagnoses and outcomes in one quiet archive.", statusLabel: "This season", status: "12 entries", statusCopy: "You have actioned 92% of the recommendations received.", statLabel: "Action rate", stat: "92%", statNote: "+18% vs last month", listTitle: "Recent activity", items: [{ icon: ShieldCheck, label: "Risk check completed", copy: "Today · Tomato flowering", status: "Clear", tone: "good" }, { icon: Leaf, label: "Early blight actioned", copy: "Yesterday · Treatment plan saved", status: "Done", tone: "good" }, { icon: Store, label: "Price checked", copy: "Yesterday · Kolar mandi", status: "Saved", tone: "neutral" }] },
  } as Record<string, any>;
  const landlord = {
    fields: { eyebrow: "One calm view", title: "My fields & tenants", subtitle: "Know who is on which field, and how each season is moving.", statusLabel: "Portfolio occupancy", status: "92% occupied", statusCopy: "Six active fields across two districts, with one space available.", statLabel: "Active tenants", stat: "5", statNote: "Across 6 managed fields", listTitle: "Your fields", items: [{ icon: Wheat, label: "Green Valley", copy: "8.2 acres · Arjun Kumar · Tomato", status: "Flowering", tone: "good" }, { icon: Wheat, label: "East Ridge", copy: "6.5 acres · Suma Patel · Cotton", status: "Needs reply", tone: "attention" }, { icon: Wheat, label: "Riverbend", copy: "4 acres · Ramesh Kumar · Tomato", status: "Irrigation paused", tone: "neutral" }] },
    leases: { eyebrow: "Stay ahead", title: "Lease insights", subtitle: "Renewal dates, rent status and agreements without the paper chase.", statusLabel: "Next renewal", status: "Green Valley", statusCopy: "Renewal window opens in 28 days. Tenant activity is healthy.", statLabel: "On-time rent", stat: "96%", statNote: "Across active leases", listTitle: "Lease watchlist", items: [{ icon: Handshake, label: "Green Valley", copy: "Arjun Kumar · renews 21 Nov 2026", status: "28 days", tone: "attention" }, { icon: Handshake, label: "East Ridge", copy: "Suma Patel · renews 14 Mar 2027", status: "Healthy", tone: "good" }, { icon: FileText, label: "Riverbend agreement", copy: "Document signed · 4 acres", status: "View PDF", tone: "neutral" }] },
    maintenance: { eyebrow: "Keep land ready", title: "Maintenance requests", subtitle: "Route irrigation, fencing and equipment requests to the right place.", statusLabel: "Open requests", status: "3 requests", statusCopy: "Two requests are waiting for your approval this week.", statLabel: "Avg. resolution", stat: "2.4 days", statNote: "Down 0.6 days this month", listTitle: "Request queue", items: [{ icon: Droplets, label: "Repair west irrigation line", copy: "Green Valley · Arjun Kumar · submitted today", status: "Approve", tone: "attention" }, { icon: Tractor, label: "Tractor service", copy: "Riverbend · scheduled for Friday", status: "Scheduled", tone: "good" }, { icon: HomeIcon, label: "Fence post replacement", copy: "East Ridge · 4 posts needed", status: "Review quote", tone: "neutral" }] },
    payments: { eyebrow: "Everything accounted for", title: "Payments & documents", subtitle: "Rent collection, receipts and agreements in one secure space.", statusLabel: "This year", status: "₹4.8L collected", statusCopy: "All active tenants are up to date for October.", statLabel: "Documents", stat: "18", statNote: "2 need your signature", listTitle: "Recent payments & files", items: [{ icon: WalletCards, label: "October rent · Green Valley", copy: "Arjun Kumar · received 02 Oct", status: "Received", tone: "good" }, { icon: WalletCards, label: "October rent · East Ridge", copy: "Suma Patel · received 01 Oct", status: "Received", tone: "good" }, { icon: FileText, label: "Renewal agreement", copy: "Green Valley · signature requested", status: "Review", tone: "attention" }] },
    performance: { eyebrow: "Understand your land", title: "Field performance", subtitle: "Season performance across every field, with the story behind the number.", statusLabel: "Portfolio output", status: "+14.8%", statusCopy: "Your land is performing above last season at this point in the cycle.", statLabel: "Best field", stat: "Green Valley", statNote: "+22% output value", listTitle: "Performance by field", items: [{ icon: LineChart, label: "Green Valley", copy: "8.2 acres · yield value up 22%", status: "Leading", tone: "good" }, { icon: LineChart, label: "Riverbend", copy: "4 acres · stable yield value", status: "+8%", tone: "neutral" }, { icon: LineChart, label: "East Ridge", copy: "6.5 acres · weather impacted", status: "Watch", tone: "attention" }] },
    weather: { eyebrow: "Protect your portfolio", title: "Weather & risk", subtitle: "A field-level view of conditions that could affect your land.", statusLabel: "Portfolio risk", status: "Low · 18/100", statusCopy: "No severe weather alerts. Keep an eye on the rain band Thursday.", statLabel: "Fields watched", stat: "6", statNote: "Across 2 districts", listTitle: "Signals by field", items: [{ icon: CloudSun, label: "Green Valley", copy: "27° · partly cloudy · soil moisture good", status: "Clear", tone: "good" }, { icon: Droplets, label: "East Ridge", copy: "Rain expected Thursday · cotton flowering", status: "Watch", tone: "attention" }, { icon: ShieldCheck, label: "Riverbend", copy: "No active disease signals", status: "Clear", tone: "good" }] },
    messages: { eyebrow: "Stay connected", title: "Messages", subtitle: "The important conversations with the people who work your land.", statusLabel: "Needs your attention", status: "2 messages", statusCopy: "A quick reply today can keep two field decisions moving.", statLabel: "Response time", stat: "4h", statNote: "Your average this month", listTitle: "Recent conversations", items: [{ icon: MessageCircle, label: "Suma Patel", copy: "Can we approve the west pump repair? · 42 min ago", status: "Reply", tone: "attention" }, { icon: MessageCircle, label: "Arjun Kumar", copy: "Flowering is looking good this week · 3h ago", status: "Read", tone: "good" }, { icon: MessageCircle, label: "Field support", copy: "Your October report is ready · yesterday", status: "Open", tone: "neutral" }] },
  } as Record<string, any>;
  return (role === "farmer" ? farmer : landlord)[view] ?? (role === "farmer" ? farmer.actions : landlord.fields);
}

function MetricCard({ label, value, note, icon: Icon, accent, progress }: { label: string; value: string; note: string; icon: typeof Sprout; accent: string; progress?: number }) {
  return <div className="metric-card"><div className={`metric-icon ${accent}`}><Icon size={18} /></div><div className="metric-copy"><span>{label}</span><strong>{value}</strong><small>{note}</small>{progress !== undefined && <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>}</div></div>;
}

function PanelHeading({ eyebrow, title, action, onAction }: { eyebrow: string; title: string; action: string; onAction: () => void }) {
  return <div className="panel-heading"><div><span className="panel-eyebrow">{eyebrow}</span><h3>{title}</h3></div><button className="text-button compact" onClick={onAction}>{action} <ArrowRight size={14} /></button></div>;
}

function ActionItem({ icon: Icon, title, copy, tag, tone }: { icon: typeof Sprout; title: string; copy: string; tag: string; tone: string }) {
  return <div className="action-item"><div className={`action-icon ${tone}`}><Icon size={17} /></div><div className="action-copy"><strong>{title}</strong><span>{copy}</span></div><span className={`action-tag ${tone}`}>{tag}</span><ChevronDown size={15} className="muted-icon" /> </div>;
}

function ModuleCard({ module, onClick }: { module: (typeof farmerModules)[number]; onClick: () => void }) {
  const Icon = module.icon;
  return <button className="module-card" onClick={onClick}><div className={`module-card-icon ${module.tone}`}><Icon size={19} /></div><div className="module-card-copy"><span>{module.eyebrow}</span><h4>{module.title}</h4><p>{module.description}</p></div><span className="module-card-arrow"><ArrowRight size={16} /></span></button>;
}

function Tenant({ initials, name, field, status, statusTone }: { initials: string; name: string; field: string; status: string; statusTone: string }) {
  return <div className="tenant-row"><div className="tenant-avatar">{initials}</div><div className="tenant-copy"><strong>{name}</strong><span>{field}</span></div><span className={`tenant-status ${statusTone}`}>{status}</span><ChevronDown size={15} className="muted-icon" /></div>;
}

export default App;
