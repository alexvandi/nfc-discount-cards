'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ShieldCheck as SearchCheck } from 'lucide-react';
import { verifyCard, CardInfo } from '@/lib/verificationService';
import CardDetails from '@/components/CardDetails';

export default function VerifyPage() {
    const params = useParams();
    const id = params.id as string;
    const [loading, setLoading] = useState(true);
    const [card, setCard] = useState<CardInfo | null>(null);

    useEffect(() => {
        async function performVerification() {
            if (id) {
                const result = await verifyCard(id);
                setCard(result);
                setLoading(false);
            }
        }
        performVerification();
    }, [id]);

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center py-10">
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center space-y-6"
                    >
                        <div className="relative">
                            <Loader2 size={80} className="text-primary animate-spin opacity-20" />
                            <SearchCheck size={40} className="absolute inset-0 m-auto text-primary animate-pulse" />
                        </div>
                        <div className="text-center space-y-2">
                            <h1 className="text-2xl font-bold text-gradient">Verifica in Corso...</h1>
                            <p className="text-muted-foreground">Stiamo controllando la validità della tua tessera</p>
                        </div>
                    </motion.div>
                ) : (
                    card && <CardDetails key="card" card={card} />
                )}
            </AnimatePresence>
        </div>
    );
}
