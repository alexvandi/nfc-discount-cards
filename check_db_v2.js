
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Manually parse .env.local
try {
    const envPath = path.join(__dirname, '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            process.env[match[1]] = match[2].trim();
        }
    });
} catch (e) {
    console.error('Error reading .env.local:', e);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTable() {
    console.log('Checking connection to:', supabaseUrl);
    // Try to select 0 rows, just to check if table exists
    const { data, error } = await supabase.from('cards').select('*').limit(1);

    if (error) {
        console.log('Error:', error.message);
        if (error.code === '42P01') {
            console.log('Table "cards" does NOT exist.');
        } else {
            console.log('Table connection issue (or RLS blocking):', error.message);
        }
    } else {
        console.log('Success! Table "cards" found.');
    }
}

checkTable();
