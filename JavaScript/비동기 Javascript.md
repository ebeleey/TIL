# 비동기 Javascript

날짜: 2024년 10월 29일
태그: JavaScript


# 비동기

### Synchronous(동기)

프로그램의 실행 흐름이 순차적으로 진행

→ 하나의 작업이 완료된 후에 다음 작업이 실행되는 방식

### Asynchronous(비동기)

특정 작업의 실행이 완료될 때까지 기다리지 않고 다음 작업을 즉시 실행하는 방식

→ 작업의 완료 여부를 신경쓰지 않고 동시에 다른 작업들을 수행할 수 있음

- 병렬적 수행
- 당장 처리를 완료할 수 없고 시간이 필요한 작업들은 백그라운드에서 실행되며 빨리 완료되는 작업부터 처리

# JavaScript와 비동기

- Thread

작업을 처리할 때 실제로 작업을 수행하는 주체로, multi-thread라면 업무를 수행할 수 있는 주체가 여러 개라는 의미

- JavaScript는 한 번에 하나의 일만 수행할 수 있는 Single thread 언어로 동시에 여러 작업을 처리할 수 없음
- 즉, JavaScript는 하나의 작업을 요청한 순서대로 처리할 수 밖에 없음

## JavaScript Runtime

- JavaScript가 동작할 수 있는 환경(Runtime)
    - 브라우저, 또는 Node.js
- JavaScript는 Single Thread이므로 비동기 처리를 할 수 있도록 도와주는 환경이 필요

### 브라우저 환경에서의 JS 비동기 처리 관련 요소

1. JS Engine의 Call Stack
2. Web API
3. Task Queue
4. Event Loop

### 브라우저 환경에서의 JS 비동기 처리 동작 방식

1. 모든 작업은 Call Stack(LIFO)으로 들어간 후 처리된다.
2. 오래 걸리는 작업이 Call Stack으로 들어오면 Web API로 보내 별도로 처리하도록 한다.
3. Web API에서 처리가 끝난 작업들은 곧바로 Call Stack으로 들어가지 못하고 Task Queue(FIFO)에 순서대로 들어간다.
4. Event Loop가 Call Stack이 비어 있는 것을 계속 체크하고 Call Stack이 빈다면 Task Queue에서 갖아 오래된(가장 먼저 처리되어 들어온) 작업을 Call Stack으로 보낸다.

### 비동기 처리 동작 요소

1. Call Stack
    - 요청이 들어올 때마다 순차적으로 처리하는 Stack(LIFO)
    - 기본적인 JS의 Single Thread 작업 처리
2. Web API
    - JS 엔진이 아닌 브라우저에서 제공하는 runtime 환경
    - 시간이 소요되는 작업을 처리(setTimeout, DOM Event, 비동기 요청 등)
3. Task Queue(Callback Queue)
    - 비동기 처리된 Callback 함수가 대기하는 Queue(FIFO)
4. Event Loop
    - 태스크(작업)가 들어오길 기다렸다가 태스크가 들어오면 이를 처리하고, 처리할 태스크가 없는 경우엔 잠드는, 끊임없이 돌아가는 자바스크립트 내 루프
    - Call Stack과 Task Queue를 지속적으로 모니터링
    - Call Stack이 비어 있는지 확인 후 비어 있다면 Task Queue에서 대기 중인 오래된 작업을 Call Stack으로 Push

### 정리

- JS는 한 번에 하나의 작업을 수행하는 Single Thread언어로 동기적 처리를 진행
- 하지만 브라우저 환경에서는 Web API에서 처리된 작업이 지속적으로 Task Queue를 거쳐 Event Loop에 의해 Call Stack에 들어와 순차적으로 실행됨으로써 비동기 작업이 가능한 환경이 됨

# Ajax

Asynchronous Javascript And XML

비동기적인 웹 애플리케이션 개발을 위한 기술

- `XMLHttpRequest` 기술을 사용해 복잡하고 동적인 웹 페이지를 구성하는 프로그래밍 방식
- 브라우저와 서버 간의 데이터를 비동기적으로 교환하는 기술
- Ajax를 사용하며녀 페이지 전체를 새로고침하지 않고도 동적으로 데이터를 불러와 화면을 갱신할 수 있음

⇒ Ajax의 ‘x’는 `XML`이라는 데이터 타입을 의미하긴 하지만, 요즘은 더 가벼운 용량과 JS의 일부라는 장점때문에 `json`을 많이 사용

