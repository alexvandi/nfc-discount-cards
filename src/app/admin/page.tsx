'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Copy, Check, Info, ArrowLeft, Trash2, LogOut, User, Mail, Phone, ExternalLink, QrCode } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import QRCode from 'react-qr-code';
import { createCard, getAllCards, deleteCard, createEmptyCards } from '@/lib/verificationService';
import { DiscountCard } from '@/types/database';

export default function AdminPage() {
    const [cards, setCards] = useState<DiscountCard[]>([]);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState('');

    // Nuovi stati per i campi richiesti
    const [formData, setFormData] = useState({
        nome: '',
        cognome: '',
        email: '',
        telefono: '',
        link_tessera: ''
    });

    const router = useRouter();

    useEffect(() => {
        loadCards();
    }, []);

    async function loadCards() {
        const allCards = await getAllCards();
        setCards(allCards as DiscountCard[]);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGenerate = async () => {
        if (!formData.nome || !formData.cognome || !formData.email || !formData.link_tessera) return;

        await createCard({
            ...formData,
            status: 'active'
        });

        setSuccessMsg('Cliente registrato con successo!');
        setTimeout(() => setSuccessMsg(''), 3000);

        setFormData({
            nome: '',
            cognome: '',
            email: '',
            telefono: '',
            link_tessera: ''
        });
        loadCards(); // Refresh list
    };

    const [generatedLinks, setGeneratedLinks] = useState<string[]>([]);
    const [generateCount, setGenerateCount] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateEmpty = async () => {
        setIsGenerating(true);
        const newCards = await createEmptyCards(generateCount);

        const links = newCards.map(c => `${window.location.origin}/verify/${c.id}`);
        setGeneratedLinks(links);

        setSuccessMsg(`${newCards.length} QR vuoti generati!`);
        setTimeout(() => setSuccessMsg(''), 3000);

        loadCards();
        setIsGenerating(false);
    };

    const copyLink = (id: string) => {
        const link = `${window.location.origin}/verify/${id}`;
        navigator.clipboard.writeText(link);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Sei sicuro di voler eliminare questa tessera?')) return;
        await deleteCard(id);
        loadCards();
    };

    const handleLogout = () => {
        Cookies.remove('auth_token');
        router.push('/admin/login');
    };

    const isFormValid = formData.nome && formData.cognome && formData.email && formData.link_tessera;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft size={16} className="mr-1" /> Torna al portale
                </Link>
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold hidden md:block">Gestione Tessere</h1>
                    <button
                        onClick={handleLogout}
                        className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 border border-red-500/20 px-2 py-1 rounded"
                    >
                        <LogOut size={12} /> Logout
                    </button>
                </div>
            </div>

            {successMsg && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-2"
                >
                    <Check size={20} />
                    <span>{successMsg}</span>
                </motion.div>
            )}

            <div className="bg-black border-2 border-white p-6 space-y-8 rounded-lg">
                <div className="flex items-center space-x-2 text-white border-b border-white pb-4">
                    <Plus size={24} />
                    <h2 className="font-bold text-xl uppercase tracking-widest">Registra Cliente</h2>
                </div>

                <div className="space-y-4">
                    <input name="nome" value={formData.nome} onChange={handleChange} className="input-outline placeholder-white/50" placeholder="Nome" />
                    <input name="cognome" value={formData.cognome} onChange={handleChange} className="input-outline placeholder-white/50" placeholder="Cognome" />
                    <input name="email" value={formData.email} onChange={handleChange} className="input-outline placeholder-white/50" placeholder="Email" />
                    <input name="telefono" value={formData.telefono} onChange={handleChange} className="input-outline placeholder-white/50" placeholder="Telefono" />
                    <input name="link_tessera" value={formData.link_tessera} onChange={handleChange} className="input-outline placeholder-white/50" placeholder="ID Tessera" />
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={!isFormValid}
                    className="btn btn-primary w-full py-4 text-base tracking-widest"
                >
                    REGISTRA E CREA TESSERA
                </button>
            </div>

            {/* Generate Empty QRs Section */}
            <div className="bg-black border-2 border-white p-6 space-y-6 rounded-lg">
                <div className="flex items-center space-x-2 text-white border-b border-white pb-4">
                    <QrCode size={24} />
                    <h2 className="font-bold text-xl uppercase tracking-widest">Genera QR Code</h2>
                </div>
                <p className="text-sm text-white/70">Genera i codici QR da stampare. Sono pronti per l'attivazione.</p>

                <div className="flex items-center gap-4">
                    <div className="relative w-32">
                        <input
                            type="number"
                            min="1"
                            max="50"
                            value={generateCount}
                            onChange={(e) => setGenerateCount(parseInt(e.target.value) || 1)}
                            className="input-outline text-center placeholder-white/50"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-xs">PZ</span>
                    </div>
                    <button
                        onClick={handleGenerateEmpty}
                        disabled={isGenerating}
                        className="btn btn-primary flex-1 py-3"
                    >
                        {isGenerating ? 'GENERAZIONE...' : `GENERA ${generateCount} QR CODES`}
                    </button>
                </div>

                {generatedLinks.length > 0 && (
                    <div className="mt-8 space-y-4">
                        <h4 className="font-bold text-sm uppercase tracking-widest text-center mb-6">Anteprima di Stampa</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {generatedLinks.map((link, i) => (
                                <div key={i} className="flex flex-col items-center p-4 bg-white rounded-lg text-black space-y-2">
                                    <div className="p-2 border-2 border-black">
                                        <QRCode value={link} size={120} />
                                    </div>
                                    <span className="text-[10px] font-mono font-bold">{link.split('/').pop()?.substring(0, 8).toUpperCase()}</span>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(link)}
                                        className="text-xs underline opacity-50 hover:opacity-100"
                                    >
                                        Copia Link
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold uppercase tracking-widest flex items-center">
                        Clienti Registrati <span className="ml-2 px-2 py-0.5 bg-white text-black text-xs rounded-sm">{cards.length}</span>
                    </h3>
                </div>

                {cards.length === 0 ? (
                    <div className="text-center py-12 border border-white/20 rounded-lg">
                        <p className="text-white/50">Nessun cliente registrato.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {cards.map((card) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={card.id}
                                className="bg-black border border-white/20 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-white/50 transition-all rounded-lg"
                            >
                                <div className="space-y-1">
                                    <p className="font-bold text-lg">{card.nome} {card.cognome}</p>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/70">
                                        <span className="flex items-center gap-1"><Mail size={14} /> {card.email}</span>
                                        {card.telefono && <span className="flex items-center gap-1"><Phone size={14} /> {card.telefono}</span>}
                                    </div>
                                    <p className="text-xs text-white font-medium mt-1 truncate max-w-xs">{card.link_tessera}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => card.id && copyLink(card.id)}
                                        className="flex-1 md:flex-none btn btn-secondary py-2 px-4 text-xs"
                                    >
                                        {copiedId === card.id ? <><Check size={14} className="inline mr-1" />COPIATO!</> : <><Copy size={14} className="inline mr-1" />COPIA LINK</>}
                                    </button>
                                    <button
                                        onClick={() => card.id && handleDelete(card.id)}
                                        className="p-3 text-white/50 hover:text-red-500 hover:bg-red-500/10 rounded transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
