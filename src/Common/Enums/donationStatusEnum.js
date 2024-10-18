// donationStatusEnum.js

// Enum tanımı
const DonationStatusEnum = Object.freeze({
    NOT_SENT: 1,
    PREPARING_BANNER: 2,
    SENT: 3,
  });
  
  // Enum ile isimleri eşleştiren yapı
  const DonationStatusWithName = Object.freeze([
    { id: DonationStatusEnum.NOT_SENT, name: "Gönderilmedi" },
    { id: DonationStatusEnum.PREPARING_BANNER, name: "Afiş Hazırlanıyor" },
    { id: DonationStatusEnum.SENT, name: "Gönderildi" },
  ]);
  
  // Named exports kullanarak her iki objeyi de dışa aktarın
  export default { DonationStatusEnum, DonationStatusWithName };