# 🧪 TESTE LOCAL PRIMEIRO - Guia Completo

Vamos testar TUDO localmente antes de fazer deploy!

---

## 📋 PASSO 1: Restaurar Dados no Supabase

### 1.1. Abra o Restaurador

1. Vá para a pasta: `C:\Users\ferdi\APLICATIVO FALTAS`
2. Abra o arquivo [`restaurar_dados.html`](file:///C:/Users/ferdi/APLICATIVO%20FALTAS/restaurar_dados.html) no navegador
   - Clique com botão direito → Abrir com → Chrome

### 1.2. Verifique a Conexão

Você deve ver:
- ✅ "Conectado ao Cofre (Supabase). X Professores atuais."

### 1.3. Execute a Restauração

1. Clique em **"INICIAR RESTAURAÇÃO"**
2. Aguarde as mensagens verdes aparecerem
3. Ao final: "🏁 RESTAURAÇÃO CONCLUÍDA!"

✅ **Checkpoint 1**: Dados restaurados no Supabase

---

## 🖥️ PASSO 2: Testar Localmente

### 2.1. Abra o Terminal

1. Pressione `Win + R`
2. Digite `cmd` e pressione Enter
3. Navegue até a pasta do projeto:

```bash
cd "C:\Users\ferdi\APLICATIVO FALTAS\ceti-auristela-soares---professor-app"
```

### 2.2. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

Você verá algo como:
```
VITE v6.2.0  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 2.3. Abra no Navegador

1. Abra o Chrome
2. Acesse: **http://localhost:5173/**
3. Pressione **F12** para abrir o Console

### 2.4. Verifique o Console

Você DEVE ver:
- ✅ "✅ Supabase configurado com sucesso"
- ✅ "URL: https://yglwswpgrqfldvpbqxcl.supabase.co"

Se aparecer erro:
- ❌ "Faltam variáveis de ambiente" → Verifique o arquivo `.env`

✅ **Checkpoint 2**: App rodando localmente sem erros

---

## 🧪 PASSO 3: Testar Funcionalidades

### 3.1. Tela de Login

**O que deve aparecer:**
- ✅ Lista de professores (Assunção, Carmem, Daniel, etc.)
- ✅ Avatares coloridos
- ✅ Sem mensagens de erro

**Teste:**
1. Clique em um professor (ex: **Assunção**)
2. Deve ir para o Dashboard

### 3.2. Dashboard

**O que deve aparecer:**
- ✅ Nome do professor no topo
- ✅ Botão "Selecionar Disciplina"
- ✅ Botão "Selecionar Turma"

**Teste:**
1. Clique em **"Selecionar Disciplina"**
2. Deve abrir modal com disciplinas (ex: Geografia)
3. Selecione uma disciplina
4. Clique em **"Selecionar Turma"**
5. Deve abrir modal com turmas (ex: MÓDULO II-A)
6. Selecione uma turma
7. Clique em **"Iniciar Chamada"**

### 3.3. Tela de Chamada

**O que deve aparecer:**
- ✅ Nome do primeiro aluno
- ✅ Botões "Presente" e "Faltou"
- ✅ Contador (ex: "1/21")

**Teste:**
1. Clique em **"Presente"** ou **"Faltou"**
2. Deve passar para o próximo aluno automaticamente
3. Continue até o último aluno
4. Deve aparecer tela de sucesso

### 3.4. Tela de Sucesso

**O que deve aparecer:**
- ✅ Resumo da chamada
- ✅ Quantidade de presentes/faltas
- ✅ Botão "Sincronizar"

**Teste:**
1. Clique em **"Sincronizar"**
2. Deve aparecer mensagem de sucesso
3. Verifique no Supabase se os dados foram salvos

✅ **Checkpoint 3**: Todas as funcionalidades funcionando!

---

## ✅ PASSO 4: Se Tudo Funcionou Localmente

**AGORA SIM** podemos fazer deploy!

### 4.1. Faça o Deploy

Execute o arquivo [`fazer_upload.bat`](file:///C:/Users/ferdi/APLICATIVO%20FALTAS/ceti-auristela-soares---professor-app/fazer_upload.bat)

**OU** no terminal:

```bash
git add .
git commit -m "App testado e funcionando localmente"
git push
```

### 4.2. Configure Variáveis no Vercel

1. Acesse: https://vercel.com
2. Vá no projeto → **Settings** → **Environment Variables**
3. Adicione:
   - `VITE_SUPABASE_URL` = `https://yglwswpgrqfldvpbqxcl.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnbHdzd3BncnFmbGR2cGJxeGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2Mjg0MDQsImV4cCI6MjAzMTIwNDQwNH0.5N_u6Y-0iG2s1s024s2yNCe-iZ0rnF3xKq6H3kTl3rU`
4. Clique em **Redeploy**

### 4.3. Teste em Produção

Acesse: https://ceti-auristela-soares-professor-app.vercel.app

Deve funcionar **exatamente** como funcionou localmente!

---

## 🆘 Se Algo Não Funcionar Localmente

**PARE AQUI!** Não faça deploy.

Me avise qual erro apareceu e em qual passo, que eu te ajudo a corrigir.

---

## 📱 PASSO 5: Testar no Celular

Depois que tudo funcionar no Vercel:

1. Abra o link no celular
2. Teste o fluxo completo
3. Adicione à tela inicial (PWA)

---

## 🎉 Pronto!

Se você seguiu todos os passos e tudo funcionou, seu app está 100% operacional!

**Dúvidas?** Me chame que eu te ajudo! 😊
