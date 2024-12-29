import './App.css'
import { useState, useRef } from "react"
import Header from './components/Header'
import Editor from './components/Editor'
import List from './components/List'

const mockData = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(), // 날짜 데이터를 타임스탬프로 저장하면 편리
  },
  {
    id: 1,
    isDone: false,
    content: "빨래하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    date: new Date().getTime(),
  },
]

function App() {
  const [todos, setTodos] = useState(mockData)
  const idRef = useRef(3)

  const onCreate = (content) => { // 새로운 TodoItem을 객체로 만들어줌
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    }
    // todos.push(newTodo) 이렇게 하면 안 됨 ! 
    // State값은 반드시 상태변화 함수를 호출해서 업데이트

    setTodos([newTodo, ...todos]) // 원래 배열에서 추가하고자하는 새로운 TodoItem 추가
  }

  // todos State 값들 중에 targetId와 일치하는 id를 갖는 TodoItem의 isDone 변경
  const onUpdate = (targetId) => {
    // 인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소의 데이터만 바꾼 새로운 배열
    setTodos(todos.map((todo) =>
      todo.id === targetId
        ? { ...todo, isDone: !todo.isDone }
        : todo
    )
    )
  }

  const onDelete = (targetId) => {
    // 인수: todos배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
    setTodos(todos.filter((todo) => todo.id !== targetId))
  }

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>

  )
}

export default App
