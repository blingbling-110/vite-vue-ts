<template>
  <hr>
  <button @click="showModal=true">打开对话框</button>
  <teleport to="body">
    <div v-if="showModal" class="modal">
      <div>Modal</div>
      <button @click="showModal=false">关闭对话框</button>
    </div>
  </teleport>
  <h3>{{ data }}</h3>
</template>

<script lang="ts">
export default {
  name: "OtherAPI"
}
</script>

<script setup lang="ts">
import {ref} from "vue";
import axios from "axios";

const showModal = ref(false)
const data = await axios.get('/data/address.json')
    .then(response => response.data)
</script>

<style scoped>
.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 300px;
  height: 300px;
  padding: 5px;
}
</style>
