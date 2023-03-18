import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

type AddItemFormType = {
    callBack: (title: string) => void
}
export const AddItemForm = memo((props: AddItemFormType) => {
    console.log('AddItemForm')
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

    const buttonStyles = {
        maxWidth:'40px',
        maxHeight:'40px',
        minWidth:'40px',
        minHeight:'40px'
    }
    return (
        <div>
            {/*<input className={error ? 'error' : ''}*/}
            {/*       value={title} onChange={onChangeHandler}*/}
            {/*       onKeyDown={onKeyDownHandler}/>*/}
            <TextField
                size={'small'}
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                id="outlined-basic"
                label={error?"Title is required":"Please type your title"}
                variant="outlined"
            error={!!error}
            />
            {/* <Button name={'+'} callBack={addTaskHandler}/>*/}
            <Button
                variant="contained"
                size="small"
                onClick={addTaskHandler}
                style={buttonStyles}
            >+</Button>
           {/* {error && <div className={'error-message'}> {error}</div>}*/}
        </div>
    );
});

