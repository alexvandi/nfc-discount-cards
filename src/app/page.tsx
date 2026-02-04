import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] text-center space-y-12 px-4 relative overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="space-y-6 max-w-2xl relative z-10">
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-muted-foreground backdrop-blur-md mb-2">
          NFC Digital Pass System
        </div>
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-none">
          Sconti <br />
          <span className="text-gradient">Intelligenti</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Il futuro della fidelizzazione clienti.<br />
          Semplice. Veloce. Contactless.
        </p>
      </div>

      <div className="flex flex-col items-center gap-6 w-full max-w-xs relative z-10">
        <Link
          href="/admin"
          className="btn btn-primary w-full py-4 text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
        >
          Area Amministrazione
        </Link>
        <p className="text-xs text-muted-foreground">
          Accesso riservato allo staff
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-4xl opacity-80">
        <div className="glass-card p-6 text-left hover:bg-white/5 transition-colors">
          <div className="h-10 w-10 rounded-lg bg-primary/20 mb-4 flex items-center justify-center text-primary font-bold">1</div>
          <h3 className="font-bold mb-2">Registra</h3>
          <p className="text-sm text-muted-foreground">Inserisci i dati del cliente nel portale Admin e crea la sua scheda digitale.</p>
        </div>
        <div className="glass-card p-6 text-left hover:bg-white/5 transition-colors">
          <div className="h-10 w-10 rounded-lg bg-primary/20 mb-4 flex items-center justify-center text-primary font-bold">2</div>
          <h3 className="font-bold mb-2">Collega</h3>
          <p className="text-sm text-muted-foreground">Scrivi il link generato sulla tua tessera NFC utilizzando uno smartphone.</p>
        </div>
        <div className="glass-card p-6 text-left hover:bg-white/5 transition-colors">
          <div className="h-10 w-10 rounded-lg bg-primary/20 mb-4 flex items-center justify-center text-primary font-bold">3</div>
          <h3 className="font-bold mb-2">Verifica</h3>
          <p className="text-sm text-muted-foreground">Avvicina il telefono del cliente alla tessera per verificare lo sconto.</p>
        </div>
      </div>
    </div>
  );
}
