import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: TodolistsType[], action: TodolistAllACType): TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todolistID)
        }
        case 'ADD-TODOLIST': {
            const newTodo: TodolistsType = {id: action.payload.todolistID, title: action.payload.newTitle, filter: "all"}
            return [...state, newTodo]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.payload.todolistID ? {...el, title: action.payload.newTitle} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.payload.todolistID ? {...el, filter: action.payload.valueFilter}: el)
        }
        default:
            return state
    }
}

export type TodolistAllACType = removeTodolistACType | addTodolistACType | updateTodolistACType | changeFilterAC

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
            todolistID: v1(),// создаем общий ключ для task-reducer - todolist-reducer
            newTitle
        }
    } as const
}

type updateTodolistACType = ReturnType<typeof updateTodolistAC>
export const updateTodolistAC = (todolistID: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistID,
            newTitle
        }
    } as const
}

type changeFilterAC = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistID: string, valueFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistID,
            valueFilter
        }
    }as const
}



