import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';


import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    callBack:{
      description:'Button clicked inside form'
    }
  },
} as ComponentMeta<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormStory.args = {
  callBack:action('AddItemForm')
};


const Template1: ComponentStory<typeof AddItemForm> = (args) => {

  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string | null>("Title is required")

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(null)
  }
  const addTaskHandler = () => {
    if (title.trim()) {
      args.callBack(title.trim())
      setTitle('')
    } else {
      setError("Title is required")
    }
  }
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTaskHandler()

    }
  }

  const buttonStyles = {
    maxWidth:'40px',
    maxHeight:'40px',
    minWidth:'40px',
    minHeight:'40px'
  }
  return (
      <div>
        <TextField
            size={'small'}
            value={title}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            id="outlined-basic"
            label={error?"Title is required":"Please type your title"}
            variant="outlined"
            error={!!error}
        />
        <Button
            variant="contained"
            size="small"
            onClick={addTaskHandler}
            style={buttonStyles}
        >+</Button>
        {/* {error && <div className={'error-message'}> {error}</div>}*/}
      </div>
  );
};

export const AddItemFormErrorStory = Template1.bind({});
AddItemFormErrorStory.args = {
  callBack:action('AddItemForm')
};