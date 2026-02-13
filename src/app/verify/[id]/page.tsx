'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { verifyCard, CardInfo } from '@/lib/verificationService';

export default function VerifyPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const [loading, setLoading] = useState(true);
    const [card, setCard] = useState<CardInfo | null>(null);
    const [email, setEmail] = useState('');

    useEffect(() => {
        async function performVerification() {
            if (id) {
                const result = await verifyCard(id);

                if (result.status === 'pending') {
                    router.push(`/activate/${id}`);
                    return;
                }

                setCard(result);
                setLoading(false);
            }
        }
        performVerification();
    }, [id, router]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 bg-black text-white relative">
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center flex-1"
                    >
                        <Loader2 size={32} className="animate-spin text-white" />
                    </motion.div>
                ) : (
                    card && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full max-w-md flex flex-col items-center justify-between min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)] py-6 sm:py-8"
                        >
                            {/* Logo Section - Responsive */}
                            <div className="flex flex-col items-center justify-center flex-1 space-y-12 sm:space-y-16">
                                <img src="/logo.png" alt="SchoolBreak" className="w-44 sm:w-56 h-auto object-contain" />

                                {/* Action Buttons */}
                                <div className="w-full space-y-4 sm:space-y-6">
                                    <button className="w-full btn btn-secondary py-4 sm:py-5 text-sm sm:text-base">
                                        RICHIEDI LA TUA TESSERA ORA
                                    </button>
                                    <button className="w-full btn btn-secondary py-4 sm:py-5 text-sm sm:text-base">
                                        NEGOZIANTE
                                    </button>

                                    {/* Email Input */}
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input-outline placeholder-white/50 text-sm sm:text-base"
                                        placeholder="Email (Optional)"
                                    />
                                </div>
                            </div>

                            {/* Status Indicator at Bottom */}
                            {card.isValid && (
                                <div className="flex items-center gap-2 mt-6 sm:mt-8">
                                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                                    <span className="text-green-500 font-bold uppercase tracking-widest text-xs sm:text-sm">ATTIVO</span>
                                </div>
                            )}
                        </motion.div>
                    )
                )}
            </AnimatePresence>
        </div>
    );
}
