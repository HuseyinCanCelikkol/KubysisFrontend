<template>
  <v-app>
    <v-hover v-slot:default="{ isHovering, props }">
      <v-navigation-drawer
        v-bind="props"
        v-model="drawer"
        app
        rail
        permanent
        expand-on-hover
      >
        <v-list>
          <v-list-item>
            <!-- Fare üzerinde değilken kubysisIcon göster -->
            <v-img
              :src="kubysisIcon"
              width="100%"
              max-height="50px"
              min-height="50px"
              v-if="!isHovering"
            ></v-img>

            <!-- Fare üzerindeyken veya drawer açıldığında kubysisLogo göster -->
            <v-img
              :src="kubysisLogo"
              width="50%"
              max-height="50px"
              min-height="50px"
              v-if="isHovering"
            ></v-img>
          </v-list-item>
        </v-list>

        <v-list>
          <v-list-item
            :subtitle="userInfo.email"
            :title="userInfo.name"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav>
          <v-list-item
            prepend-icon="mdi-home"
            title="Ana Sayfa"
            @click="navigateTo('/Dashboard')"
          ></v-list-item>
          <v-divider></v-divider>
          <v-list-item
            prepend-icon="mdi-folder"
            title="Bağış Yönetimi"
            @click="navigateTo('/Donation/DonationList')"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-multiple"
            title="Shared with me"
            @click="navigateTo('shared')"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-star"
            title="Starred"
            @click="navigateTo('starred')"
          ></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <template v-slot:append>
          <div>
            <v-divider></v-divider>
            <v-list nav>
              <v-list-item
                prepend-icon="mdi-logout"
                title="Çıkış yap"
                @click="navigateTo('/Login')"
              ></v-list-item>
            </v-list>
          </div>
        </template>
      </v-navigation-drawer>
    </v-hover>
    <v-main>
    <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import kubysisLogo from "@/assets/kubysislight.png";
import kubysisIcon from "@/assets/kubysis-icon.svg";

export default {
  name: "Sidebar",
  data() {
    return {
      kubysisLogo,
      kubysisIcon,
      drawer: true,
      userInfo: this.$apiservice.getUserInfo(),
    };
  },
  methods: {
    navigateTo(routeName) {
      if (this.$route.path !== routeName) {
        this.$router.push({ name: routeName }); // Route'u path ile yönlendiriyoruz
      }
      this.drawer = true; // Sidebar açık kalsın
    },
    logHover(isHovering) {
      console.log("isHovering:", isHovering);
      return true; // Bu, template'in doğru çalışması için gereklidir
    },
  },
};
</script>

<style scoped>
/* Stil düzenlemeleri */
</style>
