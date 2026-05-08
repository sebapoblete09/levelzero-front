interface headerProps {
  name: string;
}
export default function WelcomeHeader({ name }: headerProps) {
  return (
    <div className="border-l-4 border-calypso-DEFAULT pl-6 py-2">
      <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter text-white uppercase">
        Bienvenido de vuelta,{" "}
        <span className="text-calypso-DEFAULT">{name}</span>
      </h1>
      <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mt-2">
        Sistemas online // Sincronización completa
      </p>
    </div>
  );
}
