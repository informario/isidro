<script setup>

  import {ref} from "vue";
  import {getAuthToken} from "@/services/api_blog.js";
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const username = ref("")
  const password = ref("")

  const logIn = async function (){
    if (username.value === "" || password.value === "") {
      window.alert("Por favor completar los campos correspondientes")
    }
    else{
      await getAuthToken({username:username.value, password:password.value})
        .then(jwt =>{
          console.log(username.value)
          localStorage.setItem("username", username.value)
          localStorage.setItem("jwt", jwt)
          router.push("/blog")
        })
        .catch(error =>{
          if(error.code === 'ERR_BAD_REQUEST'){
            window.alert("usuario o contraseña incorrecto")
          }
          else{
            console.log("Blog.vue, error obteniendo authtoken", error)
          }
        })
    }
  }
</script>

<template>
  <div class="login">
    <div class="login-box">
      <h1 class="title">Welcome</h1>
      <h2 class="title2">Log in to continue</h2>
      <input class="input" placeholder="Username" v-model="username">
      <input class="input" placeholder="Password" type="password" v-model="password">
      <button class="button" @click="logIn()">Log in</button>
      <div class="text">
        <p>Don't have an account?  <RouterLink to="/signup">Sign Up</RouterLink></p>
      </div>
    </div>

  </div>

</template>

<style scoped>
  @import '../assets/css/styles0.css';
  
</style>