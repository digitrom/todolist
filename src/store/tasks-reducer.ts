import {TaskStateType} from "../App";

export const tasksReducer = (state: TaskStateType, action: TasksAllACType):TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state,[action.payload.todolistID]: state[action.payload.todolistID].filter(el => el.id !== action.payload.taskID) }
        }
        default:
            return state
    }
}
export type TasksAllACType = removeTaskACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload:{
            todolistID,
            taskID
        }
    }as const
}
