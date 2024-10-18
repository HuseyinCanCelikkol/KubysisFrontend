<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <img :src="kubysisLogo" width="100%" draggable="false" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import kubysisLogo from "@/assets/kubysisLight.png";
export default {
  name: "Dashboard",

  data(){
    return{
        kubysisLogo
    }
  }
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
