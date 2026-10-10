<script setup>
// 引入 ref 
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 创建一个变量，获取存储输入的文字
const aTodoText = ref('')
// 创建一个数组，把每一项存入
const aTodoList = ref([])
//
// 1. 【GET】页面加载时，从 Node 后端获取数据
const fetchTodos = async () => {
    try {
        // 注意：如果前端和后端端口不一致，这里需要写完整的 http://localhost:3000/api/todos
        const res = await axios.get('http://localhost:3000/api/todos');
        aTodoList.value = res.data.data; // 把后端的数据赋给前端列表
        console.log('GET获取到的数据：', aTodoList.value);
    } catch (error) {
        console.error('获取失败', error);
    }
};
// 2. 【POST】增加数据
// 2. 【POST】点击按钮时，把新待办发给 Node 后端存起来
const addTodo = async () => {
    if (!aTodoText.value.trim()) {
        alert('请输入待办事项内容！'); // 弹窗提醒用户
        return;// 终止执行
    }
    try {
        const res = await axios.post('http://localhost:3000/api/todos', {
            text: aTodoText.value
        });

        console.log('后端保存成功，返回的新数据：', res.data.data);
        // 把后端返回的新条目推到前端数组里实时显示
        aTodoList.value.push(res.data.data);
        aTodoText.value = '';
    } catch (error) {
        console.error('添加失败', error);
    }
};

// 页面一挂载就去拿数据
onMounted(() => {
    fetchTodos();
    console.log('数组内容：')
    console.log(aTodoList.value)
});

// 3. 【delete】删除
// 删除
// 删除指定的todo ,索引为 index 的位置元素
const delTodo = async (id) => {
    try {
        // 1. 发送 DELETE 请求给后端，把 id 拼在网址后面
        const res = await axios.delete(`http://localhost:3000/api/todos/${id}`)
        // 2. 后端删成功后，前端同步更新：留下所有 id 不等于当前被删 id 的项（也就是让它在页面上消失）
        aTodoList.value = aTodoList.value.filter(item => item.id !== id);
        console.log('删除成功！');
    } catch (error) {
        console.log('删除失败', error)
    }
}

</script>


<template>
    <div class="todo-app">
        <div class="title">Todo App API版（Node.js）</div>

        <div class="todo-from">
            <input v-model="aTodoText" class="todo-input" type="text" placeholder="输入今日待办 ToDo" />
            <div @click="addTodo" class="todo-button">add todo</div>
        </div>

        <!-- v-for根据数组的元素数创建内容，itemAAA代表每一项/对象，aTodoList代表总的数组 -->
        <!-- 其中v-for="(itemAAA, index) 的 index 是每一个对象的下标，第几个-->
        <div v-for="(itemAAA, index) in aTodoList" :key="itemAAA.id" :class="[itemAAA.isComplete ? 'completed item' : 'item']">
            <!-- 如果isComplete为true被选中，则类名为 complete和item，反之item -->
            <div>
                <!-- v-model控制选中状态 由item里的isComplete的true false决定 -->
                <input v-model="itemAAA.isComplete" type="checkbox" />
                <span class="name">{{ itemAAA.text }}</span>
                <span>======id：{{ itemAAA.id }}</span>
            </div>
            <div @click="delTodo(itemAAA.id)" class="del">del</div>
        </div>
    </div>
</template>


<style scoped>
.completed {
    /* 中间的删除线样式 */
    text-decoration: line-through;
    opacity: 0.4;
}

.del {
    color: red;
}

.item {
    /* 每一项todo的样式，如果是被选中划掉的还需要额外带上 .completed 样式  */
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    height: 50px;
    margin: 8px auto;
    padding: 16px;
    border-radius: 20px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 20px;
}

.todo-from {
    display: flex;
    margin-top: 30px;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
}

.todo-button {
    width: 100px;
    height: 50px;
    border-radius: 0 20px 20px 0;
    line-height: 50px;
    text-align: center;
    background: linear-gradient(to right,
            rgb(113, 65, 168),
            rgba(44, 114, 251, 1));
    cursor: pointer;
    user-select: none;
    color: #ffff;
}

.todo-input {
    box-sizing: border-box;
    padding-left: 15px;
    border: 1px solid #dfe1e5;
    outline: none;
    width: 60%;
    height: 50px;
    border-radius: 20px 0 0 20px;
}


body {
    background: linear-gradient(to right,
            rgb(113, 65, 168),
            rgba(44, 114, 251, 1));
}

.todo-app {
    width: 98%;
    height: 500px;
    padding-top: 30px;
    box-sizing: border-box;
    background-color: #ffff;
    border-radius: 5px;
    margin-top: 40px;
    margin-left: 1%;
}

.title {
    font-size: 30px;
    font-weight: 700;
    text-align: center;
}
</style>