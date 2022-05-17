<template>
  <h3 :style="{color}">ChildComponent age: {{ age }}, length: {{ length }}</h3>
</template>

<script lang="ts">
export default {
  name: "ChildComponent"
}
</script>

<script setup lang="ts">
import {computed, inject, Ref, toRef} from "vue";

const props = defineProps({
      age: {
        type: Number,
        required: true
      }
    }),
    length = useGetLength(toRef(props, 'age')),
    color: string = inject('color')!

function useGetLength(age: Ref) {
  return computed(() => age.value.toString().length)
}
</script>

<style scoped>

</style>
