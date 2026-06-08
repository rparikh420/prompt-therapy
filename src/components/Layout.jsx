import FloatingOrbs from "./FloatingOrbs";
import { MotionConfigProvider } from "./MotionConfig";

export default function Layout({ children }) {
  return (
    <MotionConfigProvider>
      <div
        className="grain-overlay relative min-h-screen"
        style={{
          background: "linear-gradient(145deg, #07070d 0%, #111827 40%, #0c1220 70%, #07070d 100%)",
          backgroundSize: "200% 200%",
          animation: "ambient-gradient 30s ease infinite",
        }}
      >
        <FloatingOrbs />
        <div className="relative z-10 w-full max-w-lg mx-auto px-6 py-10">
          {children}
        </div>
      </div>
    </MotionConfigProvider>
  );
}
