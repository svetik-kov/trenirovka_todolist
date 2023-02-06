import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    callBack: (newTitle: string) => void
}
export const EditableSpan = (props: EditableSpanType) => {
    const [newTitle, setNewTitle] = useState<string>(props.title)
    const [edit, setEdit] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addTask = () => {
        props.callBack(newTitle)
    }

    const onDoubleClickHandler = () => {
        setEdit(!edit)
        addTask()
    }
    return (
        edit
            ? <input
                value={newTitle}
                onBlur={onDoubleClickHandler}
                autoFocus
                onChange={onChangeHandler}
            />
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
};

