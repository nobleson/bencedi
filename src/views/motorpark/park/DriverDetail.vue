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
        @click.native="$emit('changeComponent',{component: 'DriverView', data: null})"
      >
        <v-icon left>
          mdi-file-eye
        </v-icon>
        View Drivers
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
              Edit Driver
            </div>

            <div class="subtitle-1 font-weight-light">
              Complete driver profile
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
                    v-model="driverData.surname"
                    label="Surname"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="driverData.fisrtName"
                    class="purple-input"
                    label="First Name"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="driverData.midleName"
                    label="Middle Name"
                    class="purple-input"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="driverData.gender"
                    label="Gender"
                    class="purple-input"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="driverData.phoneNumber"
                    label="Phone Number"
                    class="purple-input"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="driverData.contactAddress"
                    label="Contact Address"
                    class="purple-input"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="driverData.driversLicenseNumber"
                    label="Driver's License Number"
                    class="purple-input"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="driverData.dateCreated"
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
                    Update Driver
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
              {{ driverData.surname }} {{ driverData.fisrtName }} {{ driverData.midleName }}
            </h4>

            <p class="font-weight-light grey--text">
              {{ driverData.phoneNumber }}
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
    props: ['driverData'],
    data () {
      return {

      }
    },
  }
</script>
