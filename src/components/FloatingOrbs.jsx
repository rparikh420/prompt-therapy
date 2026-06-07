export default function FloatingOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "orb-drift-1 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, #f43f5e 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "orb-drift-2 25s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #14b8a6 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "orb-drift-3 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-32 -right-24 w-96 h-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "orb-drift-1 28s ease-in-out infinite reverse",
        }}
      />
    </div>
  );
}
