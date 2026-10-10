import express from 'express';

const app = express();

// 💡 关键点 1：让 Express 能够自动解析前端发过来的 JSON 数据
app.use(express.json());

// ----------------------------------------------------
// 1. 模拟一个 GET 请求：前端来拿数据
// ----------------------------------------------------
app.get('/api/user', (req, res) => {
  // 模拟一些数据返回给前端
  res.json({
    code: 200,
    message: 'GET 请求成功！',
    data: {
      name: 'GAOWEI',
      role: '前端开发者',
      stack: ['Vue 3', 'TypeScript', 'Node.js']
    }
  });
});

// ----------------------------------------------------
// 2. 模拟一个 POST 请求：前端发数据过来（比如提交表单、发 JSON）
// ----------------------------------------------------
app.post('/api/posts', (req, res) => {
  // req.body 就是前端发过来的 JSON 数据（得益于上面那句 app.use(express.json())）
  const postData = req.body;
  
  console.log('收到前端发来的数据啦：', postData);

  // 给前端一个回应
  res.json({
    code: 200,
    message: 'POST 数据接收成功！',
    receivedData: postData
  });
});

// 3. 启动服务，监听 3000 端口
app.listen(3000, () => {
  console.log('Express 服务器已经跑在 http://localhost:3000 啦！');
});