import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';


import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Task} from "../Task";
import {TasksType} from "../Todolist";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/Task',
  component: AddItemForm,
  args:{
    removeTasks: action('removeTasks'),
    changeCheckbox:action('changeCheckbox'),
    updateTask: action('updateTask'),
    task:{id:'111',title:'JS',isDone: false},
  }
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {
  task:{id:'111',title:'JS',isDone: true},
};

const Template1: ComponentStory<typeof Task> = (args) => {
  const [task,setTask]=useState({id:'111',title:'JS',isDone: false})

  const changeCheckbox=(taskId: string, checkedValue: boolean)=>{
    setTask({id:'111',title:'JS',isDone: checkedValue})
  }

  const updateTask=(taskId: string, newTitle: string)=>{
    setTask({id:'111',title:newTitle,isDone: task.isDone})
  }
  const removeTasks=()=>{
    action('removeTasks')
  }
  return (
      <Task
          removeTasks={removeTasks}
          changeCheckbox={changeCheckbox}
          updateTask={updateTask}
          task={task}
      />
  )
};
export const TaskStory = Template1.bind({});