import {v1} from "uuid";
import {TaskStateType} from "../App";
import {addTaskAC, changeStatusAC, removeTaskAC, tasksReducer, updateTaskAC} from "./tasks-reducer";

let startState: TaskStateType
let todolistID1: string
let todolistID2: string

beforeEach( () => {

    todolistID1 = v1()
    todolistID2 = v1()

    startState = {
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

})

test('correct task should be added', () => {

    let taskTitle = 'New Todolist'

    const endState = tasksReducer(startState, addTaskAC(todolistID2, taskTitle))

    expect(endState[todolistID2].length).toBe(6)
    expect(endState[todolistID2][0].title).toBe(taskTitle)
})

test('correct task should change its name', () => {

    let newTaskTitle = 'New Task'

    let taskID1 = startState[todolistID1][1].id

    const endState = tasksReducer(startState, updateTaskAC(todolistID1, taskID1, newTaskTitle))

    expect(endState[todolistID1][0].title).toBe("HTML&CSS")
    expect(endState[todolistID1][1].title).toBe(newTaskTitle)
})

test('correct task should be removed', ()=> {

    let taskID1 = startState[todolistID1][0].id
    let taskID2 = startState[todolistID1][1].id

    const endState = tasksReducer(startState, removeTaskAC(todolistID1, taskID1 ))

    expect(endState[todolistID1].length).toBe(4)
    expect(endState[todolistID1][0].id).toBe(taskID2)
})

test('correct task should change its status', () => {

    let taskID1 = startState[todolistID1][0].id
    let newIsDone = false

    const endState = tasksReducer(startState, changeStatusAC(todolistID1, taskID1, newIsDone))

    expect(endState[todolistID1].length).toBe(5)
    expect(endState[todolistID1][0].isDone).toBe(false)
    expect(endState[todolistID2][0].isDone).toBe(true)
})
