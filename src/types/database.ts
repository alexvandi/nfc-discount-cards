export interface DiscountCard {
    id?: string;
    created_at?: string;
    nome: string | null;
    cognome: string | null;
    email: string | null;
    telefono: string | null;
    link_tessera: string | null;
    status: 'pending' | 'active' | 'expired' | 'revoked' | 'not_found';
    eta?: number | null;
    genere?: string | null;
}
