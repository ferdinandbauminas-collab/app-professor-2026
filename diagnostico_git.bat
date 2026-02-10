@echo off
echo DIAGNOSTICO GIT > log_git.txt
echo Data: %date% %time% >> log_git.txt
echo. >> log_git.txt

echo --- GIT STATUS --- >> log_git.txt
git status >> log_git.txt 2>&1

echo. >> log_git.txt
echo --- GIT REMOTE --- >> log_git.txt
git remote -v >> log_git.txt 2>&1

echo. >> log_git.txt
echo --- TENTATIVA DE PUSH --- >> log_git.txt
git push >> log_git.txt 2>&1

echo. >> log_git.txt
echo --- FIM --- >> log_git.txt

echo Diagnostico concluido. O resultado foi salvo em log_git.txt.
pause
