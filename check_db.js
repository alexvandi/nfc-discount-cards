
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkTable() {
    console.log('Checking connection to:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    const { data, error } = await supabase.from('cards').select('count', { count: 'exact', head: true });

    if (error) {
        console.error('Error connecting or table not found:', error.message);
        if (error.code) console.error('Error code:', error.code);
    } else {
        console.log('Success! Table "cards" found.');
    }
}

checkTable();
