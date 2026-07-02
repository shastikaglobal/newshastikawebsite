import { useEffect, useRef } from "react";

export default function FloatingCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide native cursor site-wide
    const style = document.createElement("style");
    style.innerHTML = `* { cursor: none !important; }`;
    style.id = "hide-cursor-style";
    document.head.appendChild(style);
    return () => {
      document.getElementById("hide-cursor-style")?.remove();
    };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };

    document.addEventListener('mousemove', onMove);
    return () => {
      document.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div
      id="custom-cursor"
      ref={cursorRef}
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 99999,
        fontSize: "24px",
        transform: "translate(-50%, -50%)",
        transition: "transform 0.1s ease",
        left: "-100px", // Hide offscreen initially
        top: "-100px",
      }}
    >
      🥥
    </div>
  );
}
