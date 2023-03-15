import {addTodolistAC, changeFilterAC, removeTodolistAC, TodolistsReducer, updateTodolistAC} from './todolists-reducer'
import {v1} from 'uuid'
import {FilterValueType, TodolistsType} from '../App'


let todolistId1: string
let todolistId2: string

let startState: Array<TodolistsType>

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

})
test('correct todolist should be removed', () => {
    /*  let todolistId1 = v1()
      let todolistId2 = v1()

      const startState: Array<TodolistsType> = [
          {id: todolistId1, title: 'What to learn', filter: 'all'},
          {id: todolistId2, title: 'What to buy', filter: 'all'}
      ]*/

    const endState = TodolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {
    /* let todolistId1 = v1()
     let todolistId2 = v1()
 */
    let newTodolistTitle = 'New Todolist'

    /*const startState: Array<TodolistsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
*/
    const endState = TodolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
    /*let todolistId1 = v1()
    let todolistId2 = v1()*/

    let newTodolistTitle = 'New Todolist'

    /*const startState: Array<TodolistsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]*/

    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    }

    const endState = TodolistsReducer(startState, updateTodolistAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    /* let todolistId1 = v1()
     let todolistId2 = v1()*/

    let newFilter: FilterValueType = 'completed'

    /*const startState: Array<TodolistsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]*/

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    }

    const endState = TodolistsReducer(startState, changeFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
