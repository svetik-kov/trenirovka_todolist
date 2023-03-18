import React, {Reducer, useCallback, useReducer, useState} from 'react';
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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

export type FilterValueType = 'all' | 'active' | 'completed'
export type TasksStateType = {
    [key: string]: TasksType[]
}

function AppWithRedux() {
    const todolists=useSelector<AppRootStateType,TodolistsType[]>(state=>state.todolists)
    const tasks=useSelector<AppRootStateType,TasksStateType>(state=>state.tasks)
    const dispatch=useDispatch()


    const updateTask=(todolistId: string, taskId: string,newTitle:string)=>{
        dispatch(changeTaskTitleAC(taskId,newTitle,todolistId))
    }
    const changeCheckbox = (todolistId: string, taskId: string, checkedValue: boolean) => {
        dispatch(changeTaskStatusAC(taskId,checkedValue,todolistId))
    }
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(title,todolistId))
    },[dispatch])
    const removeTasks = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(taskId,todolistId))
    }

    const updateTodolist=(todolistId: string,newTitle:string)=>{
        dispatch(updateTodolistAC(todolistId,newTitle))
    }
    const changeFilter = (todolistId: string, value: FilterValueType) => {
        dispatch(changeFilterAC(todolistId,value))
    }
    const addTodolist = useCallback((newTitle: string) => {
        const action=addTodolistAC(newTitle)
        dispatch(action)
    },[dispatch])
    const removeTodolist = (todolistId: string) => {
        const action=removeTodolistAC(todolistId)
        dispatch(action)
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
                           <Grid key={el.id} item>
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

export default  AppWithRedux;
