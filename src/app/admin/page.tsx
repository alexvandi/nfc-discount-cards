'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Copy, Check, Info, ArrowLeft, Trash2, Smartphone, LogOut, User, Mail, Phone, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { createCard, getAllCards, deleteCard } from '@/lib/verificationService';
import { DiscountCard } from '@/types/database';

export default function AdminPage() {
    const [cards, setCards] = useState<DiscountCard[]>([]);
    const [copiedId, setCopiedId] = useState<string | null>(null);

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

        await createCard(formData);
        setFormData({
            nome: '',
            cognome: '',
            email: '',
            telefono: '',
            link_tessera: ''
        });
        loadCards(); // Refresh list
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

            <div className="glass-card p-6 space-y-6">
                <div className="flex items-center space-x-2 text-primary border-b border-white/10 pb-4">
                    <Plus size={20} />
                    <h2 className="font-semibold text-lg">Registra Nuovo Cliente</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider ml-1">Nome</label>
                            <div className="relative">
                                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    name="nome"
                                    type="text"
                                    placeholder="Es: Mario"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 outline-none focus:border-primary/50 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider ml-1">Cognome</label>
                            <div className="relative">
                                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    name="cognome"
                                    type="text"
                                    placeholder="Es: Rossi"
                                    value={formData.cognome}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 outline-none focus:border-primary/50 transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider ml-1">Email</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Es: mario.rossi@email.it"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 outline-none focus:border-primary/50 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider ml-1">Telefono</label>
                            <div className="relative">
                                <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    name="telefono"
                                    type="tel"
                                    placeholder="Es: +39 333 1234567"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 outline-none focus:border-primary/50 transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 flex flex-col space-y-2">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider ml-1">Link Tessera / Codice</label>
                        <div className="relative">
                            <ExternalLink size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                name="link_tessera"
                                type="text"
                                placeholder="Incolla qui il link o l'ID della tessera"
                                value={formData.link_tessera}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={!isFormValid}
                    className="btn btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 py-4 shadow-lg shadow-primary/20"
                >
                    <Plus size={20} />
                    <span className="font-bold">Registra Cliente e Crea Tessera</span>
                </button>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center">
                        Clienti Registrati <span className="ml-2 px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">{cards.length}</span>
                    </h3>
                </div>

                {cards.length === 0 ? (
                    <div className="text-center py-12 glass-card border-dashed border-white/10">
                        <p className="text-muted-foreground">Nessun cliente registrato.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {cards.map((card) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={card.id}
                                className="glass-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-white/20 transition-all"
                            >
                                <div className="space-y-1">
                                    <p className="font-bold text-lg">{card.nome} {card.cognome}</p>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1"><Mail size={14} /> {card.email}</span>
                                        {card.telefono && <span className="flex items-center gap-1"><Phone size={14} /> {card.telefono}</span>}
                                    </div>
                                    <p className="text-xs text-primary font-medium mt-1 truncate max-w-xs">{card.link_tessera}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => card.id && copyLink(card.id)}
                                        className="flex-1 md:flex-none btn glass-card py-2 px-4 flex items-center justify-center space-x-2 hover:bg-white/10 transition-colors"
                                    >
                                        {copiedId === card.id ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                        <span className="text-sm font-medium">{copiedId === card.id ? 'Copiato!' : 'Copia Link Verifica'}</span>
                                    </button>
                                    <button
                                        onClick={() => card.id && handleDelete(card.id)}
                                        className="p-3 text-muted-foreground hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                        <Smartphone className="text-primary" size={24} />
                    </div>
                    <div className="space-y-1">
                        <h4 className="font-semibold text-primary text-sm uppercase tracking-wider">Istruzioni per l'NFC</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Copia il <strong>Link di Verifica</strong> e usa un'app come <strong>NFC Tools</strong> per scriverlo sulla tessera.
                            Quando il cliente avvicinerà il telefono alla tessera, verrà rindirizzato alla pagina di conferma.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
