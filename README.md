#### HTML Structure

- section.wiki
  - div.container
    - img: Gambar logo Wikipedia
    - h3: Judul/teks yang menjelaskan fungsi pencarian
    - form.form: Formulir pencarian
      - input.form-input: Input teks untuk pencarian
      - button.submit-btn: Tombol untuk mengirim pencarian
  - div.results: Bagian untuk menampilkan hasil pencarian
    - div.articles: Daftar artikel yang ditemukan
      - a: Tautan menuju halaman Wikipedia
        - h4: Judul artikel
        - p: Deskripsi singkat dari artikel
  - div.Favorites: Daftar artikel yang telah difavoritkan
    - div.articles: Artikel favorit yang telah disimpan
      - a: Tautan menuju halaman Wikipedia
        - h4: Judul artikel
        - p: Deskripsi singkat artikel
      - button: Tombol untuk menghapus favorit dari daftar
                       
#### API DOCS

- [wiki docs](https://www.mediawiki.org/wiki/API:Main_page)

- ready to go url's

Struktur folder:
- README.md
- app.js
- assets
    - MikuWPP.mp4
- index.html
- styles.css
- wiki-logo.png
- wiki-urls.js

Perubahan css:

- Mengubah background menjadi video.
- Mengubah tampilan card menjadi minimalist
- Menambahkan tampilan untuk bagian favorite and tombol favorite

Perubahan JS:

- Fungsi localStorage
- Fungsi favorite
- Memperbaiki Bug Raw code muncul pada view

Perubahan HTML:

- Penambahan class favorite
- Penambahan class video-background
