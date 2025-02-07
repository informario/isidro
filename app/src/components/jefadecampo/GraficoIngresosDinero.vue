<script setup>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  import {ref, reactive, onMounted } from 'vue'
  import {getIncomes} from "@/services/jefadecampo.js";

  const fromref = ref("")
  const untilref = ref("")



  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  const chartData = reactive({
    labels: [ 'January', 'February', 'March' ],
    datasets: [ { data: [40, 20, 12] } ]
  })
  const chartOptions = reactive({
    layout: {
    },
    responsive: true
  })

  const clickGetIncomes = async function (){
    let from = fromref.value + "T00:00:00.000+00:00";
    let until = untilref.value + "T23:59:59.999+00:00";
    console.log(await getIncomes({from, until}));
  }

</script>

<template>
///    GRAFICO INGRESOS DINERO
  <div class="plot">
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>

  <div>
    <label>Desde</label>
    <input type="date" v-model="fromref">
  </div>

  <div>
    <label>Hasta</label>
    <input type="date" v-model="untilref">
  </div>
  <div>
    <input type="button" value="get incomes" @click="clickGetIncomes">
  </div>
</template>

<style scoped>
.plot{
  height: 500px;
}
</style>