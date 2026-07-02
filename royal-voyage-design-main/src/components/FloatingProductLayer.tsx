import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import pCoconut from "@/assets/product-coconut.jpg";
import pTomato from "@/assets/product-tomato.jpg";
import pCucumber from "@/assets/product-cucumber.jpg";
import pWatermelon from "@/assets/product-watermelon.jpg";
import pPumpkin from "@/assets/product-pumpkin.jpg";
import pBanana from "@/assets/product-banana.jpg";

/* ─────────────────────────────────────────────────────
   PRODUCT CONFIGS — each product is unique in:
   size, initial position, float speed, rotation, depth
───────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: "coconut",
    src: pCoconut,
    alt: "Fresh Coconut",
    size: 140,
    x: 8,
    y: 15,
    floatDuration: 6.8,
    floatDelay: 0,
    rotateX: 12,
    rotateY: 20,
    rotateZ: -8,
    rotateDuration: 14,
    depth: 1.0,
    borderRadius: "50%",
    parallaxStrength: 18,
  },
  {
    id: "tomato",
    src: pTomato,
    alt: "Vine Tomato",
    size: 110,
    x: 88,
    y: 20,
    floatDuration: 5.4,
    floatDelay: 1.2,
    rotateX: -8,
    rotateY: 25,
    rotateZ: 10,
    rotateDuration: 11,
    depth: 0.75,
    borderRadius: "50%",
    parallaxStrength: 12,
  },
  {
    id: "watermelon",
    src: pWatermelon,
    alt: "Premium Watermelon",
    size: 175,
    x: 78,
    y: 55,
    floatDuration: 8.2,
    floatDelay: 2.5,
    rotateX: 6,
    rotateY: -18,
    rotateZ: 15,
    rotateDuration: 18,
    depth: 1.25,
    borderRadius: "50%",
    parallaxStrength: 22,
  },
  {
    id: "banana",
    src: pBanana,
    alt: "Cavendish Banana",
    size: 130,
    x: 5,
    y: 60,
    floatDuration: 7.1,
    floatDelay: 0.8,
    rotateX: -15,
    rotateY: 12,
    rotateZ: -20,
    rotateDuration: 13,
    depth: 0.9,
    borderRadius: "40%",
    parallaxStrength: 15,
  },
  {
    id: "pumpkin",
    src: pPumpkin,
    alt: "Field Pumpkin",
    size: 155,
    x: 50,
    y: 8,
    floatDuration: 9.0,
    floatDelay: 3.1,
    rotateX: 10,
    rotateY: -22,
    rotateZ: 5,
    rotateDuration: 20,
    depth: 1.1,
    borderRadius: "45%",
    parallaxStrength: 20,
  },
  {
    id: "cucumber",
    src: pCucumber,
    alt: "Garden Cucumber",
    size: 115,
    x: 92,
    y: 78,
    floatDuration: 6.2,
    floatDelay: 1.8,
    rotateX: -12,
    rotateY: 30,
    rotateZ: -25,
    rotateDuration: 10,
    depth: 0.8,
    borderRadius: "35%",
    parallaxStrength: 10,
  },
];

/* ─────────────────────────────────────────────────────
   SINGLE FLOATING PRODUCT
───────────────────────────────────────────────────── */
function FloatingProduct({
  product,
  mouseX,
  mouseY,
  scrollY,
}: {
  product: (typeof PRODUCTS)[0];
  mouseX: number;
  mouseY: number;
  scrollY: number;
}) {
  const {
    src,
    alt,
    size,
    x,
    y,
    floatDuration,
    floatDelay,
    rotateX,
    rotateY,
    rotateZ,
    rotateDuration,
    depth,
    borderRadius,
    parallaxStrength,
  } = product;

  /* Parallax: mouse drives slight X/Y offset */
  const parallaxX = ((mouseX - 0.5) * parallaxStrength * depth).toFixed(2);
  const parallaxY = ((mouseY - 0.5) * parallaxStrength * depth).toFixed(2);

  /* Scroll drift: each product drifts at a different rate */
  const scrollDrift = (scrollY * depth * 0.06).toFixed(2);

  const actualSize = size * depth;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: floatDelay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        left: `${x}%`,
        top: `${y}%`,
        width: actualSize,
        height: actualSize,
        zIndex: 5,
        pointerEvents: "none",
        willChange: "transform",
        transform: `translate(${parallaxX}px, calc(-50% + ${parseFloat(scrollDrift)}px + ${parallaxY}px))`,
        transition: "transform 0.08s linear",
      }}
    >
      {/* Float + rotate keyframe wrapper */}
      <div
        style={{
          width: "100%",
          height: "100%",
          animation: `
            product-float ${floatDuration}s ease-in-out ${floatDelay}s infinite,
            product-rotate-y ${rotateDuration}s linear ${floatDelay}s infinite
          `,
        }}
      >
        {/* 3D perspective wrapper */}
        <div
          style={{
            width: "100%",
            height: "100%",
            perspective: "600px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              animation: `product-tilt ${(rotateDuration * 0.7).toFixed(1)}s ease-in-out ${floatDelay + 1}s infinite`,
            }}
          >
            {/* Product image */}
            <img
              src={src}
              alt={alt}
              loading="eager"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius,
                display: "block",
                /* Premium drop shadow */
                filter: `
                  drop-shadow(0 ${20 * depth}px ${40 * depth}px rgba(0,0,0,0.65))
                  drop-shadow(0 ${8 * depth}px ${16 * depth}px rgba(0,0,0,0.4))
                  drop-shadow(0 2px 8px rgba(43,140,255,0.2))
                  brightness(1.08)
                  contrast(1.05)
                  saturate(1.15)
                `,
                userSelect: "none",
                WebkitUserDrag: "none",
              } as React.CSSProperties}
            />

            {/* Glass reflection shimmer overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 50%, rgba(255,255,255,0.06) 100%)",
                animation: `glass-shimmer ${(floatDuration * 1.3).toFixed(1)}s ease-in-out ${floatDelay}s infinite`,
                pointerEvents: "none",
              }}
            />

            {/* Ambient occlusion shadow beneath product */}
            <div
              style={{
                position: "absolute",
                bottom: "-20%",
                left: "10%",
                width: "80%",
                height: "30%",
                background:
                  "radial-gradient(ellipse, rgba(0,0,0,0.45) 0%, transparent 70%)",
                borderRadius: "50%",
                filter: "blur(8px)",
                pointerEvents: "none",
                animation: `shadow-pulse ${floatDuration}s ease-in-out ${floatDelay}s infinite`,
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   FLOATING PRODUCT LAYER — mounts globally above all UI
───────────────────────────────────────────────────── */
export default function FloatingProductLayer() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouse, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {PRODUCTS.map((product) => (
        <FloatingProduct
          key={product.id}
          product={product}
          mouseX={mousePos.x}
          mouseY={mousePos.y}
          scrollY={scrollY}
        />
      ))}
    </>
  );
}
