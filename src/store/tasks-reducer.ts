import {TaskStateType} from "../App";
import {v1} from "uuid";

export const tasksReducer = (state: TaskStateType, action: TasksAllACType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(el => el.id !== action.payload.taskID)
            }
        }
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]}
        }
        case 'UPDATE-TASK': {
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].map(el =>
                    el.id === action.payload.taskID ? {...el, title: action.payload.newTitle}: el)}
        }
        default:
            return state
    }
}
export type TasksAllACType = removeTaskACType
    | addTaskACType
    | updateTaskACType


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