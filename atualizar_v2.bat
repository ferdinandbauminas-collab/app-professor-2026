@echo off
echo ===================================================
echo   ENVIANDO VERSAO DE DIAGNOSTICO (v2.1)
echo ===================================================
echo.
echo 1. Preparando arquivos...
git add .
echo.
echo 2. Salvando alteracao visual...
git commit -m "Chore: Adiciona marcador visual v2.1 para confirmar update"
echo.
echo 3. Enviando para a Vercel...
git push
echo.
echo ===================================================
echo   SUCESSO! 
echo   Aguarde o deploy (2 min).
echo.
echo   TESTE DE CACHE:
echo   Quando abrir o app e iniciar uma chamada, verifique
echo   se aparece "(v2.1)" ao lado do nome da turma.
echo   SE NAO APARECER, o seu celular ainda esta usando
echo   a versao antiga!
echo ===================================================
echo Pressione qualquer tecla para fechar...
pause
