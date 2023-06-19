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
    changeFilterAC,
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, updateTaskAC} from "./store/tasks-reducer";

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

    let todolistID1 = v1();
    let todolistID2 = v1();

    // если надо - типизация reducer: useReducer<Reducer<TodolistsType[], TodolistAllACType>>
    let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
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
        ],
    });

    const addTodolist = (newTitle: string) => {

        // dispatchTodolists(addTodolistAC(newTitle))
        // dispatchTasks(addTodolistAC(newTitle))
        // елси мы напишем так, то при добавлении todolist, приложение ломается, т.к.
        // создаются новые экшены с одинаковым type: "ADD-TODOLIST",
        // но с разными id, которые генерируется в каждом action  свой
        // поэтому создадим action здесь, звпустив action creator:

        const action = addTodolistAC(newTitle);
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    const updateTodolist = (todolistID: string, newTitle: string) => {
        dispatchTodolists(updateTodolistAC(todolistID, newTitle))
    }

    const removeTodolist = (todolistID: string) => {
        // dispatchTodolists(removeTodolistAC(todolistID))
        // dispatchTasks(removeTodolistAC(todolistID))

        // здесь удаляет без проблем, т.к объекты эквивалентны т.е.,
        // action, который мы создали addToodlist имеет те же св-ва в том числе и id
        // но и здесь лучше создать экшен, т.к. мы избавляем ОЗУ от лишнего объекта

        const action = removeTodolistAC(todolistID)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    function addTask(todolistID: string, title: string) {
        dispatchTasks(addTaskAC(todolistID, title))
    }

    function removeTask(todolistID: string, taskID: string) {
        dispatchTasks(removeTaskAC(todolistID, taskID))
    }

    const updateTask = (todolistID: string, taskID: string, newTitle: string) => {
        dispatchTasks(updateTaskAC(todolistID, taskID, newTitle))
    }

    function changeStatus(todolistID: string, taskId: string, newIsDone: boolean) {
        dispatchTasks(changeTaskStatusAC(todolistID, taskId, newIsDone))
    }

    function changeFilter(todolistID: string, valueFilter: FilterValuesType) {
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
