<template>
  <v-row class="justify-center ml-12 mt-10" align="start" v-if="!loading">
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
          <v-toolbar-title>Bağış Yönetimi</v-toolbar-title>

          <!-- Araya boşluk eklemek için v-spacer kullanıyoruz -->
          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-divider inset vertical class="mr-4"></v-divider>
            <v-row class="mr-1">
              <v-btn @click="goToDonationAddPage">Bağış Ekle</v-btn>
            </v-row>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="search"
                label="Ara"
                prepend-inner-icon="mdi-magnify"
              ></v-text-field>
            </v-col>
            <!-- <v-col cols="12" md="6">
              <v-autocomplete
                label="Bağış Tipi"
                :items="donationTypes"
                item-title="name"
                item-value="id"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6">
              <v-autocomplete
                label="Bağış Türü"
                :items="donationClasses"
                item-title="name"
                item-value="id"
              ></v-autocomplete>
            </v-col> -->
          </v-row>
          <v-card elevation="6">
            <v-card-text>
              <v-dialog v-model="statusDialog" max-width="500">
                <v-card>
                  <v-card-title>Durum Güncelle</v-card-title>
                  <v-card-text>
                    <v-select
                      v-model="selectedStatus"
                      :items="statusList"
                      item-title="name"
                      item-value="id"
                      label="Durum Seçin"
                    ></v-select>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn text @click="closeUpdateStatusDialog">İptal</v-btn>
                    <v-btn text @click="updateStatus">Kaydet</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-data-table
                itemsPerPageText="Sayfa Başı Gösterilen Veri Sayısı"
                pageText="{2} Verinin {0}-{1} Arası Gösteriliyor "
                :headers="headers"
                :items="donations"
                v-if="!loading"
                :search="search"
              >
                <template v-slot:item.donationStatus="{ value }">
                  <v-chip :color="getColor(value)">
                    {{ value }}
                  </v-chip>
                </template>
                <template v-slot:item.createDate="{ value }">
                  {{ formatDate(value) }}
                </template>
                <template v-slot:item.amount="{ item }">
                  {{ formatNumber(item.amount) }}
                </template>
                <template v-slot:item.actions="{ item }">
                  <!-- Düzenle İkonu -->
                  <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                      <v-icon
                        class="ml-3"
                        size="small"
                        v-bind="props"
                        @click="goToEditPage(item)"
                      >
                        mdi-pencil
                      </v-icon>
                    </template>
                    <span>Düzenle</span>
              
                  </v-tooltip>

                  <!-- Güncelle İkonu -->
                  <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                      <v-icon
                        class="ml-3"
                        size="small"
                        v-bind="props"
                        @click="openUpdateStatusDialog(item)"
                      >
                        mdi-update
                      </v-icon>
                    </template>
                    <span>Durumunu Güncelle</span>
                    <!-- Tooltip içeriği -->
                  </v-tooltip>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { useToast } from "vue-toastification";
import donationStatusEnum from "@/Common/Enums/donationStatusEnum";
import donationClassEnum from "@/Common/Enums/donationClassEnum";
import donationTypeEnum from "@/Common/Enums/donationTypeEnum";
import { HttpStatusCode } from "axios";
export default {
  name: "DonationList",
  setup() {
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      statusList: [
        {
          name: "Gönderilmedi",
          id: 1,
        },
        {
          name: "Afiş Hazırlandı",
          id: 2,
        },
        {
          name: "Gönderildi",
          id: 3,
        },
      ],
      denemeList: [],
      selectedItem: null,
      selectedStatus: "",
      statusDialog: false,
      loading: true,
      donationStatusNames: donationStatusEnum.DonationStatusWithName,
      donationClasses: donationClassEnum.DonationClasses,
      donationTypes: donationTypeEnum.DonationTypes,
      userInfo: this.$apiservice.getUserInfo(),
      donations: [],
      search: "",
      headers: [
        {
          title: "Ad Soyad",
          align: "start",
          sortable: false,
          key: "nameAndSurname",
        },
        {
          title: "Bağış Tipi",
          sortable: false,
          key: "donationType",
        },
        {
          title: "Bağış Türü",
          sortable: false,
          key: "donationClass",
        },
        {
          title: "Bağış Miktarı",
          sortable: false,
          key: "amount",
        },
        {
          title: "Telefon Numarası",
          sortable: false,
          key: "phoneNumber",
        },
        {
          title: "Bağış Tarihi",
          sortable: true,
          key: "createDate",
        },
        {
          title: "Bağış Durumu",
          sortable: false,
          key: "donationStatus",
        },
        {
          title: "Aksiyonlar",
          sortable: false,
          key: "actions",
        },
      ],
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    goToEditPage(item){
      this.$router.push({ path: `/donation/edit/${item.id}` });
    },
    openUpdateStatusDialog(item) {
      this.statusDialog = true;
      this.selectedStatus = this.donationStatusNames.find(x => x.name == item.donationStatus).name;
      this.selectedItem = item;
    },
    closeUpdateStatusDialog() {
      this.statusDialog = false;
      this.selectedStatus = "";
    },
    async updateStatus() {
      try {
        if(this.selectedStatus == this.selectedItem.donationStatus){
          this.toast.error("Bir değişiklik yapmadınız!");
          return;
        }
        this.loading = true;
        let dto = {
          id: this.selectedItem.id,
          newStatus: this.selectedStatus,
        };

        const response = await this.$apiservice.put(
          "Donation/UpdateStatus",
          dto
        );
        if (
          response.status == HttpStatusCode.Ok &&
          response.data.responseCode == 0
        ) {
          this.toast.success("Başarıyla Kaydedildi");
          let founditem = this.donations.find(
            (item) => item.id == this.selectedItem.id
          );

          founditem.donationStatus = this.donationStatusNames.find(
            (x) => x.id == this.selectedStatus
          ).name;
        } else {
          this.toast.error("Güncellerken bir hata oluştu.");
        }
      } catch(error) {
        console.log(error);
        this.toast.error("Sistematik bir hata oluştu.");
      } finally {
        this.loading = false;
        this.closeUpdateStatusDialog();
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);

      // Örneğin "20 Eylül 2024, 20:49" formatında döndürmek
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };

      return date.toLocaleDateString("tr-TR", options);
    },
    getColor(donationStatus) {
      if (donationStatus == "Gönderilmedi") return "red";
      else if (donationStatus == "Afiş Hazırlandı") return "orange";
      else return "green";
    },
    async initialize() {
      await this.GetDonations();
    },
    formatNumber(value) {
      return new Intl.NumberFormat("tr-TR").format(value); // Türkçe formatlama
    },
    goToDonationAddPage() {
      this.$router.push({ name: "/donation/add" });
    },
    async GetDonations() {
      try {
        const response = await this.$apiservice.get(
          `donation/GetDonationsByCompanyId?companyId=${this.userInfo.companyId}`
        );
        if (response.status === 200 && response.data.responseCode === 0) {
          this.donations = response.data.data;
          this.donations.forEach(
            (item) => (
              (item.donationStatus = this.donationStatusNames.find(
                (x) => x.id == item.donationStatus
              ).name),
              (item.donationClass = this.donationClasses.find(
                (x) => x.id == item.donationClass
              ).name),
              (item.donationType = this.donationTypes.find(
                (x) => x.id == item.donationType
              ).name)
            )
          );
        } else {
          this.toast.error("Veriler Çekilirken bir hata oluştu.");
        }
      } catch {
        this.toast.error("Sistematik bir hata oluştu.");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
