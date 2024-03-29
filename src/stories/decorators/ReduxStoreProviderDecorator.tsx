import React, {ReactNode} from 'react';
import {Provider} from "react-redux";
import {AppRootStateType, store} from "../../state/store";
import {combineReducers, createStore, legacy_createStore} from "redux";
import {v1} from "uuid";
import {TodolistsReducer} from "../../state/todolists-reducer";
import {TasksReducer} from "../../state/tasks-reducer";

const rootReducer = combineReducers({
    tasks: TasksReducer,
    todolists: TodolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn:()=>React.ReactNode) => {
    return <Provider store={storyBookStore}> {storyFn()}</Provider>
};
