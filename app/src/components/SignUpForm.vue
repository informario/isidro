<script setup>

  import {ref} from "vue";
  import {sendSignUpForm} from "@/services/api_blog.js";


  const email = ref("")
  const username = ref("")
  const password = ref("")

  const signUp = async function (){
    if (email.value === "" || username.value === "" || password.value === "") {
      window.alert("Por favor completar los campos correspondientes")
    }
    else{
      await sendSignUpForm({email:email.value, username:username.value, password:password.value})
          .then(_ => {
            window.alert("usuario creado con exito")
          })
          .catch(err => {
            console.log("SignUpForm.vue: fallo signup: " + err)
            if(err.response.data.error==="Username ya en uso"){
              window.alert(err.response.data.error)
            }
            if(err.response.data.error==="Email ya en uso"){
              window.alert(err.response.data.error)
            }
          })
    }
  }


</script>

<template>
  <div class="login">
    <div class="login-box">
      <h1 class="title">Welcome</h1>
      <h2 class="title2">Sign up to continue</h2>
      <input class="input" type="email" placeholder="john@example.com" v-model="email">
      <input class="input" placeholder="Username" v-model="username">
      <input class="input" type="password" placeholder="Password" v-model="password">
      <button class="button" @click="signUp()">Sign Up</button>
      <div class="text">
        <p>Already have an account? <RouterLink to="/login">Log In</RouterLink></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @import '../assets/css/styles0.css';
  
</style>