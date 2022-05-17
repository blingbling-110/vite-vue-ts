import {Ref, ref, UnwrapRef} from "vue";
import axios from "axios";

export function useAjaxRequest<T>(url: string) {
    const loading = ref(true),
        data = ref<T | null>(null),
        errorMsg = ref('')

    //发送请求
    axios.get(url)
        .then(response => data.value = response.data as UnwrapRef<T>)
        .catch(error => errorMsg.value = error.message || '未知错误')
        .finally(() => loading.value = false)

    return {
        loading,
        data,
        errorMsg
    }
}
