import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";


export type FilterValueType='all'|'active'|'completed'
function App() {
let [tasks,setTasks] =useState([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false }
])
 const [filter,setFilter]=useState<FilterValueType>('all')

    const removeTasks=(taskId:number)=>{
       setTasks(tasks.filter((el)=>el.id!==taskId))
    }
   /* let taskForTodolist=tasks
    if (filter==='active'){
        taskForTodolist=tasks.filter((el)=>el.isDone)
    }
    if (filter==='completed'){
        taskForTodolist=tasks.filter((el)=>!el.isDone)
    }

    const changeFilter=(value:FilterValueType)=>{
        setFilter(value)
    }*/
    return (
        <div className="App">
           <Todolist title={'What to learn'}
                     tasks={tasks}
                     removeTasks={removeTasks}
                     filter={filter}
                     setFilter={setFilter}
                    /* changeFilter={changeFilter}*/
           />
           {/* <Todolist title={'What to buy'} tasks={tasks2}/>*/}
        </div>
    );
}

export default App;
