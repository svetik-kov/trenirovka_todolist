import React, {ChangeEvent, useState,KeyboardEvent} from "react";
import {FilterValueType} from "./App";
import {Button} from "./components/Button";

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
    changeCheckbox:(taskId:string,checkedValue: boolean)=>void
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
    const onChangeCheckboxHandler=(taskId:string,checkedValue:boolean)=>{
     props.changeCheckbox(taskId,checkedValue)
        }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
                {/*<button onClick={addTaskHandler}>+</button>*/}
                <Button name={'+'} callBack={addTaskHandler}/>
            </div>
            <ul>
                {props.tasks.map((el)=>{

                    return (
                        <li key={el.id}>
                            <input type="checkbox"
                                   onChange={(e)=>onChangeCheckboxHandler(el.id,e.currentTarget.checked)}
                                   checked={el.isDone}/>
                            <span>{el.title}</span>
                           {/* <button onClick={()=>props.removeTasks(el.id)}>X</button>*/}
                            <Button name={'X'} callBack={()=>props.removeTasks(el.id)}/>
                        </li>
                    )

                })

                }
            </ul>
            <div>
                {/*<button onClick={()=>changeFilterHandler('all')}>All</button>*/}
                {/*<button onClick={()=>changeFilterHandler('active')}>Active</button>*/}
                {/*<button onClick={()=>changeFilterHandler('completed')}>Completed</button>*/}
                <Button name={'All'} callBack={()=>changeFilterHandler('all')}/>
                <Button name={'Active'} callBack={()=>changeFilterHandler('active')}/>
                <Button name={'Completed'} callBack={()=>changeFilterHandler('completed')}/>
            </div>
        </div>
    )
}