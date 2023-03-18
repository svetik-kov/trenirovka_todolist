import React, {ChangeEvent, useState, KeyboardEvent, useCallback, memo} from "react";
import {FilterValueType} from "./App";
import Button from '@mui/material/Button';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

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

export const Todolist = memo((props: TodolistType) => {
    console.log('Todolist')
    const updateTaskHandler = ((taskId: string, newTitle: string) => {
        props.updateTask(props.todolistId, taskId, newTitle)
    })
    const addTaskHandler = useCallback((title: string) => {
        props.addTask(props.todolistId, title)
    },[props.addTask,props.todolistId])
    const onChangeCheckboxHandler = (taskId: string, checkedValue: boolean) => {
        props.changeCheckbox(props.todolistId, taskId, checkedValue)
    }

    const changeFilterHandler = (value: FilterValueType) => {
        props.changeFilter(props.todolistId, value)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    const updateTodolistHandler = (newTitle: string) => {
        props.updateTodolist(props.todolistId, newTitle)
    }

    let taskForTodolist=props.tasks
    if (props.filter === 'active') {
        taskForTodolist =props.tasks.filter((el) => el.isDone)
    }
    if (props.filter === 'completed') {
        taskForTodolist = props.tasks.filter((el) => !el.isDone)
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
                {taskForTodolist.map((el) => {

                    return (
                        <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                           {/* <input type="checkbox"
                                   onChange={(e) => onChangeCheckboxHandler(el.id, e.currentTarget.checked)}
                                   checked={el.isDone}/>*/}
                            <Checkbox onChange={(e) => onChangeCheckboxHandler(el.id, e.currentTarget.checked)}
                                      checked={el.isDone} />
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
})