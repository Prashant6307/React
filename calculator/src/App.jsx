import { useState } from 'react'
import './App.css'

function App() {
  const [currentValue, setCurrentValue] = useState("0")
  const [previousValue, setPreviousValue] = useState("")
  const [operator, setOperator] = useState('')

  const handNumberClick = (num) => {
    if (currentValue === "0") {
      setCurrentValue(String(num))
    } else {
      setCurrentValue(currentValue + String(num))
    }
  }

  const handleOperatorClick = (operator) => {
    setOperator(operator)
    setPreviousValue(currentValue)
    setCurrentValue("0")
    
  }

  const handleResult = () => {
    let result
    if (operator === "/") {
      result = Number(previousValue) / Number(currentValue)
    }
    if (operator === "*") {
      result = Number(previousValue) * Number(currentValue)
    }
    if (operator === "+") {
      result = Number(previousValue) + Number(currentValue)
    }
    if (operator === "-") {
      result = Number(previousValue) - Number(currentValue)
    }
    setCurrentValue(result)
    setPreviousValue("")
    setOperator("")
  }
  return (
    <div className='w-1/2 border mx-auto p-1 my-48'>
      <div className='result my-2 border flex justify-end'>{previousValue ? `${previousValue} ${operator} ${currentValue}` : currentValue}</div>
      <div className='grid grid-cols-4 gap-4 item-center'>
        <div onClick={() => handNumberClick(7)} className='border bg-color-pink'>7</div>
        <div onClick={() => handNumberClick(8)} className='border bg-color-pink'>8</div>
        <div onClick={() => handNumberClick(9)} className='border bg-color-pink'>9</div>
        <div onClick={() => handleOperatorClick("/")} className='border bg-color-pink'>/</div>
        <div onClick={() => handNumberClick(4)} className='border bg-color-pink'>4</div>
        <div onClick={() => handNumberClick(5)} className='border bg-color-pink'>5</div>
        <div onClick={() => handNumberClick(6)} className='border bg-color-pink'>6</div>
        <div onClick={() => handleOperatorClick("*")} className='border bg-color-pink'>*</div>
        <div onClick={() => handNumberClick(1)} className='border bg-color-pink'>1</div>
        <div onClick={() => handNumberClick(2)} className='border bg-color-pink'>2</div>
        <div onClick={() => handNumberClick(3)} className='border bg-color-pink'>3</div>
        <div onClick={() => handleOperatorClick("+")} className='border bg-color-pink'>+</div>
        <div onClick={() => setCurrentValue("0")} className='border bg-color-pink'>C</div>
        <div onClick={() => handNumberClick(0)} className='border bg-color-pink'>0</div>
        <div onClick={() => handleResult()} className='border bg-color-pink'>=</div>
        <div onClick={() => handleOperatorClick("-")} className='border bg-color-pink'>-</div>
      </div>
    </div>
  )
}

export default App
