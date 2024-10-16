## 산술 연산자

`+`, `-`, `*`, `/`, `%`

- `5 / 2`의 결과는 `2.5`여야 하지만 `int`형끼리 계산하면 계산 결과도 `int`형이 나오기 때문에 `2`가 나온다.
- 0으로 나누면 `Exception in thread "main" java.lang.ArithmeticException: / by zero`예외가 발생하며 프로그램이 종료된다.

### 문자열 더하기

문자열에 `+` 연산자 사용하면 두 문자를 연결할 수 있다.

```java
String result1 = "hello" + "world" // helloworld
```

문자와 숫자를 더하면 숫자를 문자열로 변경한 다음에 서로 더한다.

```java
"a + b = " + 10 // a + b = 10
```

문자열인 `String`타입에 다른 타입을 더하는 경우 대상 타입을 문자열로 변경한다.

### 연산자 우선순위

1. 괄호 ()
2. 단항 연산자 (`++`, `--`, `!`, `~`, `new`, `(type)`)
3. 산술 연산자 (`*`, `/` → `+`, `-`)
4. Shift 연산자 (`<<`, `>>`)
5. 비교 연산자 (`<`, `<=`, `>`, `>=`, `instanceof`)
6. 등식 연산자 (`==`, `!=`)
7. 비트 연산자 (`&`, `^`, `|`)
8. 논리 연산자 (`&&`, `||`)
9. 삼항 연산자 (`? :`)
10. 대입 연산자 (`=`, `+=`, `-=`, `*=`, `/=`, `%=` 등등)

## 증감 연산자

### 전위, 후위 증감연산자

증감 연산자는 피연산자 앞에 두거나 뒤에 둘 수 있으며, 연산자의 위치에 따라 연산이 수행되는 시점이 달라진다.

- `++a`: 전위 증감 연산자, 증감 연산이 먼저 수행된 후 나머지 연산이 수행된다.

    ```java
    a = 1, b = 0
    b = ++a
    
    a = a + 1; //a의 증감연산이 먼저 진행됨 (a=2)
    b = a; //이후에 a를 대입 (b=2)
    ```

- `a++`: 후위 증감 연산자, 다른 연산이 먼저 수행된 후 증감 연산이 수행된다.

    ```java
    a = 1, b = 0
    b = a++
    
    b = a; //a의 값을 먼저 b에 대입 (b=1)
    a = a + 1; //이후에 a값을 증가 (a=2)
    ```


## 비교 연산자

### 문자열 비교

문자열이 같은지 비교할 때는 `==`이 아니라 `.equals()`를 사용해야 한다.

```java
package operator;

public class Comp2 {
	public static void main(String[] args) {
		String str1 = "문자열1";
		String str2 = "문자열2";
		
		boolean result1 = "hello".equals("hello"); //리터럴 비교
		boolean result2 = str1.equals("문자열1");//문자열 변수, 리터럴 비교
		boolean result3 = str1.equals(str2);//문자열 변수 비교
		
		System.out.println(result1); //true
		System.out.println(result2); //true
		System.out.println(result3); //false
	}
}
```

## 논리 연산자

`&&`, `||`, `!`

## 대입 연산자

`=`

### 축약(복합) 대입 연산자

`+=`, `-=`, `*=`, `/=`, `%=`