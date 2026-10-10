// 1. 引入 Node.js 自带的 http 模块
// import 
import http from 'http';

// 2. 创建一个简单的服务器
const server = http.createServer((req, res) => {
  // 设置响应头，告诉浏览器：“我是用 UTF-8 编码的文本回复你的”
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  
  // 给访问者的回复内容
-  res.end('你好！这是我的第一个 Node.js 服务器！');
});

// 3. 让服务器在 3000 端口监听
server.listen(3000, () => {
  console.log('服务器已经运行啦！快打开 http://localhost:3000 看看吧');
});