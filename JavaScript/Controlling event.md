# Controlling event

날짜: 2024년 10월 28일
태그: JavaScript


# 이벤트

## event 객체

### event

무언가 일어났다는 신호, 사건

→ 모든 DOM 요소는 이러한 event를 만들어냄

### event object

- DOM에서 이벤트가 발생했을 때 생성되는 객체
- 이벤트 종류
    - `mouse`, `input`, `keyboard`, `touch`, …
    - https://developer.mozilla.org/en-US/docs/Web/API/Event


DOM 요소에서 event가 발생하면
해당 event는 연결된 이벤트 처리기(event handler)에 의해 처리됨

</aside>

## event handler

특정 이벤트가 발생했을 때 실행되는 함수

⇒ 사용자의 행동에 어떻게 반응할지를 JavaScript 코드로 표현한 것

### `.addEventListener()`

대표적인 이벤트 핸들러 중 하나

→ 특정 이벤트를 DOM 요소가 수신할 때마다 콜백 함수를 호출

**`EventTarget.addEventListener(type, handler)`**

- `EventTarget` : DOM 요소
- `type` :  수신할 이벤트
    - 문자열로 작성 (예: `'click'`)
- `handler` : 콜백 함수
    - 이벤트 핸들러는 자동으로 event 객체를 매개변수로 받음

⇒ 대상에 특정 event가 발생하면, 지정한 이벤트를 받아 할 일을 등록한다.

### `addEventListener` 활용

```jsx
element.addEventListener('click', function (event) {
	// 이벤트 처리 로직
})
```

- 버튼을 클릭하면 버튼 요소 출력하기
- 버튼에 이벤트 처리기를 부착하여 클릭 이벤트가 발생하면 이벤트가 발생한 버튼정보를 출력

```jsx
// 1. 버튼 선택
const btn = document.querySelector('#btn')

// 2. 콜백 함수
const detectClick = function (event) {
	console.log(event) // PointerEvent
	console.log(event.currentTarget) // <button id="btn">버튼</button>
	console.log(this) // <button id="btn">버튼</button>
}

// 3. 버튼에 이벤트 핸들러를 부착
btn.addEventHandler('click', detectClick)
```

- 요소에 `addEventListener`를 연결하게 되면 내부의 `this` 값은 연결된 요소를 가리키게 됨(`event`객체의 `currentTarget` 속성 값과 동일)

### `addEventListener` 콜백 함수 특징

- 이벤트 핸들러 내부의 `this`는 이벤트 리스너에 연결된 요소(`currentTarget`)를 가리킴
- 이벤트가 발생하면 `event`객체가 생성되어 첫 번째 인자로 전달
    - `event` 객체가 필요 없는 경우 생략 가능
- 반환 값 없음

# 버블링

`form` > `div` > `p` 형태의 중첩된 구조에 각각 이벤트 핸들러가 연결되어 있을 때 `<p>` 요소를 클릭하면?

`<p>`요소만 클릭했는데도 불구하고 모든 핸들러가 동작함

## 버블링(Bubbling)

- 한 요소에 이벤트가 발생하면, 이 요소에 할당된 핸들러가 동작하고, 이어서 부모 요소의 핸들러가 동작하는 현상
- 가장 최상단의 조상 요소(document)를 만날 때까지 이 과정이 반복되면서 요소 각각에 할당된 핸들러가 동작

⇒ 이벤트가 제일 깊은 곳에 있는 요소에서 시작해 부모 요소를 거슬러 올라가며 발생하는 것이 마치 물속 거품과 닮았기 때문

최하위의 `<p>` 요소를 클릭하면 `<p>` → `<div>` → `<form>` 순서로 3개의 이벤트 핸들러가 모두 순차적으로 동작

### 이벤트가 정확히 어디서 발생했는지 접근할 수 있는 방법

- `event.currentTarget`
    - 현재 요소
    - 항상 **이벤트 핸들러가 연결된 요소**만을 참조하는 속성
    - `this`와 같음
- `event.target`
    - 이벤트가 발생한 가장 안쪽의 요소(`target`)를 참조하는 속성
    - **실제 이벤트가 시작된 요소**
    - 버블링이 진행되어도 변하지 않음

## 캡처링과 버블링

### 캡처링(Capturing)


- 이벤트가 하위 요소로 전파되는 단계(버블링과 반대)

