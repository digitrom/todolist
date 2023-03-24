import {TodolistsType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state:TodolistsType[], action: AllReducersType ):TodolistsType[] => {
switch (action.type) {
    case 'REMOVE-TODOLIST': {
        return state.filter(el => el.id !== action.payload.todolistID)
    }
    case 'ADD-TODOLIST': {
        const newID = v1()
        const  newTodo: TodolistsType = {id: newID, title:action.payload.newTitle, filter: "all"}
        return [...state, newTodo]
    }
    case 'CHANGE-TODOLIST-TITLE': {
        return state.map(el => el.id === action.payload.todolistID ? {...el, title: action.payload.newTitle} : el)
    }
    default:
        return state
    }
}

export type AllReducersType = removeTodolistACType | addTodolistACType | updateTodolistACType

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistID
        }
    } as const
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTitle
        }
    }as const
}

type updateTodolistACType = ReturnType<typeof updateTodolistAC>
export const updateTodolistAC = (todolistID: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistID,
            newTitle
        }
    }as const
}



