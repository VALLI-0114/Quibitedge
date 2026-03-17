const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Environment variables NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkEverything() {
  console.log('Checking all tables in "public" schema...');
  
  // Try to query information_schema or just a simple query
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .limit(0);

  if (error) {
    console.error('❌ applications table query failed:', error.message);
    console.log('Error Code:', error.code);
    console.log('Details:', error);
  } else {
    console.log('✅ applications table found!');
  }

  console.log('Attempting to list tables via RPC or direct query...');
  const { data: tables, error: tableError } = await supabase
    .from('_dummy_table_non_existent') // This is just to trigger the cache/check
    .select('*')
    .limit(0);
}

checkEverything();
