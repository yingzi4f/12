# 基于Hadoop的航班分析系统 - Windows 本地部署文档

## 📋 项目概述

本项目是一个基于 Hadoop 的航班分析系统，包含以下模块：
- **后端服务**：Spring Boot + MySQL（端口 5000）
- **前端用户端**：Vue 2（端口 8080）
- **后台管理系统**：Vue 2（端口 8081）

## 🖥️ Windows 系统要求

### 必需软件
- **JDK**: 11 或更高版本
  - 下载地址：https://www.oracle.com/java/technologies/downloads/

- **Maven**: 3.6 或更高版本
  - 下载地址：https://maven.apache.org/download.cgi
  - 或使用 IDEA 自带的 Maven

- **Node.js**: 14.x 或更高版本（推荐使用 18.x）
  - 下载地址：https://nodejs.org/

- **MySQL**: 8.0 或更高版本
  - 下载地址：https://dev.mysql.com/downloads/mysql/
  - 推荐：MySQL Installer for Windows

### 可选软件
- **IntelliJ IDEA Community**：https://www.jetbrains.com/idea/
- **Visual Studio Code**：https://code.visualstudio.com/
- **Navicat for MySQL**：数据库管理工具

## 📦 详细部署步骤

### 第一步：安装 MySQL 数据库

#### 1. 下载并安装 MySQL 8.0

1. 访问 https://dev.mysql.com/downloads/installer/
2. 下载 MySQL Installer for Windows
3. 运行安装程序，选择 **Custom** 安装类型
4. 确保安装以下组件：
   - MySQL Server 8.0.x
   - MySQL Workbench（可选）
   - Connector/ODBC（可选）

#### 2. 配置 MySQL

安装过程中的配置：
- **Type and Networking**：
  - Port: 3309（重要！）
  - 勾选 "Open Windows Firewall port for network access"

- **Authentication Method**：
  - 选择 "Use Legacy Authentication Protocol"

- **Accounts and Roles**：
  - Root Password: 123456（可修改，请记住）

- **Windows Service**：
  - 勾选 "Configure MySQL Server as a Windows Service"

#### 3. 创建数据库并导入数据

**方式一：使用 MySQL Workbench（推荐）**

1. 打开 MySQL Workbench
2. 连接到本地 MySQL 服务器
   - Host: 127.0.0.1
   - Port: 3309
   - Username: root
   - Password: 123456

3. 执行以下 SQL：
```sql
CREATE DATABASE IF NOT EXISTS hangkong CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hangkong;
SOURCE C:/Users/YourUsername/Desktop/12/hangkong.sql;
```

**方式二：使用命令行**

1. 打开命令提示符（CMD）或 PowerShell

2. 进入 MySQL bin 目录（通常在）：
```cmd
cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
```

3. 连接并导入数据：
```cmd
mysql -u root -p --port=3309 < C:\Users\YourUsername\Desktop\12\hangkong.sql
```

输入密码后，系统会自动导入数据。

### 第二步：配置并启动后端服务

#### 1. 检查 JDK 安装

打开命令提示符，输入：
```cmd
java -version
```

应该显示类似：`java version "11.x.x"`

#### 2. 进入后端项目目录

打开命令提示符（CMD）：
```cmd
cd C:\Users\YourUsername\Desktop\12\server
```

**注意**：将 `YourUsername` 替换为你的实际用户名

#### 3. 修改配置文件

使用文本编辑器打开：`src\main\resources\application.yml`

```yaml
server:
  port: 5000
  servlet:
    context-path: /api

spring:
  datasource:
    url: jdbc:mysql://127.0.0.1:3309/hangkong?serverTimezone=GMT%2B8&useSSL=false&characterEncoding=utf-8
    username: root
    password: 123456  # 如果 MySQL 密码不是 123456，请修改
    driver-class-name: com.mysql.cj.jdbc.Driver
```

#### 4. 启动后端服务

**方式一：使用 Maven 命令**
```cmd
mvn spring-boot:run
```

**方式二：使用 IntelliJ IDEA**
1. 用 IDEA 打开 `server` 目录
2. 找到主启动类（包含 `@SpringBootApplication` 注解的类）
3. 右键选择 "Run 'xxxApplication'"

**方式三：打包后运行**
```cmd
# 打包
mvn clean package -DskipTests

# 运行
java -jar target\server-0.0.1-SNAPSHOT.jar
```

#### 5. 验证后端服务

打开浏览器访问：
- http://localhost:5000/api

