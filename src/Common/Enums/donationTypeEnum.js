// donationStatusEnum.js

// Enum tanımı
const DonationType = Object.freeze({
    Sadaka: 1,
    Adak: 2,
    Akika: 3,
    Sukur: 4,
    Sunnet: 5,
    Ruhuna: 6,
    Hacet: 7,
    Kefaret: 8,
    Sifa: 9,
    Vacip: 10,
    Diger:11
  });
  
  // Enum ile isimleri eşleştiren yapı
  const DonationTypes = Object.freeze([
    { id: DonationType.Sadaka, name: "Sadaka" },                     
    { id: DonationType.Adak, name: "Adak" },
    { id: DonationType.Akika, name: "Akika" },
    { id: DonationType.Sukur, name: "Şükür" },
    { id: DonationType.Sunnet, name: "Sünnet" },
    { id: DonationType.Ruhuna, name: "Ruhuna" },
    { id: DonationType.Hacet, name: "Hacet" },
    { id: DonationType.Kefaret, name: "Kefaret" },
    { id: DonationType.Sifa, name: "Şifa" },
    { id: DonationType.Vacip, name: "Vacip" },
    { id: DonationType.Diger, name: "Diğer" },
  ]);
  
  // Named exports kullanarak her iki objeyi de dışa aktarın
  export default { DonationType, DonationTypes };
  