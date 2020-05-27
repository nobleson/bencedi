<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <component
      :is="currentComponent"
      :park-data="currentParkData"
      @changeComponent="changeCurrentComponent"
    />
  </v-container>
</template>
<script>
  import ParkDetail from '@/views/motorpark/park/ParkDetail.vue'
  import ParkForm from '@/views/motorpark/park/ParkForm.vue'
  import ParkView from '@/views/motorpark/park/ParkView.vue'
  export default {
    name: 'Park',
    components: {
      ParkDetail,
      ParkForm,
      ParkView,
    },
    data () {
      return {
        currentComponent: 'ParkView',
        currentParkData: null,
      }
    },
    methods: {
      changeCurrentComponent (event) {
        this.currentParkData = event.data
        this.currentComponent = event.component
      },
    },
  }
</script>
