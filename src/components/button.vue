<script setup>

// 引入 props, 接收数据
// 引入 emits, 往父组件传递数据
import { defineProps, defineEmits } from 'vue';

// 接收数据参数 子接收父 接收了text
const props = defineProps( ['text'] )

</script>
<template>
    <!-- 父组件 往 子组件 传值，然后子组件接收 -->
    <!-- 把接收到的数据 text渲染出来 -->
    <button type="button">{{ props.text }}</button>
    <!-- <div class="button">点我</div> -->
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