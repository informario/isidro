<script setup>
import { ref, computed, nextTick, onMounted, toRaw, unref} from 'vue';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Carnet from './Carnet.vue';

const props = defineProps({
  items: {
    type: Array,
    required: false,
    default: () => []
  },
  fileName: {
    type: String,
    default: 'carnets.pdf'
  }
});

function mapToCarnet(member) {
  // unwrap refs / reactive proxies to plain object
  const raw = toRaw(unref(member));
  console.log(raw);
  return {
    DNI: raw.datos_personales.dni,
    Apellido: raw.datos_personales.apellido,
    Nombre: raw.datos_personales.nombre,
    Sede: 'Puerto Libre',
    "Firma Responsable": "____________________"
  };
}

const members = ref([]);
const loading = ref(false);
const error = ref(null);

const perPage = 8;
const pages = computed(() => {
  const source = (props.items && props.items.length) ? props.items : members.value;
  const out = [];
  for (let i = 0; i < source.length; i += perPage) {
    out.push(source.slice(i, i + perPage));
  }
  return out;
});

const generating = ref(false);

async function fetchMembers() {
  loading.value = true;
  error.value = null;
  try {
    const module = await import('@/services/personal.js');
    const resp = await module.getAllMembers();
    if (Array.isArray(resp)) {
      members.value = resp;
    } else if (resp && Array.isArray(resp.members)) {
      members.value = resp.members;
    } else if (resp && Array.isArray(resp.data)) {
      members.value = resp.data;
    } else {
      members.value = resp && resp.members ? resp.members : [];
    }
  } catch (err) {
    console.error('Error fetching members for PDF:', err);
    error.value = err;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  if (!props.items || props.items.length === 0) {
    fetchMembers();
  } else {
    members.value = [];
  }
});

async function generatePdf() {
  const source = (props.items && props.items.length) ? props.items : members.value;
  if (!source || source.length === 0) return;
  generating.value = true;
  await nextTick();
  const pageEls = Array.from(document.querySelectorAll('.a4page'));
  let JsPDFClass = jsPDF;
  if (!JsPDFClass || typeof JsPDFClass !== 'function') {
    try {
      const mod = await import('jspdf');
      JsPDFClass = mod.jsPDF || mod.default || mod;
    } catch (e) {
      console.error('No se pudo cargar jspdf dinámicamente:', e);
      generating.value = false;
      return;
    }
  }
  const pdf = new JsPDFClass('p', 'mm', 'a4');
  for (let i = 0; i < pageEls.length; i++) {
    const el = pageEls[i];
    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    if (i < pageEls.length - 1) pdf.addPage();
  }
  pdf.save(props.fileName);
  generating.value = false;
}
</script>

<template>
  <div>
    <button @click="generatePdf" :disabled="generating || loading || ( (!props.items || props.items.length===0) && loading )">
      <span v-if="generating">Generando...</span>
      <span v-else-if="loading">Cargando miembros...</span>
      <span v-else>Generar PDF (8 por A4)</span>
    </button>

    <div v-if="error" style="color: red; margin-top: 8px;">Error cargando miembros: {{ error.message || error }}</div>

    <div class="pdf-sheet-wrapper" aria-hidden="true">
      <div v-for="(pageItems, pIndex) in pages" :key="pIndex" class="a4page">
        <div class="cards-grid">
          <component
              v-for="(dato, idx) in pageItems"
              :is="Carnet"
              :key="dato.dni ?? idx"
              :datos="mapToCarnet(dato)"
              :style="{ width: '9cm', height: '5cm', boxSizing: 'border-box' }" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pdf-sheet-wrapper {
  position: fixed;
  left: -9999px;
  top: 0;
  width: 210mm;
  height: 297mm;
}

.a4page {
  width: 210mm;
  height: 297mm;
  box-sizing: border-box;
  padding: 12mm;
  background: white;
  page-break-after: always;
  display: block;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: min-content;
  gap: 8mm;
  align-items: start;
  justify-items: stretch;
}

</style>
