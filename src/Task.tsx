import React, {ChangeEvent, memo, useCallback} from 'react'
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "./AppWithRedux";


type TaskPropsType = {
    task: TaskType
    removeTask: (taskId:string) => void
    changeTaskStatus: (taskId:string, isDone:boolean) => void
    updateTask: (taskId:string, title:string) => void
}

const Task = memo( (props: TaskPropsType) => {
    const onClickHandler = () =>  props.removeTask(props.task.id)

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue)
    },[props.changeTaskStatus,props.task.id])

    const updateTaskHandler = useCallback((newTitle: string) => {
        props.updateTask(props.task.id, newTitle)
    },[props.updateTask, props.task.id])
    return (
            <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
                <input type="checkbox"
                       onChange={onChangeHandler}
                       checked={props.task.isDone}
                />
                <EditableSpan oldTitle={props.task.title}
                              callBack={updateTaskHandler}
                />
                <button onClick={onClickHandler}>x</button>
            </li>
    )
})

export default Task