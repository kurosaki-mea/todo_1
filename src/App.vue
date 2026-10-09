<script setup lang="ts">
import { ref } from 'vue';
// 第一个todolist
// import ToDo_1 from './components/ToDo_1.vue'

// 第二个todolist，测试watch
import ToDo_2 from './components/ToDo_2.vue'
// 父组件 传给 子组件
import MyButton from './components/button.vue'
// 子组件 传给 父组件
import MyButtonEmits from './components/buttonEmits.vue'

// 声明一个变量保存从子组件传上来的数据  子 传 父
const messageFromChild = ref('');
function add(val: any) {
  messageFromChild.value = val;
  console.log('收到子组件数据：', val);
}
</script>

<template>
  <!-- <ToDo_1 /> -->
  <ToDo_2 />
  <!-- 按钮组件 button -->
  <!-- 父组件 往 子组件 传值 -->
  <MyButton text="你好，这是第一个"></MyButton>
  <MyButton text="你好，我是第二个"></MyButton>
  <!-- 子组件 往 父组件 传值 -->
  <MyButtonEmits @buttonEmits_click="add" text="你好，最后是第三个" />
  <p>父组件接收到的内容：{{messageFromChild}}</p>
</template>
