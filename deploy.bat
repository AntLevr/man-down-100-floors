@echo off
chcp 65001 >nul
echo ====================================
echo 是男人就下100层 - GitHub部署脚本
echo ====================================
echo.

if not exist .git (
    echo 初始化Git仓库...
    git init
    echo.
)

echo 添加所有文件...
git add .
echo.

echo 提交更改...
git commit -m "初始提交：是男人就下100层游戏"
echo.

echo ====================================
echo 下一步操作：
echo 1. 在GitHub上创建新仓库：man-down-100-floors
echo 2. 运行以下命令（替换你的用户名）：
echo    git remote add origin https://github.com/你的用户名/man-down-100-floors.git
echo    git branch -M main
echo    git push -u origin main
echo 3. 在GitHub仓库设置中启用Pages（使用GitHub Actions）
echo ====================================
echo.
pause
