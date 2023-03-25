import {v1} from "uuid";
import {TaskStateType} from "../App";
import {addTaskAC, tasksReducer, updateTaskAC} from "./tasks-reducer";

test('correct task should be added', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let taskTitle = 'New Todolist'

    const startState:TaskStateType = {
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
        ]
    }

    const endState = tasksReducer(startState, addTaskAC(todolistID2, taskTitle))

    expect(endState[todolistID2].length).toBe(6)
    expect(endState[todolistID2][0].title).toBe(taskTitle)
})

test('correct task should change its name', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()


    let newTaskTitle = 'New Task'


    const startState:TaskStateType = {
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
        ]
    }

    let taskID1 = startState[todolistID2][1].id

    const endState = tasksReducer(startState, updateTaskAC(todolistID2, taskID1, newTaskTitle))

    expect(endState[todolistID2][0].title).toBe("HTML&CSS2")
    expect(endState[todolistID2][1].title).toBe(newTaskTitle)
})