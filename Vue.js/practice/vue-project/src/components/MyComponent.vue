<template>
  <div>
    <hr>
    <h1>MyComponent 페이지입니다 ~!</h1>
    <p>질문: {{ msg }}</p>
    <p>대답: {{ object.answer[0] }}</p>

    <h2>{{ onYou.name }}</h2>
    
    <div style="background-color: aliceblue;">
      <p>나이: {{ onYou.age }} </p> 
      <p>내년 나이: {{ onYou.age+1 }}</p>
    </div>
    <div style="background-color: aliceblue;">
      <p>나이: {{ onYou2.age }}</p>
      <p>내년 나이: {{ onYou2.age+1 }}</p>
    
    </div>

    <div style="background-color: beige;">
      <p>=> 출력값이 [object Object]1이 되는 이유?</p>
      <p>템플릿에서의 unwrap은 `ref`가 최상위 속성인 경우에만 가능하기 때문</p>
      <p>표현식을 평가할 때, onYou2.age가 unwrap되지 않고 ref객체로 남아있다.</p>
    </div>
    <div style="background-color: aliceblue;">
      <p>나이: {{ age }}</p>
      <p>내년 나이: {{ age + 1 }}</p>
    </div>

    <hr style="border-color: bisque;">

    <div :style="[styleObj, styleObj2]">안녕하세요?</div>
    <br>
    <button @click="warning('경고입니다', $event)">Submit</button>
    <br>
    <button @click="myFunc">Hello</button>
    <br>

    <hr>
    <input type="checkbox" id="checkbox" v-model="checked">
    <label for="checkbox">{{ checked }}</label>
    <hr>

    <div>Checked names: {{ checkedNames }}</div>
    <input type="checkbox" id="alice" value="Alice" v-model="checkedNames">
    <label for="alice">Alice</label>
    <input type="checkbox" id="bella" value="Bella" v-model="checkedNames">
    <label for="bella">Bella</label>

    <hr>
    <div>Selected: {{ selected }}</div>

    <select v-model="selected">
      <option disabled value="">Please select one</option>
      <option>Alice</option>
      <option>Bella</option>
      <option>Cathy</option>
    </select>

    <hr>

    <div v-for="(item, index) in myArr">
      {{ index }} / {{ item }}
    </div>

    <hr>

    <ul v-for="item in myInfo">
      <li v-for="friend in item.friends">
        {{ item.name }} - {{ friend }}
      </li>
    </ul>

    <hr>

 </div>
</template>

<script setup>
import { ref } from 'vue'
const myArr = ref([
	{ name: 'Alice', age: 20 },
	{ name: 'Bella', age: 21 }
])

const myInfo = ref([
	{ name: 'Alice', age: 20, friends: ['Bella', 'Cathy', 'Dan'] },
	{ name: 'Bella', age: 21, friends: ['Alice', 'Cathy'] }
])

const selected = ref([])
const checkedNames = ref([])
const checked = ref(false)
const name = ref('Alice')

const myFunc = function (event) {
	console.log(event)
	console.log(event.currentTarget)
	console.log(name.value)
}

const msg = ref('카러플 하실래요?')
const object = ref({
  answer: ['아니요', '네'],
})

const onYou = ref({
  name: '최온유',
  age: 29
})
const onYou2 = {
  age: ref(29)
}

const onYou3 = {
  age: ref(29)
}
const {age} = onYou3

const activeColor = ref('crimson')
const fontSize = ref(50)

const styleObj = ref({
  color : activeColor,
  fontSize : fontSize.value + 'px'
})

const styleObj2 = ref({
  color: 'blue',
  border: '1px solid black'
})
const warning = function (message, event) {
    console.log(message)
    console.log(event)
  }
</script>

<style scoped>

</style>