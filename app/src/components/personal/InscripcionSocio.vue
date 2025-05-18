<script setup>
  import VueQrcode from 'vue-qrcode'
  import {ref} from "vue";
  import {enroll} from "@/services/personal.js";


const form = ref({
  // Datos del socio
  dni: "",
  apellido: "",
  nombre: "",
  fecha_nacimiento: "",
  nacionalidad: "",
  sexo: "",
  calle: "",
  numero: null,
  piso: null,
  departamento: "",
  partido: "",
  localidad: "",
  telefono_fijo: "",
  telefono_celular: "",
  email: "",
  centro: "",
  observaciones: "",
  estatus: "",
  tiene_domicilio_en_san_isidro: false,
  causa_no_domicilio_san_isidro: "",

  // Contacto de emergencia
  nombre_contacto_emergencia: "",
  parentesco_contacto_emergencia: "",
  telefono_fijo_contacto_emergencia: "",
  telefono_celular_contacto_emergencia: "",

  // Datos médicos
  dosis_covid: null,
  obra_social: "",
  tipo_covertura_medica: "",
  marcapasos: false,
  infarto: false,
  anticoagulantes: false,
  enfermedades: "",
  discapacidades: "",
  tiene_cud: false,
  requiere_acompañante: false,
  acude_tratamiento_ambulatorio: false,

  // Datos varios
  centro_educativo: "",
  refuerzo_alimentario: false,
  comedor_comunitario: "",
  tiene_trabajo: false,
  condicion_trabajo: "",
  actividad_principal: "",
  ingreso_mensual: null,
  cobra_jubilacion: false,
  cobra_pension: false,
  tipo_pensión: "",
  paga_alquiler: false,
  monto_alquiler: null,
  situación_calle: false,
  fecha_inicio_situacion_calle: "",
  tipo_habitat: "",
  tiene_certificado_renabap: false,
  certificado_renabap: null,
  tipo_vivienda: "",
  regimen_tenencia: "",
  tiene_baño: false,
  vivienda_se_inunda: false,
  acceso_agua: false,
  acceso_electricidad: false,
  acceso_cloacas: false,
  acceso_gas: false,
  familiar_acude_actividades_municipales: false,
  otro_servicio: ""
});

  const jsonData = ref({});
  const jsonString = ref(JSON.stringify(jsonData.value));
  const isVisible = ref(false);

const enrollAndQr = async function () {
  await enroll(form.value).then(response => {
    alert("Socio generado con éxito")
    jsonData.value = response;
    jsonString.value = JSON.stringify(jsonData.value);
    isVisible.value = true
  })
    .catch(err => {
      console.log("InscripcionSocio.vue: fallo inscripción: " + err)
      alert(err.response.data.error)
    })
}

  const createQr = function(response){
    
  }
</script>

