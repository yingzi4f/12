#!/bin/bash

# 基于Hadoop的航班分析系统 - 快速启动脚本

echo "========================================="
echo "  基于Hadoop的航班分析系统 - 启动脚本"
echo "========================================="
echo ""

# 检查 MySQL 是否运行
echo "[1/5] 检查 MySQL 服务..."
if ! sudo systemctl is-active --quiet mysql; then
    echo "MySQL 未运行，正在启动..."
    sudo systemctl start mysql
    sleep 3
else
    echo "✓ MySQL 已运行"
fi

# 检查后端端口是否被占用
echo ""
echo "[2/5] 检查端口占用情况..."
if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "✗ 端口 5000 已被占用，请先关闭后端服务"
    echo "  可以使用: lsof -i:5000 查看占用进程"
    exit 1
else
    echo "✓ 端口 5000 可用"
fi

if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "✗ 端口 8080 已被占用，请先关闭前端用户端"
    exit 1
else
    echo "✓ 端口 8080 可用"
fi

if lsof -Pi :8081 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "✗ 端口 8081 已被占用，请先关闭后台管理系统"
    exit 1
else
    echo "✓ 端口 8081 可用"
fi

# 获取项目根目录
PROJECT_DIR="/home/yingzi/桌面/12"
cd "$PROJECT_DIR" || exit 1

# 启动后端服务
echo ""
echo "[3/5] 启动后端服务..."
cd "$PROJECT_DIR/server"
nohup mvn spring-boot:run > /tmp/hangkong-backend.log 2>&1 &
BACKEND_PID=$!
echo "✓ 后端服务已启动 (PID: $BACKEND_PID)"
echo "  日志文件: /tmp/hangkong-backend.log"

# 等待后端启动
echo "  等待后端服务启动..."
sleep 15

# 启动前端用户端
echo ""
echo "[4/5] 启动前端用户端..."
cd "$PROJECT_DIR/vue/client_home"
export NODE_OPTIONS="--openssl-legacy-provider"
nohup npm run serve > /tmp/hangkong-client-home.log 2>&1 &
CLIENT_HOME_PID=$!
echo "✓ 前端用户端已启动 (PID: $CLIENT_HOME_PID)"
echo "  日志文件: /tmp/hangkong-client-home.log"

# 启动后台管理系统
echo ""
echo "[5/5] 启动后台管理系统..."
cd "$PROJECT_DIR/vue/client_admin"
export NODE_OPTIONS="--openssl-legacy-provider"
nohup npm run serve > /tmp/hangkong-client-admin.log 2>&1 &
CLIENT_ADMIN_PID=$!
echo "✓ 后台管理系统已启动 (PID: $CLIENT_ADMIN_PID)"
echo "  日志文件: /tmp/hangkong-client-admin.log"

# 保存 PID 到文件，方便停止服务
echo "$BACKEND_PID" > /tmp/hangkong-pids.conf
echo "$CLIENT_HOME_PID" >> /tmp/hangkong-pids.conf
echo "$CLIENT_ADMIN_PID" >> /tmp/hangkong-pids.conf

# 显示启动信息
echo ""
echo "========================================="
echo "  所有服务已启动！"
echo "========================================="
echo ""
echo "📱 访问地址："
echo "   - 前端用户端: http://localhost:8080"
echo "   - 后台管理端: http://localhost:8081"
echo "   - 后端 API:   http://localhost:5000/api"
echo ""
echo "📝 默认账号："
echo "   - 管理员账号: admin / admin"
echo ""
echo "📋 查看日志："
echo "   - 后端日志: tail -f /tmp/hangkong-backend.log"
echo "   - 前端用户端日志: tail -f /tmp/hangkong-client-home.log"
echo "   - 后台管理日志: tail -f /tmp/hangkong-client-admin.log"
echo ""
echo "🛑 停止服务："
echo "   bash /home/yingzi/桌面/12/stop.sh"
echo ""
echo "⏳ 等待前端编译完成（首次启动需要几分钟）..."
echo ""

# 等待一下让服务启动
sleep 5

# 检查后端是否启动成功
if curl -s http://localhost:5000/api > /dev/null; then
    echo "✓ 后端服务运行正常"
else
    echo "⚠ 后端服务可能未成功启动，请查看日志"
fi

echo ""
echo "完成！"
