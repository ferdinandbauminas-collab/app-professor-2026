# 🔍 DIAGNÓSTICO: Por que o Vercel não carrega dados?

## ❓ Perguntas Importantes

Por favor, responda estas perguntas para eu identificar o problema:

### 1. Você configurou as variáveis de ambiente no Vercel?

Após fazer o deploy, você PRECISA configurar manualmente no painel do Vercel:

- Acesse: https://vercel.com
- Vá em **Settings** → **Environment Variables**
- Adicione:
  - `VITE_SUPABASE_URL` = `https://yglwswpgrqfldvpbqxcl.supabase.co`
  - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (a chave completa)
- Clique em **Redeploy**

**Você fez isso?** ⬜ SIM / ⬜ NÃO

---

### 2. Você restaurou os dados no Supabase?

O Supabase precisa ter dados nas tabelas `teachers`, `disciplines` e `students`.

**Como verificar:**
1. Abra o arquivo `restaurar_dados.html` no navegador
2. Veja se aparece "✅ Conectado ao Cofre"
3. Se sim, clique em "INICIAR RESTAURAÇÃO"

**Você já restaurou os dados?** ⬜ SIM / ⬜ NÃO

---

### 3. O que você vê quando acessa o app no Vercel?

Acesse: https://ceti-auristela-soares-professor-app.vercel.app

O que aparece?

⬜ Tela completamente branca
⬜ Tela de login vazia (sem professores)
⬜ Mensagem de erro
⬜ Fica carregando infinitamente
⬜ Outro: _______________

---

### 4. Você fez o deploy das alterações?

Após eu ter corrigido os arquivos, você executou:

```bash
git add .
git commit -m "Fix: Corrigir conexão Supabase"
git push
```

**Você fez o deploy?** ⬜ SIM / ⬜ NÃO

---

## 🛠️ PRÓXIMOS PASSOS (baseado nas respostas)

### Se você NÃO configurou as variáveis no Vercel:
1. Acesse https://vercel.com
2. Vá no projeto → Settings → Environment Variables
3. Adicione as 2 variáveis (URL e KEY)
4. Clique em **Redeploy**

### Se você NÃO restaurou os dados:
1. Abra `restaurar_dados.html` no navegador
2. Clique em "INICIAR RESTAURAÇÃO"
3. Aguarde a mensagem de sucesso

### Se você NÃO fez o deploy:
1. Execute `fazer_upload.bat`
2. Aguarde 1-2 minutos
3. Teste novamente

---

## 🧪 TESTE RÁPIDO

Abra o Console do navegador (F12) quando acessar o app e me diga o que aparece:

- ✅ "Supabase configurado com sucesso" → Variáveis OK
- ❌ "Faltam variáveis de ambiente" → Você não configurou no Vercel
- ❌ Erro 401/403 → Problema de autenticação
- ❌ "Failed to fetch" → Problema de rede/CORS

**Me envie um print do console!**
