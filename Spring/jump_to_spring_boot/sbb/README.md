# 스프링 부트의 기본 기능 익히기

## 2-01 스프링 부트 프로젝트의 구조 이해하기

### `src/main/java`
자바 파일을 저장하는 공간

- `com.mysite.sbb`
  - SBB의 자바 파일을 저장하는 공간
  - 스프링 부트의 컨트롤러, 폼과 DTO, 데이터베이스 처리를 위한 엔티티, 서비스 등의 자바 파일
- `SbbApplication.java`
  - 프로그램의 시작을 담당하는 파일

### `src/main/resources`

자바 파일을 제외한 HTML, CSS, 자바스크립트, 환경 파일 등을 저장하는 공간

- `templates`
  - 자바 코드를 삽입할 수 있는 HTML 형식의 템플릿 파일 저장
  - 스프링 부트에서 작성한 자바 객체를 HTML 형태로 출력할 수 있다.
- `static`
  - 스타일 시트(css파일), 자바스크립트(js 파일) 그리고 이미지 파일등을 저장한다.
- `application.properties`
  - 프로젝트의 환경을 설정한다.
  - 환경 변수, 데이터베이스 등의 설정을 저장한다.

### `src/test/java`

프로젝트에서 작성한 파일을 테스트하는 코드를 저장하는 공간

### `build.grandle`
Gradle이 사용하는 환경 파일

<br>

## 2-02 간단한 웹 프로그램 만들기

### URL 매핑

- URL과 컨트롤러의 메서드를 일대일로 연결하는 것
- 컨트롤러의 메서드에 `@GetMapping` 또는 `@PostMapping`과 같은 애너테이션을 적용하면 해당 URL과 메서드가 연결

```java
package com.mysite.sbb;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class MainController {
  @GetMapping("/sbb")
  @ResponseBody
  public String index() {
    return "안녕하세요 sbb에 오신 것을 환영합니다.";
  }
}

```
- `@Controller`: MainController 클래스는 스프링 부트의 컨트롤러가 된다.
- `@GetMapping`: 브라우저가 URL을 요청하면 스프링 부트는 요청 페이지와 매핑되는 메서드를 찾아 실행한다.

<br>

## 2-03 JPA로 데이터베이스 사용하기

### ORM(Object-Relational Mapping)
- SQL을 사용하지 않고 데이터베이스를 관리할 수 있는 도구
- 데이터베이스의 테이블을 자바 클래스로 만들어 관리

### JPA(Java Persistence API)
- 스프링 부트는 JPA를 사용하여 데이터베이스를 관리
- JPA를 ORM 기술의 표준으로 사용


## 2-04 엔티티로 테이블 매핑하기

### 엔티티(entity)

엔티티: 데이터베이스 테이블과 매핑되는 자바 클래스

예) 질문과 답변을 할 수 있는 게시판 서비스 <br>
=> 질문과 답변 데이터를 저장할 **데이터베이스** 테이블과 매핑되는 질문과 답변 **엔티티**가 있어야 한다.

**질문 엔티티**

속성 이름|설명
----|-----------
id	|질문 데이터의 고유 번호
subject	|질문 데이터의 제목
content	|질문 데이터의 내용
createDate	|질문 데이터를 작성한 일시

**답변 엔티티**

속성 이름|설명
---------|------
id	|답변 데이터의 고유 번호
question	|질문 데이터 (어떤 질문의 답변인지 알아야 하므로 이 속성이 필요하다.)
content	|답변 데이터의 내용
createDate	|답변 데이터를 작성한 일시

### 질문 엔티티 만들기

```java
package com.mysite.sbb;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 200)
    private String subject;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime createDate;
}
```

- `@Id` : id 속성을 기본키로 지정
- `@GeneratedValue` : 데이터를 저장할 때 해당 속성에 값을 입력하지 않아도 자동으로 1씩 증가하여 저장
  - `strategy=GenerationType.IDENTITY` : 고유한 번호를 생성하는 방법을 지정. 해당 속성만 별도로 번호가 차례대로 늘어난다.
- `@Column` : 열의 세부 설정
  - `columnDefinition` : 열 데이터 유형의 성격 정의

> 엔티티 만들 때 Setter 메서드는 사용하지 않는다!

### 답변 엔티티 만들기

```java
package com.mysite.sbb;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime createDate; 

    private Question question;  
}
```