或使用 PowerShell 测试：
```powershell
curl http://localhost:5000/api/flight_information/get_list?page=1&size=10
```

### 第三步：配置并启动前端用户端

#### 1. 进入前端用户端目录

打开新的命令提示符：
```cmd
cd C:\Users\YourUsername\Desktop\12\vue\client_home
```

#### 2. 安装依赖

```cmd
npm install
```

**如果安装速度慢，可以使用淘宝镜像：**
```cmd
npm install -g cnpm --registry=https://registry.npmmirror.com
cnpm install
```

**Node.js 22.x 用户需要添加环境变量：**
```cmd
set NODE_OPTIONS=--openssl-legacy-provider
npm install
```

#### 3. 检查代理配置

确保 `vue.config.js` 文件存在且配置正确：
```javascript
module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: '基于Hadoop的航班分析系统的设计与实现'
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    open: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}
```

#### 4. 启动开发服务器

```cmd
# Node.js 22.x 用户
set NODE_OPTIONS=--openssl-legacy-provider
npm run serve

# 其他版本
npm run serve
```

#### 5. 验证前端服务

打开浏览器访问：http://localhost:8080

### 第四步：配置并启动后台管理系统

#### 1. 进入后台管理目录

打开新的命令提示符：
```cmd
cd C:\Users\YourUsername\Desktop\12\vue\client_admin
```

#### 2. 安装依赖

```cmd
npm install

# 或使用淘宝镜像
cnpm install

# Node.js 22.x 用户
set NODE_OPTIONS=--openssl-legacy-provider
npm install
```

#### 3. 检查或创建 vue.config.js

如果文件不存在，创建 `vue.config.js`：
```javascript
const path = require('path')

module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: '航班分析系统 - 后台管理'
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 8081,
    open: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}
```

#### 4. 启动开发服务器

```cmd
set NODE_OPTIONS=--openssl-legacy-provider
npm run serve
```

#### 5. 验证后台管理

打开浏览器访问：http://localhost:8081

## 🚀 快速启动（使用批处理脚本）

### 启动所有服务

创建文件 `start.bat`：
```batch
@echo off
chcp 65001 >nul
echo =========================================
echo   基于Hadoop的航班分析系统 - 启动脚本
echo =========================================
echo.

REM 检查 MySQL 服务
echo [1/5] 检查 MySQL 服务...
sc query MySQL80 | find "RUNNING" >nul
if %errorlevel% neq 0 (
    echo MySQL 未运行，正在启动...
    net start MySQL80
    timeout /t 3 /nobreak >nul
) else (
    echo ✓ MySQL 已运行
)

REM 进入项目目录
set PROJECT_DIR=C:\Users\YourUsername\Desktop\12
cd /d "%PROJECT_DIR%"

REM 启动后端服务
echo.
echo [2/5] 启动后端服务...
cd "%PROJECT_DIR%\server"
start "后端服务" cmd /k "mvn spring-boot:run"
echo ✓ 后端服务已启动

REM 等待后端启动
echo 等待后端服务启动...
timeout /t 15 /nobreak >nul

REM 启动前端用户端
echo.
echo [3/5] 启动前端用户端...
cd "%PROJECT_DIR%\vue\client_home"
set NODE_OPTIONS=--openssl-legacy-provider
start "前端用户端" cmd /k "npm run serve"
echo ✓ 前端用户端已启动

REM 启动后台管理系统
echo.
echo [4/5] 启动后台管理系统...
cd "%PROJECT_DIR%\vue\client_admin"
set NODE_OPTIONS=--openssl-legacy-provider
start "后台管理" cmd /k "npm run serve"
echo ✓ 后台管理系统已启动

echo.
echo =========================================
echo   所有服务已启动！
echo =========================================
echo.
echo 📱 访问地址：
echo    - 前端用户端: http://localhost:8080
echo    - 后台管理端: http://localhost:8081
echo    - 后端 API:   http://localhost:5000/api
echo.
echo 📝 默认账号：
echo    - 管理员账号: admin / admin
echo.
echo ⏳ 等待前端编译完成（首次启动需要几分钟）...
echo.
pause
```

**注意**：将 `YourUsername` 替换为你的实际用户名

### 停止所有服务

