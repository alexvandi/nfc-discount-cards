'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, User, Mail, Phone, ExternalLink, ShieldCheck } from 'lucide-react';
import { CardInfo } from '@/lib/verificationService';

interface CardProps {
    card: CardInfo;
}

export default function CardDetails({ card }: CardProps) {
    const isSuccess = card.isValid;
    const isNotFound = card.status === 'not_found';

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" as const }
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
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            className="p-5 rounded-full bg-green-500/10 border border-green-500/20"
                        >
                            <CheckCircle2 size={64} className="text-green-500" />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            className="p-5 rounded-full bg-red-500/10 border border-red-500/20"
                        >
                            <XCircle size={64} className="text-red-500" />
                        </motion.div>
                    )}
                </div>

                <div className="space-y-2">
                    <h2 className={`text-3xl font-bold ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
                        {isSuccess ? 'Accesso Autorizzato' : 'Accesso Negato'}
                    </h2>
                    <p className="text-muted-foreground font-medium">
                        {isSuccess ? 'Tessera cliente riconosciuta nel sistema.' : 'Tessera non registrata o disabilitata.'}
                    </p>
                </div>

                {isSuccess && (
                    <>
                        <div className="w-full h-[1px] bg-white/10" />

                        <div className="w-full space-y-5 text-left bg-white/5 p-6 rounded-2xl border border-white/5">
                            <div className="flex items-center space-x-4">
                                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                                    <User size={20} className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.1em] font-bold">Intestatario</p>
                                    <p className="font-bold text-lg leading-tight uppercase tracking-tight">{card.nome} {card.cognome}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                                    <Mail size={18} className="text-muted-foreground" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.1em] font-bold">Email</p>
                                    <p className="font-medium truncate">{card.email}</p>
                                </div>
                            </div>

                            {card.telefono && (
                                <div className="flex items-center space-x-4">
                                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                                        <Phone size={18} className="text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.1em] font-bold">Telefono</p>
                                        <p className="font-medium">{card.telefono}</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center space-x-4">
                                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                                    <ExternalLink size={18} className="text-muted-foreground" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.1em] font-bold">ID / Tessera</p>
                                    <p className="font-mono text-xs opacity-80 truncate">{card.link_tessera}</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex items-center justify-between text-[10px] text-muted-foreground font-mono uppercase tracking-widest px-1">
                            <div className="flex items-center gap-1">
                                <ShieldCheck size={12} />
                                <span>Verified Secure</span>
                            </div>
                            <span>REF: {card.id?.substring(0, 8)}</span>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
}
