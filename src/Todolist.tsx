import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    updateTask: (todolistID: string, taskID: string, newTitle: string) => void
    updateTodolist: (todolistIDCurrent: string, newTitle: string) => void
    // taskID: string
}

export function Todolist(props: PropsType) {

    // let [title, setTitle] = useState("")
    // let [error, setError] = useState<string | null>(null)

    // const addTask = () => {
    //     if (title.trim() !== "") {
    //         props.addTask(props.todolistID, title.trim());
    //         setTitle("");
    //     } else {
    //         setError("Title is required");
    //     }
    // }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }

    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.charCode === 13) {
    //         addTask();
    //     }
    // }

    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }
    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistID, title)
    }
    //здесь в пар-ры  принимаем newTitle (здесь даем ему название просто title),  переданный callback-ом  из AddItemForm
    //  и передаем вместе с todolistID в callback addTask в комп-ту App

    const updateTaskHandler = (taskID: string, newTitle: string) => {
        props.updateTask(props.todolistID, taskID, newTitle)
    }

    const updateTodolistHandler = (newTitle: string) => {
        props.updateTodolist(props.todolistID, newTitle)
    }

    return <div>
        <h3>
            <EditableSpan oldTitle={props.title} callBack={updateTodolistHandler}/>
            <button onClick={removeTodolistHandler}>X</button>
        </h3>
        < AddItemForm callBack={addTaskHandler}/>

        <ul>
            {
                props.tasks.map(t => {
                    // debugger

                    // const onClickHandler = () => props.removeTask(props.todolistID, t.taskID)

                    const onClickHandler = () => props.removeTask(props.todolistID, t.id)

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
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
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
