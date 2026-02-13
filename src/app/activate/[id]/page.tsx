
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Users, Check, ArrowRight } from 'lucide-react';
import { verifyCard, activateCard, CardInfo } from '@/lib/verificationService';

export default function ActivatePage({ params }: { params: { id: string } }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'loading' | 'pending' | 'active' | 'error'>('loading');

    // Form fields
    const [formData, setFormData] = useState({
        nome: '',
        cognome: '',
        email: '',
        telefono: '',
        eta: '',
        genere: 'non_specificato'
    });

    const router = useRouter();
    const { id } = params;

    useEffect(() => {
        checkStatus();
    }, [id]);

    async function checkStatus() {
        const card = await verifyCard(id);
        if (card.status === 'active') {
            // Already active, redirect to verify
            router.push(`/verify/${id}`);
            return;
        }
        if (card.status === 'not_found') {
            setStatus('error');
        } else {
            setStatus('pending');
        }
        setIsLoading(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const success = await activateCard(id, {
            nome: formData.nome,
            cognome: formData.cognome,
            email: formData.email,
            telefono: formData.telefono,
            eta: formData.eta ? parseInt(formData.eta) : null,
            genere: formData.genere,
            link_tessera: `CARD-${id.substring(0, 8).toUpperCase()}` // Auto-generate ID code
        });

        if (success) {
            // Redirect to verify page after small delay
            setTimeout(() => router.push(`/verify/${id}`), 1500);
        } else {
            alert("Errore durante l'attivazione. Riprova.");
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-black text-white">Caricamento...</div>;

    if (status === 'error') return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center space-y-4 bg-black text-white">
            <h1 className="text-xl sm:text-2xl font-bold text-red-500">Tessera Non Trovata</h1>
            <p className="text-white/70 text-sm sm:text-base">Il codice QR scansionato non è valido.</p>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-black text-white relative">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm space-y-8 sm:space-y-10"
            >
                <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6">
                    <img src="/logo.png" alt="SchoolBreak" className="w-40 sm:w-48 h-auto object-contain" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    <div className="space-y-3 sm:space-y-4">
                        <input required name="nome" value={formData.nome} onChange={handleChange} className="input-outline placeholder-white/50 text-sm sm:text-base" placeholder="Nome" />
                        <input required name="cognome" value={formData.cognome} onChange={handleChange} className="input-outline placeholder-white/50 text-sm sm:text-base" placeholder="Cognome" />
                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="input-outline placeholder-white/50 text-sm sm:text-base" placeholder="Email (Opzionale)" />
                        <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="input-outline placeholder-white/50 text-sm sm:text-base" placeholder="Telefono" />

                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <input type="number" name="eta" value={formData.eta} onChange={handleChange} className="input-outline placeholder-white/50 text-sm sm:text-base" placeholder="Età" />
                            <select name="genere" value={formData.genere} onChange={handleChange} className="input-outline bg-black appearance-none cursor-pointer text-white/50 text-sm sm:text-base">
                                <option value="non_specificato">Genere</option>
                                <option value="uomo">Uomo</option>
                                <option value="donna">Donna</option>
                                <option value="altro">Altro</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn btn-primary py-3 sm:py-4 mt-6 sm:mt-8 text-sm sm:text-base"
                    >
                        {isSubmitting ? 'ATTIVAZIONE...' : 'ATTIVA'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
