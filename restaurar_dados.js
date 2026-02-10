import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ouoddjrjgkkwjvewgufr.supabase.co';
const supabaseKey = 'sb_publishable_ahvjsDI5ePef4bOIzshedg_3aYi7jX5';

const supabase = createClient(supabaseUrl, supabaseKey);

const professores = [
    { id: 'assuncao', name: 'Assunção', avatar: 'https://ui-avatars.com/api/?name=Assuncao&background=random' },
    { id: 'carmem', name: 'Carmem', avatar: 'https://ui-avatars.com/api/?name=Carmem&background=random' },
    { id: 'daniel', name: 'Daniel', avatar: 'https://ui-avatars.com/api/?name=Daniel&background=random' },
    { id: 'denilson', name: 'Denilson', avatar: 'https://ui-avatars.com/api/?name=Denilson&background=random' },
    { id: 'ednardo', name: 'Ednardo', avatar: 'https://ui-avatars.com/api/?name=Ednardo&background=random' },
    { id: 'eunice', name: 'Eunice', avatar: 'https://ui-avatars.com/api/?name=Eunice&background=random' },
    { id: 'francineuda', name: 'Francineuda', avatar: 'https://ui-avatars.com/api/?name=Francineuda&background=random' },
    { id: 'francisca', name: 'Francisca', avatar: 'https://ui-avatars.com/api/?name=Francisca&background=random' },
    { id: 'helane', name: 'Helane', avatar: 'https://ui-avatars.com/api/?name=Helane&background=random' },
    { id: 'jandira', name: 'Jandira', avatar: 'https://ui-avatars.com/api/?name=Jandira&background=random' },
    { id: 'joanilson', name: 'Joanilson', avatar: 'https://ui-avatars.com/api/?name=Joanilson&background=random' },
    { id: 'jorge', name: 'Jorge', avatar: 'https://ui-avatars.com/api/?name=Jorge&background=random' },
    { id: 'lindelvania', name: 'Lindelvania', avatar: 'https://ui-avatars.com/api/?name=Lindelvania&background=random' },
    { id: 'luciano', name: 'Luciano', avatar: 'https://ui-avatars.com/api/?name=Luciano&background=random' },
    { id: 'marcos', name: 'Marcos', avatar: 'https://ui-avatars.com/api/?name=Marcos&background=random' },
    { id: 'mizael', name: 'Mizael', avatar: 'https://ui-avatars.com/api/?name=Mizael&background=random' },
    { id: 'paulo', name: 'Paulo', avatar: 'https://ui-avatars.com/api/?name=Paulo&background=random' },
    { id: 'wesley', name: 'Wesley', avatar: 'https://ui-avatars.com/api/?name=Wesley&background=random' },
    { id: 'wilsilene', name: 'Wilsilene (Leninha)', avatar: 'https://ui-avatars.com/api/?name=Wilsilene&background=random' },
    { id: 'wilson', name: 'Wilson', avatar: 'https://ui-avatars.com/api/?name=Wilson&background=random' }
];

const disciplinas = [
    { discipline_id: 'assuncao-geo', discipline_name: 'Geografia', teacher_id: 'assuncao', classes: ['MÓDULO II-A', 'MÓDULO II-B', 'MÓDULO IV-A', 'MÓDULO IV-B', 'MÓDULO IV-C', 'MÓDULO IV-D', 'VII ETAPA'] },
    { discipline_id: 'wesley-mat', discipline_name: 'Matemática', teacher_id: 'wesley', classes: ['MÓDULO II-A', 'MÓDULO II-B', 'MÓDULO IV-A', 'MÓDULO IV-B', 'MÓDULO IV-C', 'MÓDULO IV-D', 'VII ETAPA'] },
    { discipline_id: 'mizael-ed', discipline_name: 'Estrutura de Dados', teacher_id: 'mizael', classes: ['MÓDULO II-A', 'MÓDULO II-B'] },
    { discipline_id: 'mizael-bd', discipline_name: 'Banco de Dados', teacher_id: 'mizael', classes: ['MÓDULO IV-A', 'MÓDULO IV-B', 'MÓDULO IV-C', 'MÓDULO IV-D'] },
    { discipline_id: 'francineuda-port', discipline_name: 'Língua Portuguesa', teacher_id: 'francineuda', classes: ['MÓDULO II-A', 'MÓDULO II-B', 'MÓDULO IV-A', 'MÓDULO IV-B', 'MÓDULO IV-C', 'MÓDULO IV-D'] },
    { discipline_id: 'eunice-port', discipline_name: 'Língua Portuguesa', teacher_id: 'eunice', classes: ['VII ETAPA'] }
];

const alunosModulo2A = [
    'AMADEU DAVID CORTEZ NUNES', 'ANA CAROLINA RODRIGUES DE SOUZA', 'BRENDA KALYNE FERREIRA DE OLIVEIRA',
    'FELIPE DE OLIVEIRA ARAUJO', 'FLÁVIO WILLIAM SILVA SOUSA', 'GUILHERME RODRIGUES DA SILVA GONCALVES'
];

const alunos = alunosModulo2A.map((nome, idx) => ({
    id: `mod2a-${idx + 1}`,
    name: nome,
    class: 'MÓDULO II-A',
    active: true
}));

async function restaurar() {
    console.log('🚀 Iniciando restauração...\n');

    try {
        // 1. Limpar dados antigos
        console.log('🗑️  Limpando dados antigos...');
        await supabase.from('disciplines').delete().neq('discipline_id', '___impossivel___');
        await supabase.from('students').delete().neq('id', '___impossivel___');
        await supabase.from('teachers').delete().neq('id', '___impossivel___');
        console.log('✅ Dados antigos removidos\n');

        // 2. Inserir professores
        console.log('👨‍🏫 Inserindo professores...');
        const { error: errProf } = await supabase.from('teachers').upsert(professores);
        if (errProf) throw errProf;
        console.log(`✅ ${professores.length} professores inseridos\n`);

        // 3. Inserir disciplinas
        console.log('📚 Inserindo disciplinas...');
        const { error: errDisc } = await supabase.from('disciplines').upsert(disciplinas);
        if (errDisc) throw errDisc;
        console.log(`✅ ${disciplinas.length} disciplinas inseridas\n`);

        // 4. Inserir alunos
        console.log('👥 Inserindo alunos...');
        const { error: errAlunos } = await supabase.from('students').upsert(alunos);
        if (errAlunos) throw errAlunos;
        console.log(`✅ ${alunos.length} alunos inseridos\n`);

        console.log('🎉 RESTAURAÇÃO CONCLUÍDA COM SUCESSO!');
        console.log('\n📊 Resumo:');
        console.log(`   - ${professores.length} professores`);
        console.log(`   - ${disciplinas.length} disciplinas`);
        console.log(`   - ${alunos.length} alunos`);
        console.log('\n✅ Agora pode testar o aplicativo!');

    } catch (error) {
        console.error('❌ Erro:', error.message);
        console.error('Detalhes:', error);
    }
}

restaurar();
