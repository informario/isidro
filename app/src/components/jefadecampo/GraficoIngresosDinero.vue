<script setup>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  import {ref, reactive, onMounted } from 'vue'

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

  const chartData = reactive({
    labels: [ 'January', 'February', 'March' ],
    datasets: [ { data: [40, 20, 12] } ]
  })
  const chartOptions = reactive({
    responsive: true
  })

</script>

<template>
///    GRAFICO INGRESOS DINERO
  <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
  />

</template>

<style scoped>

</style>