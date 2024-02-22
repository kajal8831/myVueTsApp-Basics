<script setup lang="ts">
import {ref} from 'vue';
import axios from 'axios';

const props = defineProps<{
  token : any
}>()

const todoData = ref([]);
const apiTodo1 = ref('');

//Api Calling
async function FetchfromApi(){
 //call api and return json data
 //you can use fetch or axios for GET Api
//  todoData.value = null;
//  //to call below api you will have to allow cors policy on server side code
//   const res = await fetch(
//     'http://localhost:5002/Home/GetTodo'
//   );
//   todoData.value = await res.json();
  axios
		.post("http://localhost:5002/Home/GetTodo",{
        //...data
      }, {
      headers: { 'Content-Type': 'application/json;charset=UTF-8', "Access-Control-Allow-Origin": "*", "Accept": "application/json" , "Authorization": "Bearer " +  props.token}
    })
		.then((res : any)=>{
      console.log("Response",res.data);
      //apiTodo1.value = "";
      todoData.value = res.data.todos;
    })
		.catch(function (error: any) {
			console.error(error);
		});
}

async function AddToApi(){
  //create request
  const request = {
    TodoName : apiTodo1.value,
    IsCompleted : false,
  };
  //you can use axios for POST Api
	axios
		.post("http://localhost:5002/Home/SaveTodo",request,{
      headers: { 'Content-Type': 'application/json;charset=UTF-8', "Access-Control-Allow-Origin": "*", "Accept": "application/json" , "Authorization": "Bearer " +  props.token}
    })
		.then((res : any)=>{
      console.log("Response",res.data);
      apiTodo1.value = "";
      todoData.value = res.data.todos;
    })
		.catch(function (error: any) {
			console.error(error);
		});
}

</script>
<template>
    <slot>Fallback content</slot>
    <p> Todo Api Calling: </p>
    <p>Below api is called through Api created on local server using Fetch method</p>
    <p v-if="!todoData">Loading...</p>
    <pre v-else>{{ todoData }}</pre>
    <!-- <ul v-for="item in todoData">
      <li>{{ item.todoName }}</li>
    </ul> -->
    <p> Add Todo via Server Api:  </p>
    <input type="text" v-model="apiTodo1"/>
    <button type="button" @click="FetchfromApi()">FetchApi</button>
    <button type="button" @click="AddToApi()">AddApi</button>
</template>
