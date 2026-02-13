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
            className={`relative w-full max-w-md mx-auto overflow-hidden bg-black border border-white/20 text-white`}
        >
            {/* Geometric Accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-none rotate-45 transform translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-none rotate-45 transform -translate-x-12 translate-y-12" />

            <div className="flex flex-col items-center text-center space-y-6 pt-10 pb-8 px-8 relative z-10">
                <div className="relative">
                    {isSuccess ? (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            className="p-4 bg-white text-black"
                        >
                            <CheckCircle2 size={48} />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            className="p-4 bg-transparent border-2 border-white text-white"
                        >
                            <XCircle size={48} />
                        </motion.div>
                    )}
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold uppercase tracking-widest">
                        {isSuccess ? 'ACCESSO AUTORIZZATO' : 'ACCESSO NEGATO'}
                    </h2>
                    <p className="text-sm font-mono text-gray-400">
                        {isSuccess ? 'TESSERA VALIDA' : 'TESSERA NON RICONOSCIUTA'}
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
