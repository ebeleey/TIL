# 비동기 JS with Django

날짜: 2024년 10월 30일
태그: JavaScript

# Ajax with follow

## 비동기 follow 구현

- 기존
    - HTML의 form 태그를 사용해 POST 메서드 데이터를 제출(submit)
- 변경
    - axios를 사용해 POST 메서드로 데이터를 제출
    - form의 method, action 속성이 불필요해짐
    - 팔로우 버튼에 submit 이벤트가 발생하면 (이벤트 리스너) Django가 json 데이터를 응답
    - JavaScript에서 응답받은 json 데이터를 활용해 팔로우 버튼을 조작(DOM)

### Ajax 적용

- 프로필 페이지에 axios CDN 작성

```jsx
<!-- accounts/profile.html -->

  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

  <script>
  </script>

</body>
</html>
```

- `form`요소 선택을 위해 `id`속성 지정 및 선택
- `action`과 `method`속성은 삭제
    - 요청은 axios로 대체되기 때문
- `url`에 작성할 `user pk` 가져오기(HTML → JavaScript)

```jsx
<!-- accounts/profile.html -->

...
    <form id="follow-form" data-user-id="{{person.pk}}">
		...
    </form>
...
```

- `form` 요소에 이벤트 핸들러 할당
- `submit` 이벤트의 기본 동작 취소하기

```jsx
// 1. 팔로우 버튼 선택
const formTag = document.querySelector('#follow-form')

// 2. 팔로우 버튼에 이벤트 리스너를 부착 (submit 이벤트 감지)
formTag.addEventListener('submit', function (event){
  // 3. submit 이벤트의 기본 동작 취소
  event.preventDefault()

  // 5. HTML에서 준비한 user pk 조회
  const userId = event.currentTarget.dataset.userId
  // const userId = this.dataset.userId
  // const userId = formTag.dataset.userId

  // 4. axios 준비
  axios({
    method: 'post',
    url: `accounts/${userId}/follow/`
  })
})
```

<aside>
💡

**‘data-*’ 속성**

사용자 지정 데이터 특성을 만들어 임의의 데이터를 HTML과 DOM 사이에서 교환할 수 있는 방법

- 모든 사용자 지정 데이터는 JS에서 `dataset` 속성을 통해 접근
- 주의사항
    - 대소문자 여부에 상관없이 `xml` 문자로 시작 불가
    - 세미콜론 포함 불가
    - 대문자 포함 불가
</aside>

- 문서상 `input hidden` 타입으로 존재하는 `csrf token` 데이터를 axios로 전송해야 함.
- `csrf` 값을 가진 `input` 요소를 직접 선택 후 axios에 작성하기

```jsx
// 7. csrftoken 선택
**const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value**

...

  axios({
    method: 'post',
    url: `/accounts/${userId}/follow/`,
    **headers: {'X-CSRFToken': csrftoken},**
  })
```

- 팔로우 버튼을 토글하기 위해서는 현재 팔로우 상태인지 언팔로우 상태인지에 대한 상태 확인이 필요
- → Django의 view 함수에서 팔로우 여부를 파악 할 수 있는 변수를 추가로 생성해 JSON 타입으로 응답하기
- 팔로우 상태 여부를 JS에게 전달할 데이터 작성
- 응답은 HTML 문서가 아닌 JSON 데이터로 응답하도록 변경

```python
from django.http import JsonResponse

@login_required
def follow(request, user_pk):
    User = get_user_model()
    you = User.objects.get(pk=user_pk)
    me = request.user

    if me != you:
        # 9. JS에게 팔로우 상태여부를 전달할 데이터 작성
        if me in you.followers.all():
            you.followers.remove(me)
            # me.followings.remove(you)
            is_followed = False
        else:
            you.followers.add(me)
            # me.followings.add(you)
            is_followed = True
        context = {
            # 14. 팔로워 수와 팔로잉 수에 대한 데이터 작성
            'is_followed': is_followed,
        }
        # 10. JSON 데이터로 응답
        return JsonResponse(context)
    return redirect('accounts:profile', you.username)
```

