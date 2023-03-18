import React, {memo, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TasksType} from "./Todolist";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";


type TaskWithRedux={
    todolistId:string
    task:TasksType
}
export const TaskWithRedux:React.FC<TaskWithRedux> = memo(({todolistId,task}) => {
    const dispatch=useDispatch()

    const updateTaskHandler = useCallback((taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(taskId,newTitle,todolistId ))
    },[dispatch])
    const onChangeCheckboxHandler = useCallback((taskId: string, checkedValue: boolean) => {
        dispatch(changeTaskStatusAC(taskId,checkedValue,todolistId))
    },[dispatch])
    const removeTaskHandler=useCallback((taskId: string)=>{
        dispatch(removeTaskAC(taskId,todolistId))
    },[dispatch])
    return (
        <div key={task.id} className={task.isDone ? 'is-done' : ''}>
            <Checkbox onChange={(e) => onChangeCheckboxHandler(task.id, e.currentTarget.checked)}
                      checked={task.isDone}/>
            <EditableSpan title={task.title}
                          callBack={(newTitle: string) => updateTaskHandler(task.id, newTitle)}/>
            <IconButton
                aria-label="delete"
                onClick={() => removeTaskHandler( task.id)}>
                <DeleteIcon/>
            </IconButton>


        </div>
    );
});
