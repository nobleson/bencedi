<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <div class="text-center">
      <v-btn
        class="ma-2"
        outlined
        color="primary"
        @click.native="$emit('changeComponent',{component: 'ManifestForm', data: null})"
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        Add Manifest
      </v-btn>
    </div>
    <base-material-card
      icon="mdi-clipboard-text"
      title="Record Grid"
      class="px-5 py-3"
    >
      <div>
        <vue-good-table
          :columns="columns"
          :rows="processDataTable"
          :search-options="{
            enabled: true
          }"
          :pagination-options="{
            enabled: true,
            mode: 'pages'
          }"
          @on-cell-click="onCellClick"
        />
      </div>
    </base-material-card>
  </v-container>
</template>
<script>
  export default {
    name: 'Park',
    data () {
      return {
        manifest: [],
        columns: [
          {
            label: 'Vehicle Make',
            field: 'vehicleMakeName',
          },
          {
            label: 'Type',
            field: 'type',
          },
          {
            label: 'Color',
            field: 'color',
          },
          {
            label: 'Registration No.',
            field: 'regNumber',
          },
          {
            label: 'Engine Number',
            field: 'engineNumber',
          },
          {
            label: 'Chassis No.',
            field: 'chassisNumber',
          },
          {
            label: 'Driver name.',
            field: 'driverName',
          },
          {
            label: 'Driver Address',
            field: 'chassisNumber',
          },
          {
            label: 'Driver license No.',
            field: 'driverLicenseNumber',
          },
          {
            label: 'Total Passanger',
            field: 'totalPassengers',
          },
          {
            label: 'Departure Park',
            field: 'departurePark',
          },
          {
            label: 'Departure Time',
            field: 'destinationPark',
          },
          {
            label: 'Arrival Time',
            field: 'departureTime',
          },
          {
            label: 'Action',
            field: 'btn',
            html: true,
          },
        ],
        rows: [],
        errors: [],
        dataSet: {
          name: '',
          type: '',
          localGovernment: '',
          parkChairman: '',
          phoneNumber: '',
        },
      }
    },
    computed: {
      processDataTable () {
        if (this.manifest) {
          for (var i = 0; i < this.manifest.length; i++) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.manifest[i].btn = '<button  class="primary" style="color: #ffffff;">Manage</button>'
          }
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.rows = this.manifest
        }
        return this.rows
      },
    },
    beforeMount () {
      this.fetchPassangersManifest()
    },
    methods: {
      mySearchFn (row, col, cellValue, searchTerm) {
        return cellValue === 'name'
      },
      fetchPassangersManifest () {
        const self = this
        this.axios.get(this.baseUrl + '/api/manifest')
          .then(response => {
            // JSON responses are automatically parsed.
            self.manifest = response.data
            return self.manifest
          })
          .catch(e => {
            self.errors.push(e)
          })
      },
      onCellClick (params) {
        this.$emit('changeComponent', { component: 'ManifestDetail', data: params.row })
        // params.row - row object
        // params.column - column object
        // params.rowIndex - index of this row on the current page.
        // params.event - click event
      },
    },
  }
</script>
