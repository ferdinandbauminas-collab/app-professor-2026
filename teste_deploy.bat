@echo off
echo ===================================================
echo   ENVIANDO ARQUIVO DE TESTE (versao.html)
echo ===================================================
echo.
echo 1. Preparando arquivos...
git add .
echo.
echo 2. Salvando arquivo de diagnostico...
git commit -m "Chore: Adiciona public/versao.html para teste de deploy"
echo.
echo 3. Enviando para a Vercel...
git push
echo.
echo ===================================================
echo   SUCESSO! 
echo   Aguarde o deploy (2 min).
echo.
echo   Se o link /versao.html funcionar, o deploy esta OK
echo   e o problema e so cache do navegador.
echo ===================================================
echo Pressione qualquer tecla para fechar...
pause
