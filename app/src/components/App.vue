<script setup>

</script>

<template>
  <div id="app">
    <Suspense>
      <template #default>
        <router-view></router-view>
      </template>
      <template #fallback>
        <div>Cargando...</div>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>

</style>