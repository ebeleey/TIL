# Context
## 목차
- [[11.1] Context란](#111-context란)
- [[11.2] Context 사용하기](#112-context-사용하기)
- [[11.3] Context 분리하기](#113-context-분리하기)

## [11.1] Context란

### React Context
컴포넌트간의 데이터를 전달하는 또 다른 방법

**기존 Props의 단점 해결**
- 기존 Props는 부모 → 자식으로만 데이터를 전달할 수 있음.
- 계층 구조가 깊은 경우, 여러 중간 컴포넌트를 거쳐 데이터를 전달해야 하는 **Props Drilling** 문제가 발생.
- Context는 **데이터 보관소 역할**을 하며, 부모와 자식 간의 계층 구조를 건너뛰어 데이터를 직접 전달 가능.

## [11.2] Context 사용하기

### 생성하기
```jsx
import { createContext } from "react"

const TodoContext = createContext(); // Context 생성
```

### Provider로 데이터 전달
- `Provider`는 Context 데이터를 하위 컴포넌트에 전달<br>
- `value` 속성을 통해 데이터 설정

```jsx
// App.jsx
export const TodoContext = createContext()

function App() {
  ...
  return (
    <TodoContext.Provider 
      value={{
        todos,
        onCreate,
        onUpdate,
        onDelete
      }}
    >
      <Editor />
      <List />
    </TodoContext.Provider>
  )
}
```

### Consumer로 데이터 사용
- `useContext` Hook을 사용하여 Context에서 데이터를 가져온다
```jsx
// Editor.jsx
import { useContext } from "react"
import { TodoContext } from "../App"

const Editor = () => {
  const { onCreate } = useContext(TodoContext) // onCreate만 공급받기
}
```

```jsx
// List.jsx

import { useContext } from "react"
import { TodoContext } from "../App"

const List = () => {
  const { todos } = useContext(TodoContext)
}
```

```jsx
// TodoItem.jsx

import { useContext } from "react"
import { TodoContext } from "../App"

const TodoItem = ({ id, isDone, content, date }) => {
  const { onUpdate, onDelete } = useContext(TodoContext)
}
```

## [11.3] Context 분리하기
- Provider 컴포넌트에 전달하는 value 객체가 변경되면, 해당 Provider와 모든 하위 컴포넌트가 리렌더링됨
- 리렌더링이 될 때 Provider 컴포넌트에게 value props로 전달하는 객체 자체가 다시 생성되기 때문

### 해결방법
**변경될 수 있는 값과 변경되지 않는 값을 분리**

변경될 수 있는 `todos` 같은 값은 `TodoStateContext`로, 변경되지 않는 `onCreate`, `onUpdate`, `onDelete`같은 값들은 `TodoDispatchContext`로 분리하여 리렌더링을 최소화한다

### 예제

```jsx
// App.jsx
import { useMemo } from "react"

export const TodoStateContext = createContext() // 변화할 값
export const TodoDispatchContext = createContext() // 변화하지 않을 값

function App() {
  // 변화하지 않을 값은 useMemo로 메모이제이션
  const memoizedDispatch = useMemo(() => {
    return { onCreate, onUpdate, onDelete }
  }, [])

  return (
    ...
    <TodoStateContext.Provider value={todos}>
      <TodoDispatchContext.Provider
      value = {memoizedDispatch} />
        <Editor />
        <List />
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  )
}

```
**`useMemo`를 사용한 이유**
- React에서는 컴포넌트가 리렌더링되면 함수와 객체가 매번 새로 생성
  - Provider의 value로 전달하는 객체가 매번 새로 생성되면, React는 이를 새로운 값으로 인식하여 Provider와 하위 컴포넌트들이 불필요하게 리렌더링
- `useMemo`를 사용하면 값을 재생성하지 않고 이전의 값을 재사용


```jsx
// Editor.jsx
import { useContext } from "react"
import { TodoDispatchContext } from "../App"

const Editor = () => {
  const { onCreate } = useContext(TodoDispatchContext) // onCreate만 공급받기
}
```
```jsx
// List.jsx

import { useContext } from "react"
import { TodoStateContext } from "../App"

const List = () => {
  const todos = useContext(TodoStateContext)
}
```
```jsx
// TodoItem.jsx

import { useContext } from "react"
import { TodoDispatchContext } from "../App"

const TodoItem = ({ id, isDone, content, date }) => {
  const { onUpdate, onDelete } = useContext(TodoDispatchContext)
}
```

