<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

# Task Management System

Aplikasi Task Management System menggunakan framework Laravel yang memungkinkan pengguna untuk mengelola daftar tugas atau tasklist. Aplikasi ini dilengkapi dengan fitur untuk menambah, mengedit, menghapus, dan mengelola status tugas.

## Prasyarat
Sebelum menginstal aplikasi ini, pastikan Anda sudah menginstal perangkat lunak berikut:

- PHP (versi 8.2 atau lebih baru)
- Composer (untuk mengelola dependensi PHP)
- SQLite
- Node.js
- Git (untuk meng-clone repositori)

## Langkah-langkah Instalasi
1. git clone git@github.com:Nofri26/task-management-system.git
2. cd task-management-system
3. composer install
4. cp .env.example .env
5. php artisan key:generate
6. php artisan migrate --seed
7. npm install

## Kemudian Jalankan Aplikasi
- npm run dev
- php artisan serve

Akses aplikasi pada http://127.0.0.1:8000/

## Akses API

Gunakan Postman untuk melakukan request API

- ***Wajib Login terlebih dahulu dengan mengakses***
- /api/login atau /api/register
- Token menggunakan Bareer
- Kemudian Lanjtukan untuk mengakses API pada url berikut

GET /api/tasks: Mengambil semua tugas milik user yang login.

POST /api/tasks: Menambahkan tugas baru.

PUT /api/tasks/{id}: Mengedit tugas.

DELETE /api/tasks/{id}: Menghapus tugas.
