import { createClient } from '@supabase/supabase-js';

// --- CONFIGURAÇÃO (COPIADO DO .ENV) ---
const supabaseUrl = 'https://yglwswpgrqfldvpbqxcl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnbHdzd3BncnFmbGR2cGJxeGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2Mjg0MDQsImV4cCI6MjAzMTIwNDQwNH0.5N_u6Y-0iG2s1s024s2yNCe-iZ0rnF3xKq6H3kTl3rU';

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

const STUDENTS_BY_CLASS = {
    'MÓDULO II-A': ['AMADEU DAVID CORTEZ NUNES', 'ANA CAROLINA RODRIGUES DE SOUZA', 'BRENDA KALYNE FERREIRA DE OLIVEIRA', 'FELIPE DE OLIVEIRA ARAUJO', 'FLÁVIO WILLIAM SILVA SOUSA', 'GUILHERME RODRIGUES DA SILVA GONCALVES', 'HENRY LUIS GOMES QUEIROZ SANTANA', 'ISAMARA JOVITA ARAUJO TORRES', 'JACKSON DA COSTA SANTOS', 'JANA CLEA FERREIRA DE CARVALHO', 'JOSE GONCALVES DE ARAUJO', 'LARISSA ANTONELA DA SILVA PACIFICO', 'LUIS CARLOS CRUZ SILVA', 'MARCOS SILVA DE OLIVEIRA', 'MARIA ANTONIA VIEIRA DA SILVA', 'MARIA ELIANE DE SOUSA', 'MARIA VITÓRIA FREITAS GALVÃO', 'SABRINA LIMA OLIVEIRA', 'SAYANE VITORIA DOS SANTOS SOUSA LIMA', 'SUZANA RAQUEL SANTOS SILVA', 'THIAGO DANIEL DA SILVA PINTO'],
    'MÓDULO II-B': ['ADRIANA CONCEIÇÃO PEREIRA DE ALMEIDA', 'ALINE GONCALVES DE MELO', 'DADIANE MARIA DA SILVA', 'ERLANE NASCIMENTO DE SOUSA', 'FRANCIMAURA DE SOUSA VELÔSO', 'FRANCISCA MARIA DOS SANTOS BRAGA', 'GUILHERME DOS SANTOS BRITO', 'IASMIN ROCHA DOS SANTOS', 'ISADORA AGUIAR DOS SANTOS', 'JAQUELINE', 'JOSÉ BALDOMIRO BEZERRA DE SOUSA', 'LINDALVA PEREIRA DOS SANTOS', 'LUCAS SAMUEL DE SOUSA SILVA', 'MARIA DA GLORIA FERREIRA DÓRIA', 'MARIA RAMOS DO NASCIMENTO', 'MARLENE DE OLIVEIRA MORAES', 'PEDRO HENRIQUE ALVES DA SILVA', 'RAILTON GABRIEL PEREIRA DOS SANTOS', 'TAMIRES SOUSA DOS SANTOS', 'VANESSA ADRIELE SOARES DA SILVA'],
    'MÓDULO IV-A': ['BELINA OLIVAL LIMA FAUSTINO', 'CIBELE BRITO DO NASCIMENTO ANDRADE', 'DANIELE VITORIA CARNEIRO GOMES', 'FABIÚLA MEDEIROS ASSUNÇÃO', 'GIOVANNA DE MOURA FREITAS SILVA LIMA', 'IAGO ASSUNÇÃO SIMIÃO DA SILVA', 'ISRAEL DE OLIVEIRA SANTOS', 'JOSÉ HOLANDA MENDES', 'KAIRO WESLEY ALVES FRASAO', 'LUCAS VINICIO PINTO FONTINELE', 'LUCIA JULIANA DE ARAÚJO', 'PAULA LAIZE DOS SANTOS OLIVEIRA', 'PRISCILA AROUCHA DOS SANTOS', 'RAYCILLA ANNYELLE SOUSA DE ARAUJO'],
    'MÓDULO IV-B': ['CLÉIA SILVA DE SÁ', 'DANUSA CLEMENTE DE SOUSA', 'DAVID KAUAN DA SILVA COSTA', 'FRANCILDO LEMOS PEREIRA DOS ANJOS', 'FRANCILENE DIAS SANTOS', 'FRANCISCO TIAGO DE SOUZA SILVA', 'ILANNA MARA NASCIMENTO', 'ISANILDE PEREIRA DE SOUSA', 'JOAO BATISTA DUARDO DE CARVALHO', 'KÁSSIA CLEMENTE DE SOUSA', 'MATHEUS RODRIGUES DOS SANTOS SILVA', 'RAFAEL NETO DE MELO', 'RITA PEREIRA DA SILVA', 'VANESSA LAYNE DOS SANTOS CARVALHO', 'YASMIN VITORIA RODRIGUES DA SILVA'],
    'MÓDULO IV-C': ['FRANCISCA JEOVANA MORAES FIALHO', 'FRANCISCO EDER SIQUEIRA DOS SANTOS', 'ISAIAS DOS REIS DE SOUZA', 'LEONNA KAMILY LARISSA BATISTA DE SOUSA', 'MARIA DA CRUZ MESQUITA CUNHA', 'PALOMA CRISTINA FRANÇA OLIVEIRA', 'RAMON DE OLIVEIRA MORAES', 'RAQUEL DA SILVA CARVALHO', 'ROSIVALDO DOS SANTOS SILVA', 'THAMARA KELY DA SILVA', 'WALLAS MARQUES DA SILVA RIBEIRO', 'YURE MATHEUS SOARES DE OLIVEIRA'],
    'MÓDULO IV-D': ['ANTONIO TALISSON DE SOUSA OLIVEIRA', 'CLIVALLYN RYAN RODRIGUES MELO DE SOUSA SILVA', 'IZA DA SILVA LEAL LIMA', 'JAIRO BELFORT SILVA', 'JENNYFER LORRANY DA CUNHA RODRIGUES', 'KLIS MARLEY VIANA ARAUJO', 'LETICIA RODRIGUES SILVA', 'LUCAS KALEB LOPES BATALHA', 'LUCAS MATEUS RODRIGUES SILVA', 'MARIA DA CRUZ DE ANDRADE OLIVEIRA', 'MARIA VITORIA DA SILVA CONSTACIO', 'MARIA VITORIA SOARES PESSOA VIEIRA', 'MAURICIO VIANA GOMES', 'MELISSA GABRIELA LIMA DE ARAUJO', 'RAIMUNDO NONATO DOS SANTOS'],
    'VII ETAPA': ['ALISSON CLEBERT PINTO PEREIRA', 'ANA TERESA DA SILVA SOUSA', 'ANNA GABRYELLA TORRES COSTA', 'ANTONIEL SANTOS DE OLIVEIRA', 'BRUNO GUIDO DA SILVA LEAL', 'CAMILIA MARIA DE SOUSA COSTA ALVES', 'CARLOS HENRIQUE SANTOS FARIAS', 'CHRISTYAN KAUAN SANTOS DA SILVA', 'CLARA KELLY SILVA BEZERRA LOPES', 'DANIELA VIEIRA DA SILVA', 'ESDRAS SHINAYDER LEITE SILVA', 'ESHILEY VITORIA DE AGUIAR BORGES', 'FRANCIELLY DE SOUSA SILVA', 'GEORGE LUIZ MOURA DOS SANTOS', 'HELLEN LETICIA LIMA E SILVA', 'ISLAINE VITÓRIA VIANA', 'JUAN KELLME CORTEZ SILVA', 'LUCIANA DE SANTANA LIMA', 'MARIA DO SOCORRO NEVES DA SILVA', 'MARLY DE OLIVEIRA MORAES', 'MATEUS DA SILVA ARAUJO', 'MATEUS GOMES DOURADO', 'NAYSLA BEATRIZ DE SOUSA FERREIRA', 'PABLO HENRIQUE PORTELA RODRIGUES DA SILVA', 'SUYANE MARIA SILVA SANTOS OLIVEIRA', 'THALLYSON DAVI DA SILVA LIMA', 'VICTOR WAGNER SOUSA BARBOSA', 'VITORIA MAURIELI DOS SANTOS DA SILVA', 'YANA CAROLINE VIEIRA DE SOUSA']
};

async function restaurar() {
    console.log('🚀 Iniciando restauração no Supabase correto...\n');

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
        console.log('👥 Inserindo alunos por turma...');
        let totalAlunos = 0;
        for (const [className, studentNames] of Object.entries(STUDENTS_BY_CLASS)) {
            const studentsData = studentNames.map((name, idx) => ({
                id: `${className.replace(/\s+/g, '-').toLowerCase()}-${idx + 1}`,
                name: name,
                class: className,
                active: true
            }));
            const { error: errAlunos } = await supabase.from('students').upsert(studentsData);
            if (errAlunos) throw errAlunos;
            totalAlunos += studentsData.length;
            console.log(`✅ ${studentsData.length} alunos inseridos em ${className}`);
        }

        console.log('\n🎉 RESTAURAÇÃO CONCLUÍDA COM SUCESSO!');
        console.log('\n📊 Resumo:');
        console.log(`   - ${professores.length} professores`);
        console.log(`   - ${disciplinas.length} disciplinas`);
        console.log(`   - ${totalAlunos} alunos`);
        console.log('\n✅ Agora os dados estão corretos no Supabase!');

    } catch (error) {
        console.error('❌ Erro:', error.message);
    }
}

restaurar();
