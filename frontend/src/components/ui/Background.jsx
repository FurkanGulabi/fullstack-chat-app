export function Background({ children }) {
  return (
    <div className="h-[100vh] w-full text-white bg-black bg-grid-small-white/[0.2]  relative flex items-center justify-center">
      {children}
    </div>
  );
}
