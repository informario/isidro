<script setup>
const apiDomain = import.meta.env.VITE_API_DOMAIN;
import QrcodeVue from 'qrcode.vue';
  const props = defineProps({
    datos: {
        type: Object,
        required: true
    }
  })
  const qrUrl = `${apiDomain}/datos?dni=${props.datos.DNI}`;  import { ref } from 'vue';
</script>

<template>
  <div class="carnet">
    <img class="banner" src="/Banner_San_Isidro.png" alt="Banner San Isidro" />
    <hr>
    <div class="carnet-content">
      <ul class="datos">
        <li v-for="(valor, clave) in datos" :key="clave">
          <strong>{{ clave }}:</strong> {{ valor }}
        </li>
      </ul>
      <div class="qr">
        <QrcodeVue :value="qrUrl" :size="80" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.carnet {
  width: 9cm;
  height: 5cm;
  border: 1px solid #ccc;
  box-sizing: border-box;
  padding: 5px;
  background: #fff;
  overflow: hidden;
}
.carnet-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.datos {
  text-align: left;
  font-size: 12px;
  flex: 1;
}
.qr {
  width: 80px;
  height: 80px;
  background-color: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
  margin-top: 8px;
  canvas {
    image-rendering: pixelated;
  }
}
</style>