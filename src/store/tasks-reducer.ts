import {TaskStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType} from "./todolists-reducer";

const initialState: TaskStateType = {}

export const tasksReducer = (state = initialState, action: TasksAllACType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID]
                    .filter(el => el.id !== action.payload.taskID)
            }

        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]}
        }
        case 'UPDATE-TASK': {
            return {
                ...state, [action.payload.todolistID]: state[action.payload.todolistID].map(el =>
                    el.id === action.payload.taskID ? {...el, title: action.payload.newTitle} : el)
            }
        }
        case 'CHANGE-STATUS': {
            return {
                ...state, [action.payload.todolistID]: state[action.payload.todolistID].map(el =>
                    el.id === action.payload.taskId ? {...el, isDone: action.payload.newIsDone} : el)
            }
            //ниже task-reducer научился реагировать на тип action-а из todolist-reducer
        }
        case 'ADD-TODOLIST': {
            return {
                ...state, [action.payload.todolistID]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            // let copyState = {...state}
            // delete copyState[action.payload.todolistID]
            // return copyState
            const {[action.payload.todolistID]: [], ...rest} = state
            return rest
            //rest -  альтернатива  delete: и то и то удаляет св-во из объекта
            // -деструктурируем объект -> берем св-во, кот-ое надо удалить -> присваеваем любое
            // -значение (напр. [])
            // -берем оставшуюся часть оьбъекта ...rest
            // -обозначаем тот объект, который деструктурируем: state
            //  и возвращаем  rest

        }

        default:
            return state
    }
}
export type TasksAllACType = removeTaskACType
    | addTaskACType
    | updateTaskACType
    | changeTaskStatusACType
    | addTodolistACType // этот тип импоритрован из todolist-reducer
    | removeTodolistACType


type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID: string, taskID: string) => {

    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistID,
            taskID
        }
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistID,
            title
        }
    } as const
}

type updateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistID: string, taskID: string, newTitle: string) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            todolistID,
            taskID,
            newTitle
        }
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistID: string, taskId: string, newIsDone: boolean) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            todolistID,
            taskId,
            newIsDone
        }
    } as const
}

