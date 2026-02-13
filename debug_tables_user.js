
import { createClient } from '@supabase/supabase-js';

// Credentials extracted from your .env file
const supabaseUrl = 'https://yglwswpgrqfldvpbqxcl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnbHdzd3BncnFmbGR2cGJxeGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2Mjg0MDQsImV4cCI6MjAzMTIwNDQwNH0.5N_u6Y-0iG2s1s024s2yNCe-iZ0rnF3xKq6H3kTl3rU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testTable(tableName) {
    console.log(`\n---------------------------------------------------`);
    console.log(`🔍 Checking table: '${tableName}'`);

    try {
        const { data, error, count } = await supabase
            .from(tableName)
            .select('*', { count: 'exact', head: false })
            .limit(1);

        if (error) {
            console.log(`❌ Error accessing '${tableName}':`);
            console.log(`   Code: ${error.code}`);
            console.log(`   Message: ${error.message}`);

            if (error.code === '42P01') {
                console.log(`   -> Conclusion: The table '${tableName}' DOES NOT EXIST.`);
            } else if (error.code === 'PGRST301') {
                console.log(`   -> Conclusion: Permission denied (RLS) or table hidden.`);
            }
            return false;
        } else {
            console.log(`✅ SUCCESS! Table '${tableName}' exists and is accessible.`);
            console.log(`   Row count: ${count}`);
            if (data && data.length > 0) {
                console.log(`   Sample data:`, data[0]);
            } else {
                console.log(`   Table is empty.`);
            }
            return true;
        }
    } catch (err) {
        console.log(`❌ Unexpected error: ${err.message}`);
        return false;
    }
}

async function run() {
    console.log("===================================================");
    console.log("   SUPABASE TABLE DIAGNOSIS");
    console.log("===================================================");

    // 1. Test standard variations
    const tables = ['Turmas', 'turmas', 'classes', 'Classes', 'TURMAS', 'CLASSES', 'teachers', 'students', 'disciplines'];

    let foundTurmas = false;

    for (const table of tables) {
        const exists = await testTable(table);
        if (exists && (table.toLowerCase().includes('turma') || table.toLowerCase().includes('class'))) {
            foundTurmas = true;
        }
    }

    console.log(`\n===================================================`);
    if (foundTurmas) {
        console.log(`🎉 GOOD NEWS: We found access to a Turmas/Classes table!`);
    } else {
        console.log(`⚠️ CONCLUSION: We could NOT access any 'Turmas' or 'Classes' table.`);
        console.log(`   Check if the table name is different (e.g., 'class_list', 'v_turmas').`);
        console.log(`   Check if Row Level Security (RLS) is blocking access.`);
    }
}

run();
