import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueType} from "./App";
import {Button} from "./components/Button";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    todolistId:string
    title: string
    tasks: TasksType[]
    removeTasks: (todolistId:string,taskId: string) => void
    changeFilter: ( todolistId:string,value: FilterValueType) => void
    addTask: (todolistId:string,title: string) => void
    changeCheckbox: (todolistId:string,taskId: string, checkedValue: boolean) => void
    filter:FilterValueType
    removeTodolist:(todolistId:string)=>void
}

export const Todolist = (props: TodolistType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string|null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const addTaskHandler = () => {
        if (title.trim()) {
            props.addTask(props.todolistId,title.trim())
            setTitle('')
        } else {
            setError("Title is required")
        }
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()

        }
    }
    const changeFilterHandler = (value: FilterValueType) => {
        props.changeFilter(props.todolistId,value)
    }
    const onChangeCheckboxHandler = (taskId: string, checkedValue: boolean) => {
        props.changeCheckbox(props.todolistId,taskId, checkedValue)
    }
    const removeTodolistHandler=()=>{
        props.removeTodolist(props.todolistId)
    }
    return (
        <div>
            <h3>
                {props.title}
            <button onClick={removeTodolistHandler}>XXX</button>
            </h3>
            <div>
                <input className={error ? 'error' : ''}
                       value={title} onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
                {/*<button onClick={addTaskHandler}>+</button>*/}
                <Button name={'+'} callBack={addTaskHandler}/>
                {error && <div className={'error-message'}> {error}</div>}
               {/* {
                    error ? <div className={'error-message'}> Title is required</div> : <div></div>
                }
*/}
            </div>
            <ul>
                {props.tasks.map((el) => {

                    return (
                        <li key={el.id} className={el.isDone?'is-done':''}>
                            <input type="checkbox"
                                   onChange={(e) => onChangeCheckboxHandler(el.id, e.currentTarget.checked)}
                                   checked={el.isDone}/>
                            <span>{el.title}</span>
                            {/* <button onClick={()=>props.removeTasks(el.id)}>X</button>*/}
                            <Button name={'X'} callBack={() => props.removeTasks(props.todolistId,el.id)}/>
                        </li>
                    )

                })

                }
            </ul>
            <div>
                <button className={props.filter==='all' ? 'active-filter':''} onClick={()=>changeFilterHandler('all')}>All</button>
                <button className={props.filter==='active'? 'active-filter':''}  onClick={()=>changeFilterHandler('active')}>Active</button>
                <button className={props.filter==='completed'? 'active-filter':''} onClick={()=>changeFilterHandler('completed')}>Completed</button>
                {/*<Button  name={'All'} callBack= {() => changeFilterHandler('all')}/>
                <Button name={'Active'} callBack={() => changeFilterHandler('active')}/>
                <Button name={'Completed'} callBack={() => changeFilterHandler('completed')}/>*/}
            </div>
        </div>
    )
}