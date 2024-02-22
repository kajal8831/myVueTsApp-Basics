<script setup lang="ts">
import {onMounted,reactive,ref,watch} from 'vue'

const pElementRef = ref('');
const todoData = ref(null);
const todoId = ref(1);

async function fetchData(){
  //call api and return json data
  todoData.value = null;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  );
  todoData.value = await res.json();
}

onMounted(() => {
  pElementRef.value = "Mounted!!"
  fetchData();
  //Sometimes we may need to perform "side effects" reactively - for example, logging a number to the console when it changes. We can achieve this with watchers:
  watch(todoId,(newtodoId) => {
    console.log(`old count is: ${todoId.value}`)
    console.log(`new count is: ${newtodoId}`)
  });
  //call api again after todoId is changed using watcher
  watch(todoId,fetchData);
});
</script>

<template>
  <div class="about">
      <h1 style="font-style: italic;color:green;">This is a simple vue application</h1>
      <div>
      <p>Lifecycle hooks and Template Refs</p>
      <ol>
        <li>We can request a template ref - i.e. a reference to an element in the template - using the special ref attribute:</li>
        <li>To access the ref, we need to declare a ref with matching name:</li>
        <li>Notice the ref is initialized with null value. This is because the element doesn't exist yet when script setup is executed. The template ref is only accessible after the component is mounted.</li>
        <li>To run code after mount, we can use the onMounted functions</li>
        <li>This is called a lifecycle hook - it allows us to register a callback to be called at certain times of the component's lifecycle. There are other hooks such as onUpdated and onUnmounted</li>
        <li>Now, try to add an onMounted hook, access the p tag via pElementRef value, and perform some direct DOM operations on it (e.g. changing its textContent).</li>
      </ol>
    </div>
    <p style="color:violet;">See below is the text we are updating on onMounted.In code we have initially set the value as Hello, onMounted we are updating as HelloWorld</p>
    <p style="color:red;" ref="pElementRef">Hello</p>
    <br/><br/>
    <p> Api Calling: </p>
    <p v-if="!todoData">Loading...</p>
    <pre v-else>{{ todoData }}</pre>
    <button type="button" @click="todoId++">Fetch Next todo</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    align-items: center;
  }
}

</style>
