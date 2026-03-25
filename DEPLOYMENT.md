# 基于Hadoop的航班分析系统 - 本地部署文档

## 📋 项目概述

本项目是一个基于 Hadoop 的航班分析系统，包含以下模块：
- **后端服务**：Spring Boot + MySQL
- **前端用户端**：Vue 2（端口 8080）
- **后台管理系统**：Vue 2（端口 8081）

## 🖥️ 系统要求

### 必需软件
- **JDK**: 11 或更高版本
- **Maven**: 3.6 或更高版本
- **Node.js**: 14.x 或更高版本（推荐使用 18.x）
- **MySQL**: 8.0 或更高版本
- **Git**: 用于版本控制

### 可选软件
- **IDE**: IntelliJ IDEA / Eclipse / VS Code
- **Navicat/DBeaver**: MySQL 数据库管理工具

## 📦 部署步骤

### 第一步：安装数据库

#### 1. 安装 MySQL 8.0

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install mysql-server -y
sudo systemctl start mysql
sudo systemctl enable mysql
```

**CentOS/RHEL:**
```bash
sudo yum install mysql-server -y
sudo systemctl start mysqld
sudo systemctl enable mysqld
```

**Windows:**
下载并安装 MySQL 8.0：https://dev.mysql.com/downloads/mysql/

**macOS:**
```bash
brew install mysql
brew services start mysql
```

#### 2. 创建数据库和导入数据

```bash
# 登录 MySQL
mysql -u root -p

# 在 MySQL 命令行中执行：
CREATE DATABASE IF NOT EXISTS hangkong CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hangkong;
SOURCE /path/to/hangkong.sql;

# 或者在命令行直接导入
mysql -u root -p hangkong < /path/to/hangkong.sql
```

#### 3. 创建数据库用户（可选）

```sql
-- 如果不想使用 root 用户，可以创建专门的用户
CREATE USER 'hangkong'@'localhost' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON hangkong.* TO 'hangkong'@'localhost';
FLUSH PRIVILEGES;
```

### 第二步：配置并启动后端服务

#### 1. 进入后端项目目录

```bash
cd /home/yingzi/桌面/12/server
```

#### 2. 检查并修改配置文件

配置文件位置：`src/main/resources/application.yml`

```yaml
server:
  port: 5000
  servlet:
    context-path: /api

spring:
  datasource:
    url: jdbc:mysql://127.0.0.1:3309/hangkong?serverTimezone=GMT%2B8&useSSL=false&characterEncoding=utf-8
    username: root
    password: 123456  # 修改为你的 MySQL 密码
    driver-class-name: com.mysql.cj.jdbc.Driver
```

**注意**：如果你的 MySQL 端口不是 3309，请修改 `url` 中的端口号。

#### 3. 清理并重新编译项目

```bash
# 清理之前的编译
mvn clean

# 编译项目（跳过测试）
mvn package -DskipTests

# 或者使用 IDE 直接运行 Spring Boot 应用
```

#### 4. 启动后端服务

**方式一：使用 Maven 命令**
```bash
mvn spring-boot:run
```

**方式二：使用 IDE**
- IntelliJ IDEA：找到 `server/src/main/java/... 中的主启动类`，右键运行
- Eclipse：作为 Spring Boot App 运行

**方式三：使用 jar 包**
```bash
# 编译打包
mvn clean package -DskipTests

# 运行 jar 包
java -jar target/server-0.0.1-SNAPSHOT.jar
```

#### 5. 验证后端服务

打开浏览器访问：
- http://localhost:5000/api

或使用 curl 测试：
```bash
curl http://localhost:5000/api/flight_information/get_list?page=1&size=10
```

### 第三步：配置并启动前端用户端

#### 1. 进入前端用户端目录

```bash
cd /home/yingzi/桌面/12/vue/client_home
```

#### 2. 安装依赖

```bash
# 使用 npm
npm install

# 或使用 cnpm（中国用户推荐，速度更快）
npm install -g cnpm --registry=https://registry.npmmirror.com
cnpm install

# 或使用 yarn
yarn install
```

**注意**：如果 Node.js 版本是 22.x，需要添加 OpenSSL 标志：
```bash
export NODE_OPTIONS="--openssl-legacy-provider"
npm install
```

#### 3. 配置代理

配置文件：`vue.config.js`

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
        target: 'http://127.0.0.1:5000',  // 后端地址
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

```bash
# 如果使用 Node.js 22.x
export NODE_OPTIONS="--openssl-legacy-provider"
npm run serve

