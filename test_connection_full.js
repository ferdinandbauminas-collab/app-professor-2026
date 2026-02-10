const { createClient } = require('@supabase/supabase-js');

// Credenciais corretas
const supabaseUrl = 'https://yglwswpgrqfldvpbqxcl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnbHdzd3BncnFmbGR2cGJxeGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2Mjg0MDQsImV4cCI6MjAzMTIwNDQwNH0.5N_u6Y-0iG2s1s024s2yNCe-iZ0rnF3xKq6H3kTl3rU';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSupabaseConnection() {
    console.log('🔍 Testando conexão com Supabase...\n');
    console.log('URL:', supabaseUrl);
    console.log('Chave (primeiros 20 chars):', supabaseAnonKey.substring(0, 20) + '...\n');

    // Teste 1: Buscar professores
    console.log('📚 Teste 1: Buscando professores...');
    const { data: teachers, error: teachersError } = await supabase
        .from('teachers')
        .select('*');

    if (teachersError) {
        console.error('❌ Erro ao buscar professores:', teachersError.message);
    } else {
        console.log(`✅ Professores encontrados: ${teachers?.length || 0}`);
        if (teachers && teachers.length > 0) {
            console.log('   Exemplo:', teachers[0].name);
        }
    }

    // Teste 2: Buscar disciplinas
    console.log('\n📖 Teste 2: Buscando disciplinas...');
    const { data: disciplines, error: disciplinesError } = await supabase
        .from('disciplines')
        .select('*');

    if (disciplinesError) {
        console.error('❌ Erro ao buscar disciplinas:', disciplinesError.message);
    } else {
        console.log(`✅ Disciplinas encontradas: ${disciplines?.length || 0}`);
    }

    // Teste 3: Buscar alunos
    console.log('\n👥 Teste 3: Buscando alunos...');
    const { data: students, error: studentsError } = await supabase
        .from('students')
        .select('*');

    if (studentsError) {
        console.error('❌ Erro ao buscar alunos:', studentsError.message);
    } else {
        console.log(`✅ Alunos encontrados: ${students?.length || 0}`);
        if (students && students.length > 0) {
            console.log('   Exemplo:', students[0].name);
        }
    }

    // Resumo
    console.log('\n' + '='.repeat(50));
    console.log('📊 RESUMO:');
    console.log('='.repeat(50));

    if (!teachersError && !disciplinesError && !studentsError) {
        console.log('✅ Conexão com Supabase: OK');
        console.log(`✅ Total de registros: ${(teachers?.length || 0) + (disciplines?.length || 0) + (students?.length || 0)}`);
    } else {
        console.log('❌ Há problemas na conexão ou nas tabelas');
        console.log('\nVerifique:');
        console.log('1. Se as tabelas existem no Supabase');
        console.log('2. Se as políticas RLS permitem leitura pública');
        console.log('3. Se a chave anon está correta');
    }
}

testSupabaseConnection();
