import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if(!supabaseUrl || !supabaseKey) {
    console.error("Missing credentials");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log(`Pinging Supabase at ${supabaseUrl}...`);
    const { data, error } = await supabase.from('applications').select('count', { count: 'exact', head: true });
    
    if (error) {
        console.error("Connection Failed:", error.message);
    } else {
        console.log("Success! Database is connected and responding.");
    }
}

testConnection();
