import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Bot, Zap, Users, TrendingUp, Clock, Star, ArrowRight, Send,
  CheckCircle, MessageSquare, Calendar, Database, Phone, Globe,
  Shield, Cpu, BarChart3, Sparkles, Lock, ChevronRight,
  Activity, Mic, Paperclip, MoreHorizontal, UserCheck, Headphones,
  Building2, BadgeCheck, Wifi, RefreshCw, Brain, Target,
  DollarSign, Award, Server, GitBranch, Layers, SquareCode,
  ChevronUp, Minus, X, Circle, BrainCircuit, ScanLine, Workflow
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────────────────────────────── */
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Geist+Mono:wght@300;400;500;600&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --void:#030508;
      --s1:#07090f;
      --s2:#0b0e1a;
      --s3:#0f1321;
      --s4:#141829;
      --s5:#1a1f33;
      --bd0:rgba(255,255,255,0.04);
      --bd1:rgba(255,255,255,0.07);
      --bd2:rgba(255,255,255,0.11);
      --bda:rgba(99,102,241,0.22);
      --bda2:rgba(99,102,241,0.4);
      --indigo:#6366f1;
      --violet:#7c3aed;
      --cyan:#06b6d4;
      --em:#10b981;
      --am:#f59e0b;
      --rose:#f43f5e;
      --t1:#f1f5f9;
      --t2:#94a3b8;
      --t3:#475569;
      --t4:#2d3a52;
      --t5:#1a2236;
    }
    html,body,#root{height:100%;width:100%}
    body{
      background:var(--void);
      font-family:'Plus Jakarta Sans',sans-serif;
      color:var(--t1);
      overflow:hidden;
      -webkit-font-smoothing:antialiased;
      -moz-osx-font-smoothing:grayscale;
    }
    .ff-display{font-family:'Bricolage Grotesque',sans-serif}
    .ff-mono{font-family:'Geist Mono',monospace}

    /* Scrollbars */
    ::-webkit-scrollbar{width:3px;height:3px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:rgba(99,102,241,0.2);border-radius:4px}
    ::-webkit-scrollbar-thumb:hover{background:rgba(99,102,241,0.4)}

    /* Grid */
    .grid-bg{
      background-image:
        linear-gradient(rgba(99,102,241,0.035) 1px,transparent 1px),
        linear-gradient(90deg,rgba(99,102,241,0.035) 1px,transparent 1px);
      background-size:48px 48px;
    }

    /* Gradient text */
    .gt{
      background:linear-gradient(135deg,#e2e8f0 0%,#a5b4fc 45%,#818cf8 70%,#c4b5fd 100%);
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
    }
    .gt-cyan{
      background:linear-gradient(135deg,#67e8f9 0%,#22d3ee 40%,#6366f1 100%);
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
    }
    .gt-em{
      background:linear-gradient(135deg,#6ee7b7 0%,#10b981 50%,#059669 100%);
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
    }

    /* Noise */
    .noise::before{
      content:'';position:absolute;inset:0;border-radius:inherit;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
      pointer-events:none;z-index:1;
    }

    /* Animations */
    @keyframes pulse-em{0%,100%{opacity:1}50%{opacity:0.35}}
    @keyframes spin-slow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
    @keyframes float-y{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
    @keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(400%)}}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
    @keyframes data-flow{
      0%{stroke-dashoffset:1000}
      100%{stroke-dashoffset:0}
    }
    @keyframes count-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}

    .pulse-em{animation:pulse-em 2s ease-in-out infinite}
    .spin-slow{animation:spin-slow 18s linear infinite}
    .float-y{animation:float-y 5s ease-in-out infinite}
    .cursor-blink{animation:blink 1s step-end infinite}

    /* Btn primary */
    .btn-p{
      background:linear-gradient(135deg,#4338ca,#5b21b6);
      box-shadow:0 0 0 1px rgba(99,102,241,0.45),0 4px 28px rgba(79,70,229,0.45),inset 0 1px 0 rgba(255,255,255,0.12);
      transition:all 0.2s ease;color:#fff;
    }
    .btn-p:hover{
      box-shadow:0 0 0 1px rgba(99,102,241,0.65),0 6px 36px rgba(79,70,229,0.6),inset 0 1px 0 rgba(255,255,255,0.18);
      transform:translateY(-1px);
    }
    .btn-p:active{transform:translateY(0)}

    .btn-g{
      background:rgba(255,255,255,0.04);
      border:1px solid rgba(255,255,255,0.09);
      transition:all 0.2s ease;
    }
    .btn-g:hover{background:rgba(255,255,255,0.07);border-color:rgba(255,255,255,0.15);transform:translateY(-1px)}

    /* Card hover */
    .ch{transition:all 0.25s ease}
    .ch:hover{border-color:var(--bda)!important;box-shadow:0 0 28px rgba(99,102,241,0.07)!important;transform:translateY(-1px)}

    /* Input */
    .inp-wrap:focus-within{
      border-color:rgba(99,102,241,0.5)!important;
      box-shadow:0 0 0 3px rgba(99,102,241,0.09),0 0 40px rgba(99,102,241,0.07)!important;
    }
    input:focus{outline:none}

    /* Message bubbles */
    .bub-ai{
      background:linear-gradient(135deg,rgba(15,19,33,0.95),rgba(20,24,41,0.95));
      border:1px solid rgba(99,102,241,0.18);
      backdrop-filter:blur(16px);
    }
    .bub-user{
      background:linear-gradient(135deg,#4338ca,#5b21b6);
      box-shadow:0 4px 24px rgba(79,70,229,0.3);
    }

    /* Processing state */
    .proc-bar{
      background:linear-gradient(90deg,transparent,rgba(99,102,241,0.8),transparent);
      background-size:200% 100%;
      animation:shimmer 1.4s ease-in-out infinite;
    }

    /* Chart path animation */
    .chart-path{
      stroke-dasharray:1000;
      stroke-dashoffset:1000;
      animation:data-flow 2s ease forwards;
    }
    .chart-path-2{
      stroke-dasharray:1000;
      stroke-dashoffset:1000;
      animation:data-flow 2.4s ease forwards 0.3s;
    }

    /* Live counter */
    .live-counter{animation:count-in 0.5s ease forwards}

    /* Scan line */
    .scan-wrap{overflow:hidden;position:relative}
    .scan-line{
      position:absolute;left:0;right:0;height:2px;
      background:linear-gradient(90deg,transparent,rgba(99,102,241,0.6),transparent);
      animation:scanline 3s linear infinite;
    }
  `}</style>
);

/* ─────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────── */
const PROCESSING_STATES = [
  ["Analyzing intent signal...", "Scanning CRM knowledge base...", "Generating enterprise response..."],
  ["Retrieving business context...", "Matching qualification criteria...", "Composing optimized reply..."],
  ["Processing semantic query...", "Accessing lead intelligence...", "Synthesizing personalized output..."],
  ["Evaluating conversation depth...", "Pulling pipeline analytics...", "Structuring enterprise message..."],
];

const FLOWS = {
  "View Pricing & Plans": {
    user: "What are your pricing plans?",
    ai: `I can walk you through our three enterprise tiers — each designed around a specific growth stage.\n\n**Starter** — $297 / month\nSingle AI agent, 2,000 conversation capacity, email support, standard analytics dashboard. Ideal for businesses validating AI automation.\n\n**Growth** — $697 / month\nFive concurrent AI agents, unlimited conversations, native CRM sync (HubSpot, Salesforce, Pipedrive), priority support, advanced lead scoring. Used by most of our scaling clients.\n\n**Enterprise** — Custom pricing\nWhite-label deployment, dedicated solutions engineer, multi-region infrastructure, full API access, SLA-backed uptime, custom compliance framework.\n\nAll tiers include a 14-day risk-free trial with zero onboarding friction. Would you like me to recommend the right tier for your current revenue range?`,
    quick: ["Book Strategy Call", "Start Free Trial", "Talk to Enterprise Sales"]
  },
  "Book a Strategy Call": {
    user: "I'd like to book a strategy call.",
    ai: `Excellent. Our strategy sessions are high-signal, 30-minute engagements — no sales pitch, pure business engineering.\n\nHere's what we cover:\n• Your current lead acquisition and support bottlenecks\n• Automation architecture tailored to your industry\n• Projected ROI based on your volume and conversion data\n• Live demonstration of a custom agent built for your use case\n\nI have three slots available this week with our Senior Solutions Architect:\n\n📅 **Tuesday** · 2:00 PM GMT\n📅 **Thursday** · 11:00 AM GMT\n📅 **Friday** · 4:30 PM GMT\n\nWhich works best? I'll send a brief, a Zoom link, and your personalized pre-call analysis immediately.`,
    quick: ["Tuesday 2PM", "Thursday 11AM", "Friday 4:30PM"]
  },
  "See Live Demo": {
    user: "Can I see a live demonstration?",
    ai: `Absolutely. What you're experiencing right now is a live demonstration of Pixel AI's enterprise conversational intelligence.\n\nBut I can also show you what this looks like deployed inside a real business:\n\n**E-commerce client** — AI handling 94% of support tickets autonomously, reducing ticket resolution time from 4.2 hours to 8 minutes.\n\n**B2B SaaS client** — AI qualifying 340 inbound leads per month, booking demos directly into the sales team calendar with zero manual intervention.\n\n**Healthcare group** — HIPAA-compliant AI managing appointment scheduling across 12 locations, increasing booking rate by 67%.\n\nShall I walk you through the architecture behind any of these, or would you prefer to see your industry specifically?`,
    quick: ["E-commerce Use Case", "B2B SaaS Use Case", "Book Strategy Call"]
  },
  "Tuesday 2PM": {
    user: "Tuesday at 2PM works for me.",
    ai: `✅ **Confirmed — Tuesday, 2:00 PM GMT**\n\nYou're on the calendar with our Senior Solutions Architect. Within the next 5 minutes you'll receive:\n\n• Calendar invite with Zoom link\n• Pre-call business intelligence brief\n• Industry-specific case study pack\n• Agenda tailored to your use case\n\nTo make the call as high-value as possible, come prepared with your current monthly lead volume and primary conversion bottleneck. We'll handle the rest.\n\nWe look forward to building something significant with you.`,
    quick: ["View Pricing & Plans", "Explore Integrations"]
  },
  "Thursday 11AM": {
    user: "Thursday at 11AM works perfectly.",
    ai: `✅ **Confirmed — Thursday, 11:00 AM GMT**\n\nCalendar invite and pre-call materials are being sent now. Our Solutions Architect specializes in your sector and will arrive with a custom automation blueprint already drafted.\n\nThis session typically results in a clear 90-day automation roadmap. We're looking forward to Thursday.`,
    quick: ["View Pricing & Plans", "Start Free Trial"]
  },
  "Start Free Trial": {
    user: "I want to start the free trial.",
    ai: `Let's activate your trial — this takes approximately 90 seconds.\n\n**Your 14-day Growth plan trial includes:**\n✓ Five concurrent AI agents — fully configured\n✓ Unlimited conversations from day one\n✓ Dedicated onboarding specialist (real human, not AI)\n✓ Pre-built templates for your industry vertical\n✓ CRM integration assistance\n✓ Daily performance reports\n✓ Direct Slack channel with our engineering team\n\nZero credit card. Zero commitment. Full access.\n\nReady to proceed?`,
    quick: ["Yes — Activate Trial", "Talk to Enterprise Sales", "Book Strategy Call"]
  },
  "Talk to Enterprise Sales": {
    user: "I'd like to speak with your enterprise sales team.",
    ai: `Our Enterprise team handles platform deployments for organizations running 10,000+ monthly conversations or requiring white-label infrastructure.\n\nHere's what the enterprise engagement looks like:\n\n**Week 1** — Discovery + architecture review\n**Week 2** — Custom agent development + integration\n**Week 3** — Staging deployment + QA\n**Week 4** — Production launch + team training\n\nClients in this tier typically see full ROI within 47 days of deployment.\n\nI can connect you with a Senior Enterprise Account Executive today. They handle accounts in Finance, E-commerce, Healthcare, and Professional Services globally. What's your primary industry?`,
    quick: ["Finance / Fintech", "E-commerce / Retail", "Healthcare / MedTech", "Book Strategy Call"]
  },
  "E-commerce Use Case": {
    user: "Tell me more about the e-commerce use case.",
    ai: `Our e-commerce deployment at a UK-based fashion retailer is one of our most documented case studies.\n\n**The challenge:** 2,400 monthly support tickets, 4.2-hour average resolution time, 23% cart abandonment from support-related friction.\n\n**The Pixel AI deployment:**\nSingle AI agent handling returns, sizing, order tracking, and product recommendations. Integrated directly with Shopify and their existing helpdesk.\n\n**Results at 90 days:**\n• 94% of tickets resolved without human escalation\n• Resolution time: 4.2 hours → 8 minutes\n• Cart abandonment reduced by 31%\n• $284K incremental revenue attributed to AI recommendations\n• Support team headcount reduced from 8 to 3, redeployed to retention\n\nWould you like the full case study PDF, or shall we scope what this could look like for your operation specifically?`,
    quick: ["Book Strategy Call", "View Pricing & Plans", "Start Free Trial"]
  },
};

const STATS = [
  { label: "Revenue Generated", value: "$2.4M", sub: "across active clients", color: "#10b981", icon: DollarSign, trend: "+34%" },
  { label: "Qualified Leads", value: "18,492", sub: "this month", color: "#6366f1", icon: Target, trend: "+22%" },
  { label: "Avg Conversion Rate", value: "34.7%", sub: "industry avg: 9.2%", color: "#06b6d4", icon: TrendingUp, trend: "+8.2%" },
  { label: "Support Resolution", value: "92%", sub: "autonomous resolution", color: "#7c3aed", icon: Zap, trend: "+15%" },
];

const FEATURES = [
  { icon: Brain, title: "Conversational Intelligence", desc: "Context-aware multi-turn reasoning across every channel", accent: "#6366f1" },
  { icon: Target, title: "Lead Qualification Engine", desc: "Scores, qualifies, and routes leads in real-time", accent: "#7c3aed" },
  { icon: Calendar, title: "Autonomous Booking", desc: "Syncs with any calendar — zero friction scheduling", accent: "#06b6d4" },
  { icon: Workflow, title: "Workflow Automation", desc: "Connects your CRM, helpdesk, and data pipelines", accent: "#10b981" },
  { icon: Phone, title: "Omnichannel Presence", desc: "WhatsApp, Messenger, SMS, Email, Web — unified", accent: "#f59e0b" },
  { icon: BarChart3, title: "Revenue Attribution", desc: "Full-funnel analytics tied to AI interactions", accent: "#f43f5e" },
];

const INTEGRATIONS = [
  { name: "HubSpot", c: "#ff7a59" }, { name: "Salesforce", c: "#00a1e0" },
  { name: "Slack", c: "#e01e5a" }, { name: "Shopify", c: "#96bf48" },
  { name: "Stripe", c: "#635bff" }, { name: "Zapier", c: "#ff4a00" },
  { name: "WhatsApp", c: "#25d366" }, { name: "Notion", c: "#e2e8f0" },
  { name: "Intercom", c: "#1f8ded" }, { name: "Pipedrive", c: "#4b7bec" },
];

const TESTIMONIALS = [
  {
    name: "Sarah Chen", role: "CEO", company: "NovaTech Solutions",
    av: "SC", avBg: "linear-gradient(135deg,#6366f1,#7c3aed)",
    text: "We went from 47 to 183 qualified leads per month in 52 days. The AI qualifies better than our best SDR. ROI was visible in week two.",
    metric: "+290% leads in 52 days", mc: "#10b981",
  },
  {
    name: "Marco Bianchi", role: "VP Growth", company: "Nexora Group",
    av: "MB", avBg: "linear-gradient(135deg,#06b6d4,#6366f1)",
    text: "The WhatsApp automation alone generates more monthly revenue than our entire support team cost. The enterprise team built it in 11 days.",
    metric: "4.2× ROI in 30 days", mc: "#6366f1",
  },
];

const ACTIVITY = [
  { text: "Lead qualified & routed", detail: "SaaS · Frankfurt", time: "now", c: "#10b981" },
  { text: "Demo auto-booked", detail: "Fintech · Dubai", time: "1m", c: "#6366f1" },
  { text: "Support ticket resolved", detail: "Retail · London", time: "3m", c: "#06b6d4" },
  { text: "CRM record created", detail: "Healthcare · NYC", time: "6m", c: "#7c3aed" },
  { text: "WhatsApp campaign sent", detail: "E-comm · Riyadh", time: "9m", c: "#f59e0b" },
];

/* ─────────────────────────────────────────────────────────────────
   MINI LIVE CHART  (SVG sparkline)
───────────────────────────────────────────────────────────────── */
function MiniChart({ color = "#6366f1", data, h = 40, animated = true }) {
  const w = 120;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 6) - 3;
    return `${x},${y}`;
  });
  const pathD = `M ${pts.join(" L ")}`;
  const areaD = `M 0,${h} L ${pts.join(" L ")} L ${w},${h} Z`;

  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={`g${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#g${color.replace("#", "")})`} />
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? "chart-path" : ""}
        style={{ filter: `drop-shadow(0 0 3px ${color}80)` }}
      />
      {/* Last point dot */}
      <circle
        cx={pts[pts.length - 1].split(",")[0]}
        cy={pts[pts.length - 1].split(",")[1]}
        r="3"
        fill={color}
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
    </svg>
  );
}

