import React, {ChangeEvent} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {TaskType, TodolistsType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskAC} from "./store/tasks-reducer";
import {changeFilterAC, removeTodolistAC, updateTodolistAC} from "./store/todolists-reducer";


type PropsType = {
   todolist: TodolistsType
}

export function TodolistWithRedux({todolist}: PropsType) {

    const {id, filter, title} = todolist
    // деструктуризация пропсов - берем что надо
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])

    if (filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }

    const dispatch = useDispatch()

    const onAllClickHandler = () => dispatch(changeFilterAC(id, 'all'));
    const onActiveClickHandler = () => dispatch(changeFilterAC(id, "active"))
    const onCompletedClickHandler = () => dispatch(changeFilterAC(id, "completed"))
    const removeTodolistHandler = () => {dispatch(removeTodolistAC(id))}
    const addTaskHandler = (title: string) => {dispatch(addTaskAC(id, title))}
    //здесь в пар-ры  принимаем newTitle (здесь даем ему название просто title),  переданный callback-ом  из AddItemForm
    //  и передаем вместе с todolistID в callback addTask в комп-ту App

    const updateTaskHandler = (taskID: string, newTitle: string) => {
        dispatch(updateTaskAC(id, taskID, newTitle))
    }

    const updateTodolistHandler = (newTitle: string) => {
        dispatch(updateTodolistAC(id, newTitle))
    }

    return <div>
        <h3>
            <EditableSpan oldTitle={title} callBack={updateTodolistHandler}/>
            <button onClick={removeTodolistHandler}>X</button>
        </h3>
        < AddItemForm callBack={addTaskHandler}/>

        <ul>
            {
                tasks. map(t => {
                    const onClickHandler = () =>  dispatch(removeTaskAC(id, t.id))

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDone = e.currentTarget.checked
                        dispatch(changeTaskStatusAC(id, t.id, newIsDone))
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        {/*<span>{t.title}</span>*/}
                        <EditableSpan oldTitle={t.title}
                                      callBack={(newTitle) => updateTaskHandler(t.id, newTitle)
                                      }/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
