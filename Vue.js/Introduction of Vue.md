# Introduction of Vue

날짜: 2024년 10월 31일
태그: Vue


# Frontend Development

웹사이트와 웹 애플리케이션의 사용자 인터페이스(UI)와 사용자 경험(UX)을 만들고 디자인하는 것

→ HTML, CSS, JavaScript등을 활용하여 사용자가 직접 상호작용하는 부분을 개발

## Client-side frameworks

클라이언트 측에서 UI와 상호작용을 개발하기 위해 사용되는 JavaScript 기반 프레임워크

### Client-side frameworks가 필요한 이유

1. 웹에서 하는 일이 많아졌다.
    - 단순히 무언가를 읽는 곳에서 → 무언가를 하는 곳으로
    - 웹 애플리케이션: 현대적이고 복잡한 대화형 웹 사이트
    - JavaScript기반의 Client-side frameworks가 등장하면서 매우 동적인 대화형 애플리케이션을 훨씬 더 쉽게 구축할 수 있게 됨
2. 다루는 데이터가 많아졌다.
    - 애플리케이션의 기본 데이터를 안정적으로 추적하고 업데이트(렌더링, 추가, 삭제 등)하는 도구가 필요
    - 애플리케이션의 상태를 변경할 때마다 일치하도록 UI를 업데이트해야 함

### Client-side frameworks의 필요성

1. 동적이고 반응적인 웹 애플리케이션 개발
    1. 실시간 데이터 업데이트
2. 코드 재사용성 증가
    1. 컴포넌트 기반 아키텍처
    2. 모듈화된 코드 구조
3. 개발 생산성 향상
    1. 강력한 개발 도구 지원

## SPA & CSR

### Single Page Application(SPA)

단일 페이지에서 동작하는 웹 애플리케이션

### SPA 작동 원리

- 최초 로드 시 필요한 모든 리소스 다운로드
- 이후 페이지 갱신에 대해 필욯나 데이터만을 비동기적으로 전달받아 화면의 필요한 부분만 동적으로 갱신
    - ajax와 같은 기술을 사용하여 필요한 데이터만 비동기적으로 로드
    - 페이지 전체를 다시 로드할 필요 없이 필요한 데이터만 서버로부터 가져와서 화면에 표시
- JavaScript를 사용하여 클라이언트 측에서 동적으로 콘텐츠를 생성하고 업데이트
    - “CSR 방식”

### Client-side Rendering(CSR)

클라이언트에서 콘텐츠를 렌더링 하는 방식

### CSR 작동 원리

1. 사용자가 웹사이트에 요청을 보냄
2. 서버는 최소한의 HTML과 JavaScript파일을 클라이언트로 전송
3. 클라이언트는 HTML과 JavaScript를 다운로드 받음
4. 브라우저가 JavaScript를 실행하여 동적으로 페이지 콘텐츠를 생성
5. 필요한 데이터는 API를 통해 서버로부터 비동기적으로 가져옴

### SPA와 CSR의 장점

1. 빠른 페이지 전환
    1. 페이지가 처음 로드된 후에는 필요한 데이터만 가져오면 되고, JavaScript는 전체 페이지를 새로 고칠 필요 없이 페이지의 일부를 다시 렌더링할 수 있기 때문
    2. 서버로 전송되는 데이터의 양을 최소화(서버 부하 방지)
2. 사용자 경험
    1. 새로고침이 발생하지 않아 네이티브 앱과 유사한 사용자 경험을 제공
3. Frontend와 Backend의 명확한 분리
    1. Frontend는 UI 렌더링 및 사용자 상호 작용 처리를 담당 & Backend는 데이터 및 API 제공을 담당
    2. 대규모 애플리케이션을 더 쉽게 개발하고 유지 관리 가능

### SPA와 CSR의 단점

