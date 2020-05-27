<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <component
      :is="currentComponent"
      :manifest-data="currentManifestData"
      @changeComponent="changeCurrentComponent"
    />
  </v-container>
</template>
<script>
  import ManifestDetail from '@/views/motorpark/park/ManifestDetail.vue'
  import ManifestForm from '@/views/motorpark/park/ManifestForm.vue'
  import ManifestView from '@/views/motorpark/park/ManifestView.vue'
  export default {
    name: 'Vehicle',
    components: {
      ManifestDetail,
      ManifestForm,
      ManifestView,
    },
    data () {
      return {
        currentComponent: 'ManifestView',
        currentManifestData: null,
      }
    },
    methods: {
      changeCurrentComponent (event) {
        this.currentManifestData = event.data
        this.currentComponent = event.component
      },
    },
  }
</script>
