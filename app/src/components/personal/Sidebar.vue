<script setup>
</script>

<template>
    <div class="content">
            Sidebar
        <button>Inscribir socio</button>
        <button>Buscar socio</button>
    </div>
</template>

<style>
html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden; /* opcional, según el caso */
  }
.content{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border: solid black;
    text-align: center;
}
button{
    margin:5px;
}

</style>