@echo off
echo ===================================================
echo   ENVIANDO VERSAO FINAL DE CACHE (v2.2)
echo ===================================================
echo.
echo 1. Preparando arquivos...
git add .
echo.
echo 2. Salvando correcao "NUCLEAR" de cache...
git commit -m "Fix: Forcar desregistro de Service Worker e add v2.2 na tela de login"
echo.
echo 3. Enviando para a Vercel...
git push
echo.
echo ===================================================
echo   SUCESSO! 
echo   Aguarde o deploy (2 min).
echo.
echo   Se essa versao (v2.2) aparecer na tela de login,
echo   significa que o seu cache FINALMENTE atualizou.
echo ===================================================
echo Pressione qualquer tecla para fechar...
pause
