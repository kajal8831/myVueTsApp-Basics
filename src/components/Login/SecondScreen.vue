<script setup lang="ts">
import {reactive,ref,computed} from 'vue';
import ThirdScreen from './ThirdScreen.vue';

const props = defineProps<{
  msg : string,
  token : any
}>()
//we can emit events from child component to parent component
const emit = defineEmits<{
  (e:'response',str:string):void;
}>();

emit('response','Hello from child');

const fallbackMsg = ref("Message passed using slots");

const newTodo = ref('');
let id = 0;
const todos = ref([
  { id: id++, text: 'Learn HTML', done: true },
  { id: id++, text: 'Learn JavaScript',done: false },
  { id: id++, text: 'Learn Vue',done: true }
]);

function AddTodo(){
  if(newTodo.value == ""){
    alert("Please enter todo");
    return;
  }
  todos.value.push({"id":id++,"text":newTodo.value,"done":false});
  newTodo.value = "";
  emit('response','Hello I am event emitted from child');
}

function RemoveTodo(todo:any){
  todos.value = todos.value.filter((t) => t !== todo);
}

const filteredtodos = computed(() => {
  return hideCompleted.value ? todos.value.filter((t) => !t.done) : todos.value;
});

const hideCompleted = ref(false);

</script>

<template>
    <div class="second">
        {{ props.msg || 'No Props Passed yet'}}
        <br/>
       <i>Please Check the Todo List below:</i> 
    </div>
    <div>
      <input type="text" v-model="newTodo"/><button @click="AddTodo()">Add Todo</button>
    </div>
    <div>
      <ul v-for="todo in filteredtodos" :key="todo.id">
        <li> <input type="checkbox" v-model="todo.done"/> <span :class="{ done: todo.done }">{{ todo.text }}</span> <button @click="RemoveTodo(todo)">X</button> </li>   
      </ul>
      <button @click="hideCompleted = !hideCompleted">{{ hideCompleted ? "HideCompleted" : "ShowAll" }}</button>
    </div>
    <br/>
    <div style="color:blue;">
      <p>we can also pass data from parent to child using slots</p>
      <p>Initially it will show fall back content, and after calling child and passing slot it shows updated message</p>
      <ThirdScreen :token = "props.token">Message : {{ fallbackMsg }}</ThirdScreen>
    </div>
    <br/>
</template>

<style>
@media (min-width: 1024px) {
  .second {
    color:violet;
  }
  .done{
    text-decoration: line-through;
  }
}

</style>