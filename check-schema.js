import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    // We cannot query pg_class directly from anon client usually unless it's exposed, but we can try rpc or generic table select.
    // Let's just try to insert a dummy app to see what fails.
    
    // Check tables by trying to select 1 row from each
    const tables = ['applications', 'academic_details', 'internship_preferences', 'projects', 'payments'];
    
    for (const table of tables) {
        const { error } = await supabase.from(table).select('id').limit(1);
        if (error) {
            console.log(`Table '${table}' error: ${error.message} - Code: ${error.code}`);
        } else {
            console.log(`Table '${table}' exists and is queryable.`);
        }
    }
}

checkSchema();
