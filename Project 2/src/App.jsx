
import { useState } from 'react'
import './App.css'

function App() {
  
  let [color , setColor] = useState("white")

  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json."

  return (
    
    <div className='h-screen w-screen' style={{backgroundColor:color}}>
      <div>
        <button onClick={()=> setColor("red")} className='bg-red-500'>red</button>
        <button onClick={()=> setColor("blue")} className='bg-blue-500'>blue</button>
        <button onClick={()=> setColor("green")} className='bg-green-500'>green</button>
        <button onClick={()=> setColor("black")} className='bg-black'>black</button>
        <button onClick={()=> setColor("white")} className='bg-white'>white</button>
        <button onClick={()=> setColor("olive")} className='bg-olive-500'>Olive</button>
      </div>
      
    </div>
  )
}

export default App
