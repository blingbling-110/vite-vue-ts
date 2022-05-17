<template>
  <li @mouseenter="mouseHandler(true)" @mouseleave="mouseHandler(false)"
      :style="{backgroundColor: bgColor, color: color}">
    <label>
      <input type="checkbox" v-model="calcCompleted"/>
      <span>{{ item.content }}</span>
    </label>
    <button class="btn btn-danger" v-show="showDel" @click="del">删除</button>
  </li>
</template>

<script lang="ts">
export default {
  name: "Item"
}
</script>

<script setup lang="ts">
import {ITodoItem} from "../types/todo";
import {computed, inject, ref} from "vue";

const props = defineProps({
  item: {
    type: Object as () => ITodoItem,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

function mouseHandler(flag: boolean) {
  if (flag) {
    bgColor.value = 'pink'
    color.value = 'white'
    showDel.value = true
  } else {
    bgColor.value = 'white'
    color.value = 'black'
    showDel.value = false
  }
}

function del() {
  if (confirm('确定要删除吗？')) {
    delItem(props.index)
  }
}

const bgColor = ref('white')
const color = ref('black')
const showDel = ref(false)
const delItem: Function = inject('delItem')!
const updateItem: Function = inject('updateItem')!
const calcCompleted = computed<boolean>({
  get() {
    return props.item.isCompleted
  },
  set(val) {
    updateItem(props.item, val)
  }
})
</script>

<style scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  /*display: none;*/
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>
