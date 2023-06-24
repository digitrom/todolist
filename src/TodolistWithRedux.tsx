import React, {ChangeEvent, memo, useCallback, useMemo} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {TaskType, TodolistsType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskAC} from "./store/tasks-reducer";
import {changeFilterAC, removeTodolistAC, updateTodolistAC} from "./store/todolists-reducer";
import Task from "./Task";
import Button from "./Button";


type PropsType = {
    todolist: TodolistsType
}

export const TodolistWithRedux = memo(({todolist}: PropsType) => {

    const {id, filter, title} = todolist
    // деструктуризация пропсов - берем что надо
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])

    // console.log('TodolistWithRedux')

    useMemo(() => {
        if (filter === "active") {
            tasks = tasks.filter(t => t.isDone === false);
        }
        if (filter === "completed") {
            tasks = tasks.filter(t => t.isDone === true);
        }
        return tasks
    },[filter])

    const dispatch = useDispatch()

    const onAllClickHandler = useCallback(() =>
        dispatch(changeFilterAC(id, 'all')),[dispatch]);
    const onActiveClickHandler = useCallback(() =>
        dispatch(changeFilterAC(id, "active")),[dispatch])
    const onCompletedClickHandler = useCallback(() =>
        dispatch(changeFilterAC(id, "completed")),[dispatch])
    const removeTodolistHandler = () =>
        dispatch(removeTodolistAC(id))
    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC(id, title))
    }, [dispatch])
    //здесь в пар-ры  принимаем newTitle (здесь даем ему название просто title),  переданный callback-ом  из AddItemForm
    //  и передаем вместе с todolistID в callback addTask в комп-ту App

    const updateTask = useCallback((taskID: string, newTitle: string) => {
        dispatch(updateTaskAC(id, taskID, newTitle))
    }, [dispatch])

    const removeTask = (taskId: string) => dispatch(removeTaskAC(id, taskId))

    const changeTaskStatus = useCallback((taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(id, taskId, isDone))
    }, [dispatch])

    const updateTodolistHandler = useCallback((newTitle: string) => {
        dispatch(updateTodolistAC(id, newTitle))
    }, [dispatch])

    return <div>
        <h3>
            <EditableSpan oldTitle={title} callBack={updateTodolistHandler}/>
            <button onClick={removeTodolistHandler}>X</button>
        </h3>
        < AddItemForm callBack={addTaskHandler}/>

        <ul>
            {
                tasks.map(t => {
                    return <Task task={t}
                                 key={t.id}
                                 removeTask={removeTask}
                                 changeTaskStatus={changeTaskStatus}
                                 updateTask={updateTask}

                    />
                })
            }
        </ul>
        <div>
            <Button
                title={'All'}
                callback={onAllClickHandler}
                className={filter === 'all' ? "active-filter" : ''}
            />
            <Button
                title={'Active'}
                callback={onActiveClickHandler}
                className={filter === 'active' ? "active-filter" : ''}
            />
            <Button
                title={'Completed'}
                callback={onCompletedClickHandler}
                className={filter === 'completed' ? "active-filter" : ''}
            />
        </div>
    </div>
})
