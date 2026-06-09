# RESTful API 接口演示项目

这是一个完整的前后端交互示例，演示如何生成和使用标准的 RESTful API 接口。

## 技术栈

- **后端**: Node.js + Express (成熟的 Node.js Web 框架)
- **前端**: 原生 HTML + JavaScript (使用 Fetch API)
- **跨域处理**: CORS 中间件

## 项目结构

```
demo-api-project/
├── server.js          # 后端 API 服务器
├── index.html         # 前端页面
├── package.json       # 项目配置
└── README.md          # 说明文档
```

## API 接口说明

### 1. 获取所有用户
- **方法**: GET
- **路径**: `/api/users`
- **响应示例**:
```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "张三", "email": "zhangsan@example.com" },
    { "id": 2, "name": "李四", "email": "lisi@example.com" }
  ]
}
```

### 2. 获取单个用户
- **方法**: GET
- **路径**: `/api/users/:id`
- **响应示例**:
```json
{
  "success": true,
  "data": { "id": 1, "name": "张三", "email": "zhangsan@example.com" }
}
```

### 3. 创建用户
- **方法**: POST
- **路径**: `/api/users`
- **请求体**:
```json
{
  "name": "王五",
  "email": "wangwu@example.com"
}
```

### 4. 更新用户
- **方法**: PUT
- **路径**: `/api/users/:id`
- **请求体**:
```json
{
  "name": "新名字",
  "email": "newemail@example.com"
}
```

### 5. 删除用户
- **方法**: DELETE
- **路径**: `/api/users/:id`

## 快速开始

### 1. 启动后端服务

```bash
cd demo-api-project
npm start
```

服务将在 `http://localhost:3000` 启动

### 2. 打开前端页面

直接在浏览器中打开 `index.html` 文件，或者使用本地服务器：

```bash
# 方式一：使用 Python 简单服务器
python3 -m http.server 8080

# 方式二：使用 Node.js 的 http-server
npx http-server -p 8080
```

然后访问 `http://localhost:8080/index.html`

## 使用 curl 测试 API

```bash
# 获取所有用户
curl http://localhost:3000/api/users

# 获取单个用户
curl http://localhost:3000/api/users/1

# 创建用户
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"赵六","email":"zhaoliu@example.com"}'

# 更新用户
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"张三更新","email":"zhangsan_new@example.com"}'

# 删除用户
curl -X DELETE http://localhost:3000/api/users/1
```

## 前端调用示例

```javascript
const API_BASE = 'http://localhost:3000/api';

// GET 请求 - 获取所有用户
async function loadUsers() {
  const response = await fetch(`${API_BASE}/users`);
  const result = await response.json();
  console.log(result);
}

// POST 请求 - 创建用户
async function createUser(name, email) {
  const response = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email })
  });
  const result = await response.json();
  console.log(result);
}

// PUT 请求 - 更新用户
async function updateUser(id, name, email) {
  const response = await fetch(`${API_BASE}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email })
  });
  const result = await response.json();
  console.log(result);
}

// DELETE 请求 - 删除用户
async function deleteUser(id) {
  const response = await fetch(`${API_BASE}/users/${id}`, {
    method: 'DELETE'
  });
  const result = await response.json();
  console.log(result);
}
```

## 关键特性

1. **RESTful 设计**: 遵循 REST 架构风格，使用标准 HTTP 方法
2. **统一响应格式**: 所有接口返回统一的 JSON 格式
3. **错误处理**: 完善的错误处理和状态码返回
4. **跨域支持**: 配置 CORS 允许前端跨域访问
5. **JSON 解析**: 自动解析 JSON 请求体

## 注意事项

- 确保后端服务启动后再访问前端页面
- 前端页面需要与后端在同一网络环境或通过代理配置
- 本项目使用内存存储，重启服务后数据会重置
