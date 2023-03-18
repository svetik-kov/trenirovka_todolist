import React, {memo} from 'react';
import {Button} from "@mui/material";
import {FilterValueType} from "../App";


type ButtonWithMemoType={
    changeFilterHandler:()=>void
    color:'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    name:string
    variant:"outlined" | "contained"
}
export const ButtonWithMemo:React.FC<ButtonWithMemoType> = memo(({changeFilterHandler,color,name,variant}) => {


    return (
        <Button
            variant={variant}
            color={color}
            onClick={() => changeFilterHandler()} >
    {name}
        </Button>
    );
})

