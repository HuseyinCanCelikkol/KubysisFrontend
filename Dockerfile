# 1. Node tabanlı imaj kullan
FROM node:18-alpine as build

# 2. Çalışma dizinini ayarla
WORKDIR /app

# 3. package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# 4. Bağımlılıkları yükle
RUN npm install

# 5. Tüm proje dosyalarını kopyala
COPY . .

# 6. Projeyi derle
RUN npm run build

# 7. Nginx tabanlı imaja geç
FROM nginx:alpine

# 8. Derlenmiş dosyaları kopyala
COPY --from=build /app/dist /usr/share/nginx/html

# 9. Nginx default.conf dosyasını ekle
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# 10. Port aç
EXPOSE 80

# 11. Nginx çalıştır
CMD ["nginx", "-g", "daemon off;"]
