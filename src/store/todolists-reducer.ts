import {TodolistsType} from "../App";

export const todolistsReducer = (state:TodolistsType[], action: AllReducersType ):TodolistsType[] => {
switch (action.type) {
    case 'REMOVE-TODOLIST': {
        return state.filter(el => el.id !== action.payload)
    }
    default:
        return state
    }
}

export type AllReducersType = removeTodolistACType
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: id
    } as const
}