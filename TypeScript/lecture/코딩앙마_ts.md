
1. [타입스크립트를 쓰는 이유를 알아보자](#1-타입스크립트를-쓰는-이유를-알아보자)
2. [기본 타입](#2-기본-타입)
3. [인터페이스(Interface)](#3-인터페이스interface)
4. [함수](#4-함수)
5. [리터럴, 유니온/교차 타입](#5-리터럴-유니온교차-타입)
6. [클래스(Class)](#6-클래스class)
7. [제네릭(Generics)](#7-제네릭generics)
8. [유틸리티 타입(Utility Types)](#8-유틸리티-타입utility-types)

<br>

## #1 타입스크립트를 쓰는 이유를 알아보자

### JavaScript의 문제점

```js
function add(num1, num2) {
  console.log(num1 + num2);
}

add(); // NaN
add(1); // NaN
add(1, 2); // 3
add(3, 4, 5); // 7
add('hello', 'world') // "helloworld"
```
함수 `add`는 의도와 다르게 동작하지만, JavaScript는 경고하지 않음.

```js
function showItems(arr) {
  arr. forEach((item) => {
    console.log(item);
  })
}

showItems([1, 2, 3]); // 1 2 3
showItems(1, 2, 3); // 배열이 아니면 Referecne Error 발생
```

### 동적 언어 vs 정적 언어
- JavaScript같은 **동적 언어**는 **런타임 시**에 타입이 결정되고 그 때 오류를 발견할 수 있다.
- Java나 TypeSciprt같은 **정적 언어**는 **컴파일 시**에 타입이 결정되어 오류 발견이 쉽다.

---

### TypeScript로 고쳐서 작성하기
https://www.typescriptlang.org/play/

```ts
function add(num1: number, num2: number) {
  console.log(num1 + num2);
}

add(1, 2); // 3
```
매개변수 `num1`, `num2`는 반드시 `number` 타입이어야 함.
```ts
function showItems(arr:number[]) {
  arr. forEach((item) => {
    console.log(item);
  })
}

showItems([1, 2, 3]); // 1 2 3
```
매개변수 `arr`는 반드시 `number` 타입의 배열이어야 함.

에러가 있는 코드는 빨간 줄이 떠서 오류를 알아 챌 수 있음.

<br>

## #2 기본 타입

### 문자열
```ts
let car:string = 'bmw';

car = 3; // 오류: String이 아닌 타입으로 재선언하면 에러 발생
```

### 숫자, 불리언
```ts
let age:number = 30;
let isAdult:boolean = true;
```

### 배열
```ts
// 숫자형 배열
let a:number[] = [1, 2, 3];
let a2:Array<number> = [1, 2, 3];

// 문자형 배열
let week1:string[] = ['mon', 'tue', 'wed'];
let week2:Array<string> = ['mon', 'tue', 'wed'];
```

### 튜플
인덱스 별로 타입이 다를 때 사용

```ts
// 튜플(Tuple)

let b:[string, number];
b = ['z', 1]; // 가능
// b = [1, 'z']; // 오류

b[0].toLowerCase(); // 가능
// b[1].toLowerCase(); // 오류
```

---
### void
반환값이 없는 함수

```ts
// void
function sayHello():void{
  console.log('hello');
}
```

### never
결코 값을 반환하지 않는 함수

```ts
// never
function showError():never{
  throw new Error('에러 발생')
}

function infLoop():never{
  while(true) {
    // 무한 루프
  }
}
```

---

### enum (열거형)

**기본 사용법**
```ts
//enum

enum Os {
  Window, // 0
  Ios, // 1
  Android // 2
}
```
enum에 수동으로 값을 주지 않으면 자동으로 인덱스를 할당함.

**수동 값 할당**
```ts
enum Os {
  Window = 3, // 3
  Ios, // 4
  Android // 5
}
```
```ts
enum Os {
  Window = 3, // 3
  Ios = 10, // 10
  Android // 11
}

console.log(Os[10]) // "Ios"
console.log(Os['Ios']) // 10
```

**문자열 값 할당**
숫자가 아닌 문자열도 입력할 수 있지만 단방향 매핑만 된다.

```ts
enum Os {
  Window = 'win',
  Ios = 'ios',
  Android = 'and'
}

let myOs:Os; // myOs에는 Os enum값만 입력 가능

myOs = Os.Window;
```

특정 값만 입력할 수 있도록 강제하고 싶을 때, 또는 비슷한 값들을 그룹화할 때 enum을 사용

---
### null, undefined

```ts
// null, undefined

let a:null = null;
let b:undefined = undefined;
```


<br>

# #3 인터페이스(Interface)

# #4 함수

# #5 리터럴, 유니온/교차 타입

# #6 클래스(Class)

# #7 제네릭(Generics)

# #8 유틸리티 타입(Utility Types)