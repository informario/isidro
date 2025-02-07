<script setup>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  import {ref, reactive, onMounted } from 'vue'
  import {getIncomes} from "@/services/jefadecampo.js";

  const fromref = ref("")
  const untilref = ref("")



  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  let chartData = ref({
    labels: [],
    datasets: [ { data: [] } ]
  })
  const chartOptions = reactive({
    layout: {
    },
    responsive: true,
    maintainAspectRatio: false,
  })

  const clickGetIncomes = async function (){
    let from = fromref.value + "T00:00:00.000+00:00";
    let until = untilref.value + "T23:59:59.999+00:00";
    let incomes = await getIncomes({ from, until });
    let acc = parseIncomes(incomes);

    const orderedDateLabels = Object.keys(acc).sort((a, b) => new Date(a) - new Date(b));

    chartData.value = { ...chartData.value, labels: [...orderedDateLabels] };
    chartData.value.datasets = [{
      label: "Ingresos",
      backgroundColor: "#42A5F5",
      data: orderedDateLabels.map(date => acc[date])
    }];

    console.log(chartData.value.labels);
    console.log(chartData.value.datasets[0].data);

  }
  const parseIncomes = function(incomes){
    let acc = {};
    for (let i=0; i<incomes.length; i++){
      const day = incomes[i].date.split("T")[0];
      acc[day] = (acc[day] || 0) + incomes[i].amount;
    }
    return acc;
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