- 팔로우 요청 후 Django 서버로 부터 받은 응답 데이터 확인하기

```jsx
axios({
	method: 'post',
	url: `/accounts/${userId}/follow/`,
	headers: {'X-CSRFToekn': csrftoken,},
	})
	.then((response) => {
		console.log(response)
		// 11. django로 부터 응답받은 팔로우 상태 정보
		console.log(response.data)
	})
})
```

- 응답 데이터 `is_followed`에 따라 팔로우 버튼 조작하기

```jsx
.then((response) => {
  const isFollowed = response.data.is_followed
  const followBtn = document.querySelector('.follow-input')
  if (isFollowed === true) {
    followBtn.value = '언팔로우'
  } else {
    followBtn.value = '팔로우'
  }
})
```

- 팔로잉 수와 팔로워 수 비동기 적용
- 해당 요소를 선택할 수 있도록 `span` 태그와 `id`속성 작성

```jsx
<div>
	팔로잉 : <span id="followings-count">{{ person.followings.all|length }}</span> 
	/ 팔로워 : <span id="followers-count">{{ person.followers.all|length }}</span>
</div>
```

- 각 span 태그 선택

```jsx
.then((response) => {
	...
	// 13. 팔로워 & 팔로잉 수 선택
	const followingsCountTag = document.querySelector('#followings-count')
	const followersCountTag = document.querySelector('#followers-count')
})
```

- Django view 함수에서 팔로워, 팔로잉 인원 수 연산을 진행하여 결과를 응답 데이터로 전달

```python
from django.http import JsonResponse

@login_required
def follow(request, user_pk):
    User = get_user_model()
    you = User.objects.get(pk=user_pk)
    me = request.user

    if me != you:
        # 9. JS에게 팔로우 상태여부를 전달할 데이터 작성
        if me in you.followers.all():
            you.followers.remove(me)
            # me.followings.remove(you)
            is_followed = False
        else:
            you.followers.add(me)
            # me.followings.add(you)
            is_followed = True
        context = {
            # 14. 팔로워 수와 팔로잉 수에 대한 데이터 작성
            'is_followed': is_followed,
            **'followings_count': you.followings.count(),
            'followers_count': you.followers.count(),**
        }
        # 10. JSON 데이터로 응답
        return JsonResponse(context)
    return redirect('accounts:profile', you.username)
```

- 응답 데이터를 받아 각 태그의 인원수 값 변경에 활용

```jsx
  // 15. django가 응답한 팔로잉, 팔로워 수 데이터를 활용해 DOM 변경
  followingsCountTag.textContent = response.data.followings_count
  followersCountTag.textContent = response.data .followers_count
})
```

# Ajax with likes

## 비동기 좋아요 구현

- 전반적인 Ajax 적용은 팔로우 구현 과정과 모두 동일
- 단, 팔로우와 달리 좋아요 버튼은 한 페이지에 여러 개가 존재

### Ajax 적용

- 모든 좋아요 `form` 요소를 포함하는 최상위 요소 작성

```jsx
<article class="article-container">
	...
</article>
```

1. 최상위 요소 선택
2. 이벤트 핸들러 할당
3. 하위 요소들의 `submit` 이벤트를 감지하고 `submit` 기본 이벤트를 취소

```jsx
// 2. 게시글을 모두 포함하는 최상위 요소를 선택
const articleContainer = document.querySelector('.article-container')

articleContainer.addEventListener('submit', function (event) {
	event.preventDefault()
})
```

- axios 코드 작성
- 각 좋아요 `form`에 `article.pk`를 부여 후 HTML의 `article.pk`값을 JavaScript에서 참조하기

```jsx
<!-- accounts/index.html -->
    <form data-article-id="{{ article.pk }}">
			...
		</form>
```

