import React, {ChangeEvent, useState,KeyboardEvent} from "react";
import {FilterValueType} from "./App";

type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    title: string
    tasks:TasksType[]
    removeTasks:(taskId:string)=>void
    changeFilter:(value:FilterValueType)=>void
    addTask:(title:string)=>void
}

export const Todolist = (props: TodolistType) => {
 const [title,setTitle]=useState('')
  const  onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
      setTitle(e.currentTarget.value)
    }
    const addTaskHandler=()=>{
        props.addTask(title)
        setTitle('')
    }
    const onKeyDownHandler=(e:KeyboardEvent<HTMLInputElement>)=>{
     if (e.key==='Enter'){
         addTaskHandler()

     }
    }
    const changeFilterHandler=(value:FilterValueType)=>{
        props.changeFilter(value)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
                <button
                    onClick={addTaskHandler}
                >+</button>
            </div>
            <ul>
                {props.tasks.map((el)=>{

                    return (
                        <li key={el.id}>
                            <input type="checkbox"
                                   checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={()=>props.removeTasks(el.id)}>X</button>
                        </li>
                    )

                })

                }
            </ul>
            <div>
                <button onClick={()=>changeFilterHandler('all')}>All</button>
                <button onClick={()=>changeFilterHandler('active')}>Active</button>
                <button onClick={()=>changeFilterHandler('completed')}>Completed</button>
            </div>
        </div>
    )
}