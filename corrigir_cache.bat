@echo off
echo ===================================================
echo   ENVIANDO CORRECAO DE CACHE PWA
echo ===================================================
echo.
echo 1. Preparando arquivos...
git add .
echo.
echo 2. Salvando configuracao de cache...
git commit -m "Fix: Forcar limpeza de cache do PWA (workbox options)"
echo.
echo 3. Enviando para a Vercel...
git push
echo.
echo ===================================================
echo   SUCESSO! 
echo   Aguarde o deploy (2 min).
echo.
echo   Se ainda nao funcionar, teremos que limpar 
echo   os dados do site no celular manualmente.
echo ===================================================
echo Pressione qualquer tecla para fechar...
pause
