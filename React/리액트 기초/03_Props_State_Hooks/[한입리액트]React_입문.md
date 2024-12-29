# React 입문
## 목차
- [[5.1] 실습 준비하기](#51-실습-준비하기)
- [[5.2] React 컴포넌트](#52-react-컴포넌트)
- [[5.3] JSX로 UI 표현하기](#53-jsx로-ui-표현하기)
- [[5.4] Props로 데이터 전달하기](#54-props로-데이터-전달하기)
- [[5.5] 이벤트 처리하기](#55-이벤트-처리하기)
- [[5.7] State와 Props](#57-state와-props)
- [[5.8] State로 사용자 입력 관리하기 1](#58-state로-사용자-입력-관리하기-1)
- [[5.9] State로 사용자 입력 관리하기 2](#59-state로-사용자-입력-관리하기-2)
- [[5.10] useRef로 컴포넌트의 변수 생성하기](#510-useref로-컴포넌트의-변수-생성하기)
- [[5.11] React Hooks](#511-react-hooks)

## [5.1] 실습 준비하기

### `<StrictMode>`

- 개발 중에 잠재적인 문제를 감지하고, 더 나은 개발 경험을 제공하기 위해 사용되는 도구
- 지금 단계에서는 사용하지 않는다.

### `eslint` 설정 비활성화

```
// eslint.config.js

    rules: {
			...
      "no-unused-vars": "off",
      "react/prop-types": "off",
```

- 개발 초기 단계에서는 불필요한 경고가 많이 발생할 수 있기 때문에 설정 off 해놓기

## [5.2] React 컴포넌트
### 컴포넌트

- html 태그를 반환하는 함수를 **컴포넌트**라고 부른다.
- 컴포넌트를 생성하는 함수의 이름은 반드시 첫번째 글자가 대문자여야 한다.
- 화살표 함수로 함수를 생성해도 된다.

**예제**

```jsx
function Header() {
  return (
    <header>
      <h1>header</h1>
    </header>
  )
}
```

### 계층구조

- `Header` 컴포넌트를 화면에 렌더링하기 위해서는 `App` 컴포넌트 안에 `Header` 컴포넌트를 같이 리턴시켜주어야 함.
    - 이 때 `App` 컴포넌트는 **부모 컴포넌트** `Header` 컴포넌트는 **자식 컴포넌트**라고 한다.
- 리액트의 모든 컴포넌트들은 화면에 렌더링하기 위해서는 모두 `App` 컴포넌트의 자식 컴포넌트여야 한다.
    - 모든 자식 컴포넌트들은 `App`컴포넌트를 최상위 조상으로 가져야 한다.
    - `App`컴포넌트를 루트 컴포넌트라고 부른다.
- 루트 컴포넌트는 `main.jsx`에서 `render`메서드의 인수로 전달되어 있기 때문에 루트 컴포넌트를 변경할수도 있지만, 관례상 `App` 컴포넌트를 루트 컴포넌트로 설정한다.
- 같은 파일에 여러 컴포넌트를 작성하기보다, 모듈화를 위해 컴포넌트별로 각각 파일을 나누어서 작성하는 것이 일반적이다.
    - `src`폴더 안에 `components`폴더 안에 각각의 컴포넌트를 작성한다.

**예제**

```jsx
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  )
}

export default App
```

```jsx
// src/components/Header.jsx

function Header() {
  return (
    <header>
      <h1>header</h1>
    </header>
  )
}

export default Header;
```

## [5.3] JSX로 UI 표현하기

### **JSX(JavaScript Extensions)**

- 확장된 자바스크립트의 문법으로, 자바스크립트와 html을 혼용하여 사용할 수 있게 함
- 자바스크립트는 HTML 태그를 리턴하게 할 수 없지만, 리액트에서는 JSX 문법을 사용하여 가능하다.

**변수 사용**

- JSX 내부에서 자바스크립트 변수를 출력하려면 중괄호를 사용한다.
    
    ```jsx
    const Main = () => {
      const number = 10
    
      return (
        <main>
          <h1>main</h1>
          <h2>{number}</h2>
        </main>
      )
    }
    
    export default Main
    ```
    
- 숫자나 문자열 값으로 평가될 수 있는 식이라면 무엇이든 넣을 수 있음
- 삼항연산자도 가능
    
    ```jsx
    {number % 2 === 0 ? "짝수" : "홀수"}
    ```
    

**주의 사항**

1. 중괄호 내부에서는 자바스크립트 표현식만 넣을 수 있다.
    - if문이나 for문 같은 조건문이나 반복문은 사용할 수 없음
2. 숫자, 문자열, 배열 값만 렌더링된다.
    - `boolean`, `undefined`, `null`값은 렌더링이 되지않음
    - 객체 값을 그대로 렌더링하는 것도 불가능 → 오류 발생
3. 모든 태그는 닫혀있어야 한다.
4. 최상위 태그는 반드시 하나여야만 한다.
    - 최상위에 감쌀만한 태그가 없다면, 그냥 빈 태그(`<>`, `</>`)로 감싸주어도 된다.

### 조건에 따라 다른 UI를 렌더링하기

```jsx
// 삼항 연산자 이용

const Main = () => {
  const user = {
    name: "이다이",
    isLogin: true,
  }

  return (
    <>
    {user.isLogin ? (<div>로그아웃</div>) : (<div>로그인</div>)}
    </>
  )
}

export default Main
```

```jsx
// if문 이용

const Main = () => {
  const user = {
    name: "이다이",
    isLogin: true,
  }

  if (user.isLogin) {
    return <div>로그아웃</div>
  } else {
    return <div>로그인</div>
  }
}

export default Main
```

### DOM 스타일 적용하기

**1. 인라인 스타일**

```jsx
    <div style={{ backgroundColor: "red", borderBottom: "5px solid blue" }}>
      로그아웃
    </div>
```

- CSS속성명을 camelCase로 작성
- 스타일을 많이 작성하게되면 가독성이 안 좋아진다.

**2. CSS 파일**

```css
/* Main.css */

.logout {
  background-color: red;
  border-bottom: 5px solid green;
}
```

```jsx
import "./Main.css"

... 
	<div className="logout">로그아웃</div>
```


## [5.4] Props로 데이터 전달하기

### Props

- 부모 컴포넌트가 자식 컴포넌트로 데이터 전달할 때 사용
- 부모 컴포넌트 → 자식 컴포넌트로만 전달 가능하다. 반대방향으로는 불가능하다.

**예제**

```javascript
// Button.jsx

const Button = (props) => {
  return <button>{props.text}</button>;
};

export default Button;
```

```javascript
//App.jsx

import './App.css'
import Button from './components/Button'

function App() {

  return (
    <>
      <Button text={"메일"} />
      <Button text={"카페"} />
      <Button text={"블로그"} />
    </>
  )
}

export default App
```

### 기본값 설정하기

- `defaultProps` 사용하여 props의 기본값 설정

```javascript
const Button = (props) => {
  console.log(props)
  return (
    <button style={{ color: props.color }}>
      {props.text} - {props.color.toUpperCase()}
    </button>
  )
}

Button.defaultProps = {
  color: "black",
}

export default Button
```

### 객체 구조분해 할당

- 점표기법을 사용하지 않고 객체의 구조분해할당 문법을 사용하여 props 객체에 접근하여 값을 바로 꺼내오기

```javascript
const Button = ({ text, color }) => {
  return (
  <button style={{ color: color }}>
    {text} - {color.toUpperCase()}
  </button>
  )
}
```

### 스프레드 연산자

- 여러 개의 props를 한 번에 전달한다

```javascript
import './App.css'
import Button from './components/Button'

function App() {
  const buttonProps = {
    text: "메일",
    color: "red",
    a: 1,
    b: 2,
    c: 3,
  }
  return (
    <>
      <Button {...buttonProps} />
      <Button text={"카페"} />
      <Button text={"블로그"} />
    </>
  )
}

export default App
```

### 자식 요소 전달

- 자동으로 `children`이라는 `props`로 전달이된다.
- `{children}`을 사용하면 자동으로 렌더링된다.

```javascript
      <Button text={"블로그"} >
        <div>자식요소</div>
      </Button>
```

```javascript
const Button = ({ text, color, children }) => {
  return (
	  <button>
	    {text}
	    {children}
	  </button>
  )
}
```

## [5.5] 이벤트 처리하기
 
### 이벤트 핸들링(Event Handling)

- **이벤트**: 웹 내부에서 발생하는 사용자의 행동
    - ex) 버튼 클릭, 메시지 입력, 스크롤 등등
- **이벤트 핸들링**: 이벤트가 발생했을 때 그것을 처리하는 것
    - ex) 버튼 클릭 시 경고창 노출

### 이벤트 핸들러

**1. 익명 함수로 정의**
- `onClick`속성에 익명함수를 직접 전달

```jsx
<button onClick={() => console.log("버튼 클릭됨")}>
  클릭
</button>
```

**2. 별도 함수 선언**

- 이벤트 핸들러를 별도의 함수로 정의 한 후 호출

```jsx
  const onClickButton = () => {
    console.log(text)
  }
  ...
  return (
    <button onClick={onClickButton}>
      클릭
    </button>
  )
```

**주의 사항**

- 함수의 호출결과를 전달하는 게 아니라 콜백함수를 전달하듯이 **함수 자체를 전달**해야 한다 
  - **함수의 이름**만 이벤트 핸들러로 설정하면 됨!

**이벤트 종류**

- `onClick`: 클릭 이벤트.
- `onMouseEnter`: 마우스 오버 이벤트.
- `onKeyDown`: 키보드 입력 이벤트.
- `onSubmit`: 폼 제출 이벤트.

### 이벤트 객체

리액트에서 발생하는 모든 이벤트는 이벤트 핸들러 함수를 호출하면서 매개변수로 **이벤트 객체**를 제공한다.

**사용법**

매개변수를 선언하면 이 변수에 이벤트 객체가 저장된다. 

```jsx
  const onClickButton = (e) => {
	  console.log(e.target); // 이벤트가 발생한 DOM 요소
  }
```

### **합성 이벤트(Synthetic Event)**

- 모든 웹 브라우저의 이벤트 객체를 하나로 통일한 형태

**Crossing Browsing Issue**

- 브라우저별 스펙이 달라 브라우저별로 이벤트 객체(현재 이벤트가 발생한 요소)가 다른 문제
- React의 **합성 이벤트**(통일된 규칙)으로 해결할 수 있다.


## [5.6] State로 상태관리하기

### State
- 현재 가지고 있는 형태나 모양을 정의
- 변화할 수 있는 동적인 값
- 컴포넌트의 상태(state)에 따라 렌더링되는 UI가 결정
- State 값이 변경되면 컴포넌트는 리렌더링(Re-Rendering) 되어 화면에 변경사항이 반영
- 하나의 컴포넌트에서 여러 개의 State를 사용할 수 있음

### `useState()`
```jsx
import { useState } from "react";

const [state, setState] = useState(0);
```
- 인수로 State의 초기값을 받는다.
- 반환값
  1. State의 현재 값
  2. State를 변경하는 함수
- 구조분해 할당을 사용하는 것이 일반적이다.


### 예제
**count 버튼 구현**
- 버튼 클릭 시 setState로 State 값을 변경.
- State 값이 변경되면 컴포넌트가 리렌더링되어 새로운 UI가 화면에 반영됨.
```jsx
import './App.css'
import { useState } from "react"

function App() {
  const [state, setState] = useState(0)

  return (
    <>
      <h1>{state}</h1>
      <button onClick={() => {
        setState(state + 1)
      }}
      >
        +
      </button>
    </>
  )
}

export default App
```
**여러 개의 State 사용**

```jsx
import './App.css'
import { useState } from "react"

function App() {
  const [count, setCount] = useState(0)
  const [light, setLight] = useState("OFF")

  return (
    <>
      <div>
        <h1>{light}</h1>
        <button onClick={()=>{
          setLight(light === "ON" ? "OFF" : "ON")
        }}>
          {light === "ON" ? "끄기" : "켜기"}
        </button>
      </div>
      <div>
        <h1>{count}</h1>
        <button onClick={()=>{
          setCount(count+1)
        }}>
          +
        </button>
      </div>

    </>
  )
}

export default App
```

### State를 사용하는 이유
**`let`**
- 값을 변경할 수는 있다.
- 변경을 감지하지는 못하기 때문에 화면이 자동으로 업데이트 되지 않는다.

**State**
- 값이 변경되면 React가 감지하고 컴포넌트를 리렌더링한다.
- 화면에 변경된 값이 반영된다. 


## [5.7] State와 Props

### 컴포넌트가 리렌더링이 되는 상황
1. 자신이 관리하는 State값이 변경되었을 때
2. 자신이 제공받는 Props값이 변경되었을 때
3. 부모 컴포넌트가 리렌더링 되었을 때

### 문제
부모 컴포넌트의 리렌더링 때문에 의미없이 리렌더링이 되는 자식 컴포넌트가 많아지면 성능이 저하됨

=> 관련이 없는 로직은 **별도의 컴포넌트로 분리**하여 성능 최적화.

### 예제

```jsx
// App.jsx
import './App.css'
import { useState } from "react"

import Bulb from './components/Bulb'
import Counter from './components/Counter'

function App() {

  return (
    <>
      <Bulb />
      <Counter />
    </>
  )
}

export default App
```

```jsx
// Bulb.jsx
import { useState } from "react"

const Bulb = () => {
  const [light, setLight] = useState("OFF")

  return (
    <div>
      {light === 'ON' ? (
        <h1 style={{ backgroundColor: "orange" }}>ON</h1>
      ) : (
      <h1 style={{ backgroundColor: "gray" }}>OFF</h1>
      )}

      <button onClick={()=>{
        setLight(light === "ON" ? "OFF" : "ON")
      }}>
        {light === "ON" ? "끄기" : "켜기"}
      </button>

    </div>
    
  )
}

export default Bulb
```

```jsx
// Counter.jsx
import { useState } from "react"

const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>{ count }</h1>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        +
      </button>
    </div>
  )
}

export default Counter
```

## [5.8] State로 사용자 입력 관리하기 1
### 간단 회원가입 폼 예제
1. 이름
2. 생년월일
3. 국적
4. 자기소개
```jsx
import { useState } from "react";

const Register = () => {
  
  const [name, setName] = useState("이름")
  const [birth, setBirth] = useState("")
  const [country, setCountry] = useState("")
  const [bio, setBio] = useState("")

  const onChangeName = (e) =>{
    setName(e.target.value)
  }

  const onChangeBirth = (e) => {
    setBirth(e.target.value)
  }

  const onChangeCountry = (e)=> {
    setCountry(e.target.value)
  }

  const onChangeBio = (e) => {
    setBio(e.target.value)
  }
  
  return (
  <div>
    <div>
      <input
      value={name}
      onChange={onChangeName} 
      placeholder={"이름"} 
      />
    </div>

    <div>
      <input 
      value={birth}
      type="date" 
      onChange={onChangeBirth}
      />
    </div>

    <div>
      <select value={country} onChange={onChangeCountry}>
        <option value=""></option>
        <option value="kr">한국</option>
        <option value="us">미국</option>
        <option value="uk">영국</option>
      </select>
    </div>

    <div>
      <textarea 
      value={bio}
      onChange={onChangeBio}
      />
    </div>
  </div>
  )
}

export default Register;
```
- `select`에서 보여지는 값과 저장되는 값을 다르게 하려면 `value`속성 추가

## [5.9] State로 사용자 입력 관리하기 2

- 비슷한 여러 개의 State가 있으면 하나의 객체값으로 묶어서 하나의 State로 통합해서 관리
- 여러 개의 비슷하게 생긴 이벤트 핸들러들은 하나의 통합 이벤트 핸들러로 관리

```jsx
import { useState } from "react";

const Register = () => {
  
  const [input, setInput] = useState({
    name: "",
    birth: "",
    country: "",
    bio: ""
  })
  
  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }
  
  return (
  <div>
    <div>
      <input
      name="name"
      value={input.name}
      onChange={onChange} 
      placeholder={"이름"} 
      />
    </div>

    <div>
      <input 
      name="birth"
      value={input.birth}
      type="date" 
      onChange={onChange}
      />
    </div>

    <div>
      <select name="country" value={input.country} onChange={onChange}>
        <option value=""></option>
        <option value="kr">한국</option>
        <option value="us">미국</option>
        <option value="uk">영국</option>
      </select>
    </div>

    <div>
      <textarea 
      name="bio"
      value={input.bio}
      onChange={onChange}
      />
    </div>
  </div>
  )
}

export default Register;
```

## [5.10] useRef로 컴포넌트의 변수 생성하기

### `useRef`
새로운 Reference 객체를 생성하는 기능

1. 리렌더링을 유발하지 않음
  - `Reference`와 `State` 모두 컴포넌트 내부의 변수로 활용 가능하다는 점에서 `useState`와 비슷하지만, `useRef`는 어떤 경우에도 리렌더링을 유발하지 않는다.
2. 값이 유지됨
  - 컴포넌트가 리렌더링되더라도 `useRef`에 저장된 값은 초기화되지 않고 유지됨.
3. DOM요소에 접근·조작이 가능
  - 특정 요소에 Focus를 준다거나, 요소의 스타일을 변경시킬 수 있다.

### 예제
**상태 변경 횟수 카운팅**

```jsx
import { useState, useRef } from "react";

const Register = () => {

  const [input, setInput] = useState({
    name: "",
    birth: "",
    country: "",
    bio: ""
  })

  const countRef = useRef(0) //Reference가 수정되는 횟수

  const onChange = (e) => {
    countRef.current++
    console.log(countRef.current)
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div>
      <div>
        <input
          name="name"
          value={input.name}
          onChange={onChange}
          placeholder={"이름"}
        />
      </div>

      <div>
        <input
          name="birth"
          value={input.birth}
          type="date"
          onChange={onChange}
        />
      </div>

      <div>
        <select name="country" value={input.country} onChange={onChange}>
          <option value=""></option>
          <option value="kr">한국</option>
          <option value="us">미국</option>
          <option value="uk">영국</option>
        </select>
      </div>

      <div>
        <textarea
          name="bio"
          value={input.bio}
          onChange={onChange}
        />
      </div>

      <button onClick={onSubmit}>제출</button>
    </div>
  )
}

export default Register;
```

**DOM 요소 제어**
```jsx
import { useState, useRef } from "react";

const Register = () => {

  const [input, setInput] = useState({
    name: "",
    birth: "",
    country: "",
    bio: ""
  })

  const inputRef = useRef(0) //특정 DOM 요소 참조

  const onSubmit = () => {
    if(input.name === "") {
      // 이름을 입력하는 DOM 요소 포커스
      inputRef.current.focus()
    }
  }

  return (
    <div>
      <div>
        <input
          ref={inputRef}
          name="name"
          value={input.name}
          onChange={onChange}
          placeholder={"이름"}
        />
      </div>

      <button onClick={onSubmit}>제출</button>
    </div>
  )
}

export default Register;
```

### `useRef` vs 다른 방법
**`useRef`와 `let`**
- `let`변수를 사용하면 함수 내부의 코드가 다시 실행되기 때문에 **컴포넌트가 리렌더링될 때 변수의 값이 초기화**됨

**`useRef`와 외부 변수 선언**
- 컴포넌트 외부에 변수를 선언하면 여러 컴포넌트에서 같은 변수를 공유할 수 있게 되기 때문에 문제가 발생한다.
- 상위 컴포넌트가 동일한 하위 컴포넌트를 여러 개 렌더링하면 같은 변수 값이 서로 간섭

**=>`useRef`나 `useState`는 컴포넌트가 리렌더링이 된다고 해도 값이 리셋되지 않음!**

## [5.11] React Hooks

### React Hooks
클래스 컴포넌트에서만 가능했던 기능들을 함수 컴포넌트에서도 이용할 수 있도록 도와주는 메서드들

**특징**
- 이름 앞에 `use` 접두사가 붙음
- 각각의 메서드를 Hook이라고 부름


### 주의사항
1. 반드시 함수 컴포넌트, 커스텀 훅 내부에서만 호출 가능
2. 조건문이나 반복문 안에서 조건부로 호출 될 수 없음
3. 나만의 훅(Custom Hook)을 직접 만들 수 있음
    - 반복적으로 사용하는 로직을 분리하여 재사용성을 높일 수 있음.
    - 이름은 반드시 use로 시작해야 함.

### 예제

```jsx
// hooks/useInput.jsx
import { useState } from "react"

const useInput = () => {
  const [input, setInput] = useState("")

  const onChange = (e) => {
    setInput(e.target.value)
  }
  return [input, onChange]
}

export default useInput
```

```jsx
//components/HookExam.jsx
import useInput from './../hooks/useInput'

const HookExam = () => {
  const [input, onChange] = useInput()
  const [input2, onChange2] = useInput()

  return (
    <div>
      <input value={input} onChange={onChange} />
      <input value={input2} onChange={onChange2} />
    </div>
  )
}

export default HookExam
```