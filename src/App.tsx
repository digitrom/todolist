import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {
    todolistsReducer,
    removeTodolistAC,
    addTodolistAC,
    updateTodolistAC,
    changeFilterAC
} from "./store/todolists-reducer";
import {addTaskAC, changeStatusAC, removeTaskAC, tasksReducer, updateTaskAC} from "./store/tasks-reducer";

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

function App() {

    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, dispatchTodolists] = useReducer(todolistsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ],
    });

    const addTodolist = (newTitle: string) => {
        // const newID = v1()
        // const newTodo: TodolistsType = {id: newID, title: newTitle, filter: "all"}
        // setTodolists([...todolists, newTodo])
        // setTasks({...tasks, [newID]: []})

        const action = addTodolistAC(newTitle);
        dispatchTodolists(action)
        dispatchTasks(action)
        // dispatchTodolists(addTaskAC(todolistID, title))
        // dispatchTasks(addTaskAC(newTitle))
    }

    const updateTodolist = (todolistID: string, newTitle: string) => {
        // setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newTitle} : el))
        dispatchTodolists(updateTodolistAC(todolistID, newTitle))
    }

    const removeTodolist = (todolistID: string) => {
        // setTodolists(todolists.filter(el => el.id !== todolistID))
        // delete tasks[todolistID]
        dispatchTodolists(removeTodolistAC(todolistID))

    }

    function addTask(todolistID: string, title: string) {
        // let newTask = {id: v1(), title: title, isDone: false};
        // console.log(tasks, todolistID)
        // setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]});
        // // let newTasks = [task, ...tasks];
        // // setTasks(newTasks);
        dispatchTasks(addTaskAC(todolistID, title))
    }

    function removeTask(todolistID: string, taskID: string) {
        // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskID)});
        dispatchTasks(removeTaskAC(todolistID, taskID))
    }

    const updateTask = (todolistID: string, taskID: string, newTitle: string) => {
        // console.log(newTitle)
        // setTasks({
        //     ...tasks,
        //     [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, title: newTitle} : el)
        // })
        dispatchTasks(updateTaskAC(todolistID, taskID, newTitle))
    }

    function changeStatus(todolistID: string, taskId: string, newIsDone: boolean) {
        // setTasks({
        //     ...tasks,
        //     [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone: newIsDone} : el)
        // })
        dispatchTasks(changeStatusAC(todolistID, taskId, newIsDone))
    }

    function changeFilter(todolistID: string, valueFilter: FilterValuesType) {
        // setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: valueFilter} : el))
        dispatchTodolists(changeFilterAC(todolistID, valueFilter))
    }

    return (
        <div className="App">
            < AddItemForm callBack={addTodolist}/>
            {todolists.map(el => {
                let tasksForTodolist = tasks[el.id]

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                }
                return (
                    <Todolist
                        todolistID={el.id}
                        key={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        removeTodolist={removeTodolist}
                        updateTask={updateTask}
                        updateTodolist={updateTodolist}
                    />
                )
            })}

        </div>
    );
}

export default App;
