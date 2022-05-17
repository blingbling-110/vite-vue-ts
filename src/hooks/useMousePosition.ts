import {onBeforeUnmount, onMounted, reactive, ref, toRefs} from "vue";

export function useMousePosition() {
    const position = reactive({
        x: -1,
        y: -1
    })

    function clickHandler(event: MouseEvent) {
        position.x = event.pageX
        position.y = event.pageY
    }

    onMounted(() => window.addEventListener('click', clickHandler))
    onBeforeUnmount(() => window.removeEventListener('click', clickHandler))

    return {...toRefs(position)}
}
