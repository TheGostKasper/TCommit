@echo off
title talktive app!
start /min cmd /c mongo.bat
start /min cmd /c server.bat
CD .\dashboard & call  npm start
pause
