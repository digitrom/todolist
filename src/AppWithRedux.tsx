import React from 'react';
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {
    removeTodolistAC,
    addTodolistAC,
    updateTodolistAC,
    changeFilterAC,
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TodolistWithRedux} from "./TodolistWithRedux";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: TaskType[]
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function AppWithRedux() {

    let todolists  = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)

    // let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    // таски не нужны в этой компоненте, мы их отмапили в Todolist
    //поэтому их нажо удалить из App, иначе будет перерендерриваться все компоненты, т.к.
    // есть useSelector, который забирает часть стейта с таксами из стора, который при
    // измененении любой таски ререндиерит всю родительскую компоненту App

    const dispatch = useDispatch()
    const addTodolist = (newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    }

    const updateTodolist = (todolistID: string, newTitle: string) => {
        dispatch(updateTodolistAC(todolistID, newTitle))
    }

    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }

    function addTask(todolistID: string, title: string) {
        dispatch(addTaskAC(todolistID, title))
    }

    function removeTask(todolistID: string, taskID: string) {
        dispatch(removeTaskAC(todolistID, taskID))
    }

    const updateTask = (todolistID: string, taskID: string, newTitle: string) => {
        dispatch(updateTaskAC(todolistID, taskID, newTitle))
    }

    function changeStatus(todolistID: string, taskId: string, newIsDone: boolean) {
        dispatch(changeTaskStatusAC(todolistID, taskId, newIsDone))
    }

    function changeFilter(todolistID: string, valueFilter: FilterValuesType) {
        dispatch(changeFilterAC(todolistID, valueFilter))
    }

    return (
        <div className="App">
            < AddItemForm callBack={addTodolist}/>
            {todolists.map(el => {
                return (
                    <TodolistWithRedux
                     todolist={el}
                    />
                )
            })}

        </div>
    );
}

export default AppWithRedux;
