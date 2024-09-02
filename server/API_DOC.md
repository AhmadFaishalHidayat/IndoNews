## Tema : IndoNews App

### Link : https://ip-phase2-2c453.web.app/ 

### - Post /login
#### Jika Berhasil Login
- Request body :
```js
    {
        "email": "admin1@gmail.com"
        "password": "admin1"
    }
```
- Respon (200) :
```js
    {"access_token": "<your access token>"}
```
### - Post /login/google
#### Jika Berhasil Login google

- Respon (200) :
```js
    {"access_token": "<your access token>"}
```
- Respon (201) : jika belum ada akun maka akan create otomatis
```js
    {"access_token": "<your access token>"}
```
### - Post /register
#### Jika Berhasil Register atau add user
- Request body :
```js
{
    "username": "user5",
    "email": "user5@gmail.com",
    "password": "user5",
    "phoneNumber": "088774445636",
    "address": "Brebes"
}
```
- Respon (200 Created) :
```js
    {
    "username": "user5",
    "email": "user5@gmail.com",
    "role": "Staff"
    }
```

### Get /news
#### Berhasil ambil semua data news
- Request header: 
```js
    {"Authorization": "Bearer <your access token>"}
```

- Respon (200):
```js
[
     "message": "All data News",
    "data": [
        {
            "id": 10,
            "title": "TEST6",
            "url": "Test",
            "UserId": 10,
            "createdAt": "2024-07-10T18:23:31.066Z",
            "updatedAt": "2024-07-10T18:23:31.066Z",
            "User": {
                "id": 10,
                "email": "admin5@gmail.com",
                "createdAt": "2024-07-09T15:22:19.297Z",
                "updatedAt": "2024-07-09T15:22:19.297Z"
            }
        },
        {
            "id": 11,
            "title": "TEST7",
            "url": "Test",
            "UserId": 10,
            "createdAt": "2024-07-10T18:23:34.107Z",
            "updatedAt": "2024-07-10T18:23:34.107Z",
            "User": {
                "id": 10,
                "email": "admin5@gmail.com",
                "createdAt": "2024-07-09T15:22:19.297Z",
                "updatedAt": "2024-07-09T15:22:19.297Z"
            }
        },
        {
            "id": 12,
            "title": "TEST8",
            "url": "Test",
            "UserId": 12,
            "createdAt": "2024-07-10T18:23:36.549Z",
            "updatedAt": "2024-07-10T18:23:36.549Z",
            "User": {
                "id": 12,
                "email": "admin5@gmail.com",
                "createdAt": "2024-07-09T15:22:19.297Z",
                "updatedAt": "2024-07-09T15:22:19.297Z"
            }
        }, ......dll

]
```

### Get /news-byuser
#### Berhasil ambil semua data news by user
- Request header: 
```js
    {"Authorization": "Bearer <your access token>"}
```

- Respon (200):
```js
[
     "message": "All data News",
    "data": [
        {
            "id": 10,
            "title": "TEST6",
            "url": "Test",
            "UserId": 10,
            "createdAt": "2024-07-10T18:23:31.066Z",
            "updatedAt": "2024-07-10T18:23:31.066Z",
            "User": {
                "id": 10,
                "email": "admin5@gmail.com",
                "createdAt": "2024-07-09T15:22:19.297Z",
                "updatedAt": "2024-07-09T15:22:19.297Z"
            }
        },
        {
            "id": 11,
            "title": "TEST7",
            "url": "Test",
            "UserId": 10,
            "createdAt": "2024-07-10T18:23:34.107Z",
            "updatedAt": "2024-07-10T18:23:34.107Z",
            "User": {
                "id": 10,
                "email": "admin5@gmail.com",
                "createdAt": "2024-07-09T15:22:19.297Z",
                "updatedAt": "2024-07-09T15:22:19.297Z"
            }
        },
        {
            "id": 12,
            "title": "TEST8",
            "url": "Test",
            "UserId": 10,
            "createdAt": "2024-07-10T18:23:36.549Z",
            "updatedAt": "2024-07-10T18:23:36.549Z",
            "User": {
                "id": 10,
                "email": "admin5@gmail.com",
                "createdAt": "2024-07-09T15:22:19.297Z",
                "updatedAt": "2024-07-09T15:22:19.297Z"
            }
        }, ......dll

]
```
### Get /news/:id
#### Berhasil ambil semua data news by id
- request params: 
```js
    /news/10
```
- Request header: 
```js
    {"Authorization": "Bearer <your access token>"}
```

- Respon (200):
```js
{
    "id": 10,
    "title": "TEST6",
    "url": "Test",
    "UserId": 10,
    "createdAt": "2024-07-10T18:23:31.066Z",
    "updatedAt": "2024-07-10T18:23:31.066Z"
}
```

### Post /cuisine
#### Berhasil create cuisine
- Request header: 
```js
    {"Authorization": "Bearer <your access token>"}
```

