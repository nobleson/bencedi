<template>
  <v-container
    id="user-profile"
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
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Edit Vehhicle
            </div>

            <div class="subtitle-1 font-weight-light">
              Complete vehicle profile
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="vehicleData.model"
                    label="Vehicle Make"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="vehicleData.type"
                    class="purple-input"
                    label="Type"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="vehicleData.color"
                    label="Color"
                    class="purple-input"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="vehicleData.plateNumber"
                    label="Registration No."
                    class="purple-input"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="vehicleData.engineNumber"
                    label="Engine No."
                    class="purple-input"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="vehicleData.chassisNumber"
                    label="Chassis No."
                    class="purple-input"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="vehicleData.vehicleOwner"
                    label="Vehicle Owner"
                    class="purple-input"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="vehicleData.ownerContactAddress"
                    label="Owner Address"
                    class="purple-input"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="vehicleData.ownerContactNumber"
                    label="Owner Phone No."
                    class="purple-input"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="vehicleData.vehicleDriver"
                    label="Driver"
                    class="purple-input"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="vehicleData.driversLicenseNumber"
                    label="Driver's License No."
                    class="purple-input"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="vehicleData.driverPhoneNumber"
                    label="Driver's Phone No."
                    class="purple-input"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="vehicleData.vehiclePark"
                    label="Vehicle Park"
                    class="purple-input"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="vehicleData.dateCreated"
                    label="Date Registered"
                    class="purple-input"
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                  >
                    Update Vehicle
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <base-material-card
          class="v-card-profile"
          avatar="../assets/avatar.jpg"
        >
          <v-card-text class="text-center">
            <h6 class="display-1 mb-1 grey--text">
              Driver
            </h6>

            <h4 class="display-2 font-weight-light mb-3 black--text">
              {{ vehicleData.vehicleDriver }}
            </h4>

            <p class="font-weight-light grey--text">
              {{ vehicleData.driverPhoneNumber }}
            </p>

            <v-btn
              color="success"
              rounded
              class="mr-0"
            >
              Edit Photo
            </v-btn>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    props: ['vehicleData'],
    data () {
      return {

      }
    },
  }
</script>
