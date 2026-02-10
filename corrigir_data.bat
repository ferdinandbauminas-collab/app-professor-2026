@echo off
echo ===================================================
echo   ENVIANDO CORRECAO DE DATA
echo ===================================================
echo.
echo 1. Preparando arquivos...
git add .
echo.
echo 2. Salvando correcao...
git commit -m "Fix: Usa data local (pt-BR) ao inves de UTC na chamada"
echo.
echo 3. Enviando para a Vercel...
git push
echo.
echo ===================================================
echo   SUCESSO! 
echo   O Vercel vai corrigir a data no proximo deploy (aprox. 2 min).
echo ===================================================
echo Pressione qualquer tecla para fechar...
pause
