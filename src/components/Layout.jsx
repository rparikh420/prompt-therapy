import FloatingOrbs from "./FloatingOrbs";

export default function Layout({ children }) {
  return (
    <div
      className="grain-overlay relative min-h-screen"
      style={{
        background: "linear-gradient(145deg, #0a0a0f 0%, #1a1025 40%, #0f0a1a 70%, #0a0a0f 100%)",
      }}
    >
      <FloatingOrbs />
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}
