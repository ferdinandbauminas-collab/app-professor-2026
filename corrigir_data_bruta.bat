@echo off
echo ===================================================
echo   ENVIANDO CORRECAO BRUTA DE DATA (v2.4)
echo ===================================================
echo.
echo 1. Preparando arquivos...
git add .
echo.
echo 2. Salvando correcao (Recuo de 4 horas)...
git commit -m "Fix: Forca data subtraindo 4 horas do relogio UTC"
echo.
echo 3. Enviando para a Vercel...
git push
echo.
echo ===================================================
echo   SUCESSO! 
echo   Essa versao ignora o fuso horario e apenas subtrai
echo   4 horas do relogio do servidor/celular.
echo   Deve resolver o problema do "dia seguinte".
echo ===================================================
echo Pressione qualquer tecla para fechar...
pause