/* Revenue area chart */
function RevenueChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const vals = [42, 58, 51, 74, 89, 108, 134, 156];
  const h = 80, w = 280;
  const max = 160, min = 30;
  const range = max - min;
  const pts = vals.map((v, i) => {
    const x = (i / (vals.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 10) - 5;
    return { x, y };
  });
  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`).join(" ");
  const areaD = `M 0,${h} L ${pts.map(p => `${p.x},${p.y}`).join(" L ")} L ${w},${h} Z`;

  return (
    <div className="relative">
      <svg width="100%" height={h + 20} viewBox={`0 0 ${w} ${h + 20}`} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(t => (
          <line key={t} x1="0" y1={h * t} x2={w} y2={h * t}
            stroke="rgba(99,102,241,0.08)" strokeWidth="1" strokeDasharray="4,4" />
        ))}
        <path d={areaD} fill="url(#revGrad)" />
        <path d={pathD} fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"
          className="chart-path"
          style={{ filter: "drop-shadow(0 0 6px rgba(99,102,241,0.6))" }} />
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={i === pts.length - 1 ? 4 : 2.5}
            fill={i === pts.length - 1 ? "#6366f1" : "rgba(99,102,241,0.6)"}
            style={i === pts.length - 1 ? { filter: "drop-shadow(0 0 5px #6366f1)" } : {}} />
        ))}
        {/* Month labels */}
        {months.map((m, i) => (
          <text key={m} x={(i / (months.length - 1)) * w} y={h + 16}
            textAnchor="middle" fontSize="9" fill="rgba(71,85,105,0.8)"
            style={{ fontFamily: "'Geist Mono',monospace" }}>
            {m}
          </text>
        ))}
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   CURSOR GLOW
───────────────────────────────────────────────────────────────── */
function CursorGlow() {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = e => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  return (
    <motion.div
      className="pointer-events-none fixed z-50"
      style={{
        left: sx, top: sy,
        width: 420, height: 420,
        x: "-50%", y: "-50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.055) 0%, transparent 65%)",
        borderRadius: "50%",
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────
   MESH BACKGROUND
───────────────────────────────────────────────────────────────── */
function Mesh() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      {/* Glows */}
      <div className="absolute" style={{ top: "-5%", left: "-5%", width: 700, height: 700, background: "radial-gradient(ellipse,rgba(99,102,241,0.1) 0%,transparent 60%)" }} />
      <div className="absolute" style={{ bottom: "-10%", right: "-5%", width: 600, height: 600, background: "radial-gradient(ellipse,rgba(124,58,237,0.08) 0%,transparent 65%)" }} />
      <div className="absolute" style={{ top: "35%", right: "20%", width: 350, height: 350, background: "radial-gradient(ellipse,rgba(6,182,212,0.05) 0%,transparent 65%)" }} />
      {/* Floating dots */}
      {[
        [12, 18, 4, "#6366f1", 0], [88, 12, 3, "#06b6d4", 1.1], [76, 68, 5, "#7c3aed", 2.2],
        [18, 72, 3, "#10b981", 1.6], [52, 8, 2.5, "#6366f1", 0.7], [34, 88, 4, "#06b6d4", 2.8],
        [93, 48, 3, "#6366f1", 0.4], [6, 50, 2, "#7c3aed", 1.9], [65, 30, 2, "#10b981", 3.1],
      ].map(([x, y, sz, col, d], i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ left: `${x}%`, top: `${y}%`, width: sz, height: sz, background: col, opacity: 0.55 }}
          animate={{ y: [0, -14, 0], opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 3.5 + d, repeat: Infinity, delay: d, ease: "easeInOut" }} />
      ))}
      {/* Horizontal accent line */}
      <div className="absolute" style={{ top: "50%", left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.06),transparent)" }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   STAT CARD
───────────────────────────────────────────────────────────────── */
const CHART_DATA = {
  "$2.4M": [38, 52, 47, 68, 84, 101, 128, 156],
  "18,492": [920, 1100, 980, 1380, 1590, 1820, 2100, 2400],
  "34.7%": [18, 22, 20, 26, 29, 31, 33, 35],
  "92%": [68, 74, 71, 78, 82, 85, 89, 92],
};

function StatCard({ s, i }) {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 600 + i * 120); return () => clearTimeout(t); }, [i]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="ch relative flex flex-col gap-2 p-4 rounded-2xl overflow-hidden"
      style={{ background: "var(--s3)", border: "1px solid var(--bd0)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.035)" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg,transparent,${s.color}55,transparent)` }} />
      <div className="flex items-start justify-between">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${s.color}15`, border: `1px solid ${s.color}25` }}>
          <s.icon size={13} style={{ color: s.color }} />
        </div>
        <motion.span className="text-xs ff-mono px-1.5 py-0.5 rounded font-medium"
          style={{ background: `${s.color}12`, color: s.color }}
          initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }}>
          {s.trend}
        </motion.span>
      </div>
      <motion.div className="ff-display font-bold leading-none"
        style={{ fontSize: 28, color: s.color }}
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: show ? 1 : 0, y: show ? 0 : 8 }}
        transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}>
        {s.value}
      </motion.div>
      <div className="text-xs font-semibold" style={{ color: "var(--t2)" }}>{s.label}</div>
      <div className="text-xs" style={{ color: "var(--t3)" }}>{s.sub}</div>
      {CHART_DATA[s.value] && (
        <div className="mt-1">
          <MiniChart color={s.color} data={CHART_DATA[s.value]} h={32} />
        </div>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PROCESSING STATE (AI thinking animation)
───────────────────────────────────────────────────────────────── */
function ProcessingState({ stateIndex }) {
  const sets = PROCESSING_STATES[stateIndex % PROCESSING_STATES.length];
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % sets.length), 600);
    return () => clearInterval(t);
  }, [sets]);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      className="flex items-end gap-2.5">
      {/* Avatar */}
      <div className="relative w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: "linear-gradient(135deg,#4338ca,#5b21b6)", boxShadow: "0 0 18px rgba(99,102,241,0.4)" }}>
        <BrainCircuit size={16} className="text-white" />
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-indigo-400 pulse-em"
          style={{ border: "2px solid #030508" }} />
      </div>

      {/* Processing card */}
      <div className="flex flex-col gap-2 px-4 py-3.5 rounded-2xl rounded-bl-sm min-w-[220px]"
        style={{ background: "linear-gradient(135deg,rgba(15,19,33,0.95),rgba(20,24,41,0.95))", border: "1px solid rgba(99,102,241,0.2)" }}>

        {/* Shimmer bar */}
        <div className="relative h-1 rounded-full overflow-hidden" style={{ background: "rgba(99,102,241,0.1)" }}>
          <div className="absolute inset-y-0 left-0 w-1/2 proc-bar rounded-full" />
        </div>

        {/* State text */}
        <AnimatePresence mode="wait">
          <motion.div key={step}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2">
            <ScanLine size={11} style={{ color: "#818cf8", flexShrink: 0 }} />
            <span className="text-xs ff-mono" style={{ color: "#818cf8" }}>{sets[step]}</span>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex gap-1.5">
          {[0, 0.12, 0.24].map(d => (
            <motion.div key={d} className="w-1.5 h-1.5 rounded-full" style={{ background: "#4f46e5" }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: d }} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   STREAMING MESSAGE (word by word)
───────────────────────────────────────────────────────────────── */
function StreamingMessage({ text, onDone, quick, onQuick }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const words = useRef(text.split(" "));
  const idx = useRef(0);

  useEffect(() => {
    const tick = () => {
      if (idx.current >= words.current.length) {
        setDone(true);
        onDone?.();
        return;
      }
      const chunk = words.current.slice(0, idx.current + 1).join(" ");
      setDisplayed(chunk);
      idx.current += 1;
      // Variable speed for realism
      const delay = idx.current % 7 === 0 ? 80 : idx.current % 3 === 0 ? 45 : 28;
      setTimeout(tick, delay);
    };
    tick();
  }, []);

  const lines = displayed.split("\n").filter((l, i, arr) => !(l === "" && arr[i - 1] === ""));

  return (
    <motion.div initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }} className="flex items-end gap-2.5">
      <div className="relative w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: "linear-gradient(135deg,#4338ca,#5b21b6)", boxShadow: "0 0 18px rgba(99,102,241,0.4)" }}>
        <BrainCircuit size={16} className="text-white" />
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400"
          style={{ border: "2px solid #030508", boxShadow: "0 0 6px rgba(16,185,129,0.5)" }} />
      </div>

      <div className="flex flex-col items-start max-w-[82%]">
        <div className="bub-ai px-5 py-4 rounded-2xl rounded-bl-sm">
          {lines.map((line, i) => {
            if (line === "") return <div key={i} className="h-2" />;
            const html = line.replace(/\*\*(.*?)\*\*/g, "<strong style='color:#e2e8f0;font-weight:600'>$1</strong>");
            return (
              <p key={i} className={i > 0 && lines[i - 1] !== "" ? "mt-1" : ""}
                style={{ color: "var(--t2)", fontSize: 13.5, lineHeight: 1.65 }}
                dangerouslySetInnerHTML={{ __html: html }} />
            );
          })}
          {!done && <span className="inline-block w-0.5 h-3.5 ml-0.5 bg-indigo-400 cursor-blink" style={{ verticalAlign: "text-bottom" }} />}
        </div>
        <span className="text-xs mt-1.5 px-1 ff-mono" style={{ color: "var(--t4)" }}>
          {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} · Pixel AI
        </span>
        {done && quick && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="flex flex-wrap gap-2 mt-2.5">
            {quick.map(q => (
              <button key={q} onClick={() => onQuick(q)}
                className="text-xs px-3.5 py-2 rounded-xl font-medium transition-all hover:scale-105 active:scale-95"
                style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.28)", color: "#a5b4fc" }}>
                {q}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   STATIC AI MESSAGE
───────────────────────────────────────────────────────────────── */
function AiMessage({ msg, onQuick }) {
  const lines = msg.text.split("\n").filter((l, i, arr) => !(l === "" && arr[i - 1] === ""));
  return (
    <motion.div initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }} className="flex items-end gap-2.5">
      <div className="relative w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: "linear-gradient(135deg,#4338ca,#5b21b6)", boxShadow: "0 0 18px rgba(99,102,241,0.4)" }}>
        <BrainCircuit size={16} className="text-white" />
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400"
          style={{ border: "2px solid #030508" }} />
      </div>
      <div className="flex flex-col items-start max-w-[82%]">
        <div className="bub-ai px-5 py-4 rounded-2xl rounded-bl-sm">
          {lines.map((line, i) => {
            if (line === "") return <div key={i} className="h-2" />;
            const html = line.replace(/\*\*(.*?)\*\*/g, "<strong style='color:#e2e8f0;font-weight:600'>$1</strong>");
            return (
              <p key={i} className={i > 0 && lines[i - 1] !== "" ? "mt-1" : ""}
                style={{ color: "var(--t2)", fontSize: 13.5, lineHeight: 1.65 }}
                dangerouslySetInnerHTML={{ __html: html }} />
            );
          })}
        </div>
        <span className="text-xs mt-1.5 px-1 ff-mono" style={{ color: "var(--t4)" }}>
          {msg.time} · Pixel AI
        </span>
        {msg.quick && (
          <div className="flex flex-wrap gap-2 mt-2.5">
            {msg.quick.map(q => (
              <button key={q} onClick={() => onQuick(q)}
                className="text-xs px-3.5 py-2 rounded-xl font-medium transition-all hover:scale-105 active:scale-95"
                style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.28)", color: "#a5b4fc" }}>
                {q}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* User message */
function UserMessage({ msg }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }} className="flex items-end gap-2.5 flex-row-reverse">
      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
        style={{ background: "linear-gradient(135deg,#374151,#1f2937)", border: "1px solid rgba(255,255,255,0.1)" }}>
        U
      </div>
      <div className="flex flex-col items-end max-w-[78%]">
        <div className="bub-user px-5 py-3.5 rounded-2xl rounded-br-sm">
          <p style={{ color: "rgba(255,255,255,0.93)", fontSize: 13.5, lineHeight: 1.6 }}>{msg.text}</p>
        </div>
        <span className="text-xs mt-1.5 px-1 ff-mono" style={{ color: "var(--t4)" }}>{msg.time}</span>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────────────────────────── */
export default function App() {
  const getTime = () => new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const [messages, setMessages] = useState([
    {
      id: 1, type: "ai-static", time: "09:41 AM",
      text: `Welcome. I'm Pixel AI — PixelMind Developers' enterprise-grade conversational intelligence platform.\n\nI'm deployed across 200+ businesses globally, managing customer support, lead qualification, appointment booking, and revenue operations — 24 hours a day, without human intervention.\n\nHow can I demonstrate value for your business today?`,
      quick: ["View Pricing & Plans", "Book a Strategy Call", "See Live Demo"],
    }
  ]);

  const [inputVal, setInputVal] = useState("");
  const [phase, setPhase] = useState("idle"); // idle | processing | streaming
  const [procIndex, setProcIndex] = useState(0);
  const [streamPayload, setStreamPayload] = useState(null);
  const [idCtr, setIdCtr] = useState(10);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, phase]);

  const triggerAiResponse = useCallback((text, quick) => {
    const pi = Math.floor(Math.random() * PROCESSING_STATES.length);
    setProcIndex(pi);
    setPhase("processing");

    const procDuration = 1800 + Math.random() * 600;
    setTimeout(() => {
      setPhase("streaming");
      setStreamPayload({ text, quick });
    }, procDuration);
  }, []);

  const handleQuick = useCallback((label) => {
    const flow = FLOWS[label];
    if (!flow || phase !== "idle") return;

    const uid = idCtr + 1;
    setIdCtr(uid);
    setMessages(prev => [...prev, { id: uid, type: "user", time: getTime(), text: flow.user }]);
    triggerAiResponse(flow.ai, flow.quick);
  }, [idCtr, phase, triggerAiResponse]);

  const handleSend = useCallback(() => {
    const text = inputVal.trim();
    if (!text || phase !== "idle") return;
    const uid = idCtr + 1;
    setIdCtr(uid);
    setMessages(prev => [...prev, { id: uid, type: "user", time: getTime(), text }]);
    setInputVal("");
    triggerAiResponse(
      `I've captured your message and flagged it for immediate attention from our solutions team.\n\nBased on what you've shared, Pixel AI can likely address this through one of three approaches:\n\n**Automated resolution** — If this is a recurring query pattern, we build a targeted AI flow that handles it end-to-end without human input.\n\n**Intelligent escalation** — If the situation requires human judgment, the AI qualifies and routes it to the right team member with full context already populated in your CRM.\n\n**Proactive engagement** — For revenue-impacting scenarios, the AI initiates outreach before issues escalate.\n\nWhich direction would be most valuable to explore first?`,
      ["Book a Strategy Call", "View Pricing & Plans", "Talk to Enterprise Sales"]
    );
  }, [inputVal, phase, idCtr, triggerAiResponse]);

  const onStreamDone = useCallback(() => {
    const sp = streamPayload;
    const uid = idCtr + 2;
    setIdCtr(uid + 1);
    setMessages(prev => {
      const filtered = prev.filter(m => m.type !== "streaming-placeholder");
      return [...filtered, { id: uid, type: "ai-static", time: getTime(), text: sp.text, quick: sp.quick }];
    });
    setStreamPayload(null);
    setPhase("idle");
  }, [streamPayload, idCtr]);

  // Live activity counter
  const [liveCount, setLiveCount] = useState(1247);
  useEffect(() => {
    const t = setInterval(() => setLiveCount(c => c + Math.floor(Math.random() * 3)), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <G />
      <CursorGlow />

      <div className="relative flex h-screen w-screen overflow-hidden" style={{ background: "var(--void)" }}>
        <Mesh />

        <div className="relative z-10 flex w-full h-full">

          {/* ══════════════════════════════════════════════
              LEFT PANEL
          ══════════════════════════════════════════════ */}
          <motion.aside
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 flex flex-col overflow-y-auto"
            style={{
              width: 440,
              padding: "28px 22px",
              borderRight: "1px solid var(--bd0)",
              background: "linear-gradient(180deg,rgba(7,9,15,0.92) 0%,rgba(7,9,15,0.96) 100%)",
              gap: 0,
            }}>

            {/* ── Logo ── */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg,#4338ca,#5b21b6)",
                    boxShadow: "0 0 28px rgba(99,102,241,0.45), inset 0 1px 0 rgba(255,255,255,0.15)"
                  }}>
                  <Cpu size={18} className="text-white" />
                  <div className="absolute inset-0 rounded-2xl spin-slow opacity-20"
                    style={{ background: "conic-gradient(from 0deg,transparent 60%,rgba(165,180,252,0.5) 80%,transparent 100%)" }} />
                </div>
                <div>
                  <div className="ff-display font-bold text-sm tracking-widest" style={{ color: "var(--t1)", letterSpacing: "0.1em" }}>
                    PIXELMIND
                  </div>
                  <div className="text-xs ff-mono tracking-wider" style={{ color: "var(--t3)", letterSpacing: "0.08em" }}>
                    DEVELOPERS
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <span className="pulse-em w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-xs ff-mono font-medium" style={{ color: "#10b981", letterSpacing: "0.06em" }}>LIVE</span>
              </div>
            </div>

            {/* ── Hero ── */}
            <div className="mb-8">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
                style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.22)" }}>
                <Sparkles size={10} style={{ color: "#818cf8" }} />
                <span className="text-xs font-medium" style={{ color: "#a5b4fc" }}>Enterprise AI · SOC2 Certified · 200+ Clients</span>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
                <h1 className="ff-display font-bold leading-[1.06] mb-1" style={{ fontSize: 40 }}>
                  <span className="gt">Pixel AI</span>
                </h1>
                <h2 className="ff-display font-bold leading-[1.1] mb-5" style={{ fontSize: 26, color: "var(--t1)" }}>
                  AI Systems That Convert<br />Visitors Into Revenue
                </h2>
              </motion.div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="text-sm leading-relaxed mb-6" style={{ color: "var(--t2)", maxWidth: 360 }}>
                Enterprise-grade conversational AI that automates support, qualifies leads, and books appointments — 24 hours a day, across every channel your customers use.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="flex gap-3">
                <button className="btn-p flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold">
                  <Calendar size={14} /> Book Strategy Call
                </button>
                <button className="btn-g flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium" style={{ color: "var(--t2)" }}>
                  See Plans <ChevronRight size={13} />
                </button>
              </motion.div>
            </div>

            {/* ── Stats ── */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-widest ff-mono" style={{ color: "var(--t3)", letterSpacing: "0.14em" }}>
                  Platform Metrics
                </span>
                <span className="text-xs ff-mono px-2 py-0.5 rounded" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}>
                  Live · updates every 30s
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {STATS.map((s, i) => <StatCard key={s.label} s={s} i={i} />)}
              </div>
            </div>

            {/* ── Revenue chart ── */}
            <div className="mb-6 p-4 rounded-2xl" style={{ background: "var(--s3)", border: "1px solid var(--bd0)" }}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-semibold" style={{ color: "var(--t1)", fontFamily: "'Bricolage Grotesque',sans-serif" }}>
                    Client Revenue Generated
                  </div>
                  <div className="text-xs ff-mono mt-0.5" style={{ color: "var(--t3)" }}>Monthly · all active clients</div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="ff-display font-bold text-lg" style={{ color: "#10b981" }}>$2.4M</span>
                  <span className="text-xs ff-mono" style={{ color: "#10b981" }}>+34% MoM</span>
                </div>
              </div>
              <RevenueChart />
            </div>

            {/* ── Features ── */}
            <div className="mb-6">
              <div className="text-xs font-semibold uppercase tracking-widest ff-mono mb-3" style={{ color: "var(--t3)", letterSpacing: "0.14em" }}>Core Capabilities</div>
              <div className="grid grid-cols-2 gap-2">
                {FEATURES.map((f, i) => (
                  <motion.div key={f.title}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.06, duration: 0.4 }}
                    className="ch flex items-start gap-2.5 p-3.5 rounded-xl"
                    style={{ background: "var(--s4)", border: "1px solid var(--bd0)" }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${f.accent}12`, border: `1px solid ${f.accent}22` }}>
                      <f.icon size={13} style={{ color: f.accent }} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold mb-0.5" style={{ color: "var(--t1)", fontFamily: "'Bricolage Grotesque',sans-serif" }}>{f.title}</div>
                      <div className="text-xs leading-relaxed" style={{ color: "var(--t3)" }}>{f.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Integrations ── */}
            <div className="mb-6 p-4 rounded-2xl" style={{ background: "var(--s3)", border: "1px solid var(--bd0)" }}>
              <div className="text-xs font-semibold uppercase tracking-widest ff-mono mb-3" style={{ color: "var(--t3)", letterSpacing: "0.14em" }}>Native Integrations</div>
              <div className="flex flex-wrap gap-2">
                {INTEGRATIONS.map(({ name, c }) => (
                  <div key={name} className="ch flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                    style={{ background: "var(--s4)", border: "1px solid var(--bd0)" }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: c }} />
                    <span className="text-xs font-medium" style={{ color: "var(--t2)" }}>{name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Live Activity ── */}
            <div className="mb-6 p-4 rounded-2xl scan-wrap" style={{ background: "var(--s3)", border: "1px solid var(--bd0)" }}>
              <div className="scan-line" />
              <div className="flex items-center justify-between mb-2 relative z-10">
                <span className="text-xs font-semibold uppercase tracking-widest ff-mono" style={{ color: "var(--t3)", letterSpacing: "0.14em" }}>Live Activity</span>
                <div className="flex items-center gap-1.5 ff-mono text-xs font-semibold" style={{ color: "#10b981" }}>
                  <span className="pulse-em w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {liveCount.toLocaleString()} active sessions
                </div>
              </div>
              <div className="relative z-10">
                {ACTIVITY.map((a, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-2.5 py-1.5" style={{ borderTop: i > 0 ? "1px solid var(--bd0)" : "none" }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: a.c, boxShadow: `0 0 4px ${a.c}` }} />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-medium" style={{ color: "var(--t2)" }}>{a.text}</span>
                      <span className="text-xs ml-1.5" style={{ color: "var(--t3)" }}>· {a.detail}</span>
                    </div>
                    <span className="text-xs flex-shrink-0 ff-mono" style={{ color: "var(--t4)" }}>{a.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Testimonials ── */}
            <div className="mb-6">
              <div className="text-xs font-semibold uppercase tracking-widest ff-mono mb-3" style={{ color: "var(--t3)", letterSpacing: "0.14em" }}>Verified Client Results</div>
              {TESTIMONIALS.map((t, i) => (
                <motion.div key={t.name}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + i * 0.12 }}
                  className="ch p-4 rounded-2xl mb-3"
                  style={{ background: "var(--s3)", border: "1px solid var(--bd0)" }}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
                      style={{ background: t.avBg, boxShadow: "0 0 12px rgba(99,102,241,0.25)" }}>
                      {t.av}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold ff-display" style={{ color: "var(--t1)" }}>{t.name}</div>
                          <div className="text-xs" style={{ color: "var(--t3)" }}>{t.role} · {t.company}</div>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, si) => <Star key={si} size={9} className="fill-amber-400 text-amber-400" />)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--t2)" }}>"{t.text}"</p>
                  <div className="flex items-center gap-1.5 text-xs font-semibold ff-mono px-2.5 py-1.5 rounded-lg w-fit"
                    style={{ background: `${t.mc}12`, color: t.mc, border: `1px solid ${t.mc}25` }}>
                    <TrendingUp size={10} /> {t.metric}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ── Compliance ── */}
            <div className="p-4 rounded-2xl" style={{ background: "var(--s3)", border: "1px solid var(--bd0)" }}>
              <div className="text-xs font-semibold uppercase tracking-widest ff-mono mb-3" style={{ color: "var(--t3)", letterSpacing: "0.14em" }}>
                Enterprise Security
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { icon: Shield, label: "SOC2 Type II", c: "#6366f1" },
                  { icon: Lock, label: "E2E Encrypted", c: "#10b981" },
                  { icon: BadgeCheck, label: "GDPR Compliant", c: "#06b6d4" },
                  { icon: Building2, label: "HIPAA Ready", c: "#7c3aed" },
                  { icon: Server, label: "Multi-Region AI", c: "#f59e0b" },
                  { icon: GitBranch, label: "99.99% Uptime", c: "#f43f5e" },
                ].map(({ icon: Icon, label, c }) => (
                  <div key={label} className="ch flex items-center gap-2 px-2.5 py-2 rounded-xl"
                    style={{ background: "var(--s4)", border: "1px solid var(--bd0)" }}>
                    <Icon size={11} style={{ color: c }} />
                    <span className="text-xs font-medium" style={{ color: "var(--t2)" }}>{label}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-1.5 pt-2 text-xs" style={{ color: "var(--t4)", borderTop: "1px solid var(--bd0)" }}>
                <Wifi size={10} className="text-emerald-500" />
                <span className="ff-mono">All systems operational · Frankfurt · Singapore · US-East</span>
              </div>
            </div>

          </motion.aside>

          {/* ══════════════════════════════════════════════
              RIGHT PANEL — CHAT
          ══════════════════════════════════════════════ */}
          <motion.main
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col relative"
            style={{
              background: "linear-gradient(180deg,rgba(5,7,14,0.97) 0%,rgba(7,9,18,0.99) 100%)",
              minWidth: 0,
              boxShadow: "inset 1px 0 0 rgba(99,102,241,0.08), inset 0 0 100px rgba(99,102,241,0.02)"
            }}>

            {/* ── Top bar: window chrome ── */}
            <div className="flex-shrink-0 flex items-center px-6 py-3"
              style={{ borderBottom: "1px solid var(--bd0)", background: "rgba(5,7,14,0.9)" }}>
              {/* Mac-style dots */}
              <div className="flex items-center gap-1.5 mr-4">
                <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
              </div>

              {/* Agent header */}
              <div className="flex items-center gap-3 flex-1">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg,#4338ca,#5b21b6)",
                      boxShadow: "0 0 20px rgba(99,102,241,0.5)"
                    }}>
                    <BrainCircuit size={16} className="text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400"
                    style={{ border: "2px solid #05070e", boxShadow: "0 0 8px rgba(16,185,129,0.6)" }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="ff-display font-semibold text-sm" style={{ color: "var(--t1)" }}>Pixel AI</span>
                    <span className="text-xs px-2 py-0.5 rounded-full ff-mono font-medium"
                      style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.28)", color: "#a5b4fc" }}>
                      Enterprise v2.4
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="pulse-em w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-xs ff-mono" style={{ color: "#10b981" }}>
                      {phase === "processing" ? "Processing..." : phase === "streaming" ? "Generating response..." : "Active · Sub-second response"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right controls */}
              <div className="flex items-center gap-3">
                <div className="hidden lg:flex flex-col items-end">
                  <span className="text-xs ff-mono" style={{ color: "var(--t3)" }}>Session encrypted</span>
                  <div className="flex items-center gap-1">
                    <Lock size={8} style={{ color: "#10b981" }} />
                    <span className="text-xs ff-mono" style={{ color: "#10b981" }}>TLS 1.3 · AES-256</span>
                  </div>
                </div>
                <div className="w-px h-8" style={{ background: "var(--bd0)" }} />
                {[Headphones, MoreHorizontal].map((Icon, i) => (
                  <button key={i} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5"
                    style={{ color: "var(--t3)" }}>
                    <Icon size={14} />
                  </button>
                ))}
              </div>
            </div>

            {/* ── Live metrics strip ── */}
            <div className="flex-shrink-0 flex overflow-x-auto"
              style={{ borderBottom: "1px solid var(--bd0)", background: "rgba(4,5,10,0.7)" }}>
              {[
                { icon: Clock, label: "Avg Response", val: "0.6s", delta: "↓40%", c: "#6366f1" },
                { icon: TrendingUp, label: "Conversion Rate", val: "34.7%", delta: "+8.2%", c: "#10b981" },
                { icon: DollarSign, label: "Revenue / Chat", val: "$8.40", delta: "+12%", c: "#f59e0b" },
                { icon: MessageSquare, label: "Msgs Processed", val: "18,492", delta: "today", c: "#7c3aed" },
                { icon: UserCheck, label: "Leads Captured", val: "2,841", delta: "this month", c: "#06b6d4" },
                { icon: Globe, label: "Languages", val: "42", delta: "supported", c: "#f43f5e" },
              ].map((m, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3 flex-shrink-0"
                  style={{ borderRight: "1px solid var(--bd0)" }}>
                  <m.icon size={12} style={{ color: m.c }} />
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="ff-display font-bold text-sm" style={{ color: "var(--t1)" }}>{m.val}</span>
                      <span className="text-xs ff-mono" style={{ color: m.c }}>{m.delta}</span>
                    </div>
                    <div className="text-xs" style={{ color: "var(--t3)" }}>{m.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Messages ── */}
            <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-5" style={{ minHeight: 0 }}>
              {/* Thread start marker */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
                className="flex justify-center">
                <div className="flex items-center gap-2 text-xs px-4 py-2 rounded-full ff-mono"
                  style={{ background: "var(--s3)", border: "1px solid var(--bd0)", color: "var(--t4)" }}>
                  <RefreshCw size={9} />
                  New session · End-to-end encrypted · {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </div>
              </motion.div>

              {/* Message list */}
              {messages.map(msg =>
                msg.type === "user"
                  ? <UserMessage key={msg.id} msg={msg} />
                  : <AiMessage key={msg.id} msg={msg} onQuick={handleQuick} />
              )}

              {/* Processing state */}
              <AnimatePresence>
                {phase === "processing" && <ProcessingState key="proc" stateIndex={procIndex} />}
              </AnimatePresence>

              {/* Streaming */}
              <AnimatePresence>
                {phase === "streaming" && streamPayload && (
                  <StreamingMessage
                    key="stream"
                    text={streamPayload.text}
                    quick={streamPayload.quick}
                    onQuick={handleQuick}
                    onDone={onStreamDone}
                  />
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* ── Suggestion pills ── */}
            <div className="flex-shrink-0 px-8 pb-3 flex flex-wrap gap-2">
              {[
                "How does pricing work?",
                "Can I see an ROI estimate?",
                "Do you offer white-label?",
                "What's your enterprise SLA?",
              ].map(s => (
                <button key={s} onClick={() => setInputVal(s)}
                  className="text-xs px-3.5 py-2 rounded-xl transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "rgba(99,102,241,0.06)",
                    border: "1px solid rgba(99,102,241,0.14)",
                    color: "var(--t3)"
                  }}>
                  {s}
                </button>
              ))}
            </div>

            {/* ── Input ── */}
            <div className="flex-shrink-0 px-8 pb-6 pt-1">
              <div className="inp-wrap flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300"
                style={{ background: "var(--s3)", border: "1px solid var(--bd1)" }}>

                <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5 flex-shrink-0"
                  style={{ color: "var(--t3)" }}>
                  <Paperclip size={14} />
                </button>

                <input
                  ref={inputRef}
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
                  disabled={phase !== "idle"}
                  placeholder={phase !== "idle" ? "Pixel AI is responding..." : "Ask anything about our AI automation platform…"}
                  className="flex-1 bg-transparent text-sm"
                  style={{
                    color: phase !== "idle" ? "var(--t3)" : "var(--t1)",
                    caretColor: "#6366f1",
                    fontFamily: "'Plus Jakarta Sans',sans-serif"
                  }}
                />

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5"
                    style={{ color: "var(--t3)" }}>
                    <Mic size={14} />
                  </button>

                  <motion.button
                    onClick={handleSend}
                    disabled={phase !== "idle" || !inputVal.trim()}
                    whileHover={phase === "idle" && inputVal.trim() ? { scale: 1.07 } : {}}
                    whileTap={phase === "idle" && inputVal.trim() ? { scale: 0.93 } : {}}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={inputVal.trim() && phase === "idle"
                      ? {
                        background: "linear-gradient(135deg,#4338ca,#5b21b6)",
                        boxShadow: "0 0 24px rgba(99,102,241,0.5), inset 0 1px 0 rgba(255,255,255,0.12)"
                      }
                      : { background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.12)" }
                    }>
                    <Send size={14} style={{ color: inputVal.trim() && phase === "idle" ? "#fff" : "var(--t3)", marginLeft: 1 }} />
                  </motion.button>
                </div>
              </div>

              {/* Trust footer */}
              <div className="flex items-center justify-center gap-4 mt-3 flex-wrap">
                {[
                  { icon: Lock, text: "AES-256 Encrypted", c: "#10b981" },
                  { icon: Shield, text: "SOC2 Compliant", c: "#6366f1" },
                  { icon: CheckCircle, text: "GDPR Ready", c: "#06b6d4" },
                  { icon: Server, text: "99.99% Uptime", c: "#7c3aed" },
                ].map(({ icon: Icon, text, c }, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <Icon size={9} style={{ color: c }} />
                    <span className="text-xs ff-mono" style={{ color: "var(--t5)" }}>{text}</span>
                    {i < 3 && <div className="w-px h-3 ml-4" style={{ background: "var(--bd0)" }} />}
                  </div>
                ))}
              </div>
            </div>

          </motion.main>

        </div>
      </div>
    </>
  );
}