<script setup lang="ts">
import {ref} from 'vue';

const isActive = ref(true);
const message = ref("HelloWorld");
const count = 10;

const myArray = ref([{
  id : 1,
  name: 'abc'
},
{
  id : 2,
  name: 'pqr'
}]);

function test(){
	//alert("Hello");
    const xyz = message.value;
    alert(xyz);
}
</script>

<template>
    <div v-if="isActive">
        Welcome To Xanthus {{ message }}
    </div>
    <br/><br/>
    <div v-if="count<10">
        first div
    </div>
    <div v-else-if="count>=10">
        second div
    </div>
    <div v-else>
        third div
 </div>
 <br/>
 <ul v-for="item in myArray" :key="item.id">
        <li>
            {{ item.name }}
        </li>     
</ul>
<br/>
    <button type="button" class="form-control" @click="test()">ClickMe</button>
</template>