# 或直接运行
npm run serve
```

#### 5. 验证前端服务

打开浏览器访问：http://localhost:8080

### 第四步：配置并启动后台管理系统

#### 1. 进入后台管理目录

```bash
cd /home/yingzi/桌面/12/vue/client_admin
```

#### 2. 安装依赖

```bash
# 参考用户端的安装步骤
npm install

# Node.js 22.x 用户
export NODE_OPTIONS="--openssl-legacy-provider"
npm install
```

#### 3. 配置代理

配置文件：`vue.config.js`（如果没有则创建）

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

```bash
# Node.js 22.x 用户
export NODE_OPTIONS="--openssl-legacy-provider"
npm run serve

# 或直接运行
npm run serve
```

#### 5. 验证后台管理

打开浏览器访问：http://localhost:8081

## 🔐 默认账号信息

### 后台管理系统
- 用户名：admin
- 密码：admin

### 用户端
需要先注册账号

## 📊 端口说明

| 服务 | 端口 | 说明 |
|------|------|------|
| 后端 API | 5000 | Spring Boot 服务 |
| MySQL | 3309 | 数据库（外部访问端口） |
| 前端用户端 | 8080 | Vue 开发服务器 |
| 后台管理端 | 8081 | Vue 开发服务器 |

## 🚀 启动顺序

**完整启动流程：**

1. **启动 MySQL**
   ```bash
   sudo systemctl start mysql  # Linux
   ```

2. **启动后端服务**
   ```bash
   cd /home/yingzi/桌面/12/server
   mvn spring-boot:run
   ```

3. **启动前端用户端**（新终端）
   ```bash
   cd /home/yingzi/桌面/12/vue/client_home
   export NODE_OPTIONS="--openssl-legacy-provider"  # Node.js 22.x
   npm run serve
   ```

4. **启动后台管理系统**（新终端）
   ```bash
   cd /home/yingzi/桌面/12/vue/client_admin
   export NODE_OPTIONS="--openssl-legacy-provider"  # Node.js 22.x
   npm run serve
   ```

## 🐛 常见问题

### 问题 1：MySQL 连接失败

**错误信息**：`Communications link failure`

**解决方案**：
1. 检查 MySQL 是否启动：
   ```bash
   sudo systemctl status mysql
   ```

2. 检查端口是否正确：
   ```bash
   netstat -an | grep 3309
   ```

3. 检查配置文件中的端口和密码是否正确

### 问题 2：前端编译失败（Node.js 22.x）

**错误信息**：`OpenSSLError: unsupported`

**解决方案**：
```bash
export NODE_OPTIONS="--openssl-legacy-provider"
npm run serve
```

### 问题 3：后端启动失败

**错误信息**：`Port 5000 is already in use`

**解决方案**：
```bash
# 查找占用端口的进程
lsof -i:5000

# 杀死进程
kill -9 <PID>
```

### 问题 4：API 请求失败（CORS 错误）

**解决方案**：确保后端已添加 CORS 配置，或在 `vue.config.js` 中配置了代理

### 问题 5：Maven 依赖下载缓慢

**解决方案**：配置阿里云镜像

在 `~/.m2/settings.xml` 中添加：
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

## 📝 生产环境部署

### 前端打包

```bash
# 用户端
cd /home/yingzi/桌面/12/vue/client_home
npm run build

# 管理端
cd /home/yingzi/桌面/12/vue/client_admin
npm run build
```

打包后的文件在 `dist` 目录，可以部署到 Nginx 或其他 Web 服务器。

### 后端打包

```bash
cd /home/yingzi/桌面/12/server
mvn clean package -DskipTests
```

打包后的 jar 文件在 `target` 目录。

运行：
```bash
java -jar target/server-0.0.1-SNAPSHOT.jar
```

## 📞 技术支持

如遇到问题，请检查：
1. 所有服务是否都已启动
2. 端口是否被占用
3. MySQL 数据库是否正常运行
4. 配置文件是否正确

---

**项目地址**：/home/yingzi/桌面/12

**最后更新**：2026-03-24
