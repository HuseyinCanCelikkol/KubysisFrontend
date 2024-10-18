<template>
  <v-container class="login-container" fluid>
    <v-row justify="center" style="margin-top: 170px; margin-bottom: -200px">
      <img :src="kubysisLogo" width="25%" draggable="false" />
    </v-row>
    <v-row justify="center" align="center" style="height: 100vh">
      <v-col cols="12" sm="8" md="4">
        <v-card elevation="4">
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="email"
                label="E-Posta"
                type="email"
                clearable
                outlined
                :rules="[rules.required, rules.email]"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Şifre"
                type="password"
                clearable
                outlined
                :rules="[rules.required]"
                required
              ></v-text-field>
              <v-text-field
                v-model="licenseKey"
                label="Lisans Anahtarı"
                type="password"
                clearable
                outlined
                :rules="[rules.required]"
                required
              ></v-text-field>
              <v-btn color="primary" @click="handleLogin" block
                >GİRİŞ YAP</v-btn
              >
            </v-form>
          </v-card-text>
          <v-card-actions> </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import kubysisLogo from "@/assets/kubysisLight.png";


import { useToast } from "vue-toastification";

export default {
  layout: 'loginLayout', 
  name: "LoginView",
  setup() {
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      kubysisLogo,
      email: "",
      password: "",
      licenseKey: "",
      errorMessage: "",
      rules: {
        required: (value) => !!value || "This field is required.",
        email: (value) => {
          const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
          return pattern.test(value) || "Invalid email.";
        },
      },
    };
  },
  methods: {
    async login() {
      try {
        // Giriş isteğini yap
        const response = await this.$apiservice.post("account/login", {
          email: this.email,
          password: this.password,
        });
        if (response.status === 200 && response.data.responseCode === 0) {
          const token = response.data.data.token;
          const userInfo = response.data.data; // backend'den gelen kullanıcı bilgileri

          // Token'ı ve kullanıcı bilgilerini çereze ekle
          this.$apiservice.setToken(token);
          this.$apiservice.setUserInfo(userInfo);
          this.toast.success("Giriş başarılı!");
          this.$router.push("/dashboard");
        }
        else{
          this.toast.error("Kullanıcı adı veya şifre hatalı!");
        }
      } catch (error) {
        console.error("Giriş yapılamadı:", error);
      }
    },
    async handleLogin() {
      // Validasyon kontrolü
      const isValid = await this.$refs.form.validate();

      if (isValid.valid) {
        await this.login();
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  background: #292929;
}
</style>
