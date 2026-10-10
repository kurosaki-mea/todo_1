<script setup>
// 引入 ref 
import { ref } from 'vue';


// 创建一个变量，获取存储输入的文字
const aTodoText = ref('')
// 创建一个数组，把每一项存入
const aTodoList = ref([
    {
        isComplete: false,  // 状态：是否被选中 / 完成或者未完成
        text: "吃饭"
    },
    {
        isComplete: true,  // 状态：是否被选中 / 完成或者未完成
        text: "睡觉"
    },
    {
        isComplete: true,  // 状态：是否被选中 / 完成或者未完成
        text: "喝水"
    },

])

function add() {
    console.log(aTodoList.value)
    // 追加新的todo到list中
    aTodoList.value.push({
        isComplete: false,
        text: aTodoText.value
    })
    // 然后清空刚刚的输入框内容
    aTodoText.value = ''
}
// 删除指定的todo ,索引为 index 的位置元素
function del(index) {
    alert('您已删除该待办：\n' + aTodoList.value[index].text)
    // 从数组 list[index] 开始删除，删除 1 个元素
    aTodoList.value.splice(index, 1)
}

</script>


<template>
    <div class="todo-app">
        <div class="title">Todo App API版（Node.js）</div>

        <div class="todo-from">
            <input v-model="aTodoText" class="todo-input" type="text" placeholder="输入今日待办 ToDo" />
            <div @click="add" class="todo-button">add todo</div>
        </div>

        <!-- v-for根据数组的元素数创建内容，itemAAA代表每一项/对象，aTodoList代表总的数组 -->
        <!-- 其中v-for="(itemAAA, index) 的 index 是每一个对象的下标，第几个-->
        <!-- <div v-for="itemAAA in aTodoList" class="item completed"> -->
        <div v-for="(itemAAA, index) in aTodoList" 
            :class="[itemAAA.isComplete ? 'completed item' : 'item']">
            <!-- 如果isComplete为true被选中，则类名为 complete和item，反之item -->
            <div>
                <!-- v-model控制选中状态 由item里的isComplete的true false决定 -->
                <input v-model="itemAAA.isComplete" type="checkbox" />
                <span class="name">{{ itemAAA.text }}</span>
            </div>
            <div @click="del(index)" class="del">del</div>
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