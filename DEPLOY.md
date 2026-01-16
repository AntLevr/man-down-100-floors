# GitHub Pages 部署指南

## ⚠️ 重要：首次部署前必须完成

在推送代码之前，**先完成以下步骤**：

1. 在GitHub上创建新仓库，命名为 `man-down-100-floors`
2. 进入仓库 **Settings** → **Pages**
3. 在 **Build and deployment** 部分：
   - Source 选择 **"GitHub Actions"**
   - 点击 **Save**
4. 进入 **Settings** → **Actions** → **General**
5. 在 **Workflow permissions** 部分：
   - 选择 **"Read and write permissions"**
   - 点击 **Save**

## 方法一：使用 GitHub Actions（推荐）

1. 将代码推送到仓库：
   ```bash
   git init
   git add .
   git commit -m "初始提交：是男人就下100层游戏"
   git branch -M main
   git remote add origin https://github.com/你的用户名/man-down-100-floors.git
   git push -u origin main
   ```

2. 等待GitHub Actions自动部署（约1-2分钟）

3. 如果遇到错误，请查看 [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

## 方法二：使用 gh-pages 分支（备用方案）

如果GitHub Actions有问题，可以使用这个方法：

1. 推送代码到main分支后，创建gh-pages分支：
   ```bash
   git checkout -b gh-pages
   git push -u origin gh-pages
   ```

2. 在GitHub仓库设置中：
   - 进入 **Settings** → **Pages**
   - Source 选择 **"Deploy from a branch"**
   - Branch 选择 **"gh-pages"**，文件夹选择 **"/ (root)"**
   - 点击 **Save**

## 方法三：使用 docs 文件夹（最简单）

1. 在项目根目录创建 `docs` 文件夹
2. 将以下文件复制到 `docs` 文件夹：
   - index.html
   - style.css
   - game.js
3. 提交并推送：
   ```bash
   git add docs/
   git commit -m "添加docs文件夹用于GitHub Pages"
   git push
   ```
4. 在GitHub仓库设置中：
   - 进入 **Settings** → **Pages**
   - Source 选择 **"Deploy from a branch"**
   - Branch 选择 **"main"**，文件夹选择 **"/docs"**
   - 点击 **Save**

## 访问地址

部署成功后，你的游戏将在以下地址可用：
`https://你的用户名.github.io/man-down-100-floors/`

## 常见问题

如果遇到部署问题，请查看 [TROUBLESHOOTING.md](TROUBLESHOOTING.md) 获取详细解决方案。
