<template>
    <v-container fluid>
        <v-layout>
            <expandable
                    :mapping="mappingTrapp"
                    :value="mappingTrapp.xsd.PROCEDURE"/>
        </v-layout>
    </v-container>
</template>

<script>
import mappingTrapp from '../../assets/trapp'
export default {
  data () {
    return {
      mappingTrapp
    }
  }
}
</script>

<style scoped></style>
