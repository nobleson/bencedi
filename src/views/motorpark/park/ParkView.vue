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
        @click.native="$emit('changeComponent',{component: 'ParkForm', data: null})"
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        Add Park
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
        parks: [],
        columns: [
          {
            label: 'Park Name',
            field: 'name',
          },
          {
            label: 'Type',
            field: 'type',
          },
          {
            label: 'LG Area',
            field: 'localGovernment',
          },
          {
            label: 'Chairman',
            field: 'parkChairman',
          },
          {
            label: 'Phone Number',
            field: 'phoneNumber',
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
        if (this.parks) {
          for (var i = 0; i < this.parks.length; i++) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.parks[i].btn = '<button  class="primary" style="color: #ffffff;">Manage</button>'
          }
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.rows = this.parks
        }
        return this.rows
      },
    },
    beforeMount () {
      this.fetchParks()
    },
    methods: {
      mySearchFn (row, col, cellValue, searchTerm) {
        return cellValue === 'name'
      },
      fetchParks () {
        const self = this
        this.axios.get(this.baseUrl + '/api/park')
          .then(response => {
            // JSON responses are automatically parsed.
            self.parks = response.data
            return self.parks
          })
          .catch(e => {
            self.errors.push(e)
          })
      },
      onCellClick (params) {
        this.$emit('changeComponent', { component: 'ParkDetail', data: params.row })
        // params.row - row object
        // params.column - column object
        // params.rowIndex - index of this row on the current page.
        // params.event - click event
      },
    },
  }
</script>
