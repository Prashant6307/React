import { useState } from "react"

function Todo() {

  const [input, setInput] = useState("")

  const [todoList, setTodoList] = useState([])

  const addTodoItem = () => {

    if(input.trim() === "") return

    const Item = {
      id: todoList.length+1,
      text: input.trim(),
      isCompleted: false
    }

    setTodoList(prev => [...prev, Item])
    setInput("")
  }

  const toggleCompleted = (id) => {
    setTodoList(todoList.map(t => {
      if (t.id === id) {
        return {
          ...t,
          isCompleted: !t.isCompleted
        }
      }else return t
    }))
  }

  const deleteTodo = (id) => {
    setTodoList(todoList.filter((t)=> t.id !== id))
  }

  return (
    <>
      <input onChange={(e) => setInput(e.target.value)} className="border" type="text" value={input} />
      <button onClick={addTodoItem}>Add</button>
      <ul>
        {todoList.map(t => <li key={t.id}>
          <input type="checkbox" checked={t.isCompleted} onChange={() => toggleCompleted(t.id)} />
          <span className={t.isCompleted ? "line-through" : ""}>{t.text}</span>
          <button onClick={()=> deleteTodo(t.id)}>Delete</button>
        </li>)}
      </ul>

    </>
  )
}

export default Todo
