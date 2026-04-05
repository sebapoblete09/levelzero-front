export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Aquí puedes poner un fondo distinto si quieres, 
    // o simplemente devolver el children
    <div className="min-h-screen bg-black">
      {children}
    </div>
  );
}