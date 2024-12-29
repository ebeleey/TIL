# useReducer

## 목차
- [[9.1] useReducer란?](#91-usereducer란)
- [[9.2] TodoList 앱 업그레이드](#92-todolist-앱-업그레이드)

## [9.1] useReducer란?

### `useReducer`
- 컴포넌트 내부에 새로운 State를 생성하는 React Hook
- 모든 `useState`는 `useReducer`로 대체 가능
- 상태 관리 코드를 **컴포넌트 외부로 분리**할 수 있음

### `useState` vs `useReducer`
**`useState`의 단점**
- 상태 관리 로직이 컴포넌트 내부에 포함됨.
- 여러 상태를 관리하거나 상태 변경 로직이 복잡해지면 코드가 길어지고 유지보수가 어려워짐.

**`useReducer`의 장점**
- 상태 관리 로직을 컴포넌트 외부로 분리 가능.
- 상태 변화 과정을 명확하게 정의 가능 (액션 기반 상태 변화).
- 코드 간결화: 컴포넌트는 UI 렌더링에 집중하고, 상태 관리는 reducer 함수가 처리.

### `useReducer`의 구성요소

1. **`reducer`**: 상태를 변화시키는 함수
2. **`dispatch`**: 상태 변화를 요청하는 함수
3. **`useReducer`**: `state`와 `dispatch`를 반환

```jsx
import { useReducer } from "react"

// reducer: 변환기
// => 상태를 실제로 변화시키는 변환기 역할
function reducer(state, action) {
  switch(action.type) {
    case 'INCREASE': 
      return state + action.data
    case 'DECREASE': 
      return state - action.data
    default: 
      return state
  }
}

const Exam = () => {
  // dispatch: 발송하다, 급송하다 
  // => 상태 변화가 있어야 한다는 사실을 알리는 함수
  const [state, dispatch] = useReducer(reducer, 0) // 초기값 0
  
  const onClickPlus = () => {
    // 인수: 상태가 어떻게 변화되길 원하는지 전달 (액션 객체)
    dispatch({
      type: "INCREASE",
      data: 1
    })
  }

  const onClickMinus = () => {
    dispatch({
      type: "DECREASE",
      data: 1
    })
  }

  return (
    <div>
      <h1>{state}</h1>
      <button onClick={onClickPlus}>+</button>
      <button onClick={onClickMinus}>+</button>
    </div>
  )
}

export default Exam
```
1. `reducer`: 상태 변화 로직을 정의.
2. `dispatch`: 상태를 어떻게 변경할지 `action` 객체로 전달.
3. `useReducer`: `state와` `dispatch를` 제공.

## [9.2] TodoList 앱 업그레이드
### `reducer` 함수 정의
```jsx
function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state]
    case "UPDATE":
      return state.map((item) =>
        item.id === action.targetId
        ? {...item, isDone: !item.isDone}
        : item
      )
    case "DELETE":
      return state.filter(
        (item) => item.id !== action.targetId
      )
    default:
      return state
  }
}
```
### App 컴포넌트
```jsx
import { useReducer, useRef } from "react";

// 초기 데이터
const mockData = [
  ...
];

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData)
  const idRef = useRef(3)

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      }
    })
  }

  const onUpdate = (targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    })
  }

  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId,
    })
  }

  return (
    ...
  )
}

```
### 결론

- 배열 안에 객체가 들어간 복잡한 구조는 보통 `useReducer`를 사용해 관리
- 간단한 상태변화 코드만 있다면 `useState`로 사용해도 충분