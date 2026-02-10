@echo off
echo ===================================================
echo   ATUALIZANDO APP (VERSAO COM PAUSAS)
echo ===================================================
echo.
echo 1. Adicionando arquivos...
git add .
echo [OK] Arquivos adicionados.
pause

echo.
echo 2. Criando pacote de atualizacao (Commit)...
git commit -m "Update final: Design Premium e Sincronizacao"
echo [OK] Commit realizado.
pause

echo.
echo 3. Enviando para a internet (Push)...
echo ATENCAO: Se pedir senha ou login, informe na janela.
git push
echo.
echo [FIM] Se voce viu mensagens de 'Everything up-to-date', o site ja deve atualizar.
echo Se deu ERRO, por favor, me diga o que apareceu acima.
pause
