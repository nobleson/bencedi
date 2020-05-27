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
        @click.native="$emit('changeComponent',{component: 'VehicleView', data: null})"
      >
        <v-icon left>
          mdi-file-eye
        </v-icon>
        View Vehicles
      </v-btn>
    </div>
    <base-material-card
      icon="mdi-account-plus"
      title="New Form"
      class="px-5 py-3"
    >
      <form>
        <v-text-field
          v-model="model"
          :error-messages="modelErrors"
          label="Vehicle Make"
          required
          @input="$v.model.$touch()"
          @blur="$v.model.$touch()"
        />
        <v-select
          v-model="type"
          :items="vehicleTypes"
          :error-messages="selectVehicleTypeErrors"
          label="Vehicle Type"
          required
          @change="$v.type.$touch()"
          @blur="$v.type.$touch()"
        />
        <v-select
          v-model="color"
          :items="colorTypes"
          :error-messages="selectColorErrors"
          label="Color"
          required
          @change="$v.color.$touch()"
          @blur="$v.color.$touch()"
        />
        <v-text-field
          v-model="engineNumber"
          :error-messages="engineNumberErrors"
          label="Engine Number"
          required
          @input="$v.engineNumber.$touch()"
          @blur="$v.engineNumber.$touch()"
        />
        <v-text-field
          v-model="chassisNumber"
          :error-messages="chassisNumberErrors"
          label="Chassis Number"
          required
          @input="$v.chassisNumber.$touch()"
          @blur="$v.chassisNumber.$touch()"
        />
        <v-text-field
          v-model="plateNumber"
          :error-messages="plateNumberErrors"
          label="Registration Number"
          required
          @input="$v.plateNumber.$touch()"
          @blur="$v.plateNumber.$touch()"
        />
        <v-text-field
          v-model="vehicleOwner"
          :error-messages="ownerErrors"
          label="Vehicle Owner Name"
          required
          @input="$v.vehicleOwner.$touch()"
          @blur="$v.vehicleOwner.$touch()"
        />
        <v-text-field
          v-model="ownerContactNumber"
          :error-messages="ownerPhoneNumberErrors"
          label="Owner Phone Number"
          required
          @input="$v.ownerContactNumber.$touch()"
          @blur="$v.ownerContactNumber.$touch()"
        />
        <v-text-field
          v-model="ownerContactAddress"
          :error-messages="ownerAddressErrors"
          label="Owner Contact Address"
          required
          @input="$v.ownerContactAddress.$touch()"
          @blur="$v.ownerContactAddress.$touch()"
        />
        <v-text-field
          v-model="vehicleDriver"
          :error-messages="driverErrors"
          label="Driver Name"
          required
          @input="$v.vehicleDriver.$touch()"
          @blur="$v.vehicleDriver.$touch()"
        />
        <v-text-field
          v-model="driversLicenseNumber"
          :error-messages="driverLicenseNumberErrors"
          label="Driver's License Number"
          required
          @input="$v.driversLicenseNumber.$touch()"
          @blur="$v.driversLicenseNumber.$touch()"
        />
        <v-text-field
          v-model="driverPhoneNumber"
          :error-messages="driverPhoneNumberErrors"
          label="Driver's Phone Number"
          required
          @input="$v.driverPhoneNumber.$touch()"
          @blur="$v.driverPhoneNumber.$touch()"
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
        :type="variant"
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
      engineNumber: { required },
      model: { required },
      type: { required },
      color: { required },
      plateNumber: { required },
      vehiclePark: { required },
      driverPhoneNumber: { required },
      driversLicenseNumber: { required },
      vehicleDriver: { required },
      ownerContactNumber: { required },
      ownerContactAddress: { required },
      vehicleOwner: { required },
      chassisNumber: { required },
    },

    data: () => ({
      snackbar: false,
      enable: false,
      isFormSubmit: false,
      message: '',
      messageDesc: '',
      variant: 'success',
      direction: 'top center',
      vehicleTypes: [
        'Car',
        'Taxi',
        'Bus',
        'Truck',
      ],
      colorTypes: [
        'Red',
        'White',
        'Gray',
        'Black',
        'Green',
        'Blue',
        'Yellow',
        'Other',
      ],
      model: '',
      type: '',
      color: '',
      engineNumber: '',
      chassisNumber: '',
      plateNumber: '',
      vehiclePark: '',
      driverPhoneNumber: '',
      driversLicenseNumber: '',
      vehicleDriver: '',
      vehicleOwner: '',
      ownerContactNumber: '',
      ownerContactAddress: '',
    }),

    computed: {
      parsedDirection () {
        return this.direction.split(' ')
      },
      selectVehicleTypeErrors () {
        const errors = []
        if (!this.$v.type.$dirty) return errors
        !this.$v.type.required && errors.push('Vehicle type is required')
        return errors
      },
      modelErrors () {
        const errors = []
        if (!this.$v.model.$dirty) return errors
        !this.$v.model.required && errors.push('Vehicle make is required')
        return errors
      },
      selectColorErrors () {
        const errors = []
        if (!this.$v.color.$dirty) return errors
        !this.$v.color.required && errors.push('Vehicle color is required')
        return errors
      },

      engineNumberErrors () {
        const errors = []
        if (!this.$v.engineNumber.$dirty) return errors
        !this.$v.engineNumber.required && errors.push('Engine number is required.')
        return errors
      },
      chassisNumberErrors () {
        const errors = []
        if (!this.$v.chassisNumber.$dirty) return errors
        !this.$v.chassisNumber.required && errors.push('Chassis number is required.')
        return errors
      },
      plateNumberErrors () {
        const errors = []
        if (!this.$v.plateNumber.$dirty) return errors
        !this.$v.plateNumber.required && errors.push('Registration number is required.')
        return errors
      },
      ownerErrors () {
        const errors = []
        if (!this.$v.vehicleOwner.$dirty) return errors
        !this.$v.vehicleOwner.required && errors.push('Vehicle owner name is required.')
        return errors
      },
      ownerPhoneNumberErrors () {
        const errors = []
        if (!this.$v.ownerContactNumber.$dirty) return errors
        !this.$v.ownerContactNumber.required && errors.push('Vehicle owner phone number is required.')
        return errors
      },
      ownerAddressErrors () {
        const errors = []
        if (!this.$v.ownerContactAddress.$dirty) return errors
        !this.$v.ownerContactAddress.required && errors.push('Vehicle owner address is required.')
        return errors
      },
      driverErrors () {
        const errors = []
        if (!this.$v.vehicleDriver.$dirty) return errors
        !this.$v.vehicleDriver.required && errors.push('Driver name is required.')
        return errors
      },
      driverLicenseNumberErrors () {
        const errors = []
        if (!this.$v.driversLicenseNumber.$dirty) return errors
        !this.$v.driversLicenseNumber.required && errors.push('Driver license number is required.')
        return errors
      },
      driverPhoneNumberErrors () {
        const errors = []
        if (!this.$v.driverPhoneNumber.$dirty) return errors
        !this.$v.driverPhoneNumber.required && errors.push('Driver phone number is required.')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
        const form = {
          model: this.model,
          type: this.type,
          color: this.color,
          engineNumber: this.engineNumber,
          chassisNumber: this.chassisNumber,
          plateNumber: this.plateNumber,
          vehiclePark: '5eaff6a71600a817405d051c',
          driverPhoneNumber: this.driverPhoneNumber,
          driversLicenseNumber: this.driversLicenseNumber,
          vehicleDriver: this.vehicleDriver,
          vehicleOwner: this.vehicleOwner,
          ownerContactNumber: this.ownerContactNumber,
          ownerContactAddress: this.ownerContactAddress,
        }
        if (this.$v.model.$pending || this.$v.model.$error) return
        if (this.$v.type.$pending || this.$v.type.$error) return
        if (this.$v.color.$pending || this.$v.color.$error) return
        if (this.$v.engineNumber.$pending || this.$v.engineNumber.$error) return
        if (this.$v.chassisNumber.$pending || this.$v.chassisNumber.$error) return
        if (this.$v.plateNumber.$pending || this.$v.plateNumber.$error) return
        if (this.$v.vehicleOwner.$pending || this.$v.vehicleOwner.$error) return
        if (this.$v.ownerContactNumber.$pending || this.$v.ownerContactNumber.$error) return
        if (this.$v.ownerContactAddress.$pending || this.$v.ownerContactAddress.$error) return
        if (this.$v.vehicleDriver.$pending || this.$v.vehicleDriver.$error) return
        if (this.$v.driverPhoneNumber.$pending || this.$v.driverPhoneNumber.$error) return
        if (this.$v.driversLicenseNumber.$pending || this.$v.driversLicenseNumber.$error) return

        this.enable = true
        this.isFormSubmit = true
        this.registerVehicle(form)
      },
      registerVehicle (vehicleData) {
        const self = this
        this.axios.post(this.baseUrl + '/api/vehicle/create', vehicleData)
          .then(response => {
            if (response.data) {
              self.snackbar = true
              self.variant = 'success'
              self.messageDesc = 'Vehicle registered successfully'
              self.message = 'GOT IT'
              self.enable = false
              self.isFormSubmit = false
              self.clear()
              console.log('FORM', JSON.stringify(response.data))
            }
          })
          .catch(e => {
            self.snackbar = true
            self.variant = 'error'
            self.messageDesc = 'Vehicle fail to register. Try it again'
            self.message = 'Oops! Error'
            self.enable = false
            self.isFormSubmit = false
            // self.errors.push(e)
          })
      },
      clear () {
        this.$v.$reset()
        this.model = ''
        this.type = ''
        this.color = ''
        this.engineNumber = ''
        this.chassisNumber = ''
        this.plateNumber = ''
        this.vehiclePark = ''
        this.driverPhoneNumber = ''
        this.driversLicenseNumber = ''
        this.vehicleDriver = ''
        this.vehicleOwner = ''
        this.ownerContactNumber = ''
        this.ownerContactAddress = ''
      },
    },
  }
</script>
