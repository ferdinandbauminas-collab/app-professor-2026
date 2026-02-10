@echo off
echo ===================================================
echo   ENVIANDO VERSAO VISIVEL NO TOPO (v2.4)
echo ===================================================
echo.
echo 1. Preparando arquivos...
git add .
echo.
echo 2. Salvando alteracao no cabecalho (Header)...
git commit -m "Chore: Adiciona marcador v2.4 no topo para confirmar update sem logout"
echo.
echo 3. Enviando para a Vercel...
git push
echo.
echo ===================================================
echo   SUCESSO! 
echo   Aguarde o deploy (2 min).
echo.
echo   AGORA PRECISE QUE VOCE FECHE O APP A FORCA
echo   (Arraste para cima e jogue fora da multitarefa)
echo ===================================================
echo Pressione qualquer tecla para fechar...
pause
