import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, ChevronDown, Ship, Globe2, ShieldCheck, Sparkles,
  Leaf, Factory, Truck, Package, Award, Mail, Phone, MapPin,
  Anchor, Plane, BadgeCheck, Quote, X
} from "lucide-react";

import logo from "@/assets/logo.png";
import { Journey } from "@/components/Journey";
import WalkingProducts from "@/components/WalkingProducts";
import heroPlantation from "@/assets/hero-plantation.jpg";
import worldMap from "@/assets/world-map.jpg";
import ceo1 from "@/assets/ceo-1.png";
import ceo2 from "@/assets/ceo-2.png";
import staffAll from "@/assets/staff all.png";
/* ── Main product images (ChatGPT renders — full scene) ── */
import pCoconut      from "@/assets/WhatsApp Image 2026-07-21 at 8.56.19 AM.jpeg";
import pGreenCoconut from "@/assets/ChatGPT Image Jun 26, 2026, 10_33_52 AM.png";
import pWatermelon   from "@/assets/ChatGPT Image Jun 26, 2026, 10_24_19 AM.png";
import pTomato     from "@/assets/ChatGPT Image Jun 26, 2026, 10_13_57 AM.png";
import pCucumber   from "@/assets/ChatGPT Image Jun 26, 2026, 10_17_47 AM.png";
import pBanana     from "@/assets/ChatGPT Image Jun 26, 2026, 11_44_23 AM.png";
import pPumpkin    from "@/assets/green-pumpkin.png";
/* ── Sub-variety images ── */
import vHusked     from "@/assets/ChatGPT Image Jun 26, 2026, 10_37_07 AM.png";
import vSemiHusked from "@/assets/ChatGPT Image Jun 26, 2026, 11_11_12 AM (2).png";
import vDehusked   from "@/assets/ChatGPT Image Jun 26, 2026, 11_31_02 AM.png";
import vBabyCoconut from "@/assets/ChatGPT Image Jun 26, 2026, 11_39_12 AM.png";
import vRedBanana  from "@/assets/ChatGPT Image Jun 26, 2026, 11_48_39 AM.png";
import vNendran    from "@/assets/ChatGPT Image Jun 26, 2026, 11_44_23 AM.png";
import cert1 from "@/assets/certificate1.webp";
import cert2 from "@/assets/certificate2.webp";
import cert3 from "@/assets/certificate3.webp";
import cert4 from "@/assets/certificate4.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shastika Global Impex Pvt Ltd — From India's Finest Farms to Global Markets" },
      { name: "description", content: "Premium agricultural exports from India. Coconuts, fresh fruits, vegetables and spices delivered worldwide with uncompromising quality." },
      { property: "og:title", content: "Shastika Global Impex Pvt Ltd — Cinematic Agricultural Exports" },
      { property: "og:description", content: "From India's finest farms to global markets — premium coconuts, fruits and vegetables shipped worldwide." },
    ],
  }),
  component: Index,
});

/* ---------- Particles overlay ---------- */
function Particles({ count = 40, className = "" }: { count?: number; className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const items = Array.from({ length: count });
  return (
    <div className={"pointer-events-none absolute inset-0 overflow-hidden " + className}>
      {items.map((_, i) => {
        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const dur = Math.random() * 8 + 6;
        const delay = Math.random() * 6;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-electric/60"
            style={{
              width: size, height: size,
              left: `${left}%`, top: `${top}%`,
              boxShadow: `0 0 ${size * 4}px var(--electric)`,
              animation: `float-y ${dur}s ease-in-out ${delay}s infinite`,
              opacity: Math.random() * 0.6 + 0.2,
            }}
          />
        );
      })}
    </div>
  );
}

