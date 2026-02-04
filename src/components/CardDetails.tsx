'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, ShieldCheck, Store, Calendar, CreditCard } from 'lucide-react';
import { CardInfo } from '@/lib/verificationService';

interface CardProps {
    card: CardInfo;
}

export default function CardDetails({ card }: CardProps) {
    const isSuccess = card.isValid;
    const isExpired = card.status === 'expired';
    const isNotFound = card.status === 'not_found';

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" as const }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className={`glass-card ${isSuccess ? 'glow-success' : 'glow-error'} p-8 w-full max-w-md mx-auto relative overflow-hidden`}
        >
            {/* Background patterns */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                <div className="relative">
                    {isSuccess ? (
                        <div className="p-4 rounded-full bg-green-500/10 border border-green-500/20">
                            <CheckCircle2 size={64} className="text-green-500" />
                        </div>
                    ) : (
                        <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20">
                            <XCircle size={64} className="text-red-500" />
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <h2 className={`text-2xl font-bold ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
                        {isSuccess ? 'Tessera Valida' : isExpired ? 'Tessera Scaduta' : 'Tessera Non Valida'}
                    </h2>
                    <p className="text-muted-foreground">
                        {isSuccess ? 'Questa tessera può essere utilizzata per lo sconto.' : 'Questa tessera non è più valida o non esiste.'}
                    </p>
                </div>

                <div className="w-full h-[1px] bg-white/10" />

                <div className="w-full space-y-4 text-left">
                    <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-lg bg-white/5">
                            <Store size={20} className="text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Negozio</p>
                            <p className="font-medium">{card.merchantName}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-lg bg-white/5">
                            <CreditCard size={20} className="text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Sconto</p>
                            <p className="font-medium">{card.discount}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-lg bg-white/5">
                            <Calendar size={20} className="text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Scadenza</p>
                            <p className={`font-medium ${isExpired ? 'text-red-400' : ''}`}>{card.expiryDate}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-lg bg-white/5">
                            <ShieldCheck size={20} className="text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">ID Univoco</p>
                            <p className="font-mono text-xs opacity-70">{card.id}</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
