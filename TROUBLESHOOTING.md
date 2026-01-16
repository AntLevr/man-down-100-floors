# GitHub Pages 部署问题排查

## 常见错误及解决方案

### 1. "Get Pages site failed: 404" 或 "Unable to enable GitHub Pages"

**原因**：仓库中尚未启用GitHub Pages功能

**解决方案**：
1. 进入GitHub仓库
2. 点击 **Settings** → **Pages**
3. 在 **Build and deployment** 部分：
   - Source 选择 **"GitHub Actions"**
   - 点击 **Save**
4. 如果还是不行，先选择 **"Deploy from a branch"**，选择 `main` 分支和 `/ (root)` 文件夹，保存
5. 然后再改回 **"GitHub Actions"**，保存

### 2. "Permission denied" 或权限错误

**原因**：GitHub Actions权限不足

**解决方案**：
1. 进入仓库 **Settings** → **Actions** → **General**
2. 在 **Workflow permissions** 部分：
   - 选择 **"Read and write permissions"**
   - 勾选 **"Allow GitHub Actions to create and approve pull requests"**
3. 点击 **Save**

### 3. 工作流运行但部署失败

**检查步骤**：
1. 进入仓库的 **Actions** 标签页
2. 查看失败的workflow运行记录
3. 点击查看详细日志，找到具体错误信息

### 4. 部署卡在 "deployment_queued" 状态

**解决方案**：
1. 等待几分钟（可能是GitHub系统延迟）
2. 如果一直卡住，取消当前部署
3. 重新运行workflow（点击 **Re-run jobs**）

### 5. 使用备用部署方法（gh-pages分支）

如果GitHub Actions一直有问题，可以使用传统的gh-pages分支方法：

```bash
# 创建gh-pages分支
git checkout --orphan gh-pages
git rm -rf .
git add index.html style.css game.js
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages

# 然后回到main分支
git checkout main
```

然后在仓库Settings → Pages中，Source选择 **"Deploy from a branch"**，分支选择 `gh-pages`。

## 验证部署

部署成功后，访问：
`https://你的用户名.github.io/man-down-100-floors/`

如果看到游戏界面，说明部署成功！

## 需要帮助？

如果以上方法都无法解决问题，请提供：
1. GitHub Actions的完整错误日志
2. 仓库Settings → Pages的配置截图
3. 具体的错误信息
