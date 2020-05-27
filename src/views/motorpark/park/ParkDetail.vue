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
        @click.native="$emit('changeComponent',{component: 'ParkView', data: null})"
      >
        <v-icon left>
          mdi-file-eye
        </v-icon>
        View Parks
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
              Edit Park
            </div>

            <div class="subtitle-1 font-weight-light">
              Complete park profile
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
                    v-model="parkData.name"
                    label="Park name"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="parkData.type"
                    class="purple-input"
                    label="Type"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="parkData.localGovernment"
                    label="LG Area"
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
                    Update Park
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
              Park Chairman
            </h6>

            <h4 class="display-2 font-weight-light mb-3 black--text">
              {{ parkData.parkChairman }}
            </h4>

            <p class="font-weight-light grey--text">
              {{ parkData.phoneNumber }}
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
    props: ['parkData'],
    data () {
      return {

      }
    },
  }
</script>
