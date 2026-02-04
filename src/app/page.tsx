import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-10">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          Sconti <span className="text-gradient">Intelligenti</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-sm mx-auto">
          Passa la tua tessera NFC per verificare istantaneamente lo sconto.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full max-w-xs">
        <Link href="/verify/VALID123" className="btn btn-primary text-center no-underline">
          Test: Tessera Valida
        </Link>
        <Link href="/verify/EXPIRED456" className="btn glass-card text-center no-underline border-white/20">
          Test: Tessera Scaduta
        </Link>
        <Link href="/admin" className="text-muted-foreground text-sm hover:text-foreground transition-colors mt-4">
          Accedi come Admin →
        </Link>
      </div>

      <div className="glass-card p-6 mt-12 w-full">
        <h3 className="text-lg font-semibold mb-2">Come funziona?</h3>
        <p className="text-sm text-muted-foreground text-left">
          1. Il negozio ti consegna una tessera NFC.<br />
          2. Avvicina il telefono per aprire il portale.<br />
          3. Mostra la conferma verde al cassiere per lo sconto!
        </p>
      </div>
    </div>
  );
}
