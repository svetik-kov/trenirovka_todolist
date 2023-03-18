import React, {ChangeEvent, useMemo, useState} from 'react';

export const CalculatorFactorial = () => {
    const [number, setNumber] = useState(1)
    const [inc, setInc] = useState(0)
    const factorial = useMemo(()=> {
        console.log('useMemo')
        return(
        factorialOf(number)
    )},[number])
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNumber(Number(event.currentTarget.value))
    }
    const onClick = () => setInc(i => i + 1)


    return (
        <div>
            Factorial Of
            <input type='number' value={number} onChange={onChange}/>
            is {factorial}
            <button onClick={onClick}>Re-render</button>
        </div>
    );
};

const factorialOf= (n: number):number => {
    console.log('factorialOf')
    return n <= 0 ? 1 : n * factorialOf(n - 1)
}