# GitHub Pages 部署指南

## 方法一：使用 GitHub Actions（推荐）

1. 在GitHub上创建一个新仓库，命名为 `man-down-100-floors`
2. 将代码推送到仓库：
   ```bash
   git init
   git add .
   git commit -m "初始提交：是男人就下100层游戏"
   git branch -M main
   git remote add origin https://github.com/你的用户名/man-down-100-floors.git
   git push -u origin main
   ```
3. 在GitHub仓库设置中：
   - 进入 Settings > Pages
   - Source 选择 "GitHub Actions"
   - 保存设置
4. GitHub Actions会自动部署，几分钟后即可访问

## 方法二：使用 gh-pages 分支

1. 创建并切换到 gh-pages 分支：
   ```bash
   git checkout -b gh-pages
   git push -u origin gh-pages
   ```
2. 在GitHub仓库设置中：
   - 进入 Settings > Pages
   - Source 选择 "gh-pages" 分支
   - 保存设置

## 访问地址

部署完成后，你的游戏将在以下地址可用：
`https://你的用户名.github.io/man-down-100-floors/`
