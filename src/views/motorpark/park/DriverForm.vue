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
        @click.native="$emit('changeComponent',{component: 'DriverView', data: null})"
      >
        <v-icon left>
          mdi-file-eye
        </v-icon>
        View Drivers
      </v-btn>
    </div>
    <base-material-card
      icon="mdi-account-plus"
      title="New Form"
      class="px-5 py-3"
    >
      <form>
        <v-text-field
          v-model="surname"
          :error-messages="surnameErrors"
          label="Surname"
          required
          @input="$v.surname.$touch()"
          @blur="$v.surname.$touch()"
        />
        <v-text-field
          v-model="fisrtName"
          :error-messages="nameErrors"
          label="Name"
          required
          @change="$v.fisrtName.$touch()"
          @blur="$v.fisrtName.$touch()"
        />
        <v-text-field
          v-model="midleName"
          label="Middle Name"
          required
          @change="$v.midleName.$touch()"
          @blur="$v.midleName.$touch()"
        />
        <v-select
          v-model="gender"
          :items="selectGender"
          :error-messages="genderErrors"
          label="Gender"
          required
          @change="$v.gender.$touch()"
          @blur="$v.gender.$touch()"
        />
        <v-text-field
          v-model="phoneNumber"
          :error-messages="phoneNumberErrors"
          label="Phone number"
          required
          @input="$v.phoneNumber.$touch()"
          @blur="$v.phoneNumber.$touch()"
        />
        <v-text-field
          v-model="contactAddress"
          :error-messages="contactAddressErrors"
          label="Contact Address"
          required
          @input="$v.contactAddress.$touch()"
          @blur="$v.contactAddress.$touch()"
        />
        <v-text-field
          v-model="driversLicenseNumber"
          :error-messages="licenseNumberErrors"
          :counter="11"
          label="Driver's License Number"
          required
          @input="$v.driversLicenseNumber.$touch()"
          @blur="$v.driversLicenseNumber.$touch()"
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
      surname: { required },
      fisrtName: { required },
      midleName: { required },
      gender: { required },
      phoneNumber: { required },
      contactAddress: { required },
      driversLicenseNumber: { required },
      driverPark: { required },
    },

    data: () => ({
      snackbar: false,
      enable: false,
      isFormSubmit: false,
      message: '',
      messageDesc: '',
      color: 'success',
      direction: 'top center',
      selectGender: [
        'Male',
        'Female',
      ],
      surname: '',
      fisrtName: '',
      midleName: '',
      gender: null,
      phoneNumber: '',
      contactAddress: '',
      driversLicenseNumber: '',
      driverPark: '',
    }),

    computed: {
      parsedDirection () {
        return this.direction.split(' ')
      },
      surnameErrors () {
        const errors = []
        if (!this.$v.surname.$dirty) return errors
        !this.$v.surname.required && errors.push('Surname is required')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.fisrtName.$dirty) return errors
        !this.$v.fisrtName.required && errors.push('Name is required')
        return errors
      },

      genderErrors () {
        const errors = []
        if (!this.$v.gender.$dirty) return errors
        !this.$v.gender.required && errors.push('Gender is required.')
        return errors
      },
      phoneNumberErrors () {
        const errors = []
        if (!this.$v.phoneNumber.$dirty) return errors
        !this.$v.phoneNumber.required && errors.push('Phone number is required.')
        return errors
      },
      contactAddressErrors () {
        const errors = []
        if (!this.$v.contactAddress.$dirty) return errors
        !this.$v.contactAddress.required && errors.push('Contact address is required.')
        return errors
      },
      licenseNumberErrors () {
        const errors = []
        if (!this.$v.driversLicenseNumber.$dirty) return errors
        !this.$v.driversLicenseNumber.required && errors.push('Driver license number is required.')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
        const form = {
          surname: this.surname,
          fisrtName: this.fisrtName,
          midleName: this.midleName,
          gender: this.gender,
          phoneNumber: this.phoneNumber,
          contactAddress: this.contactAddress,
          driversLicenseNumber: this.driversLicenseNumber,
          driverPark: this.driverPark,
        }
        if (this.$v.surname.$pending || this.$v.surname.$error) return
        if (this.$v.fisrtName.$pending || this.$v.fisrtName.$error) return
        if (this.$v.gender.$pending || this.$v.gender.$error) return
        if (this.$v.phoneNumber.$pending || this.$v.phoneNumber.$error) return
        if (this.$v.contactAddress.$pending || this.$v.contactAddress.$error) return
        if (this.$v.driversLicenseNumber.$pending || this.$v.driversLicenseNumber.$error) return
        this.enable = true
        this.isFormSubmit = true
        this.createPark(form)
      },
      createPark (parkData) {
        const self = this
        this.axios.post(this.baseUrl + '/api/driver/create', parkData)
          .then(response => {
            if (response.data) {
              self.snackbar = true
              self.color = 'success'
              self.messageDesc = 'Driver registered successfully'
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
            self.messageDesc = 'Driver fail to register. Try it again'
            self.message = 'Oops! Error'
            self.enable = false
            self.isFormSubmit = false
            // self.errors.push(e)
          })
      },
      clear () {
        this.$v.$reset()
        this.surname = ''
        this.fisrtName = ''
        this.midleName = ''
        this.gender = null
        this.phoneNumber = ''
        this.contactAddress = ''
        this.driversLicenseNumber = ''
        this.driverPark = ''
      },
    },
  }
</script>
