import React, {useState} from "react";
import {FilterValueType} from "./App";

type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistType = {
    title: string
    tasks:TasksType[]
    removeTasks:(taskId:number)=>void
    filter:FilterValueType
    setFilter:(value:FilterValueType)=>void

   /* changeFilter:(value:FilterValueType)=>void*/
}

export const Todolist = (props: TodolistType) => {
    /*const [filter,setFilter]=useState<FilterValueType>('all')*/


    let taskForTodolist=props.tasks
       if (props.filter==='active'){
        taskForTodolist=props.tasks.filter((el)=>el.isDone)
    }
    if (props.filter==='completed'){
        taskForTodolist=props.tasks.filter((el)=>!el.isDone)
    }

    const changeFilter=(value:FilterValueType)=>{
        props.setFilter(value)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {taskForTodolist.map((el)=>{

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
                <button onClick={()=>changeFilter('all')}>All</button>
                <button onClick={()=>changeFilter('active')}>Active</button>
                <button onClick={()=>changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}