创建文件 `stop.bat`：
```batch
@echo off
chcp 65001 >nul
echo =========================================
echo   停止航班分析系统所有服务
echo =========================================
echo.

echo 正在停止服务...

REM 通过端口查找并关闭进程
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5000"') do (
    echo 停止后端服务 PID: %%a
    taskkill /F /PID %%a >nul 2>&1
)

for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8080"') do (
    echo 停止前端用户端 PID: %%a
    taskkill /F /PID %%a >nul 2>&1
)

for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8081"') do (
    echo 停止后台管理系统 PID: %%a
    taskkill /F /PID %%a >nul 2>&1
)

echo.
echo =========================================
echo   所有服务已停止
echo =========================================
echo.
pause
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

## 📊 端口说明

| 服务 | 端口 | 说明 |
|------|------|------|
| 后端 API | 5000 | Spring Boot 服务 |
| MySQL | 3309 | 数据库端口 |
| 前端用户端 | 8080 | Vue 开发服务器 |
| 后台管理端 | 8081 | Vue 开发服务器 |

## 🐛 常见问题

### 问题 1：MySQL 连接失败

**症状**：`Communications link failure`

**解决方案**：
1. 检查 MySQL 服务是否启动：
   ```cmd
   sc query MySQL80
   ```

2. 如果未启动，启动服务：
   ```cmd
   net start MySQL80
   ```

3. 检查端口是否为 3309

### 问题 2：端口被占用

**症状**：启动失败，提示端口已被使用

**解决方案**：
1. 查找占用端口的进程：
   ```cmd
   netstat -ano | findstr ":5000"
   ```

2. 记下 PID（最后一列数字）

3. 结束进程：
   ```cmd
   taskkill /F /PID <PID>
   ```

### 问题 3：Node.js 编译失败

**症状**：`OpenSSLError: unsupported`

**解决方案**：添加环境变量
```cmd
set NODE_OPTIONS=--openssl-legacy-provider
npm run serve
```

### 问题 4：Maven 依赖下载缓慢

**解决方案**：配置阿里云镜像

在 Maven 的 `settings.xml` 文件中添加（通常在 `C:\Users\YourUsername\.m2\` 目录）：

```xml
<mirrors>
  <mirror>
    <id>aliyun</id>
    <mirrorOf>central</mirrorOf>
    <name>Aliyun Maven</name>
    <url>https://maven.aliyun.com/repository/public</url>
  </mirror>
</mirrors>
```

### 问题 5：找不到 java 命令

**解决方案**：配置 JAVA_HOME 环境变量

1. 系统 -> 高级系统设置 -> 环境变量
2. 新建系统变量：
   - 变量名：`JAVA_HOME`
   - 变量值：`C:\Program Files\Java\jdk-11.x.x`
3. 编辑 Path 变量，添加：
   - `%JAVA_HOME%\bin`
   - `%JAVA_HOME%\jre\bin`

### 问题 6：前端编译速度慢

**解决方案**：
1. 关闭杀毒软件（临时）
2. 增加系统内存
3. 使用 SSD 硬盘

## 📝 开发环境推荐

### IDE 推荐

**后端开发（Java）**
- IntelliJ IDEA Community Edition（免费）
- Eclipse

**前端开发（Vue）**
- Visual Studio Code
- WebStorm

**数据库管理**
- MySQL Workbench
- Navicat for MySQL
- DBeaver

## 🚀 生产环境部署

### 前端打包

```cmd
cd vue\client_home
npm run build

cd ..\client_admin
npm run build
```

打包后的文件在 `dist` 目录，可以部署到 IIS 或 Nginx。

### 后端打包

```cmd
cd server
mvn clean package -DskipTests
```

打包后的 jar 文件在 `target` 目录。

### 使用 Windows 服务运行后端

使用 [WinSW](https://github.com/winsw/winsw) 或 [NSSM](https://nssm.cc/) 将 jar 包注册为 Windows 服务。

## 📞 技术支持

如遇到问题，请检查：
1. 所有服务是否都已启动
2. 防火墙是否阻止了端口
3. MySQL 数据库是否正常运行
4. 配置文件是否正确
5. JDK、Node.js 版本是否符合要求

## 📁 项目文件位置

```
C:\Users\YourUsername\Desktop\12\
├── server\                 # Spring Boot 后端服务
├── vue\
│   ├── client_home\        # 前端用户端
│   └── client_admin\       # 后台管理系统
├── hangkong.sql           # 数据库初始化脚本
├── start.bat              # 快速启动脚本
├── stop.bat               # 停止脚本
└── DEPLOYMENT_WINDOWS.md   # 本文档
```

---

**项目地址**：C:\Users\YourUsername\Desktop\12

**最后更新**：2026-03-24
