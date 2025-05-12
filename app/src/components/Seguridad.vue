<script setup>
    import { onMounted, ref, isProxy, toRaw } from 'vue';
    import { useRouter } from 'vue-router'
    import Carnet from "@/components/personal/Carnet.vue";
    import {Html5QrcodeScanner} from "html5-qrcode"
    import {Html5Qrcode} from "html5-qrcode"
    import {getMemberData} from "@/services/seguridad.js";

    const isVisible = ref(false);
    const name = ref("ss");
    const dni = ref("ss");
    const birthdate = ref("ss");
    const datos = ref({})
    async function onScanSuccess(decodedText, decodedResult) {
        const a = JSON.parse(decodedText);
        const result = await getMemberData(a)
        console.log(result);
        datos.value=result;
        /*
        name.value = a.name;
        dni.value = a.dni;
        birthdate.value = a.birthdate;
        console.log(a)

        //router.push("/carnet")
        */
        isVisible.value=true
    }

    function onScanFailure(error) {
        //console.log("f")
    }

    onMounted(() => {
        let html5QrcodeScanner = new Html5QrcodeScanner("reader",
            { fps: 10, qrbox: {width: 250, height: 250} },
            /* verbose= */ false);
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    });

    function remove() {
        isVisible.value=false
    }

</script>

<template>
    HOLA SEGURIDAD
    <div class="qrscanner_container">
        <div class="reader" id="reader" width="600px"></div>
    </div>
    <div class="carnet_container">
        <Carnet :datos="datos" v-if="isVisible"/>
        <input type="button" v-if="isVisible" @click=remove>
    </div>
</template>

<style scoped>
.reader{
    width: 600px;
}
</style>