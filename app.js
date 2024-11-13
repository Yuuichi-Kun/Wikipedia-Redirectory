const url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';
const resultDOM = document.querySelector('.result');
const favoritesDOM = document.querySelector('.favorites'); // Bagian untuk daftar favorit
const inputDOM = document.querySelector('.form-input');
const formDOM = document.querySelector('.form');

// Memuat favorit dari localStorage saat halaman dimuat
const loadFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    renderFavorites(favorites);
};

// Menyimpan favorit ke localStorage
const saveFavorite = (favorite) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(item => item.pageid === favorite.pageid)) {
        favorites.push(favorite);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderFavorites(favorites);
    }
};

// Menghapus favorit dari localStorage
const removeFavorite = (pageid) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(item => item.pageid !== pageid);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderFavorites(favorites);
};

// Fungsi untuk membersihkan karakter yang bermasalah pada teks
const sanitizeText = (text) => {
    return text
        .replace(/<span class="searchmatch">/g, '')  // Menghapus tag pembuka
        .replace(/<\/span>/g, '')                     // Menghapus tag penutup
        .replace(/"/g, '&quot;')                      // Mengubah tanda kutip untuk keamanan HTML
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
};

const renderResults = (list) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const cardsList = list.map((item) => {
        const { title, snippet, pageid } = item;
        const isFavorited = favorites.some(fav => fav.pageid === pageid);
        return `<div class="article">
                    <a href="http://en.wikipedia.org/?curid=${pageid}" target="_blank">
                        <h4>${sanitizeText(title)}</h4>
                        <p>${sanitizeText(snippet)}</p>
                    </a>
                    <button onclick="toggleFavorite(${pageid}, '${sanitizeText(title)}', '${sanitizeText(snippet)}')">
                        ${isFavorited ? 'Unfavorite' : 'Favorite'}
                    </button>
                </div>`;
    }).join('');
    resultDOM.innerHTML = `<div class="articles">${cardsList}</div>`;
};


// Menampilkan daftar favorit
const renderFavorites = (favorites) => {
    if (favorites.length === 0) {
        favoritesDOM.innerHTML = '<p>No favorites yet</p>';
        return;
    }
    const favoriteList = favorites.map((item) => {
        return `<div class="favorite-article">
                    <a href="http://en.wikipedia.org/?curid=${item.pageid}" target="_blank">
                        <h4>${item.title}</h4>
                        <p>${item.snippet}</p>
                    </a>
                    <button onclick="removeFavorite(${item.pageid})">Remove</button>
                </div>`;
    }).join('');
    favoritesDOM.innerHTML = `<div class="favorites-list">${favoriteList}</div>`;
};

// Toggle antara menambahkan dan menghapus favorit
const toggleFavorite = (pageid, title, snippet) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.some(item => item.pageid === pageid)) {
        removeFavorite(pageid);
    } else {
        saveFavorite({ pageid, title, snippet });
    }
    // Refresh hasil pencarian untuk update tombol
    const searchValue = inputDOM.value;
    if (searchValue) fetchPages(searchValue);
};

formDOM.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = inputDOM.value;
    if (!value) {
        resultDOM.innerHTML = '<div class="error">Please enter a valid search term</div>';
        return;
    }
    fetchPages(value);
});

const fetchPages = async (searchValue) => {
    resultDOM.innerHTML = '<div class="loading"></div>';
    try {
        const response = await fetch(`${url}${searchValue}`);
        const data = await response.json();
        const results = data.query.search;
        if (results.length < 1) {
            resultDOM.innerHTML = '<div class="error">No matching results. Please try again...</div>';
            return;
        }
        renderResults(results);
    } catch (error) {
        resultDOM.innerHTML = '<div class="error">There was an error...</div>';
    }
};

// Memuat favorit saat halaman pertama kali dimuat
loadFavorites();
