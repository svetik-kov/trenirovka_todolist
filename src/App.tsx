import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
let [tasks,setTasks] =useState([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false }
])


    const removeTasks=(taskId:number)=>{
       setTasks(tasks.filter((el)=>el.id!==taskId))
    }

    return (
        <div className="App">
           <Todolist title={'What to learn'}
                     tasks={tasks}
                     removeTasks={removeTasks}
           />
           {/* <Todolist title={'What to buy'} tasks={tasks2}/>*/}
        </div>
    );
}

export default App;
