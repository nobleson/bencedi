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
        @click.native="$emit('changeComponent',{component: 'DriverForm', data: null})"
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        Add Driver
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
        drivers: [],
        columns: [
          {
            label: 'Surname',
            field: 'surname',
          },
          {
            label: 'Name',
            field: 'fisrtName',
          },
          {
            label: 'Middle Name',
            field: 'midleName',
          },
          {
            label: 'Gender',
            field: 'gender',
          },
          {
            label: 'Phone Number',
            field: 'phoneNumber',
          },
          {
            label: 'Contact Address',
            field: 'contactAddress',
          },
          {
            label: 'Driver License Number',
            field: 'driversLicenseNumber',
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
        if (this.drivers) {
          for (var i = 0; i < this.drivers.length; i++) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.drivers[i].btn = '<button  class="primary" style="color: #ffffff;">Manage</button>'
          }
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.rows = this.drivers
        }
        return this.rows
      },
    },
    beforeMount () {
      this.fetchDriver()
    },
    methods: {
      mySearchFn (row, col, cellValue, searchTerm) {
        return cellValue === 'name'
      },
      fetchDriver () {
        const self = this
        this.axios.get(this.baseUrl + '/api/driver')
          .then(response => {
            // JSON responses are automatically parsed.
            self.drivers = response.data
            return self.drivers
          })
          .catch(e => {
            self.errors.push(e)
          })
      },
      onCellClick (params) {
        this.$emit('changeComponent', { component: 'DriverDetail', data: params.row })
        // params.row - row object
        // params.column - column object
        // params.rowIndex - index of this row on the current page.
        // params.event - click event
      },
    },
  }
</script>
