#!/bin/bash

# 基于Hadoop的航班分析系统 - 停止脚本

echo "========================================="
echo "  停止航班分析系统所有服务"
echo "========================================="
echo ""

PID_FILE="/tmp/hangkong-pids.conf"

# 如果 PID 文件存在，读取并杀死进程
if [ -f "$PID_FILE" ]; then
    echo "从 PID 文件读取进程..."
    PIDS=$(cat "$PID_FILE")

    for PID in $PIDS; do
        if kill -0 $PID 2>/dev/null; then
            echo "正在停止进程 $PID..."
            kill $PID
        else
            echo "进程 $PID 已不存在"
        fi
    done

    rm -f "$PID_FILE"
else
    echo "未找到 PID 文件，尝试通过端口查找进程..."

    # 通过端口查找并杀死进程
    PORTS=(5000 8080 8081)
    NAMES=("后端" "前端用户端" "后台管理")

    for i in "${!PORTS[@]}"; do
        PORT=${PORTS[$i]}
        NAME=${NAMES[$i]}
        PIDS=$(lsof -ti:$PORT)

        if [ -n "$PIDS" ]; then
            echo "正在停止 $NAME (端口 $PORT)..."
            kill $PIDS
        else
            echo "$NAME (端口 $PORT) 未运行"
        fi
    done
fi

# 清理可能的 npm 守护进程
echo ""
echo "清理 Node 进程..."
pkill -f "node.*vue/client_home" 2>/dev/null
pkill -f "node.*vue/client_admin" 2>/dev/null

# 等待进程完全停止
sleep 2

echo ""
echo "========================================="
echo "  所有服务已停止"
echo "========================================="
