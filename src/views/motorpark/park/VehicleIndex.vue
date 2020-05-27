<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <component
      :is="currentComponent"
      :vehicle-data="currentVehicleData"
      @changeComponent="changeCurrentComponent"
    />
  </v-container>
</template>
<script>
  import VehicleDetail from '@/views/motorpark/park/VehicleDetail.vue'
  import VehicleForm from '@/views/motorpark/park/VehicleForm.vue'
  import VehicleView from '@/views/motorpark/park/VehicleView.vue'
  export default {
    name: 'Vehicle',
    components: {
      VehicleDetail,
      VehicleForm,
      VehicleView,
    },
    data () {
      return {
        currentComponent: 'VehicleView',
        currentVehicleData: null,
      }
    },
    methods: {
      changeCurrentComponent (event) {
        this.currentVehicleData = event.data
        this.currentComponent = event.component
      },
    },
  }
</script>
