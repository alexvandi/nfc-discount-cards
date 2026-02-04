'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Copy, Check, Info, ArrowLeft, Trash2, Smartphone } from 'lucide-react';
import Link from 'next/link';

interface NewCard {
    id: string;
    name: string;
    discount: string;
}

export default function AdminPage() {
    const [cards, setCards] = useState<NewCard[]>([]);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [discount, setDiscount] = useState('');

    const generateCard = () => {
        if (!name || !discount) return;
        const newCard = {
            id: Math.random().toString(36).substring(2, 9).toUpperCase(),
            name,
            discount
        };
        setCards([newCard, ...cards]);
        setName('');
        setDiscount('');
    };

    const copyLink = (id: string) => {
        const link = `${window.location.origin}/verify/${id}`;
        navigator.clipboard.writeText(link);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const deleteCard = (id: string) => {
        setCards(cards.filter(c => c.id !== id));
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft size={16} className="mr-1" /> Torna al portale
                </Link>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>

            <div className="glass-card p-6 space-y-4">
                <div className="flex items-center space-x-2 text-primary">
                    <Info size={18} />
                    <h2 className="font-semibold">Crea Nuova Tessera</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Nome Negozio (es: Pizzeria Mario)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-primary/50 transition-colors"
                    />
                    <input
                        type="text"
                        placeholder="Sconto (es: 20% OFF)"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-primary/50 transition-colors"
                    />
                </div>
                <button
                    onClick={generateCard}
                    disabled={!name || !discount}
                    className="btn btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                    <Plus size={20} />
                    <span>Genera Link Tessera</span>
                </button>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                    Tessere Generate <span className="ml-2 px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">{cards.length}</span>
                </h3>

                {cards.length === 0 ? (
                    <div className="text-center py-12 glass-card border-dashed border-white/10">
                        <p className="text-muted-foreground">Nessuna tessera generata ancora.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {cards.map((card) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={card.id}
                                className="glass-card p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                            >
                                <div>
                                    <p className="font-bold text-lg">{card.name}</p>
                                    <p className="text-sm text-primary font-medium">{card.discount}</p>
                                    <p className="text-xs text-muted-foreground font-mono mt-1">ID: {card.id}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => copyLink(card.id)}
                                        className="flex-1 md:flex-none btn glass-card py-2 px-4 flex items-center justify-center space-x-2 hover:bg-white/10 transition-colors"
                                    >
                                        {copiedId === card.id ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                        <span>{copiedId === card.id ? 'Copiato!' : 'Copia Link'}</span>
                                    </button>
                                    <button
                                        onClick={() => deleteCard(card.id)}
                                        className="p-2 text-muted-foreground hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 size={20} />
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
                        <h4 className="font-semibold text-primary">Istruzioni per l'NFC</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Dopo aver copiato il link, usa un'app come <strong>NFC Tools</strong> sul tuo smartphone.
                            Vai nella sezione <strong>Scrittura</strong> → <strong>Aggiungi record</strong> → <strong>URL/URI</strong>
                            e incolla il link copiato. Appoggia il telefono alla tessera per scriverlo definitivamente.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
