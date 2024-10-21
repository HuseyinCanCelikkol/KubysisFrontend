<template>
  <v-app>
      <SidebarComponent />
  </v-app>
</template>

<script>
import SidebarComponent from "@/components/Sidebar.vue";

export default {
  components: {
    SidebarComponent,
  },
  // data() {
  //   return {
  //     isLoginRoute: false, // Flag to control sidebar visibility
  //   };
  // },
  // created() {
  //   this.isLoginRoute = this.$route.path === "/";
  // },
  // watch: {
  //   // Watch for route changes to update the flag
  //   $route(to) {
  //     this.isLoginRoute = to.name === "/";
  //   },
  // },
};
</script>
