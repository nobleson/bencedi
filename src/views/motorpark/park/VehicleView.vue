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
        @click.native="$emit('changeComponent',{component: 'VehicleForm', data: null})"
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        Add Vehicle
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
        vehicles: [],
        columns: [
          {
            label: 'Vehicle Make',
            field: 'model',
          },
          {
            label: 'Type',
            field: 'type',
          },
          {
            label: 'Reg. Number',
            field: 'plateNumber',
          },
          {
            label: 'Owner',
            field: 'vehicleOwner',
          },
          {
            label: 'Driver',
            field: 'vehicleDriver',
          },
          {
            label: 'Driver Phone No.',
            field: 'driverPhoneNumber',
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
        if (this.vehicles) {
          for (var i = 0; i < this.vehicles.length; i++) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.vehicles[i].btn = '<button  class="primary" style="color: #ffffff;">Manage</button>'
          }
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.rows = this.vehicles
        }
        return this.rows
      },
    },
    beforeMount () {
      this.fetchParkVehicles()
    },
    methods: {
      mySearchFn (row, col, cellValue, searchTerm) {
        return cellValue === 'name'
      },
      fetchParkVehicles () {
        const self = this
        this.axios.get(this.baseUrl + '/api/vehicle')
          .then(response => {
            // JSON responses are automatically parsed.
            self.vehicles = response.data
            return self.vehicles
          })
          .catch(e => {
            self.errors.push(e)
          })
      },
      onCellClick (params) {
        this.$emit('changeComponent', { component: 'VehicleDetail', data: params.row })
        // params.row - row object
        // params.column - column object
        // params.rowIndex - index of this row on the current page.
        // params.event - click event
      },
    },
  }
</script>
