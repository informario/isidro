<script setup>
  import VueQrcode from 'vue-qrcode'
  import {ref} from "vue";
  import {enroll} from "@/services/personal.js";

  const name = ref("");
  const dni = ref("");
  const birthdate = ref("");
  const email = ref("");
  const emergencyPhone = ref("");
  const jsonData = ref({});
  const jsonString = ref(JSON.stringify(jsonData.value));
  const isVisible = ref(false);



  const enrollAndQr = async function (){
    const data = {
      name: name.value,
      dni: dni.value,
      birthdate: birthdate.value,
      email: email.value,
      emergencyPhone: emergencyPhone.value,
    }
    await enroll(data).then(_ => {
      alert("Socio generado con éxito")
      jsonData.value=data;
      jsonString.value = JSON.stringify(jsonData.value);
      isVisible.value=true
    })
    .catch(err => {
      console.log("SignUpForm.vue: fallo inscripción: " + err)
      alert(err.response.data.error)
    })
  }

  const createQr = function(data){
    
  }
</script>

<template>
  <div class="login">
    <div class="login-box">
      <h1 class="title">Inscripción de socio</h1>
      <input class="input" placeholder="Nombre" v-model="name">
      <input class="input" placeholder="DNI" v-model="dni">
      <input class="input" placeholder="Fecha de nacimiento" v-model="birthdate">
      <input class="input" placeholder="Email" v-model="email">
      <input class="input" placeholder="Telefono de emergencia" v-model="emergencyPhone">
      <div></div>
      <button class="button" @click="enrollAndQr()">Inscribir</button>
      <div class="text">
      </div>
      <vue-qrcode :value="jsonString" :size="200" v-if="isVisible"></vue-qrcode>
    </div>
  </div>
</template>

<style scoped>
</style>