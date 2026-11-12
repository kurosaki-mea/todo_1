# ToDoList
2026年10月8日20:03:37

# Vue3

2026年10月9日16:58:14
https://www.bilibili.com/video/BV1W1421173W


# tips
## 关于纯前端/前后端交互 main.ts

**1、纯前端版，取消注释这行：**
` import App from './App.vue' `
>初期采用 Vue 3 组合式 API 实现纯前端本地状态驱动的 TodoList，完成基础的增删改查交互逻辑。


**2、看 Nodejs 接口版时，取消注释这行：**
` import App from './AppApi.vue' `
>基于 Node.js + Express 搭建 RESTful API 后端服务，配合 Vue 3 实现了前后端分离的数据交互，通过 Axios 异步请求打通前后端数据链路

---

# 📝 Vue 3 + Node.js 全栈 TodoList 核心实战与备忘录

> 这是一个从**纯前端本地状态管理**演进到**前后端分离 API 交互**的全栈实战项目。项目不仅深度演练了 Vue 3 的组件化开发、响应式数据流与组件通信（Props/Emits），还横向对比探索了 **Node.js 原生 HTTP 模块**与 **Express 框架**的后端服务编写方式。

---

## 📂 项目目录结构全览

```
src/
├── ApiServer.js            # Node.js 独立 API 服务端核心脚本 (提供 RESTful 接口)
├── App.vue                 # 根组件 / 入口主视图
├── AppApi.vue              # 前后端 API 交互版主视图 (对接后端服务)
├── AppNodeExpress.js       # Express 框架后端实现学习脚本
├── AppNodeHTTP.js          # 原生 Node.js http 模块底层实现学习脚本
│
├── assets/                 # 静态资源库
│   ├── hero.png            # 视觉横幅图
│   ├── vite.svg            # Vite 徽标
│   └── vue.svg             # Vue 徽标
│
├── components/             # 功能与视图组件库
│   ├── ApiTodo_1.vue       # API 交互版 Todo 核心组件 (网络请求与数据同步)
│   ├── button.vue          # 通用按钮组件 (Props 属性传参演练)
│   ├── buttonEmits.vue     # 子传父交互按钮组件 (Emits 事件触发演练)
│   ├── ToDo_1.vue          # 纯前端版 Todo 基础组件 (本地响应式状态管理)
│   └── ToDo_2.vue          # 纯前端版 Todo 进阶组件 (复杂交互演练)
│
├── env.d.ts                # TypeScript 类型声明文件
├── main.ts                 # Vue 应用主入口文件
└── style.css               # 全局样式配置
```

---

## ⚡ 核心版本与技术模块逐一解析

### 版本一：纯前端响应式 TodoList (`ToDo_1.vue`, `ToDo_2.vue`)

* **核心技术点**：Vue 3 Composition API (`ref`, `reactive`)、计算属性 (`computed`)、列表渲染 (`v-for`)、条件渲染 (`v-if`)、表单双向绑定 (`v-model`)。
* **实现逻辑**：
  * 所有待办事项（添加、勾选完成、删除、统计未完成数量）均保存在前端内存（本地响应式数组）中。
  * 完美演练了组件间的基础通信：通过 `button.vue` 练习 **Props** 传值，通过 `buttonEmits.vue` 练习 **Emits** 事件派发，加深了对 Vue 单向数据流的理解。

---

### 版本二：前后端分离 API 交互版 (`ApiTodo_1.vue`, `AppApi.vue`, `ApiServer.js`)

* **核心技术点**：异步数据请求 (`fetch` 或 `axios`)、生命周期钩子 (`onMounted`)、跨域处理 (CORS)、前后端契约设计 (RESTful API)。
* **实现逻辑**：
  * 前端组件 `ApiTodo_1.vue` 挂载时向 Node.js 服务器发送 `GET` 请求获取初始化列表。
  * 用户进行“增、删、改”操作时，前端实时触发 `POST/PUT/DELETE` 请求同步到后端，服务器更新内存/数据库后再响应最新状态，实现真正的前后端分离闭环。

---

### 后端进阶：Node.js 双实现方案对比 (`AppNodeHTTP.js` vs `AppNodeExpress.js`)

项目中不仅编写了前端，还深入底层学习了 Node.js 编写 Web 服务的两种不同方式：

1. **原生 Node.js `http` 模块 (`AppNodeHTTP.js` / `ApiServer.js`)**：
   * **特点**：不依赖第三方框架，纯手动处理。
   * **核心收获**：手动使用 `http.createServer()` 创建服务；解析 `req.url` 和 `req.method` 实现基础路由分发；手动拼接 `req.on('data')` 与 `req.on('end')` 处理 POST 请求体数据；手动设置 `res.writeHead()` 写入响应头及处理 CORS 跨域头 (`Access-Control-Allow-Origin`)。
2. **Express 框架 (`AppNodeExpress.js`)**：
   * **特点**：现代化、简洁、企业级的高效后端开发方案。
   * **核心收获**：体验了 Express 如何通过中间件 (`app.use(express.json())`) 自动解析 JSON 请求体；利用简洁的路由方法 (`app.get()`, `app.post()`, `app.delete()`) 极大地简化了原生 `http` 模块中繁琐的字符串切割与条件判断。

---

## 🛠️ 代码编写规范与速查小结

* **前端解耦**：将 UI 展示组件（如 `button.vue`、`ToDo_1.vue`）与业务数据请求组件（`ApiTodo_1.vue`）彻底分开，代码层级清晰。
* **全栈思维**：通过同一项目的纯前端演练与 API 交互演练，深刻理解了“前端负责渲染与交互、后端负责数据持久化与接口分发”的现代 Web 核心架构。
