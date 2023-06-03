import {TaskStateType} from "../App";
import {v1} from "uuid";
import {addTodolistACType} from "./todolists-reducer";

export const tasksReducer = (state: TaskStateType, action: TasksAllACType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.params.todolistID]: state[action.params.todolistID]
                    .filter(el => el.id !== action.params.taskID)
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
            ...state, [action.payload.todolistID]:state[action.payload.todolistID].map(el =>
                el.id === action.payload.taskId ? {...el, isDone: action.payload.newIsDone} : el)
            }
        } case 'ADD-TODOLIST': {
            return {
            ...state, [action.payload.id]:[]
            }
        }
        default:
            return state
    }
}
export type TasksAllACType = removeTaskACType
    | addTaskACType
    | updateTaskACType
    | changeStatusACType
    | addTodolistACType


type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (params:{todolistID: string, taskID: string}) => {

    return {
        type: 'REMOVE-TASK',
            params
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

type changeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (todolistID: string, taskId: string, newIsDone: boolean) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            todolistID,
            taskId,
            newIsDone
        }
    } as const
}
