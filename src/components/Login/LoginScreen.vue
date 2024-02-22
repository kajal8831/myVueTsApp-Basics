<script setup lang="ts">
import router from '@/router'
import { RouterLink, RouterView } from 'vue-router'
import { onMounted,reactive, ref } from 'vue'
import axios from 'axios'

//for sso login start
// Composition API
//  import { useAuth0 } from '@auth0/auth0-vue';

// const auth0 = useAuth0();
// const user = auth0.user; 
// const isAuthenticated = auth0.isAuthenticated;
// const isLoading = auth0.isLoading;

// function Login(){
//   if (UserId.value == 0 && Password.value == '') {
//     alert('Please enter your credentials')
//     return
//   }
//   auth0.loginWithRedirect();
// }
//for sso login end

const UserId = ref(0)
const Password = ref('')

function ClickMe() {
  if (UserId.value == 0 && Password.value == '') {
    alert('Please enter your credentials')
    return
  }
  //Login Api Called
  //create request
  const request = {
    id: UserId.value,
    Password: Password.value
  }
  //you can use axios for GET and POST Api
  axios
    .post('http://localhost:5002/Token/GetLogin', request)
    .then((res: any) => {
      console.log('Login', res.data)
      if (res.data.statusCode == 200) { 
        // if(res.data.pleaseTerminate == true){
        //   alert("Some another user is already logged in");
        //   return
        // }  
        // else{
        //   alert(res.data.statusMessage)
        //   router.push('first') //you can use this for routing
        // }  
        
        alert(res.data.statusMessage)
        router.push({ path: "/first", query: { token: res.data.access_token } }); //you can use this for routing
      } else {
        alert(res.data.statusMessage)
        return
      }
    })
    .catch(function (error: any) {
      console.error(error)
      alert('Login Failed')
      return
    })
}
</script>

<template>
  <div class="wrapper">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      <form>
        <div class="container">
          <label for="uname"><b>UserId</b></label>
          <input type="text" placeholder="Enter UserId" name="uname" v-model="UserId" required />

          <label for="psw"><b>Password</b></label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            v-model="Password"
            required
          />

          <button type="button" @click="ClickMe()">Login</button>
          <!-- <button type="button" @click="Login()">Login</button> -->
          <label> <input type="checkbox" name="remember" /> Remember me </label>
        </div>
        <div class="container" style="background-color: #f1f1f1">
          <nav>
            <RouterLink to="/about">AboutUs</RouterLink>
            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
            <RouterLink to="/demo">Demo</RouterLink>
          </nav>
        </div>
      </form>
    </header>
  </div>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

form {
  border: 3px solid #f1f1f1;
}

/* Full-width inputs */
input[type='text'],
input[type='password'] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}

.container {
  padding: 16px;
}
</style>
