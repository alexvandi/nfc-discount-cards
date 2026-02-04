'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Hardcoded simple check for demo purposes
        if (password === 'admin123') {
            Cookies.set('auth_token', 'secret-admin-token', { expires: 1, path: '/' });
            router.push('/admin');
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
            <Link href="/" className="mb-8 text-muted-foreground hover:text-foreground transition-colors">
                ← Torna alla Home
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-8 w-full max-w-md relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col items-center mb-8">
                    <div className="p-4 rounded-full bg-primary/10 border border-primary/20 mb-4">
                        <Lock size={32} className="text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold">Accesso Admin</h1>
                    <p className="text-muted-foreground text-center mt-2">
                        Inserisci la password per gestire le tessere.
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full bg-white/5 border ${error ? 'border-red-500' : 'border-white/10'} rounded-lg p-4 pl-4 outline-none focus:border-primary/50 transition-all`}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full flex items-center justify-center space-x-2 py-4"
                    >
                        <span>Accedi</span>
                        <ArrowRight size={18} />
                    </button>
                </form>

                {error && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400 text-sm text-center mt-4"
                    >
                        Password non valida. Riprova.
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
}
