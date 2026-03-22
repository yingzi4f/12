# 使用 Node.js 14 版本
FROM node:14-alpine

# 设置工作目录
WORKDIR /app

# 设置 npm 镜像源
RUN npm config set registry https://registry.npmmirror.com

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY . .

# 修复 sockjs 的 uuid 依赖问题 - 强制使用兼容版本
RUN rm -rf /app/node_modules/sockjs/node_modules/uuid && \
    mkdir -p /app/node_modules/sockjs/node_modules && \
    cp -r /app/node_modules/uuid /app/node_modules/sockjs/node_modules/uuid

# 修复 node_modules 权限问题
RUN chmod -R 755 /app/node_modules/.bin

# 暴露端口
EXPOSE 8081

# 启动开发服务器
CMD ["npm", "run", "dev"]
