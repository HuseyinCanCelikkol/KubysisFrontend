import axios from 'axios';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const ApiService = {
  axiosInstance: null,
  encryptionKey: 'custom-encryption-key-must-be-fetched-from-in-your-secret', // Şifreleme anahtarı, güvenli bir şekilde saklanmalıdır

  init(baseURL) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
    });

    // Token'ı her isteğe eklemek için bir interceptor oluştur
    this.axiosInstance.interceptors.request.use((config) => {
      const token = Cookies.get('authToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });
  },

  // Token'ı çereze ekle
  setToken(token) {
    Cookies.set('authToken', token, { expires: 1 }); // 7 gün boyunca saklar
  },

  // Kullanıcı bilgilerini çereze şifreleyerek ekle
  setUserInfo(userInfo) {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(userInfo), this.encryptionKey).toString();
    Cookies.set('userInfo', encryptedData, { expires: 1 });
  },

  // Çerezdeki kullanıcı bilgilerini al ve deşifre et
  getUserInfo() {
    const encryptedData = Cookies.get('userInfo');
    if (encryptedData) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
      } catch (error) {
        console.error('Kullanıcı bilgileri deşifre edilemedi:', error);
        return null;
      }
    }
    return null;
  },

  // Get metodu
  get(resource) {
    return this.axiosInstance.get(resource);
  },

  // Post metodu
  post(resource, data) {
    return this.axiosInstance.post(resource, data);
  },

  // Diğer HTTP metodları (PUT, DELETE) için de benzer şekilde ekleyebilirsiniz.
  put(resource, data) {
    return this.axiosInstance.put(resource, data);
  },

  delete(resource) {
    return this.axiosInstance.delete(resource);
  }
};

export default ApiService;
