<template>
  <v-row class="justify-center ml-12 mt-10" align="start">
    <v-col cols="12" md="9" class="ml-10">
      <v-card rounded="lg">
        <v-toolbar
          flat
          style="
            background: rgb(2, 0, 36);
            background: linear-gradient(
              243deg,
              rgba(2, 0, 36, 1) 0%,
              rgba(88, 9, 121, 1) 70%,
              rgba(54, 97, 186, 1) 100%
            );
          "
        >
          <v-toolbar-title>Bağış Düzenle</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="donationUpdateForm">
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="donationUpdateDto.nameAndSurname"
                  label="Bağışçı Ad Soyad"
                  hint="Bağışçıya Dair Ad Soyad Bilgisi"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="donationUpdateDto.phoneNumber"
                  label="Telefon Numarası"
                  placeholder="+90555-1234567"
                  type="number"
                  hide-spin-buttons
                  hint="Numarayı Uluslararası Standartta Yazınız"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-autocomplete
                  label="Bağış Tipi"
                  :items="donationTypes"
                  v-model="donationUpdateDto.donationType"
                  item-title="name"
                  item-value="id"
                  :rules="[rules.required]"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="4">
                <v-autocomplete
                  label="Bağış Türü"
                  :items="donationClasses"
                  v-model="donationUpdateDto.donationClass"
                  item-title="name"
                  item-value="id"
                  :rules="[rules.required]"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="donationUpdateDto.amount"
                  label="Bağış Miktarı"
                  type="number"
                  hide-spin-buttons
                  hint="Adet Bazından Miktar"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-textarea
                  v-model="donationUpdateDto.description"
                  label="Açıklama"
                  rows="1"
                  auto-grow
                  hint="Diğer Önemli Hususlardan Burada Bahsedebilirsiniz"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" @click="goToPreviousPage">Geri Dön</v-btn>
          <v-btn color="success" @click="validateDonationUpdateForm">Ekle</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { useToast } from "vue-toastification";
import donationStatusEnum from "@/Common/Enums/donationStatusEnum";
import donationClassEnum from "@/Common/Enums/donationClassEnum";
import donationTypeEnum from "@/Common/Enums/donationTypeEnum";
import DonationUpdateDto from "@/Common/Dtos/DonationUpdateDto";
export default {
  name: "DonationList",
  setup() {
    const toast = useToast();

    return { toast };
  },
  async created() {
    await this.initialize();
  },
  data() {
    return {
      rules: {
        required: (value) => !!value || "Zorunlu Alan",
      },
      donationId: this.$route.params.id,
      donationUpdateDto: new DonationUpdateDto(),
      donationStatusNames: donationStatusEnum.DonationStatusWithName,
      donationClasses: donationClassEnum.DonationClasses,
      donationTypes: donationTypeEnum.DonationTypes,
      userInfo: this.$apiservice.getUserInfo(),
    };
  },
  methods: {
    async initialize() {
      await this.GetDonation();
    },
    async GetDonation() {
      try {
        const response = await this.$apiservice.get(
          "Donation/GetDonationById?donationId=" + this.donationId
        );
        this.donationUpdateDto = response.data.data;
        if (response.status == 200 && response.data.responseCode == 0) {
        } else {
          this.toast.error("Bağış Yüklenirken Bir Hata Oluştu.");
        }
      } catch {}
    },
    async validateDonationUpdateForm() {
      const isValid = await this.$refs.donationUpdateForm.validate();

      if (isValid.valid) {
        await this.UpdateDonation();
      }
    },
    async UpdateDonation() {
      try {
        const response = await this.$apiservice.put(
          "Donation/UpdateDonation",
          this.donationUpdateDto
        );
        if (response.status == 200 && response.data.responseCode == 0) {
          this.toast.success("Bağış Başarıyla Düzenlendi.");
          this.goToPreviousPage();
        } else {
          this.toast.error("Bağış Eklenirken Bir Hata Oluştu.");
        }
      } catch(error) {
        this.toast.error(
          "Sistemsel Bir Hata Meydana Geldi. Lütfen Daha Sonra Tekrar Deneyin."
        );
      }
    },
    goToPreviousPage() {
      this.$router.push({ name: "/donation/list" });
    },
    formatNumber(value) {
      return new Intl.NumberFormat("tr-TR").format(value); // Türkçe formatlama
    },
  },
};
</script>
