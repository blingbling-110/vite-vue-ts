<template>
  <hr>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addItem="addItem"></Header>
      <List :todoArr="todos.todo"></List>
      <Footer :todoArr="todos.todo" :completeAll="completeAll" :delCompleted="delCompleted"></Footer>
    </div>
  </div>
</template>

<script lang="ts">
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import List from "./List.vue";
import Item from "./Item.vue";

export default {
  name: "TodoList",
  components: {Header, Footer, List, Item}
}
</script>

<script setup lang="ts">
import {onMounted, provide, reactive, watch} from "vue";
import {ITodoItem} from "../types/todo";
import {loadTodoArr, saveTodoArr} from "../utils/localStorageUtils";

const todos = reactive<{ todo: ITodoItem[] }>({
  todo: []
})

function addItem(item: ITodoItem) {
  todos.todo.unshift(item)
}

function delItem(index: number) {
  todos.todo.splice(index, 1)
}

function updateItem(item: ITodoItem, isCompleted: boolean) {
  item.isCompleted = isCompleted
}

function completeAll(flag: boolean) {
  todos.todo.forEach(item => item.isCompleted = flag)
}

function delCompleted() {
  todos.todo = todos.todo.filter(item => !item.isCompleted)
}

provide('delItem', delItem)
provide('updateItem', updateItem)

watch(() => todos.todo, saveTodoArr, {deep: true})

onMounted(() => setTimeout(() => todos.todo = loadTodoArr(), 500))
</script>

<style scoped>
.todo-container {
  width: 600px;
  margin: 0 auto;
}

.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
