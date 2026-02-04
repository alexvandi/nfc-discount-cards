export interface CardInfo {
    id: string;
    merchantName: string;
    discount: string;
    expiryDate: string;
    isValid: boolean;
    status: 'active' | 'expired' | 'revoked' | 'not_found';
}

const MOCK_CARDS: Record<string, CardInfo> = {
    'VALID123': {
        id: 'VALID123',
        merchantName: 'Pizzeria da Mario',
        discount: '20% OFF',
        expiryDate: '2026-12-31',
        isValid: true,
        status: 'active'
    },
    'EXPIRED456': {
        id: 'EXPIRED456',
        merchantName: 'Caffè Moderno',
        discount: '10% OFF',
        expiryDate: '2024-01-15',
        isValid: false,
        status: 'expired'
    }
};

export async function verifyCard(id: string): Promise<CardInfo> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const card = MOCK_CARDS[id];

    if (!card) {
        return {
            id,
            merchantName: 'Sconosciuto',
            discount: 'Nessuno',
            expiryDate: '-',
            isValid: false,
            status: 'not_found'
        };
    }

    return card;
}
