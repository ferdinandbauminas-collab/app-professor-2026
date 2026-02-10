@echo off
echo ===================================================
echo   ENVIANDO CORRECAO DEFINITIVA DE DATA
echo ===================================================
echo.
echo 1. Preparando arquivos...
git add .
echo.
echo 2. Salvando correcao (Fuso Horario Explicito)...
git commit -m "Fix: Forcar timezone America/Sao_Paulo na chamada"
echo.
echo 3. Enviando para a Vercel...
git push
echo.
echo ===================================================
echo   SUCESSO! 
echo   Aguarde o deploy terminar (aprox. 2 min).
echo.
echo   IMPORTANTE: 
echo   Talvez seja necessario limpar o cache do navegador
echo   do celular para que a mudanca apareca.
echo ===================================================
echo Pressione qualquer tecla para fechar...
pause
