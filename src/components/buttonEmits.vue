<script setup>

// 引入 emits, 往父组件传递数据
// 自定义事件（Emits）
import { defineEmits } from 'vue';

// 往外传递数据 子发东西给父 传递了ok
// 1. 声明子组件可以触发的事件名称（比如叫 'buttonEmits_click'）
const emit = defineEmits( ['buttonEmits_click'] )    // 事件的名字叫 buttonEmits_click

function send(){
    // 处理数据
    // 2. 触发事件，第一个参数是事件名，第二个参数是要传递给父组件的数据
    emit('buttonEmits_click', '这是子组件里的消息或数据！子组件传递给父组件数据')
}

</script>
<template>
    <!-- 3. 点击按钮时触发 send 函数 -->
    <button @click="send" type="button">点我 子组件往父组件发消息</button>
</template>
<style scoped>
/* .button { */
button {
    margin: 100px 0 0 200px;
    width: 210px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: antiquewhite;
    border-radius: 10px;
}
</style>