### 목적

- 비동기 통신
    - 웹 페이지 전체를 새로고침하지 않고 서버와 데이터를 주고받을 수 있음
- 부분 업데이트
    - 전체 페이지가 다시 로드되지 않고 html 페이지 일부 DOM만 업데이트
    - 페이지의 일부분만 동적으로 갱신할 수 있어 사용자 경험이 향상
- 서버 부하 감소
    - 필요한 데이터만 요청하므로 서버의 부하를 줄일 수 있음

## XMLHttpRequest (XHR) 객체

웹 브라우저와 서버 간의 비동기 통신을 가능하게 하는 JS객체

### 주요 기능

- JS를 사용하여 서버에 HTTP 요청을 할 수 있는 객체
- 웹 페이지의 전체 새로고침 없이도 서버로부터 데이터를 가져오거나 보낼 수 잇음

→ 이름에 XML이라는 데이터타입이 들어가긴 하지만 XML뿐만 아니라 모든 종류의 데이터를 가져올 수 있음

### 방식

1. xhr 객체 생성 및 요청
2. 서버는 새로운 페이지를 응답으로 만들지 않고 필요한 부분에 대한 데이터만 처리 후 응답(json 및 기타 데이터)

→ 새로운 페이지를 받는 것이 아닌 필요한 부분의 데이터만 받아 기존 페이지의 일부를 수정한다. (새로고침 x)

→ 서버에서 모두 처리되던 데이터 처리의 일부분이 이제는 클라이언트 쪽에서 처리되므로 교환되는 데이터양과 처리량이 줄어듦

- 이벤트 핸들러는 비동기 프로그래밍의 한 형태
    - 이벤트가 발생할 때마다 호출되는 함수(콜백 함수)를 제공하는 것
    - HTTP 요청은 응답이 올때까지의 시간이 걸릴 수 있는 작업이라 비동기이며, 이벤트 핸들러를 XHR 객체에 연결해 요청의 진행 상태 및 최종 완료에 대한 응답을 받음

## Axios

브라우저와 Node.js에서 사용할 수 있는 Promise 기반의 HTTP 클라이언트 라이브러리

- 클라이언트 및 서버 사이에 HTTP 요청을 만들고 응답을 처리하는데 사용되는 자바스크립트 라이브러리
- 서버와의 HTTP 요청과 응답을 간편하게 처리할 수 있도록 도와주는 도구
- 브라우저를 위한 XHR 객체 생성
- 간편한 API를 제공하며, Promise 기반의 비동기 요청을 처리

→ 주로 웹 애플리케이션에서 서버와 통신할 때 사용

### Ajax를 활용한 클라이언트 서버 간 동작

- Client
- Server

XHR 객체 생성 및 요청(Client) 
→ 응답 데이터 생성(Server) 
→ JSON 데이터 응답(Server) 
→ Promise 객체 데이터를 활용해 DOM 조작(Client) (웹 페이지의 일부만을 다시 로딩)

### Axios 설치 및 사용

- CDN 방식으로 사용하기
- https://axios-http.com/

```jsx
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

### `Promise` object

- 자바 스크립트에서 비동기 작업을 처리하기 위한 객체
- 비동기 작업의 최종 완료(또는 실패)와 그 결과값을 나타냄

```jsx
const promiseObj = axios({
  method: 'get',
  url: 'https://api.thecatapi.com/v1/images/search'
})
```

```jsx
  promiseObj
    .then((response) => {
      console.log(response) //  Response object
      console.log(response.data) // Response data
    })
    .catch((error) => {
      console.error(error)
    })
```

- 주요 메서드
    - `then()`: 작업이 성공적으로 완료되었을 때 실행될 콜백 함수를 지정
    - `catch()`: 작업이 실패했을 때 실행될 콜백 함수를 지정

### Axios 기본 구조

- `axios`객체를 활용해 요청을 보낸 후 응답 데이터 `promise` 객체를 받음

```jsx
  axios({
    method: 'get',
    url: 'https://api.thecatapi.com/v1/images/search'
  })
    .then((response) => {
      console.log(response)
      console.log(response.data)
    })
    .catch((error) => {
      console.error(error)
    })
