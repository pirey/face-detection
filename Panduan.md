# Panduan menjalankan aplikasi

- download `.zip` file
- extract file tersebut ke folder mana saja, ingat lokasinya

1. Install nodejs

download installer di https://nodejs.org

2. Pastikan nodejs sudah terinstall dengan benar

cara mengecek:
- buka aplikasi command prompt, Start -> Search "command prompt" atau pencet tombol "Windows + R" -> Ketik "cmd"
- ketik perintah `node -v; npm -v;`
- jika muncul nomor versi, maka installasi sudah benar

3. Install `yarn`

- buka command prompt
- jalankan perintah `npm i -g yarn`
- pastikan sudah terinstall dengan benar, cek dengan `yarn -v`

4. Install dependency

- buka command prompt
- masuk ke folder source code
- jalankan perintah `yarn`
- tunggu sebentar, sedang men-download
- kalau sudah selesai, periksa isi folder source code, akan ada folder baru bernama `node_modules`

5. Install `expo-cli`

- buka command prompt
- jalankan perintah `npm i -g expo-cli`
- untuk mengecek installasi sudah benar atau belum, jalankan perintah `expo --version`

6. Login expo
- jika belum punya akun, daftar dulu di https://expo.io/signup
- login dengan `expo login`

7. Jalankan perintah build
- buka folder di command prompt
- jalankan `expo build:android`

8. Lihat hasil build apk di expo
- login di expo web https://expo.io/login
- masuk ke aplikasi
- masuk ke menu `builds`
- visit build page
- download apk


CATATAN: cara pindah folder di command prompt windows -> https://www.digitalcitizen.life/command-prompt-how-use-basic-commands
