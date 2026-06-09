# 📚 自动生成 API 文档网页演示

## 概述

本项目演示了如何使用 **Swagger UI** 自动生成美观的 API 接口文档网页。通过简单的代码注释，即可生成可交互的 API 文档。

## 技术栈

- **后端**: Node.js + Express
- **API 文档**: Swagger UI + swagger-jsdoc
- **前端**: HTML + JavaScript (Fetch API)

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动服务（带 API 文档）

```bash
node server-swagger.js
```

### 3. 访问地址

- 🔗 **API 文档网页**: http://localhost:3000/api-docs
- 🔗 **API 接口**: http://localhost:3000/api/users

---

## 📝 核心原理

### 步骤 1: 安装 Swagger 相关包

```bash
npm install swagger-ui-express swagger-jsdoc
```

### 步骤 2: 配置 Swagger

```javascript
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '用户管理 API 文档',
      version: '1.0.0',
      description: '自动生成的 RESTful API 文档',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./server.js'], // 扫描包含注释的文件
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
```

### 步骤 3: 添加 JSDoc 注释

在路由函数上方添加标准的 JSDoc 注释：

```javascript
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: 获取所有用户列表
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 返回用户列表
 */
app.get('/api/users', (req, res) => {
  res.json(users);
});
```

---

## 🔌 API 接口列表

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/users` | 获取所有用户 |
| GET | `/api/users/:id` | 获取单个用户 |
| POST | `/api/users` | 创建用户 |
| PUT | `/api/users/:id` | 更新用户 |
| DELETE | `/api/users/:id` | 删除用户 |

---

## 🧪 测试示例

### 使用 curl 测试

```bash
# 获取所有用户
curl http://localhost:3000/api/users

# 创建用户
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"王五","email":"wangwu@example.com"}'

# 获取单个用户
curl http://localhost:3000/api/users/1

# 更新用户
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"张三 updated"}'

# 删除用户
curl -X DELETE http://localhost:3000/api/users/1
```

### 使用 Swagger UI 测试

1. 打开浏览器访问 http://localhost:3000/api-docs
2. 展开任意接口
3. 点击 "Try it out" 按钮
4. 填写参数（如果需要）
5. 点击 "Execute" 执行请求
6. 查看响应结果

---

## ✨ Swagger 注释示例

### 定义数据模型 (Schema)

```javascript
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: 用户 ID
 *         name:
 *           type: string
 *           description: 用户姓名
 *         email:
 *           type: string
 *           description: 用户邮箱
 */
```

### 定义接口标签 (Tags)

```javascript
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 用户管理接口
 */
```

### 完整接口示例

```javascript
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: 根据 ID 获取单个用户
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 用户 ID
 *     responses:
 *       200:
 *         description: 返回单个用户
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: 用户未找到
 */
app.get('/api/users/:id', (req, res) => {
  // ...
});
```

---

## 🎯 优势

1. **自动化**: 只需添加注释，文档自动生成
2. **可交互**: 直接在网页上测试 API
3. **标准化**: 遵循 OpenAPI 3.0 规范
4. **实时更新**: 代码变更后重启服务即可更新文档
5. **团队协作**: 前端开发者可通过文档了解接口

---

## 📁 项目结构

```
demo-api-project/
├── server.js              # 基础版服务端（无文档）
├── server-swagger.js      # 带 Swagger 文档的服务端 ⭐
├── index.html             # 前端调用示例页面
├── package.json           # 项目依赖配置
└── README.md              # 本文档
```

---

## 🔗 参考链接

- [Swagger 官方文档](https://swagger.io/docs/)
- [OpenAPI 规范](https://spec.openapis.org/)
- [swagger-jsdoc GitHub](https://github.com/Surnet/swagger-jsdoc)
- [swagger-ui-express GitHub](https://github.com/scottie1984/swagger-ui-express)
