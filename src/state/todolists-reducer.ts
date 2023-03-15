import {FilterValueType, TodolistsType} from "../App";
import {v1} from "uuid";

const initialState:TodolistsType[]=[]
export const TodolistsReducer = (state: TodolistsType[]=initialState, action: ActionTodolistType):TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.id)
        }
        case "ADD-TODOLIST":
         /*   let newTodolist = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}*/
            return [...state, {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        default:
            return state
    }
}

export type ActionTodolistType = RemoveTodolistACType
    | AddTodolistACType
    | UpdateTodolistACType
    | ChangeFilterACType

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }

    } as const
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload:
            {title,todolistId:v1()}
    } as const
}

type UpdateTodolistACType = ReturnType<typeof updateTodolistAC>
export const updateTodolistAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id, title
        }

    } as const
}

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (id: string, filter: FilterValueType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id, filter
        }

    } as const
}