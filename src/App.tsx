import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";


export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
    }

    function removeTask(todolistID: string, taskID: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskID)});
    }

    function addTask(todolistID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        console.log(tasks, todolistID)
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]});
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    const updateTask = (todolistID: string, taskID: string, newTitle: string) => {
        console.log(newTitle)
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, title: newTitle} : el)
        })
    }

    const updateTodolist = (todolistID: string, newTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newTitle} : el))
    }

    const addTodolist = (newTitle: string) => {
        const newID = v1()
        const newTodo: TodolistsType = {id: newID, title: newTitle, filter: "all"}
        setTodolists([...todolists, newTodo])
        setTasks({...tasks, [newID]: []})
    }

    function changeStatus(todolistID: string, taskId: string, newIsDone: boolean) {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone: newIsDone} : el)
        })
    }

    function changeFilter(todolistID: string, valueFilter: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: valueFilter} : el))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container>
                <Grid container style={{padding: "20px"}}><AddItemForm callBack={addTodolist}/></Grid>
                <Grid container spacing={3}>{todolists.map(el => {
                    let tasksForTodolist = tasks[el.id]

                    if (el.filter === "active") {
                        tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                    }
                    if (el.filter === "completed") {
                        tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                    }
                    return <Grid item>
                            <Paper style={{padding: "10px"}} elevation={3} >
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
                    </Paper>
                        </Grid>
                })}</Grid>
            </Container>

        </div>
    );
}

export default App;
