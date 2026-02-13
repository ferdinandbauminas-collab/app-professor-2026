const https = require('https');

console.log('🔍 Executando diagnósticos de rede...');

const url = 'yglwswpgrqfldvpbqxcl.supabase.co';

console.log(`\n1. Testando conexão HTTPS bruta com ${url}...`);

const options = {
    hostname: url,
    port: 443,
    path: '/rest/v1/',
    method: 'GET',
    headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnbHdzd3BncnFmbGR2cGJxeGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2Mjg0MDQsImV4cCI6MjAzMTIwNDQwNH0.5N_u6Y-0iG2s1s024s2yNCe-iZ0rnF3xKq6H3kTl3rU'
    }
};

const req = https.request(options, (res) => {
    console.log(`✅ Sucesso! Código de status: ${res.statusCode}`);
    process.exit(0);
});

req.on('error', (e) => {
    console.error(`❌ Falha na conexão HTTPS: ${e.message}`);

    if (e.code === 'ENOTFOUND') {
        console.log('💡 Erro de DNS: O computador não conseguiu encontrar o endereço do Supabase.');
    } else if (e.code === 'ECONNREFUSED') {
        console.log('💡 Conexão recusada: Provavelmente bloqueada por Firewall ou Proxy.');
    }

    console.log('\n2. Tente rodar este comando no terminal para testar o DNS:');
    console.log(`   nslookup ${url}`);
});

req.end();
