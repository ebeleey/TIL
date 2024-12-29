# 프로젝트2. 투두리스트 앱

## Vercel 배포

https://tdl-drab.vercel.app/

## 목차

**UI 구현**
- [자식 선택자(`>`)와 자손 선택자(` `)](#자식-선택자와-자손-선택자-)

**기능 구현**

- [todos State가 중첩 배열로 선언 되는 문제](#todos-state가-중첩-배열로-선언-되는-문제)
- [비구조화 할당](#비구조화-할당)
- [TodoItem 렌더링](#todoitem-렌더링)
- [검색 필터링](#검색-필터링)
- [State 변경하는 로직은 State를 소유한 컴포넌트에서 관리되어야 한다](#state-변경하는-로직은-state를-소유한-컴포넌트에서-관리되어야-한다)
- [수정/삭제](#수정/삭제)

## 자식 선택자(`>`)와 자손 선택자(` `)

### 자식 선택자(`>`)
직접적인 자식 요소만 선택한다.

**예시**

```css
.List > input {
  width: 100%;
  border: none;
  border-bottom: 1px solid rgb(220, 220, 220);
  padding: 15px 0;
}
```
`.List` 클래스의 직접 자식인 `<input>` 요소에만 스타일이 적용된다.


```jsx
<div class="List">
    <input> <!-- 적용 O -->
    <div>
        <input> <!-- 적용 X (후손이지만 직접 자식이 아님) -->
    </div>
</div>
```

### 자손 선택자(공백)

선택자 앞 요소의 모든 자손 요소를 선택한다.
(직접 자식뿐 아니라 자식의 자식 등도 포함)

**예시**

```css
.Editor input {
  flex: 1;
  padding: 15px;
  border: 1px solid rgb(220, 220, 220);
  border-radius: 5px;
}
```
`.Editor` 클래스의 모든 자손 중 `<input>` 요소에 스타일이 적용된다.

```jsx
<div class="Editor">
    <input> <!-- 적용 O -->
    <div>
        <input> <!-- 적용 O -->
    </div>
</div>
```

## todos State가 중첩 배열로 선언 되는 문제

### 문제

```jsx
const [todos, setTodos] = useState([mockData]);
```

`mockData`가 배열이므로 `todos`가 중첩 배열 형태로 초기화되었다.

```
todos = [
  [
    { id: 0, content: "React 공부하기", isDone: false, date: ... },
    { id: 1, content: "빨래하기", isDone: false, date: ... },
    { id: 2, content: "노래 연습하기", isDone: false, date: ... }
  ]
];
```

이 상태에서 `newTodo`를 추가하면 다음과 같이 되었다.

```
todos = [
  { id: 0, content: "새로운 할 일", isDone: false, date: ... },
  [
    { id: 0, content: "React 공부하기", isDone: false, date: ... },
    { id: 1, content: "빨래하기", isDone: false, date: ... },
    { id: 2, content: "노래 연습하기", isDone: false, date: ... }
  ]
]
```

### 해결

`mockData`가 이미 배열이므로 `useState`의 초기값에 그대로 전달해야 한다.

```jsx
const [todos, setTodos] = useState(mockData);
```

이렇게 선언을 해야 새로운 할 일을 추가했을 때 정상적으로 동작한다!


## 비구조화 할당

### props를 직접 전달하는 방식
```jsx
const TodoItem = (props) => {
  return (
    <div className="TodoItem">
      <input checked={props.isDone} type="checkbox" />
      <div className="content">{props.content}</div>
      <div className="date">{new Date(props.date).toLocaleDateString()}</div>
      <button>삭제</button>
    </div>
  );
};
```

### 비구조화 할당 사용하는 방식
```jsx
const TodoItem = ({ id, isDone, content, date }) => {
  return (
    <div className="TodoItem">
      <input checked={isDone} type="checkbox" />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button>삭제</button>
    </div>
  );
};
```

`props` 객체에서 바로 필요한 값들(`id`, `isDone`, `content`, `date`)을 **`{}`** 로 묶어서 꺼내와서 사용할 수 있다.


## TodoItem 렌더링

### `map()`

```jsx
{todos.map((todo) => {
  return <TodoItem key={todo.id} {...todo} />
})}
```
- `map`메서드는 배열의 각 요소를 순회하며 특정 작업을 수행한 결과를 새로운 배열로 반환한다.
- 여기서는 `todos` 배열의 각 요소(`todo`)를 받아 `TodoItem` 컴포넌트로 변환하는 역할을 한다.

### `key`
- `key`는 React에서 리스트를 렌더링할 때 각 항목을 고유하게 식별하기 위한 속성
- 리스트의 변경 사항을 효율적으로 추적하기 위해 `key`를 사용

## 검색 필터링
```jsx
  const getFilteredData = () => {
    if (search === "") {
      return todos
    }
    return todos.filter((todo) =>
      todo.content
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }
```
- 검색어가 비어있다면 필터링 하지 않고 전체 `todos` 반환
- 검색어를 입력하면 필터링한 `todos`를 반환
  - 각 `todo`의 `content` 속성에서 `search` 문자열이 포함되어 있는지 확인
  - 대소문자를 무시해서(`toLowerCase`) 확인

## State 변경하는 로직은 State를 소유한 컴포넌트에서 관리되어야 한다

`todos`는 `App.jsx`에서 관리되고 있기 때문에 `todos`를 변경하는 모든 로직은 상태를 소유한 `App.jsx`에서 이루어져야 한다.

- React는 부모 -> 자식으로 단방향 데이터 흐름을 따른다.
- 자식 컴포넌트(`List.jsx`)는 부모 컴포넌트(`App.jsx`)의 상태를 직접 변경할 수 없다.
- 따라서 상태 변경 함수인 `onUpdate`를 상태가 정의된 `App.jsx`에 위치시키고, 이를 `props`로 내려보내야 한다.

> 자식 컴포넌트(`List.jsx`)는 단순히 **UI를 렌더링**하고 부모 컴포넌트(`App.jsx`)에 상태 변경 요청만 전달하도록 설계된다.

### 만약 `onUpdate`를 `List.jsx`에 작성했다면?

`List.jsx`는 상태를 직접 업데이트 할 수 없으므로 상태변경 요청을 다시 `App.jsx`로 전달해야 한다.


## 수정/삭제

### 수정
```jsx
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
```
기존 배열(todos)을 직접 수정하지 않고, map()을 사용해 새로운 배열을 반환함.

### 삭제
```jsx
  const onDelete = (targetId) => {
    // 인수: todos배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
    setTodos(todos.filter((todo) => todo.id !== targetId))
  }
```
기존 배열을 직접 수정하지 않고 새로운 배열을 반환함으로써 React에서 상태 변경을 감지할 수 있게 함.
