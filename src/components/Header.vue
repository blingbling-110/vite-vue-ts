<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="content" @keyup.enter="addToList"/>
  </div>
</template>

<script lang="ts">
export default {
  name: "Header"
}
</script>

<script setup lang="ts">
import {ref} from "vue";

const props = defineProps({
  addItem: {
    type: Function,
    required: true
  }
})

const content = ref('')

function addToList() {
  if (!content.value.trim()) {
    // 输入为空
    return
  }

  const item = {id: Date.now(), content: content.value, isCompleted: false}
  props.addItem(item)

  // 清空
  content.value = ''
}
</script>

<style scoped>
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
