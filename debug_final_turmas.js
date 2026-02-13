
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Ler arquivo .env manualmente para evitar dependencia de 'dotenv'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '.env');

let supabaseUrl = '';
let supabaseKey = '';

try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            if (key.trim() === 'VITE_SUPABASE_URL') supabaseUrl = value.trim();
            if (key.trim() === 'VITE_SUPABASE_ANON_KEY') supabaseKey = value.trim();
        }
    });
} catch (e) {
    console.error("Erro ao ler .env:", e.message);
}

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ ERRO: Variáveis de ambiente faltando no arquivo .env");
    console.error("Verifique se o arquivo .env existe na mesma pasta.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTurmas() {
    console.log("=========================================");
    console.log("   DIAGNÓSTICO FINAL: TABELA TURMAS");
    console.log("=========================================");

    console.log(`📡 Conectando em: ${supabaseUrl}`);

    // Teste 1: Tabela exata "Turmas"
    console.log("\n1. Testando tabela 'Turmas' (com maiúscula)...");
    const { data, error } = await supabase.from('Turmas').select('*');

    if (error) {
        console.log(`❌ ERRO: ${error.message} (Código: ${error.code})`);
        if (error.code === '42P01') console.log("   -> A tabela não existe com esse nome.");
        if (error.code === '42501') console.log("   -> PERMISSÃO NEGADA (RLS). Execute o script de permissões.");
    } else {
        console.log(`✅ SUCESSO! Encontrados ${data.length} registros.`);
        if (data.length === 0) console.log("   -> A tabela existe mas está VAZIA.");
        else console.log("   -> Exemplos:", data.slice(0, 2));
    }

    // Teste 2: Tabela minuscula "turmas"
    console.log("\n2. Testando tabela 'turmas' (minúscula)...");
    const { data: data2, error: error2 } = await supabase.from('turmas').select('*');

    if (error2) {
        // Ignorar erro se o primeiro deu certo
    } else {
        console.log(`✅ SUCESSO (minúscula)! Encontrados ${data2.length} registros.`);
    }

    console.log("\n=========================================");
    console.log("CONCLUSÃO:");
    if (data && data.length > 0) console.log("tudo certo! O app deve funcionar.");
    else if (data && data.length === 0) console.log("A tabela está vazia. Rode o script de inserir dados novamente.");
    else console.log("Tente rodar o script 'corrigir_permissoes_turmas.sql' no Supabase.");
}

checkTurmas();
