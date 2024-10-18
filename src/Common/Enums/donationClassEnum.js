// donationStatusEnum.js

// Enum tanımı
const DonationClass = Object.freeze({
  KucukBas: 1,
  Keci: 2,
  BuyukBas: 3,
  HisseliSuKuyusu: 4,
  IsmeOzelSuKuyusu: 5,
  KuraniKerim: 6,
  Ekmek: 7,
  GazzeYardimi: 8,
  SicakYemek: 9,
  Pasta: 10,
  SutKecisi: 11,
  KuranOkutma: 12,
  MutlulukPaketi: 13,
  YetimGiydirme: 14,
  UnDağitimi: 15,
  YetimHamiliği: 16,
  ArkanBambuEv: 17,
  CamiMescit: 18,
  EgitimYardimi: 19,
  GidaKolisi: 20,
  Diger: 21
});

// Enum ile isimleri eşleştiren yapı
const DonationClasses = Object.freeze([
  { id: DonationClass.KucukBas, name: "Küçük Baş" },                     
  { id: DonationClass.Keci, name: "Keçi" },
  { id: DonationClass.BuyukBas, name: "Büyük Baş" },
  { id: DonationClass.HisseliSuKuyusu, name: "Hisseli Su Kuyusu" },
  { id: DonationClass.IsmeOzelSuKuyusu, name: "İsme Özel Su Kuyusu" },
  { id: DonationClass.KuraniKerim, name: "Kuran-ı Kerim" },
  { id: DonationClass.Ekmek, name: "Ekmek" },
  { id: DonationClass.GazzeYardimi, name: "Gazze Yardımı" },
  { id: DonationClass.SicakYemek, name: "Sıcak Yemek" },
  { id: DonationClass.Pasta, name: "Pasta" },
  { id: DonationClass.SutKecisi, name: "Süt Keçisi" },
  { id: DonationClass.KuranOkutma, name: "Kuran Okutma" },
  { id: DonationClass.MutlulukPaketi, name: "Mutluluk Paketi" },
  { id: DonationClass.YetimGiydirme, name: "Yetim Giydirme" },
  { id: DonationClass.UnDağitimi, name: "Un Dağıtımı" },
  { id: DonationClass.YetimHamiliği, name: "Yetim Hamiliği" },
  { id: DonationClass.ArkanBambuEv, name: "Arkan Bambu Ev" },
  { id: DonationClass.CamiMescit, name: "Cami Mescit" },
  { id: DonationClass.EgitimYardimi, name: "Egitim Yardımı" },
  { id: DonationClass.GidaKolisi, name: "Gıda Kolisi" },
  { id: DonationClass.Diger, name: "Diğer" },

]);

// Named exports kullanarak her iki objeyi de dışa aktarın
export default { DonationClass, DonationClasses };
