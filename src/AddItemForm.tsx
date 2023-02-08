import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import Button from '@mui/material/Button'

type AddItemFormType = {
    callBack: (title: string) => void
}
export const AddItemForm = (props: AddItemFormType) => {
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

    const buttonStyles={
        maxWidth: '25px',
        maxHeight: '25px',
        minWidth: '25px',
        minHeight: '25px'
    }
    return (
        <div>
            <input className={error ? 'error' : ''}
                   value={title} onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}/>
            {/* <Button name={'+'} callBack={addTaskHandler}/>*/}
            <Button
                variant="contained"
                size="small"
                onClick={addTaskHandler}
                style={buttonStyles}
            >+</Button>
            {error && <div className={'error-message'}> {error}</div>}
        </div>
    );
};

