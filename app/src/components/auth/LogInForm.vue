<script setup>

  import {ref} from "vue";
  import { useRouter } from 'vue-router'
  import {login} from "@/services/auth.js";
  const router = useRouter()
  const username = ref("")
  const password = ref("")

  const logIn = async function (){
    if (username.value === "" || password.value === "") {
      window.alert("Por favor completar los campos correspondientes")
    }
    else{
      await login({username:username.value, password:password.value})
        .then(response =>{
          localStorage.setItem("username", username.value)
          localStorage.setItem("jwt", response.accessToken)
          switch (response.role) {
            case 'Personal':
              router.push("/personal")
              break;
            case 'Jefa de Campo':
              router.push("/jefadecampo");
              break;
            case 'Seguridad':
              router.push("/seguridad");
              break;
            default:
              console.log("unknown role");
              router.push("/login")
          }
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
  <div class="flex items-center justify-center h-screen w-screen bg-gray-200 dark:bg-gray-800 ring-gray-900/5">
    <div class="w-1/3 h-2/3 flex flex-col items-center justify-center rounded-md bg-white dark:bg-gray-900 p-2 shadow-lg font-light">
      <p class="text-4xl m-3 font-medium dark:text-white">Welcome</p>
      <p class="text-xl m-2 font-normal dark:text-white">Log in to continue</p>
      <input class="border border-gray-400 text-gray-600 dark:text-white p-2 rounded-md m-3" placeholder="Username" v-model="username">
      <input class="border border-gray-400 text-gray-600 dark:text-white p-2 rounded-md m-3" placeholder="Password" type="password" v-model="password">
      <button class="bg-indigo-600 text-white p-2 rounded-md m-3" @click="logIn()">Log in</button>
      <div class="">
        <p class="m-3 dark:text-white">Don't have an account?  <RouterLink class="text-blue-600" to="/signup">Sign Up</RouterLink></p>
      </div>
  </div>
</div>

</template>

<style scoped>
  
</style>