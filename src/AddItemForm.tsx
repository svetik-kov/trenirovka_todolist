import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./components/Button";

type AddItemFormType={
    callBack:(title:string)=>void
}
export const AddItemForm = (props:AddItemFormType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const addTaskHandler = () => {
        if (title.trim()) {
            props.callBack(title.trim())
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

    return (
        <div>
            <input className={error ? 'error' : ''}
                   value={title} onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}/>
            <Button name={'+'} callBack={addTaskHandler}/>
            {error && <div className={'error-message'}> {error}</div>}
        </div>
    );
};

