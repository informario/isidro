<template>
  <section class="ultimos-cambios">
    <header class="header">
      <h3>Last changes</h3>
      <button @click="load" :disabled="loading">Refresh</button>
    </header>

    <div v-if="loading" class="status">Loading...</div>
    <div v-else-if="error" class="status error">Error: {{ error }}</div>
    <div v-else>
      <p v-if="count === 0" class="status">No recent changes.</p>
      <ul v-else class="dni-list">
        <li v-for="(dni, idx) in dnis" :key="idx">{{ dni }}</li>
      </ul>
      <p class="count">Total: {{ count }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getLastChanges } from '@/services/personal.js';

const dnis = ref([]);
const loading = ref(false);
const error = ref(null);
const count = ref(0);

async function load() {
  loading.value = true;
  error.value = null;
  try {
    const res = await getLastChanges();
    // handle possible response shapes: { count, dnis } or { dnis } or array
    if (res && Array.isArray(res.dnis)) {
      dnis.value = res.dnis;
      count.value = typeof res.count === 'number' ? res.count : res.dnis.length;
    } else if (Array.isArray(res)) {
      dnis.value = res;
      count.value = res.length;
    } else {
      dnis.value = [];
      count.value = 0;
    }
  } catch (err) {
    error.value = err?.message || String(err) || 'Request failed';
  } finally {
    loading.value = false;
  }
}

onMounted(load);
</script>

<style scoped>
.ultimos-cambios {
  padding: 12px;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  background: #fff;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.status {
  color: #666;
  margin: 8px 0;
}
.status.error {
  color: #b00020;
}
.dni-list {
  list-style: none;
  padding: 0;
  margin: 0 0 8px 0;
}
.dni-list li {
  padding: 6px 8px;
  border-bottom: 1px solid #f0f0f0;
}
.count {
  font-size: 12px;
  color: #888;
}
button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>