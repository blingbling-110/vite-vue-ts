<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isCompleteAllAll"/>
    </label>
    <span>
          <span>已完成{{ completed }}</span> / 全部{{ todoArr.length }}
        </span>
    <button class="btn btn-danger" @click="delCompleted">清除已完成任务</button>
  </div>
</template>

<script lang="ts">
export default {
  name: "Footer"
}
</script>

<script setup lang="ts">
import {ITodoItem} from "../types/todo";
import {computed} from "vue";

const props = defineProps<{
  todoArr: ITodoItem[],
  completeAll: Function,
  delCompleted: (payload: MouseEvent) => void,
}>()

const completed = computed(() => props.todoArr.filter(item => item.isCompleted).length)
const isCompleteAllAll = computed<boolean>({
  get() {
    return completed.value > 0 && completed.value === props.todoArr.length
  },
  set(val) {
    props.completeAll(val)
  }
})
</script>

<style scoped>
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
