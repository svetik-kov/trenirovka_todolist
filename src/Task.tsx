import React, {memo, useCallback} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TasksType} from "./Todolist";
import {FilterValueType} from "./App";

type TaskPropsType={
    task:TasksType
    removeTasks: ( taskId: string) => void
    changeCheckbox: ( taskId: string, checkedValue: boolean) => void
    updateTask: ( taskId: string, newTitle: string) => void

}
export const Task = memo(({task,removeTasks,changeCheckbox,updateTask}:TaskPropsType) => {

    const updateTaskHandler = (taskId: string, newTitle: string) => {
        updateTask( taskId, newTitle)
    }
    const onChangeCheckboxHandler = (taskId: string, checkedValue: boolean) => {
        changeCheckbox(taskId, checkedValue)
    }
    return (
        <div key={task.id} className={task.isDone ? 'is-done' : ''}>
            <Checkbox onChange={(e) => onChangeCheckboxHandler(task.id, e.currentTarget.checked)}
                      checked={task.isDone}/>
            <EditableSpan title={task.title}
                          callBack={(newTitle: string) => updateTaskHandler(task.id, newTitle)}/>
            <IconButton
                aria-label="delete"
                onClick={() => removeTasks( task.id)}>
                <DeleteIcon/>
            </IconButton>


        </div>
    );
})

