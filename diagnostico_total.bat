@echo off
echo ===================================================
echo   DIAGNOSTICO COMPLETO (GIT + DEPLOY)
echo ===================================================
echo.
echo Gerando log de erro... (Aguarde)

echo --- DATA E HORA --- > log_diagnostico.txt
date /t >> log_diagnostico.txt
time /t >> log_diagnostico.txt
echo. >> log_diagnostico.txt

echo --- GIT REMOTE (Onde esta conectado?) --- >> log_diagnostico.txt
git remote -v >> log_diagnostico.txt 2>&1
echo. >> log_diagnostico.txt

echo --- GIT STATUS (O que esta pendente?) --- >> log_diagnostico.txt
git status >> log_diagnostico.txt 2>&1
echo. >> log_diagnostico.txt

echo --- ULTIMOS COMMITS (O que foi salvo?) --- >> log_diagnostico.txt
git log -n 5 >> log_diagnostico.txt 2>&1
echo. >> log_diagnostico.txt

echo --- TENTATIVA DE PUSH (Simulacao) --- >> log_diagnostico.txt
git push --dry-run >> log_diagnostico.txt 2>&1
echo. >> log_diagnostico.txt

echo ===================================================
echo   DIAGNOSTICO CONCLUIDO!
echo   Um arquivo "log_diagnostico.txt" foi criado.
echo   O assistente vai ler ele agora.
echo ===================================================
echo Pressione qualquer tecla para fechar...
pause
