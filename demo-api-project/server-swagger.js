const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = 3000;

// 中间件
app.use(cors());
app.use(express.json());

// Swagger 配置 - 自动生成 API 文档网页
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '用户管理 API 文档',
      version: '1.0.0',
      description: '这是一个自动生成的标准 RESTful API 文档，支持在线调试和测试',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: '本地开发服务器',
      },
    ],
  },
  apis: ['./server.js'], // 指定包含 JSDoc 注释的文件路径
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// 挂载 Swagger UI 到 /api-docs 路径
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 模拟数据库数据
let users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: 'user' }
];
let nextId = 3;

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
 *           description: 用户自动生成的 ID
 *           example: 1
 *         name:
 *           type: string
 *           description: 用户姓名
 *           example: 张三
 *         email:
 *           type: string
 *           description: 用户邮箱
 *           example: zhangsan@example.com
 *         role:
 *           type: string
 *           description: 用户角色
 *           example: admin
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 用户管理接口
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: 获取所有用户列表
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 返回用户列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
app.get('/api/users', (req, res) => {
  res.json(users);
});

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
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: '用户未找到' });
  res.json(user);
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: 创建新用户
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: 用户创建成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: 请求参数错误
 */
app.post('/api/users', (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: '姓名和邮箱是必填项' });
  }
  const newUser = { id: nextId++, name, email, role: role || 'user' };
  users.push(newUser);
  res.status(201).json(newUser);
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: 更新用户信息
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: 更新成功
 *       404:
 *         description: 用户未找到
 */
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: '用户未找到' });
  
  const { name, email, role } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  if (role) user.role = role;
  
  res.json(user);
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: 删除用户
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: 删除成功
 *       404:
 *         description: 用户未找到
 */
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: '用户未找到' });
  
  const deletedUser = users.splice(index, 1)[0];
  res.json({ message: '删除成功', user: deletedUser });
});

app.listen(PORT, () => {
  console.log(`✅ 服务器运行在 http://localhost:${PORT}`);
  console.log(`📚 API 文档已自动生成，请访问: http://localhost:${PORT}/api-docs`);
});