/* ---------- NAV ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    fn(); window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    ["Journey", "#journey"],
    ["Products", "#products"],
    ["Markets", "#markets"],
    ["Process", "#process"],
    ["Certifications", "#certifications"],
    ["Leadership", "#leadership"],
  ];
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className={`flex items-center gap-3 rounded-full px-3 py-2 transition-all ${scrolled ? "glass" : ""}`}>
          <img src={logo} alt="Shastika Global Impex Pvt Ltd" className="h-9 w-9 rounded-full bg-white/95 p-1" />
          <div className="hidden sm:block leading-none">
            <div className="text-[10px] uppercase tracking-[0.25em] text-electric/80">Shastika</div>
            <div className="text-sm font-semibold tracking-wide">Global Impex Pvt Ltd</div>
          </div>
        </div>
        <nav className={`hidden md:flex items-center gap-1 rounded-full px-2 py-1.5 ${scrolled ? "glass" : ""}`}>
          {links.map(([label, href]) => (
            <a key={href} href={href} className="rounded-full px-4 py-2 text-sm text-foreground/80 transition hover:bg-white/10 hover:text-white">
              {label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground glow-royal transition hover:scale-[1.03]">
          <span>Get a Quote</span>
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </a>
      </div>
    </header>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <img src={heroPlantation} alt="Aerial coconut plantation" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 via-midnight/40 to-midnight" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--midnight)_85%)]" />
      </motion.div>
      <Particles count={60} />

      <motion.div style={{ opacity }} className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.3em] text-electric"
        >
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-electric animate-pulse-ring" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
          </span>
          Exporting Globally
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.4 }}
          className="max-w-5xl text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl md:text-[5.5rem]"
        >
          <span className="block text-gradient-royal">From India's Finest Farms</span>
          <span className="block text-white/85">to Global Markets</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 max-w-2xl text-base text-silver/80 sm:text-lg"
        >
          We deliver premium-quality agricultural products sourced from trusted farms. Every product is carefully inspected to meet international export standards. Our commitment to quality, reliability, and timely delivery makes us a trusted global partner.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.1 }}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a href="#products" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground glow-royal transition hover:scale-[1.04]">
            Explore Products <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
          <a href="#journey" className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-medium text-white transition hover:bg-white/10">
            Our Journey
          </a>
        </motion.div>


      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-silver/60"
      >
        Scroll
        <ChevronDown className="h-4 w-4 animate-bounce text-electric" />
      </motion.div>
    </section>
  );
}



/* ─── Product variety modal ─── */
type Variety = { name: string; img: string; desc: string; price?: string };
type ProductModalData = { productName: string; variety: Variety };

