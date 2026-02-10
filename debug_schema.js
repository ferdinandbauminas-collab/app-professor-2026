
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function debug() {
    console.log("--- DEBUG SCHEMA ---");

    console.log("\n1. Teachers Table:");
    const { data: teachers, error: tError } = await supabase.from('teachers').select('*').limit(3);
    if (tError) console.error(tError);
    else console.log(JSON.stringify(teachers, null, 2));

    console.log("\n2. Disciplines Table:");
    const { data: disciplines, error: dError } = await supabase.from('disciplines').select('*').limit(3);
    if (dError) console.error(dError);
    else console.log(JSON.stringify(disciplines, null, 2));

    if (teachers && teachers.length > 0 && disciplines && disciplines.length > 0) {
        const teacher = teachers[0];
        const teacherId = teacher.id || teacher.teacher_id;
        console.log(`\n3. Checking Disciplines for Teacher: ${teacher.name} (ID: ${teacherId})`);

        // Tentar filtrar como o frontend faz
        const filtered = disciplines.filter(d => d.teacher_id === teacherId);
        console.log(`Disciplines found with teacher_id match: ${filtered.length}`);
    }
}

debug();