1. 느린 초기 로드 속도
    1. 전체 페이지를 보기 전에 약간의 지연을 느낄 수 있음
    2. JS가 다운로드, 구문 분석 및 실행될 때 까지 페이지가 완전히 렌더링 되지 않기 때문
2. SEO(검색 엔진 최적화)문제
    1. 페이지를 나중에 그려 나가는 것이기 때문에 검색에 잘 노출되지 않을 수 있음
    2. 검색엔진 입장에서 HTTML을 읽어서 분석해야 하는데 아직 컨텐츠가 모두 존재하지 않기 때문

### SPA vs MPA

- Multi Page Application
    - 여러 개의 HTML 파일이 서버로부터 각각 로드
    - 사용자가 다른 페이지로 이동할 때마다 새로운 html 파일이 로드 됨

### CSR vs SSR

- Server-side Rendering
    - 서버에서 화면을 렌더링 하는 방식
    - 모든 데이터가 담긴 HTML을 서버에서 완성 후 클라이언트에게 전달

# Vue

사용자 인터페이스를 구축하기 위한 JavaScript 프레임워크

## What is Vue

### Vue를 학습하는 이유

1. 낮은 학습 곡선
2. 확장성과 생태계
3. 유연성 및 성능
4. 가장 주목받는 Client-side framework

### Vue 체험하기

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div id="app">
    <h1>{{ message }}</h1>
    <button v-on:click = "countNumber++">
      카운트 넘버: {{ countNumber }}
    </button>
  </div>

  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

  <script>
    const { createApp, ref } = Vue

    const app = createApp({
      setup() {
        const message = ref('Hello vue!')
        const countNumber = ref(0)
        return {
          message,
          countNumber  
        }
      }
    })
    
    app.mount('#app')
  </script>
</body>

</html>

```

### Vue의 2가지 핵심 기능

1. 선언적 렌더링(Declarative Rendering)
    1. 표준 HTML을 확장하는 Vue 템플릿 구문을 사용하여 JS 상태(데이터)를 기반으로 화면에 출력될 HTML을 선언적으로 작성
2. 반응성(Reactivity)
    1. JS 상태 변경을 추족하고, 변경사항이 발생하면 자동으로 DOM을 업데이트

### Vue의 주요 특징 정리

1. 반응형 데이터 바인딩
    1. 데이터 변경 시 자동 UI 업데이트
2. 컴포넌트 기반 아키텍처
    1. 재사용 가능한 UI조각
3. 간결한 문법과 직관적인 API
    1. 낮은 학습 곡선
    2. 높은 가독성
4. 유연한 스케일링
    1. 작은 프로젝트부터 대규모 애플리케이션까지 적합

## Component

재사용 가능한 코드 블록

### Component 특징

- UI를 독립적이고 재사용 가능한 일부분으로 분할하고 각 부분을 개별적으로 다룰 수 있음
- ⇒ 자연스럽게 애플리케이션은 중첩된 Component의 트리 형태로 구성됨

# Vue Application

- Vue를 사용하는 방법
    1. ‘CDN’ 방식
    2. ‘NPM’ 설치 방식
        
        ⇒ CDN 방식 이후 진행
        

## Vue Application 생성

### CDN 작성

```jsx
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

### Application instance

- CDN에서 Vue를 사용하는 경우 전역 `Vue` 객체를 불러오게 됨
- 구조분해할당 문법으로 `Vue` 객체의 `createApp`함수를 할당

```jsx
<script>
	const { createApp } = Vue
```

- 모든 Vue 어플리케이션은 `createApp` 함수로 새 `Application instance`를 생성하는 것으로 시작함

```jsx
	const app = createApp({})
</script>
```

### Root Component

- `createApp`함수에는 객체(컴포넌트)가 전달됨
- 모든 App에는 다른 컴포넌트들을 하위 컴포넌트로 포함할 수 있는 Root(최상위) 컴포넌트가 필요 (현재는 단일 컴포넌트)

```jsx
	const app = createApp**({})**
```