function ProductModal({ data, onClose }: { data: ProductModalData | null; onClose: () => void }) {
  useEffect(() => {
    if (!data) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [data, onClose]);

  if (!data) return null;
  const { productName, variety } = data;
  const waText = encodeURIComponent(`Hi, I'm interested in ${productName} - ${variety.name}. Please send me a quote.`);
  const waUrl = `https://wa.me/919994758817?text=${waText}`;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 9998, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.84 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.84 }}
        transition={{ type: "spring", stiffness: 340, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#111827", borderRadius: "20px", overflow: "hidden", maxWidth: "440px", width: "100%", boxShadow: "0 32px 80px rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Image */}
        <div style={{
          width: '100%',
          height: '280px',
          overflow: 'hidden',
          borderRadius: '12px 12px 0 0',
          position: 'relative'
        }}>
          <img src={variety.img} alt={variety.name} style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block'
          }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(17,24,39,0.9) 0%, transparent 60%)" }} />
          <button
            onClick={onClose}
            style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.5)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)" }}
          ><X size={15} /></button>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 20px" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(43,140,255,0.9)", fontWeight: 600 }}>{productName}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginTop: 2 }}>{variety.name}</div>
          </div>
        </div>
        {/* Body */}
        <div style={{ padding: "20px" }}>
          <p style={{ fontSize: 14, color: "rgba(217,228,245,0.7)", lineHeight: 1.6, margin: 0 }}>{variety.desc}</p>
          
          {variety.price && (
            <div style={{
              marginTop: 16,
              padding: "12px 16px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              backdropFilter: "blur(10px)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: "rgba(217,228,245,0.6)", fontWeight: 500 }}>{variety.name}</span>
                <span style={{ fontSize: 14, color: "#fff", fontWeight: 700 }}>{variety.price}</span>
              </div>
              <div style={{ fontSize: 10, color: "rgba(217,228,245,0.4)", lineHeight: 1.4 }}>
                * Prices shown are indicative for website display. For detailed export pricing based on quantity, packaging, and destination, please request a quote on WhatsApp.
              </div>
            </div>
          )}

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 18, padding: "13px 24px", borderRadius: 999, background: "#25D366", color: "#fff", fontWeight: 700, fontSize: 14, textDecoration: "none", letterSpacing: "0.04em", transition: "opacity 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Request Quote on WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Products section with flip cards ── */
function Products() {
  const [modalData, setModalData] = useState<ProductModalData | null>(null);

  const items = [
    {
      name: "Coconut", tagline: "Sweet, hydrating, harvested at peak.", img: pCoconut,
      varieties: [
        { name: "Husked Coconut",    img: vHusked,      desc: "Fully husked, export-ready coconut with thick white flesh. Ideal for retail markets worldwide.", price: "₹45 / Piece" },
        { name: "Semi-Husked",       img: vSemiHusked,  desc: "Partially husked for extended shelf life. Popular in Middle East and Asian markets.", price: "₹25 / Piece" },
        { name: "Dehusked",          img: vDehusked,    desc: "Shell-only coconut, cleaned and graded. Used for copra, oil and industrial purposes.", price: "₹24 / Piece" },
        { name: "Tender Coconut", img: pGreenCoconut, desc: "Fresh whole green tender coconut with full husk intact. Ideal for maximum natural shelf life and premium presentation.", price: "₹25 / Piece" },
      ],
    },
    {
      name: "Black Diamond Watermelon", tagline: "Vibrant red interior, thin rind. Long shelf life — suited for FCL export.", img: pWatermelon,
      varieties: [
        { name: "Black Diamond Watermelon", img: pWatermelon, desc: "Vibrant red interior, thin rind. Long shelf life — suited for FCL export.", price: "₹10 / Kg" },
      ],
    },
    {
      name: "Tomato", tagline: "Bright, firm, export-grade.", img: pTomato,
      varieties: [
        { name: "Tomato", img: pTomato, desc: "Farm-fresh tomatoes, packed with natural goodness and essential nutrients. Perfect for everyday meals.", price: "₹12 / Kg" },
      ],
    },
    {
      name: "Cucumber", tagline: "Crisp and consistent year-round.", img: pCucumber,
      varieties: [
        { name: "Cucumber", img: pCucumber, desc: "Standard export cucumber. Uniform size, smooth skin, ideal for bulk retail packaging.", price: "₹5 / Kg" },
      ],
    },
    {
      name: "Banana", tagline: "Optimal ripeness on arrival.", img: pBanana,
      varieties: [
        { name: "Cavendish Banana", img: pBanana,    desc: "World's most exported banana variety. Shipped green, ripens perfectly in destination markets.", price: "₹30 / Kg" },
        { name: "Baby Banana",    img: pBanana,    desc: "Small, sweet, and premium. Popular in specialty markets.", price: "₹80 / Kg" },
        { name: "Nendran Banana", img: vNendran,   desc: "Traditional Kerala variety. Prized for cooking and chips — high demand in diaspora markets.", price: "₹45 / Kg" },
        { name: "Red Banana",     img: vRedBanana, desc: "Soft, sweet Red Banana. Niche export to health-conscious consumers in Europe and Japan.", price: "₹52 / Kg" },
      ],
    },
    {
      name: "Pumpkin", tagline: "Thick walls, long shelf life.", img: pPumpkin,
      varieties: [
        { name: "Green Pumpkin", img: pPumpkin, desc: "Mild, buttery flesh. Popular in Middle East stews and European soups.", price: "₹6 / Kg" },
      ],
    },
  ];

  return (
    <>
      <ProductModal data={modalData} onClose={() => setModalData(null)} />

      <section id="products" className="relative overflow-hidden" style={{ padding: "48px 0 32px" }}>
        <div className="absolute inset-0 -z-10 bg-radial-royal" />
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px", display: "flex", flexDirection: "column" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-3xl text-center">
            <div className="text-xs uppercase tracking-[0.4em] text-electric">The Collection</div>
            <h2 className="mt-4 text-4xl font-bold sm:text-6xl">Curated for the <span className="text-gradient-royal">world's tables.</span></h2>
            <p className="mt-5 text-silver/70">Every product is hand-graded, multi-inspected and packed for international standards. Available FCL &amp; LCL.</p>
          </motion.div>

          {/* Walking products showcase strip */}
          <WalkingProducts />

          {/* 2 × 3 grid — all 6 cards on one screen, fixed height */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(2, 1fr)",
              gap: "16px",
              height: "clamp(480px, 55vh, 680px)",
            }}
          >
            {items.map((p, i) => (
              <motion.article
                key={p.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.07, duration: 0.6 }}
                className="product-flip-wrapper group"
                style={{
                  perspective: "1000px",
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  height: "100%",
                  minHeight: 0,
                }}
              >
                {/* Flip inner */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.7s ease-in-out",
                  }}
                  className="product-flip-inner group-hover:[transform:rotateY(180deg)]"
                >
                  {/* ── FRONT FACE ── */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden" as React.CSSProperties["WebkitBackfaceVisibility"],
                      borderRadius: "16px",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Image — fixed 220px, contain so nothing crops */}
                    <div style={{
                      height: "220px",
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "12px 12px 0 0",
                      background: "#0a0f1e",
                      flexShrink: 0,
                    }}>
                      <img
                        src={p.img}
                        alt={p.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          objectPosition: "center",
                          display: "block",
                          transition: "transform 1.2s ease",
                        }}
                        className="group-hover:scale-105"
                      />
                      {/* Export Grade badge — top-right, never covers title */}
                      <div
                        style={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          borderRadius: 999,
                          padding: "4px 8px",
                          fontSize: 10,
                          fontWeight: 600,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          background: "rgba(43,140,255,0.2)",
                          border: "1px solid rgba(43,140,255,0.4)",
                          color: "#7FB6FF",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        Export Grade
                      </div>
                    </div>
                    {/* Content — bottom 35% */}
                    <div
                      style={{
                        flex: "0 0 35%",
                        background: "linear-gradient(to bottom, rgba(8,12,28,0.95), rgba(8,12,28,1))",
                        padding: "14px 18px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>{p.name}</h3>
                      <p style={{ marginTop: 4, fontSize: 12, color: "rgba(217,228,245,0.6)", lineHeight: 1.4 }}>{p.tagline}</p>
                      <div style={{ marginTop: 8, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(217,228,245,0.3)" }}>hover to explore varieties</div>
                    </div>
                  </div>

                  {/* ── BACK FACE — variety selector ── */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden" as React.CSSProperties["WebkitBackfaceVisibility"],
                      transform: "rotateY(180deg)",
                      borderRadius: "16px",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: 12,
                      padding: "20px",
                      background: "rgba(8,12,28,0.95)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(43,140,255,0.15)",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(43,140,255,0.8)" }}>Select a variety</div>
                      <div style={{ marginTop: 4, fontSize: 18, fontWeight: 700, background: "linear-gradient(135deg,#4facfe,#00f2fe)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{p.name}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {p.varieties.map((v) => (
                        <button
                          key={v.name}
                          onClick={() => setModalData({ productName: p.name, variety: v })}
                          style={{
                            width: "100%",
                            borderRadius: 8,
                            padding: "8px 12px",
                            textAlign: "left",
                            fontSize: 12,
                            fontWeight: 500,
                            background: "rgba(43,140,255,0.1)",
                            border: "1px solid rgba(43,140,255,0.25)",
                            color: "rgba(217,228,245,0.9)",
                            cursor: "pointer",
                            transition: "background 0.15s, border-color 0.15s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(43,140,255,0.22)";
                            e.currentTarget.style.borderColor = "rgba(43,140,255,0.6)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(43,140,255,0.1)";
                            e.currentTarget.style.borderColor = "rgba(43,140,255,0.25)";
                          }}
                        >
                          {v.name}
                        </button>
                      ))}
                    </div>
                    <div style={{ fontSize: 9, color: "rgba(217,228,245,0.25)", letterSpacing: "0.18em", textTransform: "uppercase", textAlign: "center" }}>click variety to request quote</div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- WORLD MARKETS ---------- */
function Markets() {
  const HUB = { name: "India", x: 71.6, y: 41 };
  const countries = [
    { name: "United Arab Emirates", x: 65.0, y: 39.5 },
    { name: "Saudi Arabia", x: 62.5, y: 40 },
    { name: "Qatar", x: 64.2, y: 39.2 },
    { name: "Kuwait", x: 63.0, y: 37.5 },
    { name: "Oman", x: 65.6, y: 41 },
    { name: "United Kingdom", x: 49.4, y: 24 },
    { name: "Germany", x: 52.7, y: 26 },
    { name: "Netherlands", x: 51.4, y: 25 },
    { name: "Singapore", x: 78.6, y: 52.5 },
    { name: "Malaysia", x: 78.3, y: 51 },
  ];

  const arcs = countries.map((c) => {
    const mx = (HUB.x + c.x) / 2;
    const lift = 14 + Math.abs(HUB.x - c.x) * 0.25;
    const my = Math.min(HUB.y, c.y) - lift;
    return { ...c, d: `M ${HUB.x} ${HUB.y} Q ${mx} ${my}, ${c.x} ${c.y}` };
  });

  return (
    <section id="markets" className="relative overflow-hidden border-y border-white/5 bg-midnight py-32">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <Particles count={40} />
      <div className="relative mx-auto max-w-7xl px-6">

        {/* Text heading — sits BEHIND the map (lower z-index) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-0 mx-auto max-w-3xl text-center"
        >
          <div className="text-xs uppercase tracking-[0.4em] text-electric">Global Reach</div>
          <h2 className="mt-4 text-4xl font-bold sm:text-6xl">One nation. <span className="text-gradient-royal">Every continent.</span></h2>
          <p className="mt-5 text-silver/70">Shipping routes from India to the Middle East, Europe and Asia-Pacific — and onward to North America, Africa and Oceania.</p>
        </motion.div>

        {/* Map — z-index:10 so it pops IN FRONT of the heading text */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mt-16 aspect-[16/9] w-full overflow-hidden rounded-3xl glass glow-royal"
          style={{
            /* Perspective gives the map a 3-D "popping toward viewer" feel */
            transform: "perspective(1200px) rotateX(2deg)",
            boxShadow:
              "0 0 0 1px rgba(43,140,255,0.18), 0 40px 120px -20px rgba(10,77,255,0.55), 0 0 80px -10px rgba(43,140,255,0.25)",
          }}
        >
          {/* Map base image */}
          <img
            src={worldMap}
            alt="Global shipping network"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          {/* Cinematic blue wash + vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 via-transparent to-midnight/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_71%_41%,color-mix(in_oklab,var(--royal)_35%,transparent),transparent_55%)]" />

          {/* Animated SVG routes */}
          <svg
            viewBox="0 0 100 56.25"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              <linearGradient id="routeGrad" x1="0" x2="1">
                <stop offset="0%" stopColor="#2B8CFF" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#7FB6FF" stopOpacity="1" />
                <stop offset="100%" stopColor="#2B8CFF" stopOpacity="0.1" />
              </linearGradient>
              <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="0.3" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {arcs.map((a, i) => (
              <g key={a.name}>
                <path
                  d={a.d}
                  fill="none"
                  stroke="#2B8CFF"
                  strokeOpacity="0.35"
                  strokeWidth="0.18"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d={a.d}
                  fill="none"
                  stroke="url(#routeGrad)"
                  strokeWidth="0.35"
                  strokeLinecap="round"
                  strokeDasharray="3 6"
                  filter="url(#routeGlow)"
                  vectorEffect="non-scaling-stroke"
                  style={{ animation: `dash-flow 4s linear ${i * 0.25}s infinite` }}
                />
                <circle r="0.45" fill="#ffffff" filter="url(#routeGlow)">
                  <animateMotion dur={`${6 + (i % 3)}s`} begin={`${i * 0.6}s`} repeatCount="indefinite" path={a.d} />
                </circle>
              </g>
            ))}
          </svg>

          {/* India hub */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
          >
            <div className="relative grid place-items-center">
              <span className="absolute inline-flex h-8 w-8 rounded-full bg-electric/60 animate-pulse-ring" />
              <span className="absolute inline-flex h-12 w-12 rounded-full bg-electric/30 animate-pulse-ring" style={{ animationDelay: "0.8s" }} />
              <span className="relative h-4 w-4 rounded-full bg-electric shadow-[0_0_24px_var(--electric)]" />
            </div>
            <div className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full glass px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white">
              India · Origin Hub
            </div>
          </div>

          {/* Destination pins */}
          {countries.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.06, type: "spring", stiffness: 200 }}
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
            >
              <div className="relative grid place-items-center">
                <span className="absolute inline-flex h-5 w-5 rounded-full bg-electric/50 animate-pulse-ring" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_14px_var(--electric)]" />
              </div>
              <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md glass px-2 py-1 text-[10px] font-medium text-white opacity-0 transition group-hover:opacity-100">
                {c.name}
              </div>
            </motion.div>
          ))}

          {/* Corner HUD badges */}
          <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-electric">
            <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse" /> Live Network
          </div>
          <div className="pointer-events-none absolute right-4 top-4 rounded-full glass px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-silver/70">
            10 Active Lanes
          </div>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Globe2, label: "Europe", v: "UK · Germany · Netherlands · Italy · Spain · France" },
            { icon: Ship, label: "Middle East", v: "UAE · KSA · Qatar · Kuwait · Oman" },
            { icon: Plane, label: "Asia-Pacific", v: "Singapore · Malaysia · Australia" },
            { icon: Anchor, label: "Americas & Africa", v: "USA · Canada · Multiple African nations" },
          ].map((r, i) => (
            <motion.div key={r.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl glass p-5">
              <r.icon className="h-5 w-5 text-electric" />
              <div className="mt-3 text-sm font-semibold">{r.label}</div>
              <div className="text-xs text-silver/60">{r.v}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PROCESS ---------- */
function Process() {
  const steps = [
    { icon: Leaf, t: "Farm Selection", d: "Certified, responsible farming partners onboarded." },
    { icon: ShieldCheck, t: "Quality Inspection", d: "Multi-level inspection at source." },
    { icon: Factory, t: "Cleaning & Grading", d: "Hygienic processing, sorted by grade." },
    { icon: Package, t: "Export Packaging", d: "Retail, wholesale, private label." },
    { icon: Truck, t: "Cold Chain & Loading", d: "Temperature-controlled containers." },
    { icon: Ship, t: "International Shipping", d: "FCL / LCL via trusted partners." },
    { icon: Globe2, t: "Customs & Docs", d: "Complete documentation per country." },
    { icon: BadgeCheck, t: "Delivery to Buyer", d: "End-to-end tracking until receipt." },
  ];
  return (
    <section id="process" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-3xl text-center">
          <div className="text-xs uppercase tracking-[0.4em] text-electric">Workflow</div>
          <h2 className="mt-4 text-4xl font-bold sm:text-6xl">The export <span className="text-gradient-royal">choreography.</span></h2>
          <p className="mt-5 text-silver/70">Twelve meticulously managed stages — freshness preserved, quality maintained, full traceability.</p>
        </motion.div>

        <div className="relative mt-20">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-royal to-transparent lg:block" />
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-20">
            {steps.map((s, i) => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className={`relative rounded-2xl glass p-6 ${i % 2 ? "lg:ml-10" : "lg:mr-10"}`}
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-electric">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-electric/70">Step {String(i + 1).padStart(2, "0")}</div>
                    <h3 className="mt-1 text-lg font-semibold">{s.t}</h3>
                    <p className="mt-1 text-sm text-silver/60">{s.d}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CERT MODAL ---------- */
type CertModalProps = { cert: { code: string; n: string; d: string; img: string } | null; onClose: () => void };
function CertModal({ cert, onClose }: CertModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!cert) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    // Prevent body scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cert, onClose]);

  if (!cert) return null;

  return (
    <motion.div
      key="cert-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.88)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      {/* Modal box — stop propagation so clicking image doesn't close */}
      <motion.div
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.82 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          background: "#f8f8f8",
          borderRadius: "20px",
          overflow: "hidden",
          maxWidth: "90vw",
          maxHeight: "90vh",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#fff", borderBottom: "1px solid #e5e7eb" }}>
          <div>
            <span style={{ fontWeight: 700, fontSize: "14px", color: "#111", letterSpacing: "0.05em", textTransform: "uppercase" }}>{cert.code}</span>
            <span style={{ marginLeft: "8px", fontSize: "12px", color: "#6b7280" }}>— {cert.n}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close certificate preview"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "32px", height: "32px", borderRadius: "50%",
              border: "none", cursor: "pointer",
              background: "#f3f4f6", color: "#374151",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e5e7eb")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#f3f4f6")}
          >
            <X size={16} />
          </button>
        </div>
        {/* Certificate image */}
        <div style={{ flex: 1, overflow: "auto", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", background: "#ffffff" }}>
          <img
            src={cert.img}
            alt={`${cert.code} Certificate`}
            style={{ maxWidth: "80vw", maxHeight: "75vh", objectFit: "contain", display: "block", borderRadius: "8px", boxShadow: "0 4px 24px rgba(0,0,0,0.12)" }}
          />
        </div>
        {/* Footer */}
        <div style={{ padding: "8px 16px", background: "#f8f8f8", borderTop: "1px solid #e5e7eb", textAlign: "center" }}>
          <span style={{ fontSize: "11px", color: "#9ca3af", letterSpacing: "0.05em" }}>{cert.d}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- CERT CARD COMPONENT ---------- */
function CertCard({ c, i }: { c: any; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08 }}
      className="relative aspect-[4/5] group"
    >
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 rounded-3xl glass transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(43,140,255,0.15)] border border-white/5 group-hover:border-electric/30"
      >
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/15 text-electric transition-transform group-hover:scale-110">
          <Award className="h-7 w-7" />
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gradient-royal">{c.code}</div>
          <div className="mt-1 text-xs uppercase tracking-[0.2em] text-silver/60">Verified Certification</div>
        </div>
        <div className="absolute bottom-4 right-4 text-electric">
          <BadgeCheck className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- CERTIFICATIONS ---------- */
function Certifications() {
  const certs = [
    { code: "IEC",   n: "Import Export Code",         d: "Govt. of India",       img: cert1 },
    { code: "APEDA", n: "RCMC Merchant Exporter",     d: "Govt. of India",       img: cert2 },
    { code: "UDYAM", n: "Udyam Registration",         d: "Ministry of MSME",     img: cert3 },
    { code: "MSME",  n: "MSME Registered Enterprise", d: "Govt. of India",       img: cert4 },
  ];

  return (
    <>
      <section id="certifications" className="relative overflow-hidden py-32">
        <div className="absolute inset-0 -z-10 bg-radial-royal" />
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-3xl text-center">
            <div className="text-xs uppercase tracking-[0.4em] text-electric">Verified</div>
            <h2 className="mt-4 text-4xl font-bold sm:text-6xl">Certified by <span className="text-gradient-royal">the authorities that matter.</span></h2>
            <p className="mt-5 text-silver/70">Government-recognised registrations and export credentials in place from day one.</p>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {certs.map((c, i) => (
              <CertCard key={c.code} c={c} i={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- LEADERSHIP ---------- */
function Leadership() {
  const team = [
    { name: "D Ram Ragul", role: "CEO & Co-Founder", img: ceo1, q: "Trust is the only export that compounds." },
    { name: "D Lakshmana Gokul", role: "Director & Co-Founder", img: ceo2, q: "Every container carries our name. We treat it that way." },
  ];
  return (
    <section id="leadership" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-3xl text-center">
          <div className="text-xs uppercase tracking-[0.4em] text-electric">Leadership</div>
          <h2 className="mt-4 text-4xl font-bold sm:text-6xl">The minds behind <span className="text-gradient-royal">Shastika.</span></h2>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative overflow-hidden rounded-3xl glass p-2"
            >
              <div className="relative overflow-hidden rounded-[1.4rem] bg-navy">
                <img src={m.img} alt={m.name} loading="lazy" className="aspect-[4/3] w-full object-cover object-top transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-midnight via-midnight/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <Quote className="h-6 w-6 text-electric" />
                  <p className="mt-2 text-lg italic text-white/90">"{m.q}"</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <div className="text-base font-semibold">{m.name}</div>
                      <div className="text-xs uppercase tracking-[0.2em] text-electric/80">{m.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Staff Team Photo ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-20"
        >
          <div className="text-center mb-8">
            <div className="text-xs uppercase tracking-[0.4em] text-electric">Our Team</div>
            <h3 className="mt-3 text-2xl font-bold sm:text-3xl">The people who <span className="text-gradient-royal">make it happen.</span></h3>
          </div>
          <div className="overflow-hidden rounded-3xl glass p-2 glow-royal mx-auto" style={{ maxWidth: '900px' }}>
            <img
              src={staffAll}
              alt="Shastika Global Impex team at work"
              loading="lazy"
              className="w-full rounded-[1.4rem] object-cover"
              style={{ maxHeight: '450px' }}
            />
          </div>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {[
            { t: "Our Vision", d: "To become one of the world's most trusted agricultural export partners by delivering exceptional quality, sustainable sourcing, and innovative global supply chain solutions." },
            { t: "Our Mission", d: "To connect international buyers with premium agricultural products through responsible sourcing, uncompromising quality, operational excellence, and long-term strategic partnerships." },
          ].map((b) => (
            <div key={b.t} className="rounded-3xl glass p-8">
              <div className="text-xs uppercase tracking-[0.3em] text-electric">{b.t}</div>
              <p className="mt-4 text-lg leading-relaxed text-silver/80">{b.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA / CONTACT ---------- */
function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 -z-10 bg-radial-royal" />
      <Particles count={40} />
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[2.5rem] glass p-10 sm:p-16 glow-royal">
          <div className="text-xs uppercase tracking-[0.4em] text-electric">Let's build a long-term global partnership</div>
          <h2 className="mt-4 text-4xl font-bold sm:text-6xl">
            Your next shipment <span className="text-gradient-royal">starts here.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-silver/70">
            Importer, distributor, supermarket chain, food processor, retailer or institutional buyer — our team is ready to support your sourcing requirements with transparency and reliability.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              { icon: Mail, label: "Email", v: "export@shastikaglobalimpex.co.in", href: "mailto:export@shastikaglobalimpex.co.in", vClass: "whitespace-nowrap text-[14px]" },
              { icon: Phone, label: "Phone", v: (
                <div className="flex flex-col gap-1 whitespace-nowrap">
                  <span>+91 73976 12015</span>
                  <span>+91 73976 12010</span>
                  <span>+91 95662 66259</span>
                </div>
              ), href: "https://wa.me/917397612015", target: "_blank", vClass: "text-[14px]" },
              { icon: MapPin, label: "Head Office", v: "Gobichettipalayam, Erode, TN, India", vClass: "text-[14px]" },
              { icon: MapPin, label: "Branch Office", v: "Thuckanayakanpalayam, Erode, TN, India", vClass: "text-[14px]" },
            ].map((c) => {
              const Tag = c.href ? "a" : "div";
              return (
                <Tag
                  key={c.label}
                  href={c.href}
                  target={c.target}
                  rel={c.target === "_blank" ? "noopener noreferrer" : undefined}
                  className={`group rounded-2xl bg-white/5 p-6 transition hover:bg-white/10 overflow-hidden flex flex-col justify-between ${c.href ? "cursor-pointer block" : ""}`}
                >
                  <c.icon className="h-5 w-5 text-electric" />
                  <div className="mt-4 text-[10px] uppercase tracking-[0.3em] text-silver/50">{c.label}</div>
                  <div className={`mt-2 text-white/90 ${c.vClass}`}>{c.v}</div>
                </Tag>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="mailto:export@shastikaglobalimpex.co.in" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground glow-royal transition hover:scale-[1.03]">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </a>
            <a href="mailto:export@shastikaglobalimpex.co.in?subject=Business%20Consultation" className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-medium">
              Schedule a Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-midnight py-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="Shastika" className="h-10 w-10 rounded-full bg-white/95 p-1" />
            <div>
              <div className="text-sm font-semibold">Shastika Global Impex Pvt Ltd</div>
              <div className="text-xs text-silver/50">Pvt. Ltd.</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-silver/60 max-w-xs">From India's finest farms to global markets. Integrity · Quality · Sustainability · Innovation.</p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-electric">Explore</div>
          <ul className="mt-4 space-y-2 text-sm text-silver/70">
            <li><a href="#journey" className="hover:text-white">Journey</a></li>
            <li><a href="#products" className="hover:text-white">Products</a></li>
            <li><a href="#markets" className="hover:text-white">Global Markets</a></li>
            <li><a href="#process" className="hover:text-white">Export Process</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-electric">Company</div>
          <ul className="mt-4 space-y-2 text-sm text-silver/70">
            <li><a href="#certifications" className="hover:text-white">Certifications</a></li>
            <li><a href="#leadership" className="hover:text-white">Leadership</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-electric">Reach Us</div>
          <ul className="mt-4 space-y-2 text-sm text-silver/70">
            <li className="font-semibold text-white/80">Head Office:</li>
            <li>NO 89 Kullankattu Thottam</li>
            <li>Vaniputhur, Gobichettipalayam</li>
            <li>Erode, Tamil Nadu — 638506</li>
            <li className="pt-3 font-semibold text-white/80">Branch Office:</li>
            <li>41/1, ST-5, Sathy Athani Main Road</li>
            <li>Thuckanayakanpalayam</li>
            <li>Erode, Tamil Nadu — 638506</li>
            <li className="pt-4">+91 95662 66259</li>
            <li>export@shastikaglobalimpex.co.in</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/10 px-6 pt-6 text-xs text-silver/40 sm:flex-row">
        <div>© {new Date().getFullYear()} Shastika Global Impex Pvt. Ltd. All rights reserved.</div>
        <div>UDYAM-TN-07-0110386 · IEC ABPCS0605L</div>
      </div>
    </footer>
  );
}

/* ---------- PAGE ---------- */
function Index() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />
      <Hero />

      <Journey />
      <Products />
      <Markets />
      <Process />
      <Certifications />
      <Leadership />
      <Contact />
      <Footer />
    </main>
  );
}
