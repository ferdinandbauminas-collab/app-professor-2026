@echo off
echo ===================================================
echo   ENVIANDO CORRECAO DE DATA (v2.3)
echo ===================================================
echo.
echo 1. Preparando arquivos...
git add .
echo.
echo 2. Salvando correcao robusta de data...
git commit -m "Fix: Gera data YYYY-MM-DD manualmente para evitar erros de locale"
echo.
echo 3. Enviando para a Vercel...
git push
echo.
echo ===================================================
echo   SUCESSO! 
echo   Essa versao corrige o formato da data que podia
echo   estar quebrando o envio para o banco.
echo ===================================================
echo Pressione qualquer tecla para fechar...
pause
