<template>
  <hr>
  <h2>{{ count }}</h2>
  <button @click="updateCount">更新</button>
  <h3>{{ person.name }}</h3>
  <h3>{{ person.age }}</h3>
  <h3>{{ person.gender }}</h3>
  <h3>{{ person.wife }}</h3>
  <button @click="updatePerson">更新</button>
  <p>接收到note：{{ note }}</p>
  <h2>{{ dataCount }}</h2>
  <button @click="funcInMethos">调用methods中的方法</button>
  <button @click="emitMethod">分发事件</button>
  <h2>refObj: {{ refObj }}</h2>
  <button @click="update">更新数据</button>
  <h2>计算属性和监视</h2>
  <fieldset>
    <legend>姓名操作</legend>
    姓氏：<input type="text" placeholder="请输入姓氏" v-model="user.lastName">
    <br>
    名字：<input type="text" placeholder="请输入名字" v-model="user.firstName">
  </fieldset>
  <fieldset>
    <legend>计算属性和监视的演示</legend>
    姓名：<input type="text" placeholder="显示姓名" :value="fullName1" ref="inputRef">
    <br>
    姓名：<input type="text" placeholder="显示姓名" v-model="fullName2">
    <br>
    姓名：<input type="text" placeholder="显示姓名" v-model="fullName3">
  </fieldset>
  <h2>x: {{ x }}, y： {{ y }}</h2>
  <h3 v-if="loading">Loading...</h3>
  <h3 v-else-if="errorMsg">error: {{ errorMsg }}</h3>
  <!-- <ul v-else-if="data?.address">
    <li>id: {{ data.id }}</li>
    <li>address: {{ data.address }}</li>
    <li>distance: {{ data.distance }}</li>
  </ul> -->
  <ul v-else v-for="product in data" :key="product.id">
    <li>id: {{ product.id }}</li>
    <li>title: {{ product.title }}</li>
    <li>price: {{ product.price }}</li>
  </ul>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount, onBeforeUnmount,
  onBeforeUpdate,
  onMounted, onUnmounted, onUpdated,
  reactive,
  ref,
  watch,
  watchEffect
} from "vue";
import {useMousePosition} from "../hooks/useMousePosition";
import {useAjaxRequest} from "../hooks/useAjaxRequest";

interface IPerson {
  name: string,
  age: number | string,
  wife?: IPerson,
  gender?: string
}

interface IAddress {
  id: number,
  address: string,
  distance: string
}

interface IProduct {
  id: string,
  title: string,
  price: number
}

export default defineComponent({
  name: 'MyComponent',
  props: ['note'],
  emits: ['emitEvent'],
  setup(props, context) {
    console.debug('调用vue3 setup(), this:', this)
    console.log('setup参数：', props, context, context.attrs.noProps)

    const count = ref(0)
    console.log('count: ', count)

    function updateCount() {
      count.value++
    }

    const person: IPerson = reactive({
      name: 'blingbling',
      age: 26,
      wife: {
        name: 'nobody',
        age: 'unknown'
      }
    })
    console.log('person: ', person)

    function updatePerson() {
      person.name += '_'
      ;(person.age as number)++
      person.wife && (person.wife.name += '_')
      person.wife && (person.wife.age += '+')
      person.gender = '女'
      delete person.wife
    }

    function emitMethod() {
      context.emit('emitEvent', '+')
    }

    // ref处理对象
    const refObj = ref({
      name: 'blingbling',
      age: 26,
      wife: {
        name: 'nobody',
        age: 'unknown'
      }
    })
    console.log('refObj: ', refObj)

    function update() {
      refObj.value.wife.name += '+'
    }

    const user = reactive({
      lastName: 'bling',
      firstName: 'bling'
    })

    // 计算属性
    const fullName1 = computed(() => user.lastName + '_' + user.firstName)
    console.log('computed: ', fullName1)
    const fullName2 = computed({
      get() {
        return user.lastName + '_' + user.firstName
      },
      set(value: string) {
        console.log('set computed: ', value)
        const names = value.split('_')
        user.lastName = names[0]
        user.firstName = names[1]
      }
    })

    const fullName3 = ref('')
    // 监视
    watch(user, ({lastName, firstName}) => {
      fullName3.value = lastName + '_' + firstName
    }, {immediate: true, deep: true})
    watchEffect(() => {
      const names = fullName3.value.split('_')
      user.lastName = names[0]
      user.firstName = names[1]
    })
    watch([() => user.lastName, () => user.firstName], () => console.log('调用了watch()监视多个数据'))

    onBeforeMount(() => console.debug('调用vue3 onBeforeMount'))
    onMounted(() => console.debug('调用vue3 onMounted'))
    onBeforeUpdate(() => console.debug('调用vue3 onBeforeUpdate'))
    onUpdated(() => console.debug('调用vue3 onUpdated'))
    onBeforeUnmount(() => console.debug('调用vue3 onBeforeUnmount'))
    onUnmounted(() => console.debug('调用vue3 onUnmounted'))

    const {x, y} = useMousePosition()
    // const {loading, data, errorMsg} = useAjaxRequest<IAddress>('/data/address.json')
    const {loading, data, errorMsg} = useAjaxRequest<IProduct[]>('/data/products.json')
    watch(data, () => {
      if (data.value) {
        console.log("products' amount: ", data.value.length)
      }
    })

    const inputRef = ref<HTMLElement | null>(null)
    onMounted(() => inputRef.value && inputRef.value.focus())

    return {
      count,
      updateCount,
      person,
      updatePerson,
      emitMethod,
      refObj,
      update,
      user,
      fullName1,
      fullName2,
      fullName3,
      x,
      y,
      loading,
      data,
      errorMsg,
      inputRef
    }
  },
  data() {
    return {
      count: 10,
      dataCount: 10
    }
  },
  methods: {
    funcInMethos() {
      console.log('methods中的funcInMethos()方法')
    },
    updatePerson() {
      console.log('methods中的updatePerson()方法')
    }
  },
  beforeCreate() {
    console.debug('调用vue2 beforeCreate()')
  },
  created() {
    console.debug('调用vue2 created()')
  },
  beforeMount() {
    console.debug('调用vue2 beforeMount()')
  },
  mounted() {
    console.debug('调用vue2 mounted(), this: ', this)
  },
  beforeUpdate() {
    console.debug('调用vue2 beforeUpdate()')
  },
  updated() {
    console.debug('调用vue2 updated()')
  },
  // beforeDestroy() {
  //   console.debug('调用vue2 beforeDestroy()')
  // },
  beforeUnmount() {
    console.debug('调用vue2 beforeUnmount()')
  },
  // destroyed() {
  //   console.debug('调用vue2 destroyed()')
  // },
  unmounted() {
    console.debug('调用vue2 unmounted()')
  }
})
</script>

<style scoped>

</style>
