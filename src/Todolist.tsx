import React, {ChangeEvent, useState} from "react";
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
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler}/>
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
                <button onClick={()=>props.changeFilter('all')}>All</button>
                <button onClick={()=>props.changeFilter('active')}>Active</button>
                <button onClick={()=>props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}