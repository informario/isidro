<script setup>
  import {ref} from "vue";
  import {update, getMemberByDNI} from "@/services/personal.js";
  import InscripcionSocio from "@/components/personal/InscripcionSocio.vue";
  import FormSocio from "@/components/personal/FormSocio.vue";
  const dni = ref("");
  const searchResult = ref("");
  const formSocioRef = ref(null);

  const GetMemberByDNI = async function () {
    const data = { dni: dni.value };
    await getMemberByDNI(data)
        .then(response => {
          searchResult.value = response;
          // Pre-fill the form
          if (formSocioRef.value) {
            const pd = response.personalData;
            if (pd.fecha_nacimiento) {
              pd.fecha_nacimiento = pd.fecha_nacimiento.split('T')[0];
            }
            Object.assign(formSocioRef.value.personalData, response.personalData);
            Object.assign(formSocioRef.value.medicalData, response.medicalData);
            Object.assign(formSocioRef.value.emergencyContact, response.emergencyContact);
          }
        })
        .catch(err => {
          console.log("BuscarSocio.vue: fallo busqueda: " + err);
          alert(err.response.data.error);
        });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await update({
        uuid: searchResult.value.uuid,
        personalData: formSocioRef.value.personalData,
        medicalData: formSocioRef.value.medicalData,
        emergencyContact: formSocioRef.value.emergencyContact
      });
      alert('Update enviada correctamente');
    } catch (error) {
      alert('Error al enviar update');
      console.error(error);
    }
  };
</script>

<template>
  <div class="login">
    <div class="login-box">
      <h1 class="title">Buscar Socio</h1>
      <p>Por DNI</p>
      <input class="input" placeholder="DNI" v-model="dni">
    </div>
      <button class="button" @click="GetMemberByDNI()">Buscar</button>
    <FormSocio ref="formSocioRef"/>
    <button @click="handleSubmit" class="mt-2 px-6 py-1 bg-blue-600 text-white hover:bg-blue-700">Enviar</button>
  </div>
</template>

<style scoped>

</style>