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
        @click.native="$emit('changeComponent',{component: 'ParkView', data: null})"
      >
        <v-icon left>
          mdi-file-eye
        </v-icon>
        View Parks
      </v-btn>
    </div>
    <base-material-card
      icon="mdi-account-plus"
      title="New Form"
      class="px-5 py-3"
    >
      <form>
        <v-text-field
          v-model="name"
          :error-messages="nameErrors"
          label="Park Name"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        />
        <v-select
          v-model="type"
          :items="parkTypes"
          :error-messages="selectParkTypeErrors"
          label="Park Type"
          required
          @change="$v.type.$touch()"
          @blur="$v.type.$touch()"
        />
        <v-select
          v-model="localGovernment"
          :items="lgSelect"
          :error-messages="selectLGAreaErrors"
          label="Local Government"
          required
          @change="$v.localGovernment.$touch()"
          @blur="$v.localGovernment.$touch()"
        />
        <v-text-field
          v-model="coordinates"
          :error-messages="parkCoordinateErrors"
          label="Park Coordinates"
          required
          @input="$v.coordinates.$touch()"
          @blur="$v.coordinates.$touch()"
        />
        <v-text-field
          v-model="parkChairman"
          :error-messages="parkChairmanErrors"
          label="Park Chairman"
          required
          @input="$v.parkChairman.$touch()"
          @blur="$v.parkChairman.$touch()"
        />
        <v-text-field
          v-model="phoneNumber"
          :error-messages="parkPhonenumberErrors"
          :counter="11"
          label="Phone Number"
          required
          @input="$v.phoneNumber.$touch()"
          @blur="$v.phoneNumber.$touch()"
        />
        <v-btn
          class="mr-4"
          color="primary"
          :disabled="enable"
          @click="submit"
        >
          submit&nbsp;
          <b-spinner
            v-show="isFormSubmit"
            label="Loading..."
          />
        </v-btn>
        <v-btn @click="clear">
          clear
        </v-btn>
      </form>
      <base-material-snackbar
        v-model="snackbar"
        :type="color"
        v-bind="{
          [parsedDirection[0]]: true,
          [parsedDirection[1]]: true
        }"
      >
        <span class="font-weight-bold">&nbsp;{{ message }}&nbsp;&nbsp;</span>
        {{ messageDesc }}
      </base-material-snackbar>
    </base-material-card>
  </v-container>
</template>
<script>
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],
    validations: {
      name: { required },
      type: { required },
      localGovernment: { required },
      coordinates: { required },
      parkChairman: { required },
      phoneNumber: { required },
      select: { required },
    },

    data: () => ({
      snackbar: false,
      enable: false,
      isFormSubmit: false,
      message: '',
      messageDesc: '',
      color: 'success',
      direction: 'top center',
      parkTypes: [
        'Motor Park',
        'Taxi Park',
        'Motorcycle Park',
        'Heavy Duty Park',
      ],
      lgSelect: [
        'Ado',
        'Agatu',
        'Apa',
        'Buruku',
        'Gboko',
        'Guma',
        'Gwer West',
        'Gwer East',
        'Katsina-Ala',
        'Konshisha',
        'Kwande',
        'Logo',
        'Makurdi',
        'Obi',
        'Ogbadibo',
        'Ohimini',
        'Oju',
        'Okpokwu',
        'Oturkpo',
        'Takar',
        'Ukum',
        'Ushongo',
        'Vandeikya',
      ],
      name: '',
      type: null,
      localGovernment: null,
      coordinates: '',
      parkChairman: '',
      phoneNumber: '',
      submitStatus: '',
    }),

    computed: {
      parsedDirection () {
        return this.direction.split(' ')
      },
      selectParkTypeErrors () {
        const errors = []
        if (!this.$v.type.$dirty) return errors
        !this.$v.type.required && errors.push('Park type is required')
        return errors
      },
      selectLGAreaErrors () {
        const errors = []
        if (!this.$v.localGovernment.$dirty) return errors
        !this.$v.localGovernment.required && errors.push('Park local government is required')
        return errors
      },

      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.required && errors.push('Park name is required.')
        return errors
      },
      parkCoordinateErrors () {
        const errors = []
        if (!this.$v.coordinates.$dirty) return errors
        !this.$v.coordinates.required && errors.push('Park location coordinates are required.')
        return errors
      },
      parkChairmanErrors () {
        const errors = []
        if (!this.$v.parkChairman.$dirty) return errors
        !this.$v.parkChairman.required && errors.push('Park chairman name is required.')
        return errors
      },
      parkPhonenumberErrors () {
        const errors = []
        if (!this.$v.phoneNumber.$dirty) return errors
        !this.$v.phoneNumber.required && errors.push('Park chairman phone number are required.')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
        const form = {
          name: this.name,
          type: this.type,
          localGovernment: this.localGovernment,
          coordinates: this.coordinates,
          parkChairman: this.parkChairman,
          phoneNumber: this.phoneNumber,
        }
        if (this.$v.name.$pending || this.$v.name.$error) return
        if (this.$v.type.$pending || this.$v.type.$error) return
        if (this.$v.localGovernment.$pending || this.$v.localGovernment.$error) return
        if (this.$v.coordinates.$pending || this.$v.coordinates.$error) return
        if (this.$v.parkChairman.$pending || this.$v.parkChairman.$error) return
        if (this.$v.phoneNumber.$pending || this.$v.phoneNumber.$error) return
        this.enable = true
        this.isFormSubmit = true
        this.createPark(form)
      },
      createPark (parkData) {
        const self = this
        this.axios.post(this.baseUrl + '/api/park/create', parkData)
          .then(response => {
            if (response.data) {
              self.snackbar = true
              self.color = 'success'
              self.messageDesc = 'Park created successfully'
              self.message = 'GOT IT'
              self.enable = false
              self.isFormSubmit = false
              self.clear()
              // console.log('FORM', JSON.stringify(response.data))
            }
          })
          .catch(e => {
            self.snackbar = true
            self.color = 'error'
            self.messageDesc = 'Park fail to created. Try it again'
            self.message = 'Oops! Error'
            self.enable = false
            self.isFormSubmit = false
            // self.errors.push(e)
          })
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.type = null
        this.localGovernment = null
        this.coordinates = ''
        this.parkChairman = ''
        this.phoneNumber = ''
      },
    },
  }
</script>
