# 프로젝트1. 카운터 앱

## vercel 배포

https://counter-app-wine-xi.vercel.app/


## State

특정 값을 변경시켰을 때 변경된 값이 화면에 즉시 리렌더링

<br>

## Props와 State의 흐름

`Viewer`와 `Controller`는 형제 관계라서 서로 직접적으로 데이터를 주고받을 수 없음 <br>
React에서 Props는 부모에서 자식으로만 전달이 가능하므로, `Viewer`와 `Controller`가 값을 공유하려면 공통 부모 컴포넌트 `App`에서 데이터를 관리해야한다.

> **하나의 State를 여러 컴포넌트에서 관리해야할 경우, State는 컴포넌트들의 공통 부모가 되는 곳에 만들어야 한다!**

<br>

## State Lifting(State 끌어 올리기)

State를 계층구조상에서 위로 끌어올려서 아래에 있는 컴포넌트들이 모두 공유할 수 있도록 만드는 것

<br>

## React 데이터 흐름

React의 데이터는 위에서 아래로 흐르는 단방향 데이터 흐름을 가진다. 
- State는 부모에서 생성
- Props를 통해 자식에 전달

<br>

## 결론

State를 어떤 컴포넌트에 위치시킬 것인지 고민해서 결정해야 한다.