- Request body:
```js
{
    "title": "TEST10",
    "url": "Test"
}
```
- Respon (201 Created):
```js
    {
    "data": {
        "id": 20,
        "title": "TEST10",
        "url": "Test",
        "UserId": 10,
        "updatedAt": "2024-07-12T03:52:27.141Z",
        "createdAt": "2024-07-12T03:52:27.141Z"
    },
    "message": "Created Successfully"
}
```

### Put /news/edit/:id
#### Berhasil update cuisine
- Request Params:
```js
    /news/edit/9
```
- request header:
```js
    {"Authorization": "Bearer <your access token>"}
```
- Request Body: 
```js
{
    "title": "TEST6",
    "url": "Test",
}
```
- Respon (200):
```js
{
    "message": "Update Successfully"
}
```

### Delete /news/delete/:id
#### Berhasil delete news by Id
- Request Params:
```js
    /news/delete/10
```
- request header:
```js
    {"Authorization": "Bearer <your access token>"}
```
- respon (200)
```js
{
    "message": "TEST2 EDIT has been deleted"
}
```

### POST /search-ai 
#### Berhasil search

- Request Body:
```js
{
    "search": "Berita terhangat di indonesia"
}
```
- respon(200)
```js
[
{
"url": "https://www.beritaterhangat.co.id/indonesia/1",
"title": "Presiden Jokowi Minta Masyarakat Patuhi Protokol Kesehatan",
"body": "Presiden Joko Widodo mengingatkan masyarakat Indonesia agar tetap patuh terhadap protokol kesehatan guna
mencegah penyebaran virus Covid-19."
},
{
"url": "https://www.beritaterhangat.co.id/indonesia/2",
"title": "Kasus Covid-19 Terus Meningkat, RS RS Darurat Dibuka di Jakarta",
"body": "Melihat lonjakan kasus Covid-19, pemerintah membuka Rumah Sakit Darurat di Jakarta untuk menangani pasien
Covid-19 dengan gejala ringan hingga sedang."
},
{
"url": "https://www.beritaterhangat.co.id/indonesia/3",
"title": "Pariwisata Mulai Pulih, Destinasi Wisata di Bali Ramai Dikunjungi",
"body": "Seiring dengan adanya penurunan kasus Covid-19, pariwisata di Bali mulai pulih dengan banyaknya turis yang
mengunjungi destinasi wisata di Pulau Dewata."
},
{
"url": "https://www.beritaterhangat.co.id/indonesia/4",
"title": "Pelaku Usaha Kecil Menengah Dapat Bantuan Modal dari Pemerintah",
"body": "Pemerintah memberikan bantuan modal kepada pelaku usaha kecil menengah (UKM) untuk membantu pemulihan ekonomi
di tengah pandemi Covid-19."
},
{
"url": "https://www.beritaterhangat.co.id/indonesia/5",
"title": "Penggunaan Masker Wajib di Tempat Umum Diperpanjang",
"body": "Pemerintah memutuskan untuk memperpanjang kewajiban penggunaan masker di tempat umum guna mencegah penyebaran
virus Covid-19."
},
{
"url": "https://www.beritaterhangat.co.id/indonesia/6",
"title": "Pendapatan Asli Daerah (PAD) Meningkat Selama Tahun 2021",
"body": "Data menunjukkan bahwa Pendapatan Asli Daerah (PAD) di beberapa daerah mengalami peningkatan selama tahun 2021
meskipun di tengah pandemi Covid-19."
},
{
"url": "https://www.beritaterhangat.co.id/indonesia/7",
"title": "Pembangunan Infrastruktur Terus Dilakukan di Berbagai Daerah",
"body": "Pemerintah terus melakukan pembangunan infrastruktur di berbagai daerah sebagai bagian dari upaya mempercepat
pemulihan ekonomi nasional."
},
{
"url": "https://www.beritaterhangat.co.id/indonesia/8",
"title": "Pelaksanaan Penerimaan CPNS Tahun Ini Akan Tetap Dilaksanakan",
"body": "Meskipun di tengah pandemi, penerimaan Calon Pegawai Negeri Sipil (CPNS) akan tetap dilaksanakan untuk memenuhi
kebutuhan aparatur sipil negara."
},
{
"url": "https://www.beritaterhangat.co.id/indonesia/9",
"title": "Peringatan Hari Kemerdekaan RI Ke-76 Akan Digelar Hanya Secara Virtual",
"body": "Pemerintah akan menggelar peringatan Hari Kemerdekaan Republik Indonesia ke-76 secara virtual, mengingat
situasi pandemi yang masih berlangsung."
},
{
"url": "https://www.beritaterhangat.co.id/indonesia/10",
"title": "Penyuluhan Vaksinasi Terus Dilakukan untuk Meningkatkan Cakupan Vaksinasi",
"body": "Pemerintah terus melakukan kampanye dan penyuluhan vaksinasi untuk meningkatkan cakupan vaksinasi di masyarakat
guna mempercepat kekebalan kelompok."
}
]
```