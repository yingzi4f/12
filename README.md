# 基于Hadoop的航班分析系统的设计与实现

## 📖 项目简介

这是一个基于 Hadoop 的航班数据分析与管理系统，提供航班信息查询、在线预订、数据统计等功能。

### 主要功能

- **航班查询**：支持出发地、目的地、日期搜索
- **在线预订**：座位选择、订单管理
- **数据分析**：航班统计、热门目的地分析
- **订单管理**：订单查询、状态管理
- **用户管理**：用户注册、个人中心

## 🚀 快速开始

### 方式一：使用启动脚本（推荐）

```bash
# 启动所有服务
./start.sh

# 停止所有服务
./stop.sh
```

### 方式二：手动启动

详见 [部署文档](./DEPLOYMENT.md)

## 📋 系统要求

- **JDK**: 11+
- **Maven**: 3.6+
- **Node.js**: 14+ (推荐 18.x)
- **MySQL**: 8.0+

## 🔧 安装步骤

1. **安装 MySQL 数据库**
   ```bash
   # Ubuntu/Debian
   sudo apt install mysql-server

   # 导入数据库
   mysql -u root -p hangkong < hangkong.sql
   ```

2. **配置后端服务**
   ```bash
   cd server
   # 修改 src/main/resources/application.yml 中的数据库配置
   mvn spring-boot:run
   ```

3. **启动前端用户端**
   ```bash
   cd vue/client_home
   npm install
   export NODE_OPTIONS="--openssl-legacy-provider"  # Node.js 22.x 用户
   npm run serve
   ```

4. **启动后台管理系统**
   ```bash
   cd vue/client_admin
   npm install
   export NODE_OPTIONS="--openssl-legacy-provider"
   npm run serve
   ```

## 🌐 访问地址

| 服务 | 地址 | 说明 |
|------|------|------|
| 前端用户端 | http://localhost:8080 | 面向用户的航班查询和预订系统 |
| 后台管理端 | http://localhost:8081 | 管理员后台 |
| 后端 API | http://localhost:5000/api | RESTful API |

## 🔐 默认账号

**后台管理系统**
- 用户名：`admin`
- 密码：`admin`

**用户端**
- 需要自行注册账号

## 📁 项目结构

```
.
├── server/                 # Spring Boot 后端服务
│   ├── src/
│   │   └── main/
│   │       ├── java/       # Java 源代码
│   │       └── resources/  # 配置文件
│   └── pom.xml
├── vue/
│   ├── client_home/        # 前端用户端
│   └── client_admin/       # 后台管理系统
├── hangkong.sql           # 数据库初始化脚本
├── start.sh               # 快速启动脚本
├── stop.sh                # 停止脚本
└── DEPLOYMENT.md          # 详细部署文档
```

## 📊 端口说明

| 服务 | 端口 |
|------|------|
| 后端 API | 5000 |
| MySQL | 3309 |
| 前端用户端 | 8080 |
| 后台管理端 | 8081 |

## 🐛 常见问题

### MySQL 连接失败
检查 MySQL 是否启动：`sudo systemctl status mysql`

### 端口被占用
查看占用进程：`lsof -i:5000`（将 5000 替换为对应端口）

### Node.js 编译错误
添加环境变量：`export NODE_OPTIONS="--openssl-legacy-provider"`

更多问题请参考 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📝 开发说明

### 后端开发
- 框架：Spring Boot
- 数据库：MySQL 8.0
- ORM：MyBatis

### 前端开发
- 框架：Vue 2
- UI 组件：Element UI
- 构建工具：Vue CLI

## 📄 许可证

本项目仅供学习和研究使用。

---

**最后更新**：2026-03-24
