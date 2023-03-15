import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    ActionTodolistType,
    addTodolistAC,
    changeFilterAC, removeTodolistAC,
    TodolistsReducer,
    updateTodolistAC
} from "./state/todolists-reducer";
import {
    ActionTasksType,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksReducer
} from "./state/tasks-reducer";

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

export type FilterValueType = 'all' | 'active' | 'completed'
export type TasksStateType = {
    [key: string]: TasksType[]
}

function AppWithReducers() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchTodolists] = useReducer<Reducer<TodolistsType[], ActionTodolistType>>(TodolistsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, dispatchTasks] = useReducer<Reducer<TasksStateType, ActionTasksType>>(TasksReducer,{
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
        dispatchTasks(changeTaskTitleAC(taskId,newTitle,todolistId))
    }
    const changeCheckbox = (todolistId: string, taskId: string, checkedValue: boolean) => {
        dispatchTasks(changeTaskStatusAC(taskId,checkedValue,todolistId))
    }
    const addTask = (todolistId: string, title: string) => {
        dispatchTasks(addTaskAC(title,todolistId))
    }
    const removeTasks = (todolistId: string, taskId: string) => {
        dispatchTasks(removeTaskAC(taskId,todolistId))
    }

    const updateTodolist=(todolistId: string,newTitle:string)=>{
        dispatchTodolists(updateTodolistAC(todolistId,newTitle))
    }
    const changeFilter = (todolistId: string, value: FilterValueType) => {
        dispatchTodolists(changeFilterAC(todolistId,value))
    }
    const addTodolist = (newTitle: string) => {
        const action=addTodolistAC(newTitle)
        dispatchTodolists(action)
        dispatchTasks(action)
    }
    const removeTodolist = (todolistId: string) => {
        const action=removeTodolistAC(todolistId)
        dispatchTodolists(action)
        dispatchTasks(action)
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

export default  AppWithReducers;
