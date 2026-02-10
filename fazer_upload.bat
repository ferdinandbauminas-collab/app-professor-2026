@echo off
echo ===================================================
echo   ATUALIZANDO APP DO PROFESSOR (ENVIANDO PARA VERCEL)
echo ===================================================
echo.
echo 1. Adicionando arquivos modificados...
git add .

echo.
echo 2. Salvando alteracoes (Commit)...
git commit -m "Update: Design Premium, Sincronização EJA 2026 e ajuste de botões compactos"

echo.
echo 3. Enviando para a nuvem (Push)...
git push

echo.
echo ===================================================
echo   FIM DO PROCESSO
echo ===================================================
echo Se aparecer "Everything up-to-date" ou mensagens de sucesso, deu certo!
echo O Vercel deve atualizar o site em 1 ou 2 minutos.
echo.
pause
