import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ouoddjrjgkkwjvewgufr.supabase.co';
const supabaseKey = 'sb_publishable_ahvjsDI5ePef4bOIzshedg_3aYi7jX5';

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log('--- VALIDANDO BANCO DE DADOS ---');

    const { data: teachers, error: tErr } = await supabase.from('teachers').select('id, name');
    console.log(`Professores: ${teachers ? teachers.length : 0} encontrados.`);
    if (tErr) console.error('Erro Teachers:', tErr.message);

    const { data: students, error: sErr } = await supabase.from('students').select('id', { count: 'exact', head: true });
    console.log(`Alunos: ${students ? students.length : 0} encontrados.`);
    if (sErr) console.error('Erro Students:', sErr.message);

    const { data: disciplines, error: dErr } = await supabase.from('disciplines').select('discipline_id');
    console.log(`Disciplinas: ${disciplines ? disciplines.length : 0} encontradas.`);
    if (dErr) console.error('Erro Disciplines:', dErr.message);

    console.log('--------------------------------');
}

check();
