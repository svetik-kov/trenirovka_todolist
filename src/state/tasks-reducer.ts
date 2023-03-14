import {TasksStateType} from "../App";


export const TasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state,[action.todolistId]
                    :state[action.todolistId]
                    .filter(el=>el.id!==action.taskId)}
        }
        case "AAA":

            return state

        default:
            return state
    }
}

type ActionType =  removeTaskACType
    | SecondACType


type  removeTaskACType = ReturnType<typeof  removeTaskAC>
export const removeTaskAC = (taskId: string, todolistId: string ) => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistId

    } as const
}

type SecondACType = ReturnType<typeof secondAC>
export const secondAC = () => {
    return {
        type: 'AAA',

    } as const
}

