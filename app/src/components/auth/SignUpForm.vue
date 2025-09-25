<script setup>

  import {ref} from "vue";
  import {signup} from "@/services/auth.js";


  const email = ref("")
  const username = ref("")
  const password = ref("")
  const role = ref("")

  const signUp = async function (){
    if (email.value === "" || username.value === "" || password.value === "") {
      window.alert("Por favor completar los campos correspondientes")
    }
    else{
      await signup({email:email.value, username:username.value, password:password.value, role:role.value})
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
      <label>role: </label>
      <select id="options" name="options" v-model="role">
        <option value="Personal">Personal</option>
        <option value="Regente ADM">Regente ADM</option>
        <option value="Cooperadora">Cooperadora</option>
        <option value="Jefa de Campo">Jefa de Campo</option>
        <option value="Seguridad">Seguridad</option>
      </select>
      <div/>
      <button class="button" @click="signUp()">Sign Up</button>
      <div class="text">
        <p>Already have an account? <RouterLink to="/login">Log In</RouterLink></p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>