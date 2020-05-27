<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <component
      :is="currentComponent"
      :driver-data="currentDriverData"
      @changeComponent="changeCurrentComponent"
    />
  </v-container>
</template>
<script>
  import DriverForm from '@/views/motorpark/park/DriverForm.vue'
  import DriverDetail from '@/views/motorpark/park/DriverDetail.vue'
  import DriverView from '@/views/motorpark/park/DriverView.vue'
  export default {
    name: 'Driver',
    components: {
      DriverForm,
      DriverDetail,
      DriverView,
    },
    data () {
      return {
        currentComponent: 'DriverView',
        currentDriverData: null,
      }
    },
    methods: {
      changeCurrentComponent (event) {
        this.currentDriverData = event.data
        this.currentComponent = event.component
      },
    },
  }
</script>
