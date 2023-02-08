import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

export type FilterValueType = 'all' | 'active' | 'completed'
type TasksStateType = {
    [key: string]: TasksType[]
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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


    const updateTask=(todolistId: string, taskId: string,newTitle:string)=>{
        setTasks({...tasks,[todolistId]:tasks[todolistId].map(el=>el.id===taskId?{...el,title:newTitle}:el)})
    }
    const changeCheckbox = (todolistId: string, taskId: string, checkedValue: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: checkedValue} : el)
        })
    }
    const addTask = (todolistId: string, title: string) => {
        const newTask: TasksType = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})

    }
    const removeTasks = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
    }

    const updateTodolist=(todolistId: string,newTitle:string)=>{
        setTodolists(todolists.map(el=>el.id===todolistId?{...el,title:newTitle}:el))
    }
    const changeFilter = (todolistId: string, value: FilterValueType) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
        /* setFilter(value)*/
    }
    const addTodolist = (newTitle: string) => {
        const newTodo = v1()
        const newTodolist: TodolistsType = {id: newTodo, title: newTitle, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodo]: []})
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
    }
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding:'20px'}}>
                    <AddItemForm callBack={addTodolist}/>
                </Grid>
               <Grid container spacing={3}>
                   {todolists.map((el) => {
                       let taskForTodolist = tasks[el.id]
                       if (el.filter === 'active') {
                           taskForTodolist = tasks[el.id].filter((el) => el.isDone)
                       }
                       if (el.filter === 'completed') {
                           taskForTodolist = tasks[el.id].filter((el) => !el.isDone)
                       }

                       return (
                           <Grid item>
                               <Paper style={{padding:'10px'}}>
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
                               removeTodolist={removeTodolist}
                               updateTask={updateTask}
                               updateTodolist={updateTodolist}
                           />
                               </Paper>
                           </Grid>
                       )
                   })}
               </Grid>

            </Container>


            {/* <Todolist title={'What to buy'} tasks={tasks2}/>*/}
        </div>
    );
}

export default App;
