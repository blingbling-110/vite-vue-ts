const reactiveHandler = {
    get(target, prop) {
        if (prop === '_is_reactive') {
            return true
        }
        const res = Reflect.get(target, prop)
        console.debug('拦截了get: ', target, prop, res)
        return res
    },
    set(target, prop, value) {
        const res = Reflect.set(target, prop, value)
        console.debug('拦截了set: ', target, prop, value)
        return res
    },
    deleteProperty(target, prop) {
        const res = Reflect.deleteProperty(target, prop)
        console.debug('拦截了deleteProperty: ', target, prop)
        return res
    }
}

function shallowReactive(target) {
    if (target && typeof target !== 'object') {
        return target
    }
    return new Proxy(target, reactiveHandler)
}

function reactive(target) {
    if (target && typeof target !== 'object') {
        return target
    }
    // 判断和递归
    if (Array.isArray(target)) {
        target.forEach((item, index) => {
            target[index] = reactive(item)
        })
    } else {
        Object.keys(target).forEach(key => {
            target[key] = reactive(target[key])
        })
    }
    return new Proxy(target, reactiveHandler)
}

const readonlyHandler = {
    get(target, prop) {
        if (prop === '_is_readonly') {
            return true
        }
        const res = Reflect.get(target, prop)
        console.debug('拦截了readonly get: ', target, prop, res)
        return res
    },
    set(target, prop, value) {
        console.debug('拦截了readonly set: ', target, prop, value)
        return true
    },
    deleteProperty(target, prop) {
        console.debug('拦截了readonly deleteProperty: ', target, prop)
        return true
    }
}

function shallowReadonly(target) {
    if (target && typeof target !== 'object') {
        return target
    }
    return new Proxy(target, readonlyHandler)
}

function readonly(target) {
    if (target && typeof target !== 'object') {
        return target
    }
    // 判断和递归
    if (Array.isArray(target)) {
        target.forEach((item, index) => {
            target[index] = readonly(item)
        })
    } else {
        Object.keys(target).forEach(key => {
            target[key] = readonly(target[key])
        })
    }
    return new Proxy(target, readonlyHandler)
}

function shallowRef(target) {
    return {
        _value: target,
        _is_ref: true,
        get value() {
            console.debug('拦截了ref get: ', target)
            return this._value
        },
        set value(val) {
            console.debug('拦截了ref set: ', target, val)
            this._value = val
        }
    }
}

function ref(target) {
    if (target && typeof target === 'object') {
        target = reactive(target)
    }
    return shallowRef(target)
}

function isRef(obj) {
    return obj && obj._is_ref
}

function isReactive(obj) {
    return obj && obj._is_reactive
}

function isReadonly(obj) {
    return obj && obj._is_readonly
}
