// 游戏画布和上下文
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 760;
canvas.height = 500;

// 游戏状态
let gameState = 'waiting'; // waiting, playing, gameOver
let cameraY = 0;
let currentLevel = 0;
let highestLevel = 0;
let health = 100;

// 玩家对象
const player = {
    x: canvas.width / 2 - 15,
    y: 100,
    width: 30,
    height: 30,
    velocityX: 0,
    velocityY: 0,
    speed: 5,
    jumpPower: -12,
    onGround: false,
    color: '#3498db'
};

// 平台数组
let platforms = [];

// 按键状态
const keys = {};

// 初始化平台
function initPlatforms() {
    platforms = [];
    // 起始平台
    platforms.push({
        x: canvas.width / 2 - 50,
        y: canvas.height - 50,
        width: 100,
        height: 20,
        type: 'normal', // normal, danger, heal
        color: '#2ecc71'
    });
    
    // 生成初始平台
    for (let i = 0; i < 20; i++) {
        generatePlatform(canvas.height - 100 - i * 80);
    }
}

// 生成平台
function generatePlatform(y) {
    const types = ['normal', 'normal', 'normal', 'danger', 'heal'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    let color;
    if (type === 'danger') {
        color = '#e74c3c';
    } else if (type === 'heal') {
        color = '#2ecc71';
    } else {
        color = '#95a5a6';
    }
    
    platforms.push({
        x: Math.random() * (canvas.width - 120) + 20,
        y: y,
        width: 80 + Math.random() * 60,
        height: 20,
        type: type,
        color: color
    });
}

// 更新游戏
function update() {
    if (gameState !== 'playing') return;
    
    // 更新玩家速度
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
        player.velocityX = -player.speed;
    } else if (keys['ArrowRight'] || keys['d'] || keys['D']) {
        player.velocityX = player.speed;
    } else {
        player.velocityX *= 0.8; // 摩擦力
    }
    
    // 跳跃
    if ((keys[' '] || keys['ArrowUp'] || keys['w'] || keys['W']) && player.onGround) {
        player.velocityY = player.jumpPower;
        player.onGround = false;
    }
    
    // 重力
    player.velocityY += 0.5;
    
    // 更新玩家位置
    player.x += player.velocityX;
    player.y += player.velocityY;
    
    // 边界检测
    if (player.x < 0) {
        player.x = 0;
        player.velocityX = 0;
    }
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
        player.velocityX = 0;
    }
    
    // 碰撞检测
    player.onGround = false;
    for (let platform of platforms) {
        if (checkCollision(player, platform)) {
            // 从上方碰撞
            if (player.velocityY > 0 && player.y < platform.y) {
                player.y = platform.y - player.height;
                player.velocityY = 0;
                player.onGround = true;
                
                // 处理平台类型
                if (platform.type === 'danger') {
                    health -= 20;
                    if (health <= 0) {
                        endGame();
                        return;
                    }
                } else if (platform.type === 'heal') {
                    health = Math.min(100, health + 10);
                }
            }
        }
    }
    
    // 相机跟随（向下滚动）
    if (player.y > canvas.height * 0.6) {
        const diff = player.y - canvas.height * 0.6;
        cameraY += diff;
        player.y = canvas.height * 0.6;
        
        // 更新层数
        const newLevel = Math.floor(cameraY / 80);
        if (newLevel > currentLevel) {
            currentLevel = newLevel;
            highestLevel = Math.max(highestLevel, currentLevel);
            updateStats();
        }
    }
    
    // 生成新平台
    const lowestPlatform = Math.min(...platforms.map(p => p.y));
    if (lowestPlatform > cameraY + canvas.height + 200) {
        // 移除旧平台
        platforms = platforms.filter(p => p.y < cameraY + canvas.height + 100);
        // 生成新平台
        for (let i = 0; i < 5; i++) {
            generatePlatform(lowestPlatform - 80 - i * 80);
        }
    }
    
    // 检查是否掉出屏幕
    if (player.y > cameraY + canvas.height + 100) {
        endGame();
    }
    
    // 更新生命值显示
    updateStats();
}

// 碰撞检测
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// 渲染游戏
function render() {
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 保存上下文
    ctx.save();
    
    // 应用相机变换
    ctx.translate(0, -cameraY);
    
    // 绘制平台
    for (let platform of platforms) {
        ctx.fillStyle = platform.color;
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        
        // 绘制平台边框
        ctx.strokeStyle = '#34495e';
        ctx.lineWidth = 2;
        ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
    }
    
    // 绘制玩家
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // 绘制玩家眼睛
    ctx.fillStyle = '#fff';
    ctx.fillRect(player.x + 8, player.y + 8, 5, 5);
    ctx.fillRect(player.x + 17, player.y + 8, 5, 5);
    
    // 恢复上下文
    ctx.restore();
    
    // 绘制UI（不受相机影响）
    drawUI();
}

// 绘制UI
function drawUI() {
    // 绘制生命值条
    const barWidth = 200;
    const barHeight = 20;
    const barX = canvas.width - barWidth - 20;
    const barY = 20;
    
    // 背景
    ctx.fillStyle = '#ecf0f1';
    ctx.fillRect(barX, barY, barWidth, barHeight);
    
    // 生命值
    ctx.fillStyle = health > 50 ? '#2ecc71' : health > 25 ? '#f39c12' : '#e74c3c';
    ctx.fillRect(barX, barY, (barWidth * health / 100), barHeight);
    
    // 边框
    ctx.strokeStyle = '#34495e';
    ctx.lineWidth = 2;
    ctx.strokeRect(barX, barY, barWidth, barHeight);
}

// 更新统计信息
function updateStats() {
    document.getElementById('currentLevel').textContent = currentLevel;
    document.getElementById('highestLevel').textContent = highestLevel;
    document.getElementById('health').textContent = Math.max(0, Math.floor(health));
}

// 开始游戏
function startGame() {
    gameState = 'playing';
    cameraY = 0;
    currentLevel = 0;
    health = 100;
    player.x = canvas.width / 2 - 15;
    player.y = 100;
    player.velocityX = 0;
    player.velocityY = 0;
    player.onGround = false;
    
    initPlatforms();
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('restartBtn').style.display = 'none';
    document.getElementById('gameOver').style.display = 'none';
    updateStats();
}

// 结束游戏
function endGame() {
    gameState = 'gameOver';
    document.getElementById('finalLevel').textContent = currentLevel;
    document.getElementById('gameOver').style.display = 'block';
    document.getElementById('restartBtn').style.display = 'inline-block';
}

// 游戏循环
function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// 事件监听
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    e.preventDefault();
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
    e.preventDefault();
});

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('restartBtn').addEventListener('click', startGame);
document.getElementById('restartGameBtn').addEventListener('click', () => {
    document.getElementById('gameOver').style.display = 'none';
    startGame();
});

// 初始化
initPlatforms();
updateStats();
gameLoop();
