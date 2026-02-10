# 🚀 GUIA COMPLETO: Configurar App no Vercel (Do Zero)

Vamos fazer tudo passo a passo para garantir que funcione!

---

## 📋 PASSO 1: Fazer Deploy das Correções

### 1.1. Execute o arquivo de upload

Clique duas vezes no arquivo [`fazer_upload.bat`](file:///C:/Users/ferdi/APLICATIVO%20FALTAS/ceti-auristela-soares---professor-app/fazer_upload.bat)

**OU** abra o terminal e execute:

```bash
cd "C:\Users\ferdi\APLICATIVO FALTAS\ceti-auristela-soares---professor-app"
git add .
git commit -m "Fix: Configurar Supabase com variáveis de ambiente"
git push
```

### 1.2. Aguarde o deploy

- O Vercel detecta automaticamente o push
- Aguarde 1-2 minutos
- Você receberá um email quando o deploy estiver pronto

✅ **Checkpoint**: Acesse https://vercel.com e veja se o deploy foi concluído com sucesso

---

## ⚙️ PASSO 2: Configurar Variáveis de Ambiente no Vercel

**ATENÇÃO**: Este é o passo MAIS IMPORTANTE! Sem isso, o app não funciona.

### 2.1. Acesse o Painel do Vercel

1. Vá para: https://vercel.com
2. Faça login (se necessário)
3. Clique no projeto: **ceti-auristela-soares-professor-app**

### 2.2. Vá para Configurações

1. Clique em **Settings** (no topo)
2. No menu lateral, clique em **Environment Variables**

### 2.3. Adicione a PRIMEIRA variável

1. Clique em **Add New**
2. Preencha:
   - **Key (Nome)**: `VITE_SUPABASE_URL`
   - **Value (Valor)**: `https://yglwswpgrqfldvpbqxcl.supabase.co`
   - **Environments**: Marque **Production**, **Preview** e **Development**
3. Clique em **Save**

### 2.4. Adicione a SEGUNDA variável

1. Clique em **Add New** novamente
2. Preencha:
   - **Key (Nome)**: `VITE_SUPABASE_ANON_KEY`
   - **Value (Valor)**: 
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnbHdzd3BncnFmbGR2cGJxeGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2Mjg0MDQsImV4cCI6MjAzMTIwNDQwNH0.5N_u6Y-0iG2s1s024s2yNCe-iZ0rnF3xKq6H3kTl3rU
   ```
   - **Environments**: Marque **Production**, **Preview** e **Development**
3. Clique em **Save**

### 2.5. Fazer Redeploy (OBRIGATÓRIO!)

**IMPORTANTE**: Após adicionar as variáveis, você PRECISA fazer redeploy:

1. Vá para a aba **Deployments**
2. Clique nos 3 pontinhos (...) do último deploy
3. Clique em **Redeploy**
4. Confirme clicando em **Redeploy** novamente

✅ **Checkpoint**: Aguarde 1-2 minutos até o redeploy terminar

---

## 💾 PASSO 3: Restaurar Dados no Supabase

### 3.1. Abra o Restaurador de Dados

1. Navegue até a pasta do projeto
2. Abra o arquivo [`restaurar_dados.html`](file:///C:/Users/ferdi/APLICATIVO%20FALTAS/restaurar_dados.html) no navegador
   - Clique com botão direito → Abrir com → Google Chrome (ou seu navegador)

### 3.2. Verifique a Conexão

Você deve ver:
- ✅ "Conectado ao Cofre (Supabase). X Professores atuais."

Se aparecer erro:
- ❌ Verifique se a URL e chave do Supabase estão corretas no arquivo

### 3.3. Execute a Restauração

1. Clique no botão **"INICIAR RESTAURAÇÃO"**
2. Aguarde o processo (pode levar 1-2 minutos)
3. Você verá mensagens verdes conforme os dados são salvos:
   - ✅ Professor X salvo/atualizado
   - ✅ Y alunos salvos em MÓDULO II-A
   - etc.

### 3.4. Confirme o Sucesso

Ao final, deve aparecer:
- 🏁 "RESTAURAÇÃO CONCLUÍDA! Verifique se deu tudo verde."

✅ **Checkpoint**: Todos os dados foram restaurados no Supabase

---

## 🧪 PASSO 4: Testar o Aplicativo

### 4.1. Acesse o App no Vercel

Abra: https://ceti-auristela-soares-professor-app.vercel.app

### 4.2. Abra o Console do Navegador

1. Pressione **F12** (ou Ctrl+Shift+I)
2. Vá para a aba **Console**

### 4.3. Verifique as Mensagens

Você DEVE ver:
- ✅ "Supabase configurado com sucesso"
- ✅ "URL: https://yglwswpgrqfldvpbqxcl.supabase.co"

Se aparecer:
- ❌ "Faltam variáveis de ambiente" → Volte ao PASSO 2
- ❌ Erro 401/403 → A chave está incorreta
- ❌ "Failed to fetch" → Problema de rede

### 4.4. Teste o Fluxo Completo

1. **Tela de Login**: Deve aparecer a lista de professores
2. **Selecione um professor** (ex: Assunção)
3. **Dashboard**: Deve aparecer o botão "Selecionar Disciplina"
4. **Selecione uma disciplina** (ex: Geografia)
5. **Selecione uma turma** (ex: MÓDULO II-A)
6. **Iniciar Chamada**: Deve aparecer a lista de alunos
7. **Marque presença/falta** para alguns alunos
8. **Finalizar**: Deve aparecer a tela de sucesso
9. **Sincronizar**: Clique no botão de sincronização

✅ **Checkpoint**: Todo o fluxo funciona sem erros

---

## 🎉 PRONTO!

Se você chegou até aqui e tudo funcionou, o aplicativo está 100% operacional!

---

## 🆘 Problemas Comuns

### Problema: "Faltam variáveis de ambiente"
**Solução**: Você esqueceu de configurar no Vercel (PASSO 2) ou não fez o redeploy

### Problema: Tela de login vazia (sem professores)
**Solução**: Você não restaurou os dados no Supabase (PASSO 3)

### Problema: Erro 401 ou 403
**Solução**: A chave do Supabase está incorreta. Verifique se copiou corretamente

### Problema: "Failed to fetch"
**Solução**: Problema de rede ou CORS. Verifique se a URL do Supabase está correta

---

## 📞 Precisa de Ajuda?

Se algo não funcionar, me envie:
1. **Print do console do navegador** (F12)
2. **Print da tela do app** (o que você vê)
3. **Print das variáveis de ambiente no Vercel**

Assim consigo identificar exatamente onde está o problema!