```jsx
  // 3. 선택한 최상위 요소에 이벤트 핸들러를 부착
    articleContainer.addEventListener('submit', function (event) {
      // 4. submit 이벤트 기본 동작 취소
      event.preventDefault()
      // 10. HTML에서 전달한 게시글 id 받기
      **const articleId = event.target.dataset.articleId**

      // 5. axios 요청 작성
      axios({
        method: 'post',
        // 11. 전달받은 게시글 id로 url 완성
        **url: `/articles/${articleId}/likes/`,**
        // 8. 선택한 csrftoken을 headers에 세팅
        headers: {'X-CSRFToken': csrftoken},
      })
        .then((response) => {
          console.log(response)
          console.log(response.data)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    })
```

- 좋아요 버튼을 토글하기 위해서는 현재 사용자가 좋아요를 누른 상태인지 좋아요를 누르지 않은 상태인지에 대한 상태 확인이 필요

→ Django의 view 함수에서 좋아요 여부를 파악할 수 있는 변수 추가 생성

→ JSON 타입으로 응답하기

- 좋아요 상태 여부를 JavaScript에게 전달할 데이터 작성 및 JSON 데이터 응답

```python
# articles/views.py

from django.http import JsonResponse

def likes(request, article_pk):
    article = Article.objects.get(pk=article_pk)

    # 12. 좋아요 상태여부를 JS에 응답할 데이터 세팅
    if request.user in article.like_users.all():
        article.like_users.remove(request.user)
        **is_liked = False**
    else:
        article.like_users.add(request.user)
        **is_liked = True
    # 13. 세팅한 데이터를 JSON 형식으로 응답
    context = {
        'is_liked': is_liked,
    }
    return JsonResponse(context)**
```

- 응답 데이터 `is_liked`를 받아 `isLiked` 변수에 할당
- `isLiked`에 따라 좋아요 버튼을 토글하기
    - 어떤 게시글의 좋아요 버튼을 선택했는지 구분하기 위해 문자와 `article`의 `pk`값을 혼합하여 각 버튼에 `id` 속성 값을 설정해야 함. (`id` 속성 값은 숫자로 시작할 수 없음)
    
    ```jsx
    {% if request.user in article.like_users.all %}
    	// 17. 각 좋아요 버튼을 구별할 수 있는 id 속성 추가
      <input type="submit" value="좋아요 취소" id="like-{{ article.pk }}">
    {% else %}
      <input type="submit" value="좋아요" id="like-{{ article.pk }}">
    {% endif %}
    ```
    

```jsx
      axios({
        method: 'post',
        url: `/articles/${articleId}/likes/`,
        headers: {'X-CSRFToken': csrftoken},
      })
        .then((response) => {

          // 14. django한테 응답받은 좋아요 상태 정보 저장
          const isLiked = response.data.is_liked
          // 16. 좋아요 버튼 선택
          const likeBtn = document.querySelector(`#like-${articleId}`)
          // 15. 좋아요 상태 정보에 따라 버튼 변경
          if (isLiked === true) {
            likeBtn.value = '좋아요 취소'
          } else {
            likeBtn.value = '좋아요'
          }
        })
        .catch((error) => {
          console.log(error)
        })
    })
```

- 버블링을 활용하지 않은 경우
    1. `querySelectorAll()`을 사용해 전체 좋아요 버튼을 선택
    
    ```jsx
    <!-- accounts/index.html -->
    
    {% for article in articles %}
    	...
    	<form class="like-forms" data-article-id="{{ article.pk }}">
    		...
    	</form>
    {% endfor %}
    ```
    
    1. `forEach()`를 사용해 전체 좋아요 버튼을 순회하면서 진행
    
    ```jsx
    <!-- articles/index.html -->
    
    ...
    formTags.forEach((formTag) => {
    	formTag.addEventListener('submit', function (event) {
    		event.preventDefault()
    		
    		const articleId = formTag.dataset.articleId
    		
    		axios({
    			method: 'post',
    			url: `/articles/${articleId}/likes/`,
    			headers: {'X-CSRFToken': csrftoken, },
    		})
    			.then((response) => {
    				const isLiked = response.data.is_liked
    				const likeBtn = document.querySelector('#like-${articleId}')
    				if (isLiked === true) {
    					likeBtn.value = '좋아요 취소'
    				} else {
    					likeBtn.value = '좋아요'
    				}
    			})
    	}
    })
    ```