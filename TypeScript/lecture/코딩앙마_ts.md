# 목차

1. [타입스크립트를 쓰는 이유를 알아보자](#1-타입스크립트를-쓰는-이유를-알아보자)
2. [기본 타입](#2-기본-타입)
3. [인터페이스(Interface)](#3-인터페이스interface)
4. [함수](#4-함수)
5. [리터럴, 유니온/교차 타입](#5-리터럴-유니온교차-타입)
6. [클래스(Class)](#6-클래스class)
7. [제네릭(Generics)](#7-제네릭generics)
8. [유틸리티 타입(Utility Types)](#8-유틸리티-타입utility-types)

<br>

# #1 타입스크립트를 쓰는 이유를 알아보자

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

# #2 기본 타입

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
## null, undefined

```ts
// null, undefined

let a:null = null;
let b:undefined = undefined;
```

<br>

# #3 인터페이스(Interface)

### 인터페이스란 ?
- 객체의 구조를 정의할 때 사용
- 객체의 프로퍼티와 메서드의 타입을 명확히 규정
- 선택적 프로퍼티(`?`), 읽기 전용 프로퍼티(`readonly`), 타입 확장을 지원
---
### 인터페이스 기본 사용법
**객체 구조 정의**
```ts
interface User {
  name: string;
  age: number;
  gender?: string; // Optional Property 
  readOnly birthYear: number; // Readonly Property
}

let user: User = {
  name = 'xx',
  age: 30,
  birthYear: 2000,
}

console.log(user.name); // 'xx'

user.age = 10; // 수정 가능
console.log(user.age);  // 10 

user.birthYear = 1990; // 오류: 읽기 전용 속성은 수정 불가
```
---
### 문자열 인덱스 서명
```ts
interface User {
  name: string;
  age: number;
  [grade:number]: string; // 숫자 키는 문자열 값을 가짐
}

let user: User = {
  name = 'xx',
  age: 30,
  1: 'A',
  2: 'B',
}

console.log(user[1]); // 'A'
```
---
### 문자열 리터럴 타입

```ts
type Score = 'A' | 'B' | 'C' | 'F';

interface User {
  name: string;
  age: number;
  grade: Score; // 'A', 'B', 'C', 'F'만 허용
}

let user: User = {
  name: 'xx',
  age: 30,
  grade: 'A', // 가능
};

// user.grade = 'Z'; // 오류: 'Z'는 Score에 포함되지 않음
```
---
### 함수 타입 정의
**함수 인터페이스**
```ts
interface Add {
  (num1: number, num2: number): number; // 매개변수와 반환값 타입 정의
}

const add: Add = function(x, y) {
  return x + y;
}

add(10, 20); // 30
// add(10, '20') // 오류: 두 번째 매개변수는 숫자여야 함
// add(10, 20, 30) // 오류: 매개변수는 두 개만 받음
```

```ts
interface IsAdult {
  (age: number): boolean;
}

const a:IsAdult = (age) => {
  return age > 19;
}

a(33) // true
```
---

### 클래스와 인터페이스
**클래스에서 `implements` 사용**

```ts
//implements

interface Car {
  color: string;
  wheels: number;
  start(): void;
}

class Bmw implements Car {
  color = 'red';
  wheels = 4;
  start(){
    console.log('go..')
  }
}

const myCar = new Bmw();
myCar.start(); // 'go...'
```

**생성자와 인터페이스**
```ts
interface Car {
  color: string;
  wheels: number;
  start(): void;
}

class Bmw implements Car {
  color;
  wheels = 4;

  constructor(c: string){
    this.color = c;
  }

  start(){
    console.log('go..')
  }
}

const myCar = new Bmw('green');
console.log(myCar.color); // 'green'
```

---

### 인터페이스 확장(`extends`)
**단일 인터페이스 확장**
```ts
interface Car {
  color: string;
  wheels: number;
  start(): void;
}

interface Benz extends Car {
  door: number;
  stop(): void;
}


const benz: Benz = {
  color: 'black',
  wheels: 4,
  door: 4,
  start() {
    console.log('start');
  },
  stop() {
    console.log('stop');
  },
};
```
**다중 확장**

```ts

interface Car {
  color: string;
  wheels: number;
  start(): void;
}

interface Toy {
  name: string;
}

interface ToyCar extends Car, Toy {
  price: number;
}

const myToyCar: ToyCar = {
    color: 'red',
    wheels: 4,
    name: '토이카',
    price: 1000,
    start() {
        console.log("출발")
    },
}
console.log(myToyCar.name); // "토이카"
```

<br>

# #4 함수

### 기본 함수 선언

```ts
function add(num1: number, num2: number): void {
  console.log(num1 + num2);
}
```
---
### 리턴 타입 명시
숫자(`number`)을 받아, 성인 여부를 참/거짓(`boolean`)으로 반환
```ts
function isAdult(age: number): boolean {
  return age > 19;
}
```
----
### 선택적 매개변수 
인터페이스처럼 함수의 매개변수도 optional로 지정해줄 수 있음
```ts
function hello(name?: string) {
  return `Hello, ${name ||"world"}`;
}

const result1 = hello(); // "Hello, world"
const result2 = hello("Sam"); // "Hello, Sam"
// const result3 = hello(123); // 오류
```
- `name?: string`:
  - `name`은 선택적 매개변수이며, 전달되지 않으면 `undefined`로 처리
- `||` 연산자:
  - `name`이 `undefined`라면 `"world"`를 기본값으로 사용

---
### 기본값 매개변수
```ts
function hello(name= "world") {
  return `Hello, ${name}`;
}
```
- 기본값(default 값)
  - `name` 매개변수가 없을 경우 `"world"`가 기본값으로 설정.
---
### 선택적 매개변수 & 기본값
이름과 나이를 받아서 문자열을 출력

```ts
function hello(name: string, age?: number): string {
  if (age !== undefined) {
    return `Hello, ${name}. You are ${age}.`;
  } else {
    return `Hello, ${name}`;
  }
}

console.log(hello("Sam")); // Hello, Sam
console.log(hello("Sam", 30)); // Hello, Sam. You are 30.
```
- 선택적 매개변수는 일반 매개변수보다 뒤에 와야 함.
- `age`가 `undefined`인지 체크하여 조건에 따라 다른 결과를 반환.

---

### 나머지 매개변수
```ts
function add(...nums: number[]) {
  return nums.reduce((result, num) => result + num, 0);
}

add(1, 2, 3); // 6
add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10); // 55 
```

- `...nums: number[]`:
  - 여러 개의 숫자를 배열 형태로 받는다.
- `reduce`:
  - 배열 요소를 순회하며 합산하는 메서드

---
### `this` 타입 지정

```ts
interface User {
  name: string;
}

const Sam: User = {name: 'Sam'}

function showName(this: User) {
  console.log(this.name);
}

const a = showName.bind(Sam);
a(); // "Sam"
```
- `this: User`:
  - 함수 내에서 `this`는 반드시 `User` 타입이어야 한다는 의미.
- `bind`:
  - `Sam` 객체를 `this`로 고정하여 함수 호출 시 `Sam.naem`을 참조.

```ts
interface User {
  name: string;
}

const Sam: User = {name: 'Sam'}

function showName(this: User, age: number, gender: 'm'|'f') {
  console.log(this.name, age, gender);
}

const a = showName.bind(Sam);
a(30, 'm');
```
- 함수가 매개변수를 받을 때에도, `this` 타입 지정(`this: User`은 맨 첫번째로 전달한다.

---

### 함수 오버로드
전달받은 매개변수의 개수나 타입에 따라 다른 동작을 하게 하는 것
```ts
interface User {
  name: string;
  age: number;
}

function join(name: string, age: number): User;
function join(name: string, age: string): string;
function join(name: string, age: number | string): User | string {
  if (typeof age === "number") {
    return {
      name, 
      age.
    }
  } else {
    return "나이는 숫자로 입력해주세요."
  }
}

const sam: User = join("Sam", 30); // { name: "Sam", age: 30 }
const jane: string = join("Jane", "30"); // "나이는 숫자로 입력해주세요."
```
- 오버로드 선언: 
  - 동일한 함수 이름으로 서로 다른 매개변수 타입과 반환 타입을 정의.
- 오버로드 구현:
  - 매개변수 `age`가 `number`인지 `string`인지에 따라 다른 동작을 수행.

<br>

# #5 리터럴, 유니온/교차 타입

### 리터럴 타입

```ts
const userName1 = "Bob"; // 변하지 않는 값 (userName1: "Bob")
let userName2 = "Tom"; // 변할 수 있는 값 (userName2: string)
```
특정 값만을 타입으로 지정한다.

### 문자열 리터럴 타입
```ts
// Literal Types

type Job = "police" | "developer" | "teacher";

interface User {
  name: string;
  job: Job;
}

const user:User = {
  name: "Bob",
  job: "developer" // job 프로퍼티는 위에서 선언한 값만 사용 가능
}
```
미리 정해진 값만 사용하도록 제한

### 숫자 리터럴 타입

```ts
interface HighSchoolStudent {
  name: string;
  grade: 1 | 2 | 3;
}
```
특정 숫자 값만을 타입으로 지정

--- 
### 유니온 타입

```ts
// Union Types

interface Car {
  name: "car";
  color: string;
  start(): void;
}

interface Mobile {
  name: "mobile";
  color: string;
  call(): void;
}

function getGift(gift: Car | Mobile) {
  console.log(gift.color);
  if(gift.name === "car") {
    gift.start();
  } else {
    gift.call();
  }
}
```
- **유니온 타입** (`Car | Mobile`):
  - `Car`와 `Mobile` 둘 중 하나의 타입을 가질 수 있습니다.
- **식별가능한 유니온**:
  - 동일한 이름의 속성을 정의하고, 타입을 다르게 줌으로써 두 개의 인터페이스를 구분할 수 있음.
  - 두 타입 모두 `name` 속성을 가지며, 각기 다른 고유값을 사용 (`"car"`, `"mobile"`) => 이를 통해 타입을 구분
  - 검사해야할 항목이 많아지면 if문보다는 switch문을 사용하는게 좋음.

---

### 교차 타입

```ts
// Intersection Types

interface Car {
  name: string;
  start(): void;
} 

interface Toy {
  name: string;
  color: string;
  price: number;
}

const toyCar: Toy & Car = {
  name: "타요",
  start() {},
  color: "blue",
  price: 1000,
}
```
`Car`와 `Toy`의 **모든 속성**과 **메서드**를 가진 객체를 정의

<br>


# #6 클래스(Class)

### 💡 참고 - ES6의 클래스

[JavaScript - 객체와 클래스](../../JavaScript/Reference%20Type%202.md)

---

### 클래스 정의

```ts
class Car {
  color: string;

  constructor(color: string){
    this.color = color;
  }

  start(){
    console.log("start");
  }
}

const bmw = new Car("red");
console.log(bmw.color); // "red"
bmw.start(); // "start"
```
- 멤버 변수 선언
  - TypeScript에서는 클래스를 작성할 때 멤버변수는 미리 선언을 해야 한다.
- 생성자 단축 문법
  - `constructor(public color: string)`
  - `public`, `private`, `readonly`를 활용하면 선언과 초기화 동시에 처리 가능

---

### 접근 제한자(Access Modifier) - `public`, `private`, `protected`

- `public`
  - 자식 클래스나 클래스 인스턴스에서 접근 가능
  - 아무것도 선언하지 않고 작성하면 모두 `public`
- `private`
  - 자식 클래스 내부 또는 클래스 인스턴스로 사용할 수 없음
  - 해당 클래스 내부에서만 사용할 수 있음.
  - `private` 대신 `#`을 사용할 수 있음
- `protected`
  - 자식 클래스 내부에서는 참조 가능하지만, 클래스 인스턴스로는 참조할 수 없음.

```ts
class Car {
  private engine = "V8"; // 외부에서 접근 불가
  protected wheels = 4;  // 자식 클래스에서 접근 가능
  public color: string;  // 어디서나 접근 가능

  constructor(color: string) {
    this.color = color;
  }

  getEngine() {
    return this.engine; // 클래스 내부에서 접근 가능
  }
}

class SportsCar extends Car {
  showDetails() {
    console.log(`Wheels: ${this.wheels}, Color: ${this.color}`);
  }
}

const car = new SportsCar("red");
console.log(car.color); // "red"
// console.log(car.wheels); // 오류: protected 멤버는 외부에서 접근 불가
```

### `readonly`
- 읽기 전용 속성
- 클래스 인스턴스로 접근 가능 하지만 수정은 불가능하게 하려면 `readonly`를 사용

  - `readonly` 속성을 바꾸고 싶다면?
```ts
class Car {
  readonly brand: string;
  constructor(brand: string) {
    this.brand = brand;
  }
}

const car = new Car("BMW");
console.log(car.brand); // "BMW"
// car.brand = "Audi"; // 오류: readonly 속성은 변경할 수 없음
``` 

---

### 정적 멤버(`static`)
`this` 대신 클래스 명으로 접근한다.

```ts
  class Car {
    static wheels = 4;

    describe() {
      console.log(`바퀴가 ${Car.wheels}개`)
    }
  }

  console.log(Car.wheels); // 4
  Car.describe(); // 바퀴가 4개
```

---

### 추상 클래스 (Abstract Class)
- 인스턴스를 생성할 수 없음.
- 상속을 통해 구현해야 한다.

```ts
abstract class Car {
  color: string;

  constructor(color: string) {
    this.color = color;
  }

  start() {
    console.log("start");
  }

  abstract drive(): void; // 자식 클래스에서 구현해야 한다.
}

class Bmw extends Car {
  drive() {
    console.log("부르릉")
  }
}

const myCar = new Bmw("white");
myCar.start(); // "start"
myCar.drive(); // "부르릉"
```


<br>

# #7 제네릭(Generics)

### 제네릭이란?
- 선언 시에 데이터 타입을 고정하지 않고, 실제 사용 시 타입을 지정할 수 있는 기능
- 코드 재사용 측면에서 유용한 기능

### 특정 타입에 고정된 함수의 문제점
```ts
function getSize(arr: number[]): number {
  return arr.length;
}

const arr1 = [1, 2, 3];
getSize(arr1); // 3

const arr2 = ["a", "b", "c"];
getSize(arr2); // 에러

const arr3 = [false, true, true];
getSize(arr3); // 에러

const arr4 = [{}, {}, {name: "Tim"}];
getSize(arr4); // 에러
```

### 제네릭을 사용하여 해결
```ts
function getSize<T>(arr: T[]): number {
  return arr.length;
}

const arr1 = [1, 2, 3];
getSize<number>(arr1); // 3

const arr2 = ["a", "b", "c"];
getSize<string>(arr2); // 3

const arr3 = [false, true, true];
getSize<boolean>(arr3); // 3

const arr4 = [{}, {}, {name: "Tim"}];
getSize<object>(arr4); // 3
```
- `<T>` : 타입 파라미터
  - 호출 시 구체적인 타입을 지정한다.
  - 자동으로 타입을 추론할 수 있기 때문에 `<number>` 등 명시적으로 작성하지 않아도 된다. 

---

### 특정 타입에 고정된 인터페이스 

```ts
interface Mobile {
  name: string;
  price: number;
  option: any; // 타입이 정해지지 않음.
}
```

### 제네릭을 사용한 인터페이스
```ts
interface Mobile<T> {
  name: string;
  price: number;
  option: T; 
}

const m1: Mobile<object> = {
  name: "s21",
  price: 1000,
  option: {
    color: "red",
    coupon: false,
  },
}

const m2: Mobile<string> = {
  name: "s20",
  price: 900,
  option: "good",
}
```

---

### 제네릭의 제약 조건

`extens`를 사용하여 제네릭 타입 파라미터(`<T>`)에 제약 조건을 추가

```ts
interface User {
  name: string;
  age: number;
}

interface Car {
  name: string;
  color: string;
}

interface Book {
  price: number;
}

const user: User = { name: "alice", age: 10 };
const car: Car = { name: "bmw", color: "red" };
const book: Book = { price: 3000 };

function showName<T extends { name: string }>(data: T): string {
  return data.name;
}

showName(user);
showName(car);
showName(book); // "name" 속성이 없기 때문에 에러 발생
```

<br>

# #8 유틸리티 타입(Utility Types)

### `keyof`
객체의 속성 이름을 **유니온 타입**으로 변환

```ts
interface User {
  id: number;
  name: string;
  age: number;
  gender: "m" | "f";
}

type UserKey = keyof User; 
// type UserKey = id | name | age | gender

const uk1: UserKey = "name";
const uk2: UserKey = "address"; // 에러
```

---

### `Partial`
주어진 타입의 모든 속성을 선택적(optional)으로 만듦

```ts
interface User {
  id: number;
  name: string;
  age: number;
  gender: "m" | "f";
}

let admin: Partial<User> = {
  id: 1,
  name: "Bob",
} // age, gender가 없어도 오류 없음
```

### `Required`
주어진 타입의 모든 속성을 필수로 설정

```ts
interface User {
  id: number;
  name: string;
  age?: number; // 선택적 속성
}

let admin: Required<User>= { 
  id: 1,
  name: "Bob",
  age: 30, // age가 필수로 변경됨
}
```

---

### `Readonly`

타입의 모든 속성을 읽기 전용(Readonly)으로 만듦

```ts
interface User {
  id: number;
  name: string;
}

let admin: Readonly<User>= {
  id: 1,
  name: "Bob",
}

admin.id = 2; // 읽기전용 속성은 수정 불가능
```

---

### `Record`

키 타입과 값 타입을 지정하여 객체를 생성

**예제 1**
```ts
type Grade = "1" | "2" | "3" | "4";
type Score = "A" | "B" | "C" | "D";

const score: Record<Grade, Score> = {
  1: "A",
  2: "C",
  3: "B",
  4: "D",
}
```

**예제 2**
```ts
interface User {
  id: number;
  name: string;
  age: number;
}

function isValid(user: User) {
  const result: Record<keyof User, boolean> = {
    id: user.id > 0,
    name: user.name !== "",
    age: user.age > 0
  }
  return result;
}
```

---

### `Pick`

특정 속성만 선택하여 새로운 타입 생성

```ts
interface User {
  id: number;
  name: string;
  age: number;
  gender: "M" | "W";
}

const admin: Pick<User, "id" | "name"> = {
  id: 0,
  name: "Bob"
}
```

### `Omit`

특정 속성 제외해서 새로운 타입 생성
```ts
interface User {
  id: number;
  name: string;
  age: number;
  gender: "M" | "W";
}

const admin: Omit<User, "age" | "gender"> = {
  id: 0,
  name: "Bob"
}
```

---

### `Exclude<T1, T2>`
T1에서 T2을 제거하고 사용

```ts
type T1 = string | number | boolean;
type T2 = Exclude<T1, boolean>; // 결과: string | number
```

---

### `NonNullable<Type>`
`null`과 `undefined`를 제외시킴

```ts
type T1 = string | null | undefined | void;
type T2 = NonNullable<T1>; // 결과: string | void
```
