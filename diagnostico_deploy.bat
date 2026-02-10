@echo off
echo ===================================================
echo   DIAGNOSTICO DE DEPLOY (VERSAO 2 - UTF8)
echo ===================================================
echo Coletando dados...

powershell -Command "Add-Content -Path 'debug_result.txt' -Value '--- STATUS DO GIT ---' -Encoding UTF8"
git status >> debug_result.txt 2>&1

powershell -Command "Add-Content -Path 'debug_result.txt' -Value '--- ULTIMOS COMMITS ---' -Encoding UTF8"
git log -n 3 --oneline >> debug_result.txt 2>&1

powershell -Command "Add-Content -Path 'debug_result.txt' -Value '--- TENTANDO PUSH ---' -Encoding UTF8"
git push >> debug_result.txt 2>&1

echo.
echo ===================================================
echo   PROCESSO CONCLUIDO
echo ===================================================
echo Por favor, volte ao Gemini e me avise quando terminar.
echo.
pause
