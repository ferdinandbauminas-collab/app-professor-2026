import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yglwswpgrqfldvpbqxcl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnbHdzd3BncnFmbGR2cGJxeGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2Mjg0MDQsImV4cCI6MjAzMTIwNDQwNH0.5N_u6Y-0iG2s1s024s2yNCe-iZ0rnF3xKq6H3kTl3rU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verificar() {
    console.log('🔍 Verificando situação atual no Supabase...\n');

    try {
        const { count: countProf } = await supabase.from('teachers').select('*', { count: 'exact', head: true });
        const { count: countDisc } = await supabase.from('disciplines').select('*', { count: 'exact', head: true });
        const { count: countAlunos } = await supabase.from('students').select('*', { count: 'exact', head: true });

        console.log('📊 STATUS NO BANCO DE DADOS:');
        console.log(`- Professores: ${countProf || 0}`);
        console.log(`- Disciplinas: ${countDisc || 0}`);
        console.log(`- Alunos:      ${countAlunos || 0}`);

        if (countProf > 0 && countAlunos > 100) {
            console.log('\n✅ OS DADOS PARECEM ESTAR LÁ! Pode testar o app.');
        } else {
            console.log('\n⚠️  ALGO ESTÁ FALTANDO. Precisamos reenviar alguns dados.');
        }

    } catch (error) {
        console.error('❌ Erro na verificação:', error.message);
    }
}

verificar();
