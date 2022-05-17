<template>
  <hr>
  <h3>{{ shallowReactiveV }}</h3>
  <h3>{{ shallowRefV }}</h3>
  <button @click="update0">更新0</button>
  <h3>{{ readonlyV }}</h3>
  <h3>{{ shallowReadonlyV }}</h3>
  <button @click="update1">更新1</button>
  <h3>{{ toRawV }}</h3>
  <h3>{{ markRawV }}</h3>
  <button @click="update2">更新2</button>
  <h3>person:{{ person }}</h3>
  <h3>name:{{ name }}</h3>
  <h3>age:{{ age }}</h3>
  <button @click="update3">更新3</button>
  <ChildComponent :age="age"></ChildComponent>
  <input type="text" v-model="keyword">
  <h3>{{ keyword }}</h3>
</template>

<script setup lang="ts">
import {
  customRef, isProxy, isReactive, isReadonly, isRef,
  markRaw,
  reactive,
  readonly,
  ref,
  shallowReactive,
  shallowReadonly,
  shallowRef,
  toRaw,
  toRef
} from "vue";
import ChildComponent from './ChildComponent.vue'

const shallowReactiveV = shallowReactive({
      name: 'blingbling',
      age: 26,
      wife: {
        name: 'nobody',
        age: 'unknown'
      }
    }),
    shallowRefV = shallowRef({
      name: 'blingbling',
      age: 26,
      wife: {
        name: 'nobody',
        age: 'unknown'
      }
    }),
    readonlyV = readonly(reactive({
      name: 'blingbling',
      age: 26,
      wife: {
        name: 'nobody',
        age: 'unknown'
      }
    })),
    shallowReadonlyV = shallowReadonly(reactive({
      name: 'blingbling',
      age: 26,
      wife: {
        name: 'nobody',
        age: 'unknown'
      }
    })),
    toRawV = toRaw(reactive({
      name: 'blingbling',
      age: 26,
      wife: {
        name: 'nobody',
        age: 'unknown'
      }
    })),
    markRawV = markRaw(reactive({
      name: 'blingbling',
      age: 26,
      wife: {
        name: 'nobody',
        age: 'unknown'
      }
    })),
    person = reactive({
      name: 'blingbling',
      age: 9,
      wife: {
        name: 'nobody',
        age: 'unknown'
      }
    }),
    name = ref(person.name),
    age = toRef(person, 'age'),
    // keyword = ref('keyword')
    keyword = useDebouncedRef('keyword', 500)

console.log('isRef(name): ', isRef(name))
console.log('isReactive(person): ', isReactive(person))
console.log('isReadonly(readonlyV): ', isReadonly(readonlyV))
console.log('isReadonly(shallowReadonlyV): ', isReadonly(shallowReadonlyV))
console.log('isProxy(person): ', isProxy(person))
console.log('isProxy(readonlyV): ', isProxy(readonlyV))
console.log('isProxy(shallowReadonlyV): ', isProxy(shallowReadonlyV))

function update0() {
  shallowReactiveV.name += '+'
  shallowReactiveV.wife.name += '+'
  shallowRefV.value.name += '+'
  shallowRefV.value.wife.name += '+'
  console.log(shallowReactiveV, shallowRefV)
}

function update1() {
  // readonlyV.name += '+'
  // readonlyV.wife.name += '+'
  // shallowReadonlyV.name += '+'
  shallowReadonlyV.wife.name += '+'
}

function update2() {
  toRawV.name += '+'
  toRawV.wife.name += '+'
  markRawV.name += '+'
  markRawV.wife.name += '+'
}

function update3() {
  // person.age += 1
  name.value += '+'
  age.value += 1
}

function useDebouncedRef<T>(value: T, delay: number = 200) {
  let timer: number
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue: T) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}
</script>

<style scoped>

</style>
