# 🚀 INSTRUÇÕES PARA DEPLOY NO VERCEL

## ✅ Correções Aplicadas

Foram feitas as seguintes correções no código:

1. ✅ **lib/supabase.ts** - Agora usa variáveis de ambiente em vez de credenciais hardcoded
2. ✅ **.env** - Atualizado com as credenciais corretas do Supabase
3. ✅ **vite-env.d.ts** - Criado para corrigir erros de TypeScript

---

## 📋 PASSO 1: Fazer Deploy

Execute o arquivo `fazer_upload.bat` ou rode os comandos manualmente:

```bash
cd "C:\Users\ferdi\APLICATIVO FALTAS\ceti-auristela-soares---professor-app"
git add .
git commit -m "Fix: Corrigir conexão Supabase usando variáveis de ambiente"
git push
```

O Vercel detectará automaticamente e fará o deploy em 1-2 minutos.

---

## ⚙️ PASSO 2: Configurar Variáveis de Ambiente no Vercel

**IMPORTANTE**: Após o deploy, você PRECISA configurar as variáveis de ambiente no painel do Vercel:

1. Acesse: https://vercel.com
2. Vá para o projeto: **ceti-auristela-soares-professor-app**
3. Clique em **Settings** → **Environment Variables**
4. Adicione as seguintes variáveis:

   **Nome**: `VITE_SUPABASE_URL`
   **Valor**: `https://yglwswpgrqfldvpbqxcl.supabase.co`

   **Nome**: `VITE_SUPABASE_ANON_KEY`
   **Valor**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnbHdzd3BncnFmbGR2cGJxeGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2Mjg0MDQsImV4cCI6MjAzMTIwNDQwNH0.5N_u6Y-0iG2s1s024s2yNCe-iZ0rnF3xKq6H3kTl3rU`

5. Clique em **Save**
6. **IMPORTANTE**: Após salvar, clique em **Redeploy** para aplicar as variáveis

---

## 🧪 PASSO 3: Testar

Após o redeploy, acesse:
https://ceti-auristela-soares-professor-app.vercel.app

Verifique:
- ✅ A tela de login carrega com a lista de professores
- ✅ Ao fazer login, as disciplinas aparecem
- ✅ Ao selecionar disciplina e turma, os alunos são carregados
- ✅ Ao fazer uma chamada e sincronizar, os dados são salvos no Supabase

---

## 🔍 Debug (se necessário)

Se ainda não funcionar, abra o Console do navegador (F12) e verifique:

1. Se aparecer "✅ Supabase configurado com sucesso" → Variáveis OK
2. Se aparecer "Faltam variáveis de ambiente" → Você esqueceu de configurar no Vercel
3. Se aparecer erros de autenticação → A chave pode estar incorreta

---

## 📞 Suporte

Se precisar de ajuda, me avise qual erro aparece no console do navegador!
