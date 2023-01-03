import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type FilterValueType='all'|'active'|'completed'
function App() {
let [tasks,setTasks] =useState([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false }
])
 const [filter,setFilter]=useState<FilterValueType>('all')

    const changeCheckbox=(taskId:string,checkedValue: boolean)=>{
    setTasks(tasks.map((el)=>el.id===taskId?{...el,isDone:checkedValue}:el))
    }

    const addTask = (title:string) => {
     const newTask= { id: v1(), title, isDone: false }
        setTasks([newTask,...tasks])
    }

    const removeTasks=(taskId:string)=>{
       setTasks(tasks.filter((el)=>el.id!==taskId))
    }
    let taskForTodolist=tasks
    if (filter==='active'){
        taskForTodolist=tasks.filter((el)=>el.isDone)
    }
    if (filter==='completed'){
        taskForTodolist=tasks.filter((el)=>!el.isDone)
    }

    const changeFilter=(value:FilterValueType)=>{
        setFilter(value)
    }
    return (
        <div className="App">
           <Todolist title={'What to learn'}
                     tasks={taskForTodolist}
                     removeTasks={removeTasks}
                     changeFilter={changeFilter}
                     addTask={addTask}
                     changeCheckbox={changeCheckbox}

           />
           {/* <Todolist title={'What to buy'} tasks={tasks2}/>*/}
        </div>
    );
}

export default App;
