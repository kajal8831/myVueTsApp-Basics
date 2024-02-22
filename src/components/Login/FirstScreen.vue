<script setup lang="ts">
import {onMounted, reactive,ref,computed} from 'vue';
import SecondScreen from './SecondScreen.vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';

const auth0 = useAuth0();
const user = auth0.user; 
const isAuthenticated = auth0.isAuthenticated;
const isLoading = auth0.isLoading;

const router = useRoute();

//ref for single variable declaration
const Message = ref('Hello World!!');
const count = ref(0);
const text = ref('');
const text1 = ref('');
const titleclass = ref('title');
const isAwesome = ref(true);
const isSection1 = ref(false);
const isSection2 = ref(false);
const isSection3 = ref(false);
const isSection4 = ref(false);
const isSection5 = ref(false);
const isSection6 = ref(false);
const isSection7 = ref(false);
const childMsg = ref('No message from child');
const myArray = ref([{
  id : 1,
  name: 'abc'
},
{
  id : 2,
  name: 'pqr'
}]);

//reactive works for arrays
const counter = reactive({
   counts : 0
});

function onInput(e:any){
  text.value = e.target.value;
}

function Increment(){
  count.value++;
}

function login(){
  auth0.loginWithRedirect();
}

function ChkDifference(){
  alert(text.value + " " + text1.value);
}

function ToggleMe(){
  isAwesome.value = !isAwesome.value;
}

function ToggleAgain(num : number){
  if(num == 1){
    isSection1.value = !isSection1.value;
  }
  else if(num == 2){
    isSection2.value = !isSection2.value;
  }
  else if(num == 3){
    isSection3.value = !isSection3.value;
  }
  else if(num == 4){
    isSection4.value = !isSection4.value;
  }
  else if(num == 5){
    isSection5.value = !isSection5.value;
  }
  else if(num == 6){
    isSection6.value = !isSection6.value;
  }
  else if(num == 7){
    isSection7.value = !isSection7.value;
  }
}

</script>

<template>
    <h1 style="font-style: italic;color:green;">This is first component</h1>
    <br/>
    <div v-if="isLoading">Loading ...</div>
    <div v-else>
      <h2>User Profile</h2>
      <button @click="login">Log in</button>
      <pre v-if="isAuthenticated">
          <code>{{ user }}</code>
        </pre>
    </div>
    <br/>
    <button type="button" class="collapsible" @click="ToggleAgain(1)">Open Section1</button>
    <br/>
    <div v-if="isSection1">
      <p>Simple text displayed using ref and also see the class binding</p>
      <p>{{ router.query.token }}</p>
      <h2 :class="titleclass">{{ Message }}</h2>
    </div>
    <br/><br/>
    <button type="button" class="collapsible" @click="ToggleAgain(2)">Open Section2</button>
    <br/>
    <div  v-if="isSection2">
      <p>Fetch counts from array created using reactive</p>
      <h3>{{ counter.counts }}</h3>
      <p>Counts variable created using ref is updated by increment function</p>
      <button type="button" @click="Increment()">Count is : {{ count }}</button>
    </div>
    <br/><br/>
    <button type="button" class="collapsible" @click="ToggleAgain(3)">Open Section3</button>
    <br/>
    <div  v-if="isSection3">
      <p>See difference between v-model and :value with @input by clicking checkdifference button</p>
      <label>:value and @input</label><input :value="text" @input="onInput" placeholder="Typehere"/>
      <p>{{ text }}</p>
      <label>v-model</label><input v-model="text1" placeholder="Typehere"/>
      <br/>
      <button type="button" @click="ChkDifference()">CheckDifference</button>
    </div>
    <br/><br/>
    <button type="button" class="collapsible" @click="ToggleAgain(4)">Open Section4</button>
    <br/>
    <div  v-if="isSection4">
      <p>Check conditional rendering by clicking toggle button</p>
      <p v-if="isAwesome">Vue is Awesome!!</p>
      <p v-else>Oh No!</p>
      <br/>
      <button type="button" @click="ToggleMe()">Toggle</button>
    </div>
    <br/><br/>
    <button type="button" class="collapsible" @click="ToggleAgain(5)">Open Section5</button>
    <br/>
    <div  v-if="isSection5">
      <p>Check loops</p>
      <ul v-for="item in myArray" :key="item.id">
        <li>{{ item.name }}</li>
      </ul>
    </div>
    <br/><br/>
    <button type="button" class="collapsible" @click="ToggleAgain(6)">Open Section6</button>
    <br/>
    <div  v-if="isSection6">
      <p :class="titleclass">Call child component in parent component and also pass message from parent component to child component using props</p>
      <SecondScreen msg="Hello, I am printed using props in second component!!"
        :token = "router.query.token"
        @response="(msg) => childMsg = msg"
      >
      </SecondScreen>
      <p>Event emitted from child component and child message is changed</p>
    </div>
    <br/><br/>
    <button type="button" class="collapsible" @click="ToggleAgain(7)">Open Section7</button>
    <br/>
    <div  v-if="isSection7">
      <p>Event emitted from child component and child message is changed</p>
      <p>Please add a todo and see how event is emitted again and child message is changed</p>
      <p style="color:red;">{{ childMsg }}</p>
    </div>
    <br/><br/>
    <nav>
        <RouterLink to="/last">You did it</RouterLink>
    </nav>
</template>

<style>
@media (min-width: 1024px) {
  .first {
    min-height: 100vh;
    align-items: center;
  }
  .title{
    color:red;
  }
  .collapsible {
  background-color: #777;
  color: white;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}

.active, .collapsible:hover {
  background-color: #555;
}
}

</style>