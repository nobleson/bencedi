<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <!--     <component
      :is="currentComponent"
      :manifest-data="currentManifestData"
      @changeComponent="changeCurrentComponent"
    /> -->
  </v-container>
</template>
<script>

  export default {
    name: 'Vehicle',
    components: {

    },

    data () {
      return {

      }
    },
    methods: {
        init () {
        const uri = UserAgent.makeURI("sip:alice@example.com");
        if (!uri) {
        throw new Error("Failed to create URI");
        }
        const userAgentOptions: UserAgentOptions = {
        uri,
        /* ... */
        };
        const userAgent = new UserAgent(userAgentOptions);

        },
    },
  }
</script>
