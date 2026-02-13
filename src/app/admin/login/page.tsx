'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
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
        <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-black text-white">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md space-y-10 sm:space-y-12"
            >
                {/* Logo */}
                <div className="flex flex-col items-center space-y-6 sm:space-y-8">
                    <img src="/logo.png" alt="SchoolBreak" className="w-40 sm:w-48 h-auto object-contain" />
                    <h1 className="text-lg sm:text-xl font-bold uppercase tracking-widest text-center">Accesso Admin</h1>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`input-outline placeholder-white/50 text-sm sm:text-base ${error ? 'border-red-500' : ''}`}
                    />

                    <button
                        type="submit"
                        className="btn btn-primary w-full py-3 sm:py-4 text-sm sm:text-base"
                    >
                        ACCEDI
                    </button>
                </form>

                {error && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500 text-xs sm:text-sm text-center uppercase tracking-widest"
                    >
                        Password non valida
                    </motion.p>
                )}

                <Link href="/" className="block text-center text-white/50 text-[10px] sm:text-xs uppercase tracking-widest hover:text-white transition-colors">
                    ← Torna alla Home
                </Link>
            </motion.div>
        </div>
    );
}
