<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import MyComponent from "./components/MyComponent.vue";
import OtherComposition from './components/OtherComposition.vue'
import OtherAPI from './components/OtherAPI.vue'
import TodoList from './components/TodoList.vue'
import {defineAsyncComponent, provide, ref} from "vue";

const note = ref('传入MyComponent的属性(prop)')
const showDef = ref(false)
const showChild = ref(false)
const showOC = ref(false)
const showOA = ref(false)
const showTodo = ref(true)
const color = ref('red')
// const OtherAPI = defineAsyncComponent(() => import('./components/OtherAPI.vue'))

provide('color', color)

function handleEmit(input: string) {
  note.value += input
}
</script>

<template>
  <button @click="showDef = !showDef">切换显示HelloWorld</button>
  <button @click="showChild = !showChild">切换显示MyComponent</button>
  <button @click="showOC = !showOC">切换显示OtherComposition</button>
  <button @click="showOA = !showOA">切换显示OtherAPI</button>
  <button @click="showTodo = !showTodo">切换显示TODO List</button>
  <br>
  <img alt="Vue logo" src="./assets/logo.png" v-if="showDef"/>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" v-if="showDef"/>
  <h1 v-if="showChild">{{ note }}</h1>
  <div v-if="showOC">
    <h3>{{ color }}</h3>
    <button @click="color='red'">red</button>
    <button @click="color='green'">green</button>
    <button @click="color='blue'">blue</button>
  </div>
  <MyComponent note="note" noProps="no-props" @emitEvent="handleEmit" v-if="showChild"/>
  <OtherComposition v-if="showOC"></OtherComposition>
  <suspense>
    <template #default>
      <OtherAPI v-if="showOA"></OtherAPI>
    </template>
    <template v-slot:fallback>
      <h2>加载中...</h2>
    </template>
  </suspense>
  <TodoList v-if="showTodo"></TodoList>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}
</style>
