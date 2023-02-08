import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueType} from "./App";
import Button from '@mui/material/Button';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    todolistId: string
    title: string
    tasks: TasksType[]
    removeTasks: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValueType) => void
    addTask: (todolistId: string, title: string) => void
    changeCheckbox: (todolistId: string, taskId: string, checkedValue: boolean) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, newTitle: string) => void
    updateTodolist: (todolistId: string, newTitle: string) => void

}

export const Todolist = (props: TodolistType) => {

    const updateTaskHandler = (taskId: string, newTitle: string) => {
        props.updateTask(props.todolistId, taskId, newTitle)
    }
    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistId, title)
    }

    const changeFilterHandler = (value: FilterValueType) => {
        props.changeFilter(props.todolistId, value)
    }
    const onChangeCheckboxHandler = (taskId: string, checkedValue: boolean) => {
        props.changeCheckbox(props.todolistId, taskId, checkedValue)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    const updateTodolistHandler = (newTitle: string) => {
        props.updateTodolist(props.todolistId, newTitle)
    }
    return (
        <div>
            <h3>
                {/* {props.title}*/}
                <EditableSpan title={props.title} callBack={updateTodolistHandler}/>

                {/*  <button onClick={removeTodolistHandler}>XXX</button>*/}

                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>

            </h3>
            <AddItemForm callBack={addTaskHandler}/>

            <ul>
                {props.tasks.map((el) => {

                    return (
                        <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   onChange={(e) => onChangeCheckboxHandler(el.id, e.currentTarget.checked)}
                                   checked={el.isDone}/>
                            {/*  <span>{el.title}</span>*/}
                            <EditableSpan title={el.title}
                                          callBack={(newTitle: string) => updateTaskHandler(el.id, newTitle)}/>

                            {/* <Button name={'X'} callBack={() => props.removeTasks(props.todolistId, el.id)}/>*/}
                            <IconButton
                                aria-label="delete"
                                onClick={() => props.removeTasks(props.todolistId, el.id)}>
                                <DeleteIcon/>
                            </IconButton>


                        </li>
                    )

                })

                }
            </ul>
            <div>

                <Button variant={props.filter === 'all' ? "outlined" : "contained"}
                        color="success"  onClick={() => changeFilterHandler('all')} >All</Button>
                <Button variant={props.filter === 'active' ?"outlined" : "contained"}
                        color="error" onClick={() => changeFilterHandler('active')}>Active</Button>
                <Button variant={props.filter === 'completed' ? "outlined" : "contained"}
                        color="secondary"  onClick={() => changeFilterHandler('completed')}>Completed</Button>

            {/*    <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={() => changeFilterHandler('all')}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={() => changeFilterHandler('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={() => changeFilterHandler('completed')}>Completed
                </button>*/}
            </div>
        </div>
    )
}