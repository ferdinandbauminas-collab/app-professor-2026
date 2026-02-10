@echo off
echo ===================================================
echo   FORCANDO ATUALIZACAO ABSOLUTA (v2.7)
echo ===================================================
echo.
echo 1. Garantindo que tudo esta salvo...
git add .
git commit -m "Force Update v2.7: Debugging Error"
echo.
echo 2. Enviando para o GitHub...
git push
echo.
echo.
echo ===================================================
echo   ENVIADO!
echo.
echo   AGORA:
echo   1. Espere 2 minutos.
echo   2. Feche o site no celular.
echo   3. Abra de novo (se der, em GUIA ANONIMA).
echo.
echo   Se ainda pedir login, eh porque a "Vercel Auth" 
echo   ainda esta ligada (Passo anterior).
echo ===================================================
pause
