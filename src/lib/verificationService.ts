import { supabase } from './supabaseClient';
import { DiscountCard } from '@/types/database';

export interface CardInfo extends DiscountCard {
    isValid: boolean;
    status: 'active' | 'pending' | 'expired' | 'revoked' | 'not_found';
}

export async function verifyCard(id: string): Promise<CardInfo> {
    const { data, error } = await supabase
        .from('cards')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) {
        return {
            nome: 'Sconosciuto',
            cognome: '',
            email: '',
            telefono: '',
            link_tessera: '',
            isValid: false,
            status: 'not_found',
            eta: null,
            genere: null
        } as CardInfo;
    }

    return {
        ...data,
        isValid: data.status === 'active',
        status: data.status // 'active' | 'pending'
    };
}

export async function getAllCards(): Promise<DiscountCard[]> {
    const { data, error } = await supabase
        .from('cards')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching cards:', error);
        return [];
    }

    return data || [];
}

export async function createCard(card: Omit<DiscountCard, 'id' | 'created_at'>): Promise<DiscountCard | null> {
    const { data, error } = await supabase
        .from('cards')
        .insert([card])
        .select()
        .single();

    if (error) {
        console.error('Error creating card:', error);
        return null;
    }

    return data;
}

export async function createEmptyCards(count: number): Promise<DiscountCard[]> {
    const emptyCards = Array(count).fill({
        nome: null,
        cognome: null,
        email: null,
        telefono: null,
        link_tessera: null,
        status: 'pending'
    });

    const { data, error } = await supabase
        .from('cards')
        .insert(emptyCards)
        .select();

    if (error) {
        console.error('Error creating empty cards:', error);
        return [];
    }

    return data || [];
}

export async function activateCard(id: string, details: Partial<DiscountCard>): Promise<boolean> {
    const { error } = await supabase
        .from('cards')
        .update({
            ...details,
            status: 'active'
        })
        .eq('id', id);

    if (error) {
        console.error('Error activating card:', error);
        return false;
    }

    return true;
}

export async function deleteCard(id: string): Promise<void> {
    const { error } = await supabase
        .from('cards')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting card:', error);
    }
}
