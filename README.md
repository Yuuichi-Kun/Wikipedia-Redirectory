#### HTML Structure

- section.wiki
  - div.container
    - img
    - h3(text)
    - form.form
      - input.form-input type='text'
      - button.submit-btn (search) type='submit'
  - div.results
    - div.articles
      - a
        - h4
        - p (lorem20)
  - div.Favorites
    - div.articles
      - a
        - h4
        - p (lorem20)
      - button onclick="toggleFavorite(${pageid}, '${sanitizeText(title)}', '${sanitizeText(snippet)}')">${isFavorited ? 'Unfavorite' : 'Favorite'}
                       
#### API DOCS

- [wiki docs](https://www.mediawiki.org/wiki/API:Main_page)

- ready to go url's

Struktur folder:
├── README.md
├── app.js
├── assets
    └── MikuWPP.mp4
├── index.html
├── styles.css
├── wiki-logo.png
└── wiki-urls.js

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
