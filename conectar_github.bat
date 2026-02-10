@echo off
echo ===================================================
echo   CONECTANDO AO NOVO GITHUB (v2.5) - FORCADO
echo ===================================================
echo.
echo 1. Inicializando repositorio...
rmdir /s /q .git
git init
git config user.email "professor@ceti.com"
git config user.name "Professor APP"
echo.
echo 2. Conectando a nuvem...
git remote add origin https://github.com/ferdinandbauminas-collab/app-professor-2026.git
git branch -M main
echo.
echo 3. Salvando TODOS os arquivos...
git add .
git commit -m "Upload Inicial: Versao 2.5 Corrigida (Cache + Data)"
echo.
echo 4. Enviando (Forcando sobescrita)...
git push -u origin main --force
echo.
echo ===================================================
echo   AGORA FOI! (Se nao deu erro vermelho fatal)
echo.
echo   AGORA O ULTIMO PASSO EH NA VERCEL:
echo   1. Va no site da Vercel
echo   2. Clique em "Add New Project"
echo   3. Importe o repositorio "app-professor-2026"
echo   4. O site vai nascer novo em folha!
echo ===================================================
echo Pressione qualquer tecla para fechar...
pause