<template>
  <div class="p-2 font-light">
    <p class="m-4 text-center text-xl">Inscribir socio</p>

      <div class="max-h-[80vh] overflow-y-scroll">
        <form @submit.prevent="enrollAndQr" class="">
          <div class="grid grid-cols-2 grid-rows-2 max-sm:grid-cols-1 auto-rows-min">
            <!-- Datos del socio -->
            <div class="max-h-[30vh] m-2 border border-1 border-indigo-500 p-2 grid grid-cols-2 max-sm:grid-cols-1 auto-rows-min overflow-y-scroll ">
              <p class="font-semibold">Datos del socio</p>
              <div></div>
              <input v-model="form.nombre" class="input" placeholder="Nombre" required />
              <input v-model="form.apellido" class="input" placeholder="Apellido" required />
              <input v-model="form.dni" class="input" placeholder="DNI" required />
              <input v-model="form.fecha_nacimiento" type="date" class="input" placeholder="Fecha de nacimiento" required />
              <input v-model="form.nacionalidad" class="input" placeholder="Nacionalidad" required />
              <input v-model="form.sexo" class="input" placeholder="Sexo" required />
              <input v-model="form.calle" class="input" placeholder="Calle" required />
              <input v-model="form.numero" type="number" class="input" placeholder="Número" required />
              <input v-model="form.piso" type="number" class="input" placeholder="Piso" />
              <input v-model="form.departamento" type="input" class="input" placeholder="Departamento" />
              <input v-model="form.partido" class="input" placeholder="Partido" required />
              <input v-model="form.localidad" class="input" placeholder="Localidad" required />
              <input v-model="form.telefono_fijo" class="input" placeholder="Teléfono fijo" />
              <input v-model="form.telefono_celular" class="input" placeholder="Teléfono celular" required />
              <input v-model="form.email" class="input" placeholder="Email" />
              <input v-model="form.centro" class="input" placeholder="Centro" required />
              <input v-model="form.observaciones" class="input" placeholder="Observaciones" />
              <input v-model="form.estatus" class="input" placeholder="Estatus" />
              <label class="flex items-center gap-2">
                <input v-model="form.tiene_domicilio_en_san_isidro" type="checkbox" />
                ¿Tiene domicilio en San Isidro?
              </label>
              <input v-model="form.causa_no_domicilio_san_isidro" class="input" placeholder="Causa no domicilio San Isidro" />
            </div>

            <!-- Datos contacto de emergencia -->
            <div class="max-h-[30vh] m-2 border border-1 border-indigo-500 p-2 grid grid-cols-2 max-sm:grid-cols-1 auto-rows-min overflow-y-scroll">
              <p class="font-semibold">Contacto de emergencia</p>
              <div></div>
              <input v-model="form.nombre_contacto_emergencia" class="input" placeholder="Nombre contacto emergencia" required />
              <input v-model="form.parentesco_contacto_emergencia" class="input" placeholder="Parentesco contacto emergencia" required />
              <input v-model="form.telefono_fijo_contacto_emergencia" class="input" placeholder="Teléfono fijo contacto emergencia" />
              <input v-model="form.telefono_celular_contacto_emergencia" class="input" placeholder="Teléfono celular contacto emergencia" required />
            </div>

            <!-- Datos médicos -->
            <div class="max-h-[30vh] m-2 border border-1 border-indigo-500 p-2 grid grid-cols-2 max-sm:grid-cols-1 auto-rows-min overflow-y-scroll">
              <p class="font-semibold">Datos médicos</p>
              <div></div>
              <input v-model="form.dosis_covid" type="number" class="input" placeholder="Dosis COVID" />
              <input v-model="form.obra_social" class="input" placeholder="Obra social" />
              <input v-model="form.tipo_covertura_medica" class="input" placeholder="Tipo cobertura médica" />
              <label class="flex items-center gap-2">
                <input v-model="form.marcapasos" type="checkbox" />
                ¿Marcapasos?
              </label>
              <label class="flex items-center gap-2">
                <input v-model="form.infarto" type="checkbox" />
                ¿Infarto?
              </label>
              <label class="flex items-center gap-2">
                <input v-model="form.anticoagulantes" type="checkbox" />
                ¿Anticoagulantes?
              </label>
              <input v-model="form.enfermedades" class="input" placeholder="Enfermedades" />
              <input v-model="form.discapacidades" class="input" placeholder="Discapacidades" />
              <label class="flex items-center gap-2">
                <input v-model="form.tiene_cud" type="checkbox" />
                ¿Tiene CUD?
              </label>
              <label class="flex items-center gap-2">
                <input v-model="form.requiere_acompañante" type="checkbox" />
                ¿Requiere acompañante?
              </label>
              <label class="flex items-center gap-2">
                <input v-model="form.acude_tratamiento_ambulatorio" type="checkbox" />
                ¿Acude a tratamiento ambulatorio?
              </label>
            </div>

            <!-- Datos varios -->
            <div class="max-h-[30vh] m-2 border border-1 border-indigo-500 p-2 grid grid-cols-2 max-sm:grid-cols-1 auto-rows-min overflow-y-scroll">
              <p class="font-semibold">Datos varios</p>
              <div></div>
              <input v-model="form.centro_educativo" class="input" placeholder="Centro educativo" />
              <label class="flex items-center gap-2">
                <input v-model="form.refuerzo_alimentario" type="checkbox" />
                ¿Refuerzo alimentario?
              </label>
              <input v-model="form.comedor_comunitario" class="input" placeholder="Comedor comunitario" />
              <label class="flex items-center gap-2">
                <input v-model="form.tiene_trabajo" type="checkbox" />
                ¿Tiene trabajo?
              </label>
              <input v-model="form.condicion_trabajo" class="input" placeholder="Condición de trabajo" />
              <input v-model="form.actividad_principal" class="input" placeholder="Actividad principal" />
              <input v-model="form.ingreso_mensual" type="number" class="input" placeholder="Ingreso mensual" />
              <label class="flex items-center gap-2">
                <input v-model="form.cobra_jubilacion" type="checkbox" />
                ¿Cobra jubilación?
              </label>
              <label class="flex items-center gap-2">
                <input v-model="form.cobra_pension" type="checkbox" />
                ¿Cobra pensión?
              </label>
              <input v-model="form.tipo_pensión" class="input" placeholder="Tipo pensión" />
              <label class="flex items-center gap-2">
                <input v-model="form.paga_alquiler" type="checkbox" />
                ¿Paga alquiler?
              </label>
              <input v-model="form.monto_alquiler" type="number" class="input" placeholder="Monto alquiler" />
              <label class="flex items-center gap-2">
                <input v-model="form.situación_calle" type="checkbox" />
                ¿Situación de calle?
              </label>
              <input v-model="form.fecha_inicio_situacion_calle" type="date" class="input" placeholder="Fecha inicio situación de calle" required />
              <input v-model="form.tipo_habitat" class="input" placeholder="Tipo hábitat" />
              <label class="flex items-center gap-2">
                <input v-model="form.tiene_certificado_renabap" type="checkbox" />
                ¿Tiene certificado RENABAP?
              </label>
              <input v-model="form.certificado_renabap" type="number" class="input" placeholder="Certificado RENABAP" />
              <input v-model="form.tipo_vivienda" class="input" placeholder="Tipo vivienda" />
              <input v-model="form.regimen_tenencia" class="input" placeholder="Régimen tenencia" />
              <label class="flex items-center gap-2">
                <input v-model="form.tiene_baño" type="checkbox" />
                ¿Tiene baño?
              </label>
              <label class="flex items-center gap-2">
                <input v-model="form.vivienda_se_inunda" type="checkbox" />
                ¿Vivienda se inunda?
              </label>
              <label class="flex items-center gap-2">
                <input v-model="form.acceso_agua" type="checkbox" />
                ¿Acceso a agua?
              </label>
              <label class="flex items-center gap-2">
                <input v-model="form.acceso_electricidad" type="checkbox" />
                ¿Acceso a electricidad?
              </label>
              <label class="flex items-center gap-2">
                <input v-model="form.acceso_cloacas" type="checkbox" />
                ¿Acceso a cloacas?
              </label>
              <label class="flex items-center gap-2">
                <input v-model="form.acceso_gas" type="checkbox" />
                ¿Acceso a gas?
              </label>
              <label class="flex items-center gap-2">
                <input v-model="form.familiar_acude_actividades_municipales" type="checkboxdi" />
                ¿Familiar acude a actividades municipales?
              </label>
              <input v-model="form.otro_servicio" class="input" placeholder="Otro servicio" />
            </div>
          </div>
          <div class="flex justify-center mt-4">
            <button type="submit" class="bg-indigo-500 text-white p-2 rounded">Inscribir</button>
          </div>
        </form>

    </div>


    <div class="text"></div>
    <vue-qrcode :value="jsonString" :size="200" v-if="isVisible"></vue-qrcode>
  </div>
</template>

<style scoped>
</style>