import express from 'express';
//  引入 cors    CORS 跨域安全策略拦截。
import cors from 'cors';

const app = express();

// 1. 允许前端跨域（非常重要！因为 Vue 项目和 Node 后端端口往往不一样
// 必须放在所有路由的最前面！
app.use(cors());
// 2. 让 Express 能解析 JSON
app.use(express.json());

// 模拟一个存在服务器内存里的 Todo 列表数据库
let todoList = [
    { id: 1, text: '吃饭', isComplete: false },
    { id: 2, text: '喝水', isComplete: true },
    { id: 3, text: '喝水x2', isComplete: false },
    { id: 4, text: '喝水x3', isComplete: true },
    { id: 5, text: '喝水x4', isComplete: false }

];

// ----------------------------------------------------
// 1. GET 接口：获取所有 Todo
// ----------------------------------------------------
app.get('/api/todos', (req, res) => {
    res.json({
        code: 200,
        message: '获取待办列表成功',
        data: todoList
    });
});

// ----------------------------------------------------
// 2. POST 接口：新增一个 Todo
// ----------------------------------------------------
app.post('/api/todos', (req, res) => {
    // 接收前端发过来的数据，比如 { text: "写一篇博客" }
    const { text } = req.body;
    console.log('==========')
    console.log(req)
    if (!text) {
        return res.status(400).json({ code: 400, message: '内容不能为空！' });
    }

    // 构造一个新的 todo 对象
    const newTodo = {
        id: Date.now(), // 用当前时间戳当做唯一的 id
        text: text,
        isComplete: false
    };

    // 存入后端的“数据库”（数组）中
    todoList.push(newTodo);

    // console.log('当前最新的 Todo 列表：', todoList);

    // 把添加成功后的最新列表（或者新条目）返回给前端
    res.json({
        code: 200,
        message: '添加成功！',
        data: newTodo
    });
});

// ----------------------------------------------------
// 3. DELETE 接口：根据 id 删除指定的 Todo
// ----------------------------------------------------
app.delete('/api/todos/:id', (req, res) => {
    // 1. 获取前端传过来的 id（注意：URL 里的 :id 会被存在 req.params 里）
    const todoId = Number(req.params.id); // 转换成数字

    // 2. 在数组里找一找，看看这个 id 的数据排在第几个（索引）
    const index = todoList.findIndex(item => item.id === todoId);

    // 3. 如果找不到（索引是 -1），说明传错 id 了
    if (index === -1) {
        return res.status(404).json({ code: 404, message: '找不到该待办事项！' });
    }

    // 4. 找到了！把它从数组里删除（从 index 开始，删 1 个）
    todoList.splice(index, 1);
    // 返回前端数据：删除成功
    res.json({
        code: 200,
        message: '删除成功'
    });
})







// 启动服务
app.listen(3000, () => {
    console.log('TodoList 后端服务已启动：http://localhost:3000');
});