- `table`의 하위 요소 `td`를 클릭하면 이벤트는 먼저 최상위 요소부터 아래로 전파됨(캡처링)
- 실제 이벤트가 발생한 지점(`event.target`)에서 실행된 후 다시 위로 전파(버블링)
    - 이 전파 과정에서 상위 요소에 할당된 이벤트 핸들러들이 호출되는 것

⇒ 캡처링은 실제 개발자가 다루는 경우가 거의 없으므로 버블링에 집중하기

## 버블링이 필요한 이유

각자 다른 동작을 수행하는 여러 개의 버튼 → 각 버튼마다 서로 다른 이벤트 핸들러를 할당할 필요 없이 각 버튼의 공통 조상인 `div`  요소에 이벤트 핸들러 단 하나만 할당한다.

```jsx
<div>
	<button></button>
	<button></button>
	...
	<button></button>
	<button></button>
</div>
```

- 요소의 공통 조상에 이벤트 핸들러를 단 하나만 할당하면, 여러 버튼 요소에서 발생하는 이벤트를 한꺼번에 다룰 수 있음.
- 공통 조상에서 할당한 핸들러에서 `event.target`을 이용하면 실제 어떤 버튼에서 이벤트가 발생했는지 알 수 있기 때문

```jsx
const divTag = document.querySelector('div')

divTag.addEventListener('click', function (event) {
	console.log(event.target)
})
```

# event handler 활용

## 실습

### 버튼을 클릭하면 숫자 1씩 증가하기

```jsx
<button id="btn">버튼</button>
<p>클릭횟수 : <span id="counter">0</span></p>
```

```jsx
// 1. 초기값 할당
let counterNumber = 0

// 2. 버튼 요소 선택
const btn = document.querySelector('#btn')

// 3. 콜백 함수(버튼에 클릭 이벤트가 발생할때마다 실행할 코드)
const clickHandler = function() {
	counterNumber += 1
	
	const spanTag = document.querySelector('#counter')
	
	spanTag.textContent = counterNumber
}

// 4. 버튼에 이벤트 핸들러 부착 (클릭 이벤트)
btn.addEventListener('click', clickHandler)
```

### 사용자의 입력 값을 실시간으로 출력하기

```jsx
<input type="text" id="text-input">
<p></p>
```

```jsx
// 1. input 요소 선택
const inputTag = document.querySelector('#text-input')

// 2. p 요소 선택
const pTag = document.querySelector('p')

// 3. 콜백 함수(input 요소에 input 이벤트가 발생할때마다 실행할 코드)
const inputHandler = function (event) {
	console.log(event.currentTarget.value)
	pTag.textContent = event.currentTarget.value
}

// 4. input 요소에 이벤트 핸들러 부착(input 이벤트)
inputTag.addEventListener('input', inputHandler)
```

- `console.log(event)`로 `event`객체를 출력할 경우 `currentTarget` 키의 값은 `null`을 가짐
    - `currentTarget`은 이벤트가 처리되는 동안에만 사용할 수 있기 때문
- 대신 `console.log(event.currentTarget)`을 사용하여 콘솔에서 확인 가능

⇒ `currentTarget` 이후의 속성 값들은 `target`을 참고해서 사용

### 사용자의 입력 값을 실시간으로 출력 
+ 버튼을 클릭하면 출력한 값의 CSS 스타일 변경하기

```jsx
<head>
	<style>
		.blue {
			color: blue;
		}
	</style>
</head>

<body>
	<h1></h1>
	<button id="btn">클릭</button>
	<input type="text" id="text-input">
</body>
```

```jsx
// input 구현
const inputTag = document.querySelector('#text-input')
const h1Tag = document.querySelector('h1')

const inputHandler = function (event) {
	h1Tag.textContent = event.currentTarget.value
}

inputTag.addEventListener('input', inputHandler)

// click 구현
const btn = document.querySelector('#btn')

const clickHandler = function() {
	// 1. 방법
	h1Tag.classList.add('blue')
	
	// 2. toggle 방법
	h1Tag.classList.toggle('blue')
	
	// 3. if 방법
	if (h1Tag.classList.value) {
		h1Tag.classList.remove('blue')
	} else {
		h1Tag.classList.add('blue')
	}
}

btn.addEventListener('click', clickHandler)
```

### todo 실습

```jsx
<input type="text" class="input-text">
<button id="btn">+</button>
<ul></ul>
```

