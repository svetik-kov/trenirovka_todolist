import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })
/*    let [todolists, setTodolists] = useState<Array<TodolistsType>>(
        [
            {id: v1(), title: 'What to learn', filter: 'all'},
            {id: v1(), title: 'What to buy', filter: 'all'},
        ]
    )
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])*/
    /*const [filter, setFilter] = useState<FilterValueType>('all')*/
    const changeCheckbox = (todolistId:string,taskId: string, checkedValue: boolean) => {
        setTasks({...tasks,[todolistId]:tasks[todolistId].map(el=>el.id===taskId?{...el,isDone:checkedValue}:el)})
    }
    const addTask= (todolistId:string,title: string) => {
        const newTask:TasksType  = {id: v1(), title, isDone: false}
        setTasks({...tasks,[todolistId]:[newTask,...tasks[todolistId]]})

    }
    const removeTasks = (todolistId:string,taskId: string) => {
        setTasks({...tasks,[todolistId]:tasks[todolistId].filter(el=>el.id!==taskId)})
    }
    const changeFilter = (todolistId:string,value: FilterValueType) => {
        setTodolists(todolists.map(el=>el.id===todolistId?{...el,filter:value}:el))
       /* setFilter(value)*/
    }
    return (
        <div className="App">
            {todolists.map((el) => {
                let taskForTodolist = tasks[el.id]
                if (el.filter === 'active') {
                    taskForTodolist = tasks[el.id].filter((el) => el.isDone)
                }
                if (el.filter === 'completed') {
                    taskForTodolist = tasks[el.id].filter((el) => !el.isDone)
                }

                return (
                    <Todolist
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        tasks={taskForTodolist}
                        removeTasks={removeTasks}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeCheckbox={changeCheckbox}
                        filter={el.filter}
                    />
                )
            })}

            {/* <Todolist title={'What to buy'} tasks={tasks2}/>*/}
        </div>
    );
}

export default App;
