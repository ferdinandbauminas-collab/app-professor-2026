@echo off
echo ===================================================
echo   ENVIANDO VERSAO DE DIAGNOSTICO
echo ===================================================
echo.
git add App.tsx
git commit -m "Debug: Mostrar erro detalhado na tela"
git push
echo.
echo ===================================================
echo   ENVIADO!
echo   Aguarde 2 minutos e recarregue o site no celular.
echo   Agora o erro vermelho vai dizer EXATAMENTE o que é.
echo ===================================================
pause
