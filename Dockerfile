# 1. Node tabanlı image kullan
FROM node:18-alpine as build

# 2. Çalışma dizinini ayarla
WORKDIR /app

# 3. package.json ve bağımlılıkları yükle
COPY package*.json ./
RUN npm install

# 4. Tüm proje dosyalarını kopyala ve derle
COPY . .
RUN npm run build

# 5. HTTP-Server ile çalıştır
FROM node:18-alpine

# 6. HTTP-Server'ı global olarak yükle
RUN npm install -g http-server

# 7. Derlenmiş dosyaları çalışma dizinine al
WORKDIR /app
COPY --from=build /app/dist .

# 8. 3000 portunu aç
EXPOSE 3000

# 9. HTTP-Server ile projeyi sun
CMD ["http-server", "-p", "3000"]