### Mounting the App(앱 연결)

- HTML 요소에 Vue Application instance를 탑재(연결)
- 각 앱 인스턴스에 대해 `mount()`는 한 번만 호출할 수 있음

```jsx
<div id="app"></div>
```

```jsx
app.mount('#app')
```

## 반응형 상태

### `ref()`

반응형 상태(데이터)를 선언하는 함수 (Declaring Reactive State)

- `.value` 속성이 있는 `ref` 객체로 래핑(wrapping)하여 반환하는 함수
- `ref`로 선언된 변수의 값이 변경되면, 해당 값을 사용하는 템플릿에서 자동으로 업데이트
- 인자는 어떠한 타입도 가능

```jsx
const { createApp, ref } = Vue

const app = createApp({
	setup() {
		const message = ref('Hello Vue!')
		console.log(message) // ref 객체
		console.log(message.value) // Hello vue!
	}
})
```

- 템플릿의 참조에 접근하려면 `setup` 함수에서 선언 및 반환 필요
- 편의상 템플릿에서 `ref`를 사용할 때는 `.value`를 작성할 필요 없음(autumatically unwrapped)


**`ref()`**

반응형을 가지는 참조 변수를 만드는 것 !!

(`ref === reactive reference`)

</aside>

## Vue 기본 구조

- `createApp()`에 전달되는 객체는 Vue 컴포넌트
- 컴포넌트의 상태는 `setup()`함수 내에서 선언되어야 하며 객체를 반환해야 함

```jsx
const app = createApp({
	setup() {
		const message = ref('Hello Vue!')
		return {
			message
		}
	}
})
```

### 템플릿 렌더링

- 반환된 객체의 속성은 템플릿에서 사용할 수 있음
- `Mustache syntax`(콧수염 구문)을 사용하여 메시지 값을 기반으로 동적 테스트를 렌더링
- 콘텐츠는 식별자나 경로에만 국한되지 않으며, 유효한 JS 표현식을 사용할 수 있음
    - `<h1>{{ message.split('').reverse().join('') }}</h1>`

### Event Listeners in Vue

- `v-on` directive를 사용하여 DOM 이벤트를 수신할 수 있음
- 함수 내에서 반응형 변수를 변경하여 구성 요소 상태를 업데이트

```jsx
  <div id="app">
    <button v-on:click="increment">{{ count }}</button>
  </div>

  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script>
    const { createApp, ref } = Vue

    const app = createApp({
      setup() {
        const count = ref(0)
        const increment = function () {
          count.value ++
        }
        return {
          count,
          increment
        }
      }
    })

    app.mount('#app')
  </script>
```

# Template Syntax

DOM을 기본 구성 요소 인스턴스의 데이터에 선언적으로 바인딩(Vue Instance와 DOM을 연결)할 수 있는 HTML 기반 템플릿 구문(확장된 문법 제공)을 사용

## Template Syntax 종류

### Text Interpolation

```jsx
<p>Message: {{ msg }}</p>
```

- 데이터 바인딩의 가장 기본적인 형태
- 이중 중괄호 구문(콧수염 구문)을 사용
- 콧수염 구문은 해당 구성 요소 인스턴스의 `msg`속성 값으로 대체
- `msg` 속성이 변경될 때마다 업데이트 됨

### Raw HTML

```jsx
<div v-html="rawHtml"></div>
```

```jsx
const rawHtml = ref('<span style="color:red">This Should be red.</span>')
```

- 콧수염 구문은 데이터를 일반 텍스트로 해석하기 때문에 실제 HTML을 출력하려면 `v-html`을 사용해야 함

### Attribute Bindings

```jsx
<div v-bind:id="dynamicId"></div>
```

```jsx
const dynamicId = ref('my-id')
```

- 콧수염 구문은 HTML 속성 내에서 사용할 수 없기 때문에 `v-bind`를 사용
- HTML의 `id`속성 값을 vue의 `dynamicId`속성과 동기화되도록 함
- 바인딩 값이 `null`이나 `undefined`인 경우 렌더링 요소에서 제거됨

