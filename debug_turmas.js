
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Configurar dotenv para ler o arquivo .env local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ ERRO: Variáveis de ambiente faltando.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testTable(tableName) {
    console.log(`\n🔍 Testando tabela: '${tableName}'...`);
    const { data, error } = await supabase.from(tableName).select('*').limit(5);

    if (error) {
        console.error(`❌ Erro ao acessar '${tableName}':`, error.message);
        return false;
    } else {
        console.log(`✅ Sucesso! Encontrados ${data.length} registros em '${tableName}'.`);
        if (data.length > 0) {
            console.log("   Exemplo:", JSON.stringify(data[0]));
        } else {
            console.log("   Aviso: Tabela existe mas está vazia.");
        }
        return true;
    }
}

async function run() {
    console.log("Iniciando diagnóstico de Turmas...");

    const tryTurmas = await testTable('Turmas');
    const tryTurmasLower = await testTable('turmas');
    const tryClasses = await testTable('classes');

    if (!tryTurmas && !tryTurmasLower && !tryClasses) {
        console.log("\n❌ Nenhuma tabela de turmas encontrada com nomes padrao.");
    }
}

run();
