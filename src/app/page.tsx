import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-black text-white">
      <div className="w-full max-w-md flex flex-col items-center justify-center space-y-12 sm:space-y-16">
        {/* Logo - Responsive sizing */}
        <img src="/logo.png" alt="SchoolBreak" className="w-48 sm:w-64 h-auto object-contain" />

        {/* Main Action Button */}
        <div className="w-full space-y-4 sm:space-y-6">
          <Link
            href="/admin"
            className="block w-full btn btn-secondary py-4 sm:py-5 text-sm sm:text-base text-center"
          >
            AREA AMMINISTRAZIONE
          </Link>
          <p className="text-[10px] sm:text-xs text-white/50 text-center uppercase tracking-widest">
            Accesso riservato allo staff
          </p>
        </div>
      </div>
    </div>
  );
}