```

- 성공 처리
    - `then`메서드를 사용해서 ‘성공했을 때 수행할 로직’을 작성
    - 서버로부터 받은 응답 데이터를 처리
- 실패 처리
    - `catch` 메서드를 사용해서 ‘실패했을 때 수행할 로직’을 작성
    - 네트워크 오류나 서버 오류 등의 예외 상황을 처리

### `then` & `catch` 특징

- `then`(callback)
    - 요청한 작업이 성공하면 callback 실행
    - callback은 이전 작업의 성공 결과를 인자로 전달받음
- `catch`(callback)
    - `then()`이 하나라도 실패하면 callback실행(남은 `then`은 중단)
    - callback은 이전 작업의 실패 객체를 인자로 전달 받음

### 고양이 사진 가져오기 실습

```jsx
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script>
    // 1.
    // const promiseObj = axios({
    //   method: 'get',
    //   url: 'https://api.thecatapi.com/v1/images/search'
    // })

    // console.log(promiseObj) // Promise object

    // promiseObj
    // .then((response) => {
    //   console.log(response) //  Response object
    //   console.log(response.data) // Response data
    // }) 
    // .catch((error) => {
    //   console.error(error)
    // })

    // 2.
    axios({
      method: 'get',
      url: 'https://api.thecatapi.com/v1/images/search'
    })
    .then((response) => {
      console.log(response)
      console.log(response.data)
      console.log(response.data[0].url)
    })
    .catch((error) => {
      console.error(error)
      console.log('실패했다옹')
    })
    console.log('야옹')
```

### 고양이 사진 가져오기 실습 심화

```jsx
  <button>냥냥펀치</button>

  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script>
    const URL = 'https://api.thecatapi.com/v1/images/search'
    const btn = document.querySelector('button')

    const getCats = function () {
      axios({
        method: 'get',
        url: URL
      })
        .then((response) => {
          // console.log(response)
          // console.log(response.data)
          console.log(response.data[0].url)

          // 1. 이미지 주소 저장
          const imgUrl = response.data[0].url
          // 2. img태그 생성
          const imgTag = document.createElement('img')
          imgTag.setAttribute('src', imgUrl)
          document.body.appendChild(imgTag)
        })
        .catch((error) => {
          console.log(error)
          console.log('실패했다옹')
        })
      console.log('야옹야옹')
    }

    btn.addEventListener('click', getCats)
```

## Ajax와 Axios

- Ajax
    - 하나의 특정한 기술을 의미하는 것이 아니라, 비동기적인 웹 애플리케이션 개발에 사용하는 기술들의 집합을 지칭
- Axios
    - 클라이언트 및 서버 사이에 HTTP 요청을 만들고 응답을 처리하는 데 사용되는 자바스크립트 라이브러리
    - Promise API를 기반으로 하여 비동기 처리를 더 쉽게 할 수 있음

⇒ 프론트엔드에서 AXIOS를 활용해 DRF로 만든 API서버로 요청을 보내고, 받아온 데이터를 비동기적으로 처리하는 로직을 작성하게 됨

- `Ajax`는 개념이자 접근 방식이며 , `Axios`는 이를 실현하는 구체적인 도구
- `Axios`는 `Ajax`를 구현하는 도구 중 하나로, `XMLHttpRequest` 를 추상화하여 더 사용하기 쉽게 만든 라이브러리

# Callback과 Promise

## 비동기 처리의 특성과 관리

- 비동기 처리의 핵심은 작업이 시작되는 순서가 아니라 **완료되는 순서**에 따라 처리된다는 것
- 따라서 개발자 입장에서 코드의 실행 순서가 불명확하다는 단점이 존재함
- 이로 인해 실행 결과를 정확히 예측하며 코드를 작성하기 어려울 수 있다.

### 비동기 처리 관리 방법

1. 비동기 콜백
    
    비동기 작업이 완료된 후 실행될 함수를 미리 정의
    
2. Promise
    
    비동기 작업의 최종 완료 또는 실패를 나타내는 객체
    

## 비동기 콜백

- 비동기적으로 처리되는 작업이 끝나고 실행되는 함수
- 연쇄적으로 발생하는 비동기 작업을 순차적으로 동작할 수 있게 한다.

⇒ 작업의 순서와 동작을 제어하거나 결과를 처리하는 데 사용

```jsx
const asyncTask = function (callback) {
	setTimeout(function () {
		console.log('비동기 작업 완료')
		callback() // 작업 완료 후 콜백 호출
	}, 2000) // 2초 후에 작업 완료
}

// 비동기 작업 수행 후 콜백 실행
asyncTask(function() {
	console.log('작업 완료 후 콜백 실행')
})

// 비동기 작업 완료
// 작업 완료 후 콜백 실행
```

- `asyncTask` 함수가 2초뒤에 작업을 완료하면서 “비동기 작업 완료”라고 콘솔에 출력
- 그 후 `callback()`을 호출해서 콜백함수가 실행

### 비동기 콜백의 한계

- 비동기 콜백 함수는 보통 어떤 기능의 실행 결과를 받아서 다른 기능을 수행하기 위해 많이 사용된다.
- 이 과정을 작성하다보면 비슷한 패턴이 계속 발생하게 됨..  ⇒ **콜백 지옥** 발생

### 콜백 지옥(Callback Hell)

- 비동기 처리를 위한 콜백을 작성할 때 마주하는 문제
    - 코드 작성형태가 피라미드와 같다고 해서 Pyramid of doom(파멸의 피라미드)라고도 부른다.
- 콜백 함수 안에 또 다른 비동기 콜백이 계속 중첩되다 보면 코드 가독성이 떨어지면서 유지 보수 하기 어려운 콜백 지옥이 발생

## 프로미스

### Promise

JavaScript에서 비동기 작업의 결과를 나타내는 객체

⇒ 비동기 작업이 완료되었을 때 결과 값을 반환하거나, 실패 시 에러를 처리할 수 있는 기능을 제공

- 자바스크립트에서 비동기 작업을 처리하기 위한 객체
- 비동기 작업의 성공 또는 실패와 관련된 결과나 값을 나타냄
- 콜백 지옥 문제를 해결하기 위해 등장한 비동기 처리를 위한 객체
- “작업이 끝나면 실행 시켜 줄게”라는 약속

⇒ `Promise`기반의 HTTP 클라이언트 라이브러리가 `Axios`

### Axios

브라우저와 Node.js에서 사용할 수 있는 Promise 기반의 HTTP 클라이언트 라이브러리

### 비동기 콜백 vs Promise

```jsx
// 비동기 콜백 방식

work1(function () {
	// 첫번째 작업
	work2(result1, function (result2) {
		// 두번째 작업
		work3(result2, function (result3) {
			console.log('최종 결과: ' + result3)
		})
	})
})
```

```jsx
// promise 방식

work1()
	.then((result1) => {
		//work2
		return result2
	})
	.then((result2) => {
		//work3
		return result3
	})
	.catch((error) => {
		//error handling
	})
```

### `then` & `catch`의 chaining

- `axios`로 처리한 비동기 로직은 항상 `promise`객체를 반환한다.
- 즉, `then`과 `catch`는 모두 항상 `promise`객체를 반환한다.
    - 계속해서 chaining을 할 수 있음
- `then`을 계속 이어나가면서 작성할 수 있게 됨

```jsx
axios({}) // promise 객체 return
	.then(성공하면 수행할 1번 콜백함수)
	.then(1번 콜백함수가 성공하면 수행할 2번 콜백함수)
	.then(2번 콜백함수가 성공하면 수행할 3번 콜백함수)
	...
	.catch(실패하면 수행할 콜백함수)
```

### then 메서드 chaining의 목적

- 비동기 작업의 순차적인 처리가 가능해짐
- 코드를 보다 직관적이고 가독성 좋게 작성할 수 있다.

### then 메서드 chaining 적용

```jsx
.then((response) => {
	imgUrl = response.data[0].url
	imgElem = document.createElement('img')
	imgElem.setAttribute('src', imgUrl)
	document.body.appendChild(imgElem)
})
```

```jsx
.then((response) => {
	imgUrl = response.data[0].url
	return imgUrl
})
.then((imgData) => {
	imgElem = document.createElement('img')
	imgElem.setAttribute('src', imgData)
	document.body.appendChild(imgElem)
})
```

첫 번째 `then` 콜백함수의 반환 값이 이어지는 `then`콜백함수의 인자로 전달됨

### then 메서드 chaining의 장점

1. 가독성
    - 비동기 작업의 순서와 의존관계를 명확히 표현할 수 있어 코드의 가독성이 향상
2. 에러처리
    - 각각의 비동기 작업 단계에서 발생하는 에러를 분할해서 처리 가능
3. 유연성
    - 각 단계마다 필요한 데이터를 가공하거나 다른 비동기 작업을 수행할 수 있어서 더 복잡한 비동기 흐름을 구성할 수 있음
4. 코드 관리
    - 비동기 작업을 분리하여 구성하면 코드를 관리하기 용이함