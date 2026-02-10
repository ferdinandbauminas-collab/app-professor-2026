
const { createClient } = require('@supabase/supabase-js');

async function test(name, url, key) {
    console.log(`\n--- Testando: ${name} ---`);
    console.log(`URL: ${url}`);
    try {
        const supabase = createClient(url, key);
        const { data, error, count } = await supabase
            .from('teachers')
            .select('*', { count: 'exact' });

        if (error) {
            console.log(`❌ Erro: ${error.message}`);
        } else {
            console.log(`✅ Sucesso! Encontrados ${data.length} professores.`);
            if (data.length > 0) {
                console.log(`Amostra: ${data[0].name}`);
            }
        }
    } catch (e) {
        console.log(`💥 Falha crítica: ${e.message}`);
    }
}

async function run() {
    // Dados do .env
    const envUrl = "https://ouoddjrjgkkwjvewgufr.supabase.co";
    const envKey = "sb_publishable_ahvjsDI5ePef4bOIzshedg_3aYi7jX5";

    // Dados do .env.local
    const locUrl = "https://yglwswpgrqfldvpbqxcl.supabase.co";
    const locKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnbHdzd3BncnFmbGR2cGJxeGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2Mjg0MDQsImV4cCI6MjAzMTIwNDQwNH0.5N_u6Y-0iG2s1s024s2yNCe-iZ0rnF3xKq6H3kTl3rU";

    await test(".env (Original)", envUrl, envKey);
    await test(".env.local (Atual)", locUrl, locKey);
}

run();