```jsx
// 1. 필요한 요소 선택
const inputTag = document.querySelector('.input-text')
const btn = document.querySelector('#btn')
const ulTag = document.querySelector('ul')

const addTodo = function (event) {
	// 사용자 입력 데이터 저장
	const inputData = inputTag.value
	
	// 데이터를 저장할 li 요소 생성
	const liTag = document.createElement('li')
	
	// li 요소 컨텐츠에 데이터 입력
	liTag.textContent = inputData
	
	// li 요소를 부모 ul 요소의 자식 요소로 추가
	ulTag.appendChild(liTag)
	
	// todo 추가 후 input의 입력 데이터는 초기화
	inputTag.value = ''
}
```

- 추가 기능 구현
    1. 빈 문자열 입력 방지
    2. 입력이 없을 경우 경고 대화상자 띄움

```jsx
const addTodo = function (event) {
	const inputData = inputTag.value
	**if (inputData.trim()) {**
		const liTag = document.createElement('li')
		liTag.textContent = inputData
		ulTag.appendChild(liTag)
		inputTag.value = ''
	} else {
		**alert('할 일을 입력하세요.')**
	}
}
```

### 로또 번호 생성기 실습

```jsx
<h1>로또 추천 번호</h1>
<button id="btn">행운 번호 받기</button>
<div></div>
```

```html
<script src="https://cdnjsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>

<script>
	// 1. 필요한 요소 선택
	const h1Tag = document.querySelector('h1')
	const btn = document.querySelector('#btn')
	const divTag = document.querySelector('div')
	
	// 2. 로또 번호를 생성하는 함수
	const getLottery = function (event) {
	
		// 1부터 45까지의 값
		const numbers = _.range(1, 46)
		
		// 45개의 요소가 있는 배열에서 6개 번호 추출
		const sixNumbers = _.sampleSize(numbers, 6)
		
		// 6개의 li 요소를 담을 ul 요소 생성
		const ulTag = document.createElement('ul')
		
		// 추출한 번호 배열을 반복하면서 li 요소를 생성
		sixNumbers.forEach((number) => {
			const liTag = document.createElement('li')
			liTag.textContent = number
			
			ulTag.appendChild(liTag)
		})
		
		// 완성한 ul 요소를 div 요소에 추가
		divTag.appendChild(ulTag)
	}
	
	// 3. 버튼 요소에 이벤트 핸들러 부착
	btn.addEventListener('click', getLottery)
</script>
```

- lodash
    - 모듈성, 성능 및 추가 기능을 제공하는 JavaScript 유틸리티 라이브러리
    - array, object 등 자료구조를 다룰 때 사용하는 유용하고 간편한 함수들을 제공
    - https://lodash.com/

## 이벤트의 기본 동작 취소하기

### `.preventDefault()`

해당 이벤트에 대한 기본 동작을 실행하지 않도록 지정

### 이벤트 동작 취소 실습

- copy 이벤트 동작 취소
    - 콘텐츠를 복사하는 것을 방지

```html
<h1>중요한 내용</h1>

<script>
	const h1Tag = document.querySelector('h1')
	h1Tag.addEventListener('copy', function (event) {
		console.log(event)
		event.preventDefault()
		alert('복사할 수 없습니다.')
	})
</script>
```

- `form` 제출 시 페이지 새로고침 동작 취소
    - `form` 요소의 `submit` 동작(`action` 값으로 요청)을 취소 시킴
    
    ```html
    <form id="my-form">
    	<input type="text" name="username">
    	<button type="submit">Submit</button>
    </form>
    ```
    
    ```jsx
    const formTag = document.querySelector('#my-form')
    
    const handleSubmit = function (event) {
    	event.preventDefault()
    }
    
    formTag.addEventListener('submit', handleSubmit)
    ```
    

# 참고

## addEventListener에서의 화살표 함수 주의사항

- 화살표 함수는 자신만의 `this`를 생성하지 않음
- 대신, 화살표 함수가 정의된 곳의 상위 스코프의 `this`를 그대로 사용
- 대부분의 경우, 이는 전역 객체(브라우저에서는 window)를 가리키게 됨
- 해결책
    1. 일반 함수로 사용하기
    2. 화살표 함수일 경우 `event.currentTarget`을 사용하기
    
    ```jsx
    element.addEventListener('click', function () {
    	console.log(this) // <button id="function"><function</button>
    })
    
    element.addEventListener('click', () => {
    	console.log(this) // window
    })
    ```