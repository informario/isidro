<script setup>
    import { onMounted, ref } from 'vue';

    // To use Html5QrcodeScanner (more info below)
    import {Html5QrcodeScanner} from "html5-qrcode"

    // To use Html5Qrcode (more info below)
    import {Html5Qrcode} from "html5-qrcode"


    function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    alert(`Code matched = ${decodedText}`, decodedResult);
    }

    function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
    }

    onMounted(() => {
        let html5QrcodeScanner = new Html5QrcodeScanner("reader",
            { fps: 10, qrbox: {width: 250, height: 250} },
            /* verbose= */ false);
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    });

</script>

<template>
HOLA SEGURIDAD
<div id="reader" width="600px"></div>

</template>

<style scoped>

</style>