import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueType} from "./App";
import {Button} from "./components/Button";

type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    title: string
    tasks: TasksType[]
    removeTasks: (taskId: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
    changeCheckbox: (taskId: string, checkedValue: boolean) => void
    filter:FilterValueType
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
            props.addTask(title.trim())
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
        props.changeFilter(value)
    }
    const onChangeCheckboxHandler = (taskId: string, checkedValue: boolean) => {
        props.changeCheckbox(taskId, checkedValue)
    }
    return (
        <div>
            <h3>{props.title}</h3>
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
                            <Button name={'X'} callBack={() => props.removeTasks(el.id)}/>
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