### JavaScript Expressions

```jsx
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="list-${id }"></div>
```

- Vue는 모든 데이터 바인딩 내에서 JS 표현식의 모든 기능을 지원
- Vue 템플릿에서 JS 표현식을 사용할 수 있는 위치
    1. 콧수염 구문 내부
    2. 모든 directive의 속성 값(`v-`로 시작하는 특수 속성)

## Expressions 주의사항

- 각 바인딩에는 하나의 단일 표현식만 포함될 수 있음
    - 표현식은 값으로 평가할 수 있는 코드 조각(`return` 뒤에 사용할 수 있는 코드여야 함)
- 작동하지 않는 경우

```jsx
<!-- 표현식이 아닌 선언식 -->
{{ const number = 1 }}

<!-- 제어문은 삼항 표현식을 사용해야 함 -->
{{ if (ok) { return message } }}
```

# 참고

## ref 객체

### ref 객체가 필요한 이유

- Vue는 템플릿에서 `ref`를 사용하고 나중에 `ref`값을 변경하면 자동으로 변경 사항을 감지하고 그에 따라 DOM을 업데이트 함(의존성 추적 기반의 반응형 시스템)
- Vue는 렌더링 중에 사용된 모든 `ref`를 추적하며, 나중에 `ref`가 변경되면 이를 추적하는 구성 요소에 대해 다시 렌더링
- 이를 위해서 참조 자료형의 객체 타입으로 구현한 것
    - JS에서는 일반 변수의 접근 또는 변형을 감지할 방법이 없기 때문

```jsx
  <div id="app">
    <p>반응형 변수: {{ reactiveValue }}</p>
    <p>일반 변수: {{ normalValue }}</p>
    <button v-on:click="updateValues">값 업데이트</button>
  </div>

  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script>
    const { createApp, ref } = Vue

    const app = createApp({
      setup() {
        const reactiveValue = ref(0)
        let normalValue = 0
        const updateValues = function () {
          reactiveValue.value++
          normalValue++
        }
        return {
          reactiveValue,
          normalValue,
          updateValues
        }
      }
    })

    app.mount('#app')
</script>
```

## Ref Unwrap 주의사항

- 템플릿에서의 unwrap은 `ref`가 최상위 속성인 경우에만 적용가능

```jsx
const object = { id: ref(0) }
```

```jsx
{{ object.id + 1 }}
```

- 출력: `[object Object]1`
    - `object`는 최상위 속성이지만 `object.id`는 그렇지 않음
    - 표현식을 평가할 때, `object.id`가 unwrap 되지 않고 `ref` 객체로 남아 있기 때문

⇒ 이 문제를 해결하기 위해서는 **id를 최상위 속성으로 분해**해야 함

```jsx
const object = { id: ref(0) }
const { id } = object
```

```jsx
{{ id + 1 }}
```

- 출력: `1`

단, ref가 `{{ }}`의 최종 평가 값인 경우는 unwrap가능

- `{{ [object.id](http://object.id) }}`
- `{{ object.id.value }}`와 동일하다.

## SEO(Search Engine Optimization)

- google, bing과 같은 검색 엔진 등에 내 서비스나 제품 등이 효율적으로 검색 엔진에 노출되도록 개선하는 과정을 일컫는 작업
- 정보의 대상은 주로 HTML에 작성된 내용
- 최근에는 SPA, 즉 CSR로 구성된 서비스의 비중이 증가
- SPA 서비스도 검색 대상으로 넓히기 위해 JS를 지원하는 방식으로 발전하고 있다

## CSR & SSR

- 애플리케이션의 목적, 규모, 성능 및 SEO 요구사항에 따라 달라질 수 있음.
- 내 서비스에 적합한 렌더링 방식을 적절하게 활용할 수 있어야 한다.