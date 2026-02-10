@echo off
echo ===================================================
echo   ENVIANDO CORRECAO DE CREDENCIAIS
echo ===================================================
echo.
echo 1. Preparando arquivos...
git add .
echo.
echo 2. Salvando correcao...
git commit -m "Fix: Atualiza credenciais do Supabase e .env"
echo.
echo 3. Enviando para a Vercel...
git push
echo.
echo ===================================================
echo   SUCESSO! 
echo   O Vercel vai iniciar o deploy automaticamente.
echo ===================================================
echo Pressione qualquer tecla para fechar...
pause
