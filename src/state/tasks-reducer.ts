import {TasksStateType} from "../App";
import {TasksType} from "../Todolist";
import {v1} from "uuid";


export const TasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state,[action.todolistId]
                    :state[action.todolistId]
                    .filter(el=>el.id!==action.taskId)}
        }
        case 'ADD-TASK':
            const newTask: TasksType = {id: v1(), title:action.title, isDone: false}
            return {...state,[action.todolistId]:
            [newTask,...state[action.todolistId]]}
        case 'CHANGE-TASK-STATUS':

            return {...state,[action.todolistId]:
                state[action.todolistId]
                    .map(el=>el.id===action.taskId
                        ?{...el,isDone:action.isDone}:el)
                    }

        default:
            return state
    }
}

type ActionType =  RemoveTaskACType
    | AddTaskACType
|ChangeTaskStatusACType


type  RemoveTaskACType = ReturnType<typeof  removeTaskAC>
export const removeTaskAC = (taskId: string, todolistId: string ) => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistId

    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string ) => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string,isDone: boolean, todolistId: string ) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId,isDone,
        todolistId
    } as const
}

