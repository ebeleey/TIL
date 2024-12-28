# React 공식 문서- Quick Start

## 컴포넌트 생성 및 중첩하기

### 컴포넌트란?

고유한 로직과 모양을 가진 **UI**(사용자 인터페이스)

- 버튼만큼 작을 수도 있고, 전체 페이지만큼 클 수도 있다.
- React 컴포넌트의 이름은 항상 대문자로 시작해야 하고 HTML 태그는 소문자로 시작해야한다.

```jsx
// 컴포넌트 생성 및 중첩하기

function MyButton() {
  return (
    <button>
      I'm a button
    </button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```

<br>

## JSX로 마크업 작성하기

- JSX에서는 태그를 닫아야 한다.
  - 예: `<br />` 
- 컴포넌트는 여러 개의 JSX 태그를 반환할 수 없음.
  - `<div>...</div>` 또는 `<>...</>` 같은 부모 태그로 감싸야 한다.

<br>

## 스타일 추가하기

React에서는 `className`으로 CSS 클래스를 지정한다.

```jsx
<img className="avatar" />
```

그 다음 별도의 CSS 파일에 CSS 규칙 작성

```css
.avatar {
  border-radius: 50%;
}
```

<br>

## 데이터 표시하기

### 데이터를 직접 쓰는 게 아니라, **변수**나 **값**을 보여주고 싶으면 중괄호 `{}`를 사용

```jsx
return (
  <h1>
    {user.name}
  </h1>
)
```

### 속성 값으로 사용할 수도 있음
```jsx
return (
  <img
    className="avatar"
    src={user.imageUrl}
  />
);
```

### 복잡한 표현식도 가능
문자열을 연결하거나 조건문을 쓸 수도 있다.
```jsx
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name} 
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}
```
**`style={{}}`의 의미**
- 외부 중괄호는 JSX 문법으로, 자바스크립트를 사용한다는 표시
- 내부 중괄호는 일반적인 자바스크립트 객체를 나타낸다.

**코드 실행 결과**
- `alt`: `"Photo of Hedy Lamarr"`
- `style`: `{ width: 90, height: 90 }`


<br>

## 조건부 렌더링

```jsx
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return (
  <div>
    {content}
  </div>
);
```
### 간결한 코드 => 삼항 연산자 사용
```jsx
<div>
  {isLoggedIn ? (
    <AdminPanel />
  ) : (
    <LoginForm />
  )}
</div>
```
### `else`가 필요하지 않다면 => `&&` 연산자 사용
```jsx
<div>
  {isLoggedIn && <AdminPanel />}
</div>
```
이 문법은 속성(Attribute)값을 조건부로 지정할 때도 사용할 수 있음

<br>

## 리스트 렌더링하기

```jsx
const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];
```

### `map()` 함수
```jsx
const listItems = products.map(product =>
  <li key={product.id}>
    {product.title}
  </li>
);

return (
  <ul>{listItems}</ul>
);
```
`key`값을 지정해야 함

<br>

## 이벤트에 응답하기

### 컴포넌트 내부에 이벤트 핸들러 함수 선언

```jsx
function MyButton() {
  function handleClick() {
    alert('You clicked me!!!')
  }
  return (
    <button onClick={handleClcik}>
      Click me
    </button>
  )
}
```
이벤트 핸들러 함수를 **호출**하지 않고 **전달**만 하면 됨<br>
=> `onClcik={handleClick}`의 끝에 소괄호(`()`)가 없음

<br>

## 화면 업데이트하기

### `state`

```jsx
import { useState } from 'react'
```

```jsx
function MyButton() {
  const [count, setCount] = useState(0)
  // ...
}
```

- `count`: 현재 state 값
- `setCount` : `count`를 변경하는 함수

```jsx
import { useState } from 'react';

export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton /> 
      <MyButton />
    </div>
  );
}

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}

```
같은 컴포넌트를 여러 번 렌더링 하면, 각각 고유한 state를 가진다. <br>
각 버튼은 서로 영향을 주지 않으면서 독립적으로 동작한다.

<br>

## Hook 사용하기

### Hook이란?
`use`로 시작하는 함수

### React에서 제공하는 내장 Hook

**예시**
- `useState`: 상태를 추가
- `useEffect`: 컴포넌트의 생명주기 관련 작업 처리.
- `useContext`: React 컨텍스트 값 사용.

**API 레퍼런스**
https://ko.react.dev/reference/react

### 사용자 정의 Hook
- 기존의 것들을 조합하여 자신만의 Hook을 작성할 수도 있음

### 사용 규칙
- 컴포넌트(또는 다른 Hook)의 상단에서만 Hook을 호출할 수 있음.
  - Hook을 조건문이나 반복문 안에 쓰고 싶다면 새 컴포넌트로 추출하는 게 좋다!

<br>

## 컴포넌트 간에 데이터 공유하기

모든 버튼이 동일한 `count`를 공유하려면?

즉, 하나의 버튼을 클릭하면 다른 버튼의 `count`도 함께 업데이트 되게 하려면?

### state 끌어올리기

**공통 조상 컴포넌트**(개별 버튼에서 모든 버튼이 포함된 가장 가까운 컴포넌트)로 **state를 끌어올린다**!

**1. `state`와 `handler`를 상위 컴포넌트로 이동시킴.**  
- `MyButton`에 있던 `count`와 `setCount`를 `MyApp`으로 옮김

**2. `props`를 통해 데이터를 자식 컴포넌트로 전달.**  
- 상위 컴포넌트가 `count`와 `handleClick`을 자식 컴포넌트로 내려줌

```jsx
import { useState } from 'react';

export default function MyApp() {
  const [count, setCount] = useState(0); // 1. state를 MyApp으로 끌어올림

  function handleClick() {
    setCount(count + 1); // 2. 클릭하면 count 증가
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} /> {/* 3. props로 전달 */}
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

function MyButton({ count, onClick }) { // 4. props로 데이터 받기
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
```
state를 위로 이동함으로써 컴포넌트 간에 state를 공유하게 된다.