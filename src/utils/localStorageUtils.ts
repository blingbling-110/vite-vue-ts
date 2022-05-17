import {ITodoItem} from "../types/todo";

function saveTodoArr(todoArr: ITodoItem[]) {
    localStorage.setItem('todoArr', JSON.stringify(todoArr))
}

function loadTodoArr() {
    return JSON.parse(localStorage.getItem('todoArr') || '[]')
}

export {saveTodoArr, loadTodoArr}
