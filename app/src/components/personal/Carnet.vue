<script setup>
    const props = defineProps({
    datos: {
        type: Object,
        required: true
    }
    })
    import { ref } from 'vue';
</script>

<template>
    <div class="carnet">
        <div class="header">Municipalidad de San Isidro</div>
        <div class="header">Dirección General de Tercera Edad</div>
        <hr>
        <ul>
            <li v-for="(valor, clave) in datos" :key="clave">
                <strong>{{ clave }}:</strong> {{ valor }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.carnet {
    width: 350px;
    height: 200px;
    border: 2px solid black;
    border-radius: 10px;
    padding: 10px;
    font-family: Arial, sans-serif;
    text-align: center;
}
.header {
    font-weight: bold;
    font-size: 14px;
}
.content {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}
.datos {
    text-align: left;
    font-size: 12px;
}
.qr {
    width: 80px;
    height: 80px;
    background-color: lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>