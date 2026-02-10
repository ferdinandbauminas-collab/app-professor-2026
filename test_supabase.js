
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ouoddjrjgkkwjvewgufr.supabase.co';
const supabaseAnonKey = 'sb_publishable_ahvjsDI5ePef4bOIzshedg_3aYi7jX5';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
    console.log('Testando conexão com Supabase...');

    const testRecord = {
        teacher_name: 'TEST_BOT',
        discipline: 'DEBUG',
        class_name: 'TEST_CLASS',
        student_name: 'TEST_STUDENT',
        status: 'present',
        date: new Date().toISOString().split('T')[0]
    };

    console.log('\nTentando inserir na tabela "attendance_logs"...');
    const { data: dataLogs, error: errorLogs } = await supabase
        .from('attendance_logs')
        .insert([testRecord]);

    if (errorLogs) {
        console.error('Erro em "attendance_logs":', errorLogs.message);
    } else {
        console.log('Sucesso em "attendance_logs"!');
    }

    console.log('\nTentando inserir na tabela "attendance"...');
    const { data: dataAtt, error: errorAtt } = await supabase
        .from('attendance')
        .insert([testRecord]);

    if (errorAtt) {
        console.error('Erro em "attendance":', errorAtt.message);
    } else {
        console.log('Sucesso em "attendance"!');
    }
}

testConnection();
