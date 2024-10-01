const filmList = document.getElementById('filmList');
const favoriteList = document.getElementById('favoriteList');
const watchLaterList = document.getElementById('watchLaterList');
const filmForm = document.getElementById('filmForm');
const searchInput = document.getElementById('search');
const formTitle = document.getElementById('formTitle');
const cancelEditButton = document.getElementById('cancelEdit');
const toggleThemeButton = document.getElementById('toggleTheme');
const recommendedList = document.getElementById('recommendedList');

let films = [];
let editIndex = -1;
let darkMode = false;
let userRatings = {};

function loadTheme() {
    document.body.classList.toggle('dark-mode', darkMode);
    toggleThemeButton.textContent = darkMode ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro';
}

filmForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const film = {
        nome: document.getElementById('nome').value,
        classificacao: document.getElementById('classificacao').value,
        duracao: document.getElementById('duracao').value,
        genero: document.getElementById('genero').value,
        ano: document.getElementById('ano').value,
        sinopse: document.getElementById('sinopse').value,
        trailer: document.getElementById('trailer').value,
        avaliacao: document.getElementById('avaliacao').value,
        comentario: document.getElementById('comentario').value
    };

    if (editIndex > -1) {
        films[editIndex] = film;
        editIndex = -1;
    } else {
        films.push(film);
    }

    filmForm.reset();
    displayFilms();
});

function displayFilms() {
    filmList.innerHTML = '';
    favoriteList.innerHTML = '';
    watchLaterList.innerHTML = '';
    recommendedList.innerHTML = '';

    films.forEach((film, index) => {
        const li = createFilmItem(film, index);
        filmList.appendChild(li);
    });
}

function createFilmItem(film, index) {
    const li = document.createElement('li');
    li.innerHTML = `
        <strong>${film.nome}</strong><br>
        Avaliação: ${film.avaliacao} estrelas<br>
        Comentário: ${film.comentario || 'Nenhum comentário'}<br>
        Classificação: ${film.classificacao}<br>
        Duração: ${film.duracao} minutos<br>
        Gênero: ${film.genero}<br>
        Ano de Lançamento: ${film.ano}<br>
        Sinopse: ${film.sinopse}<br>
        <a href="${film.trailer}" target="_blank">Assistir Trailer</a><br>
        <button onclick="editFilm(${index})">Editar</button>
        <button onclick="deleteFilm(${index})">Excluir</button>
        <button onclick="addToFavorites(${index})">Adicionar aos Favoritos</button>
        <button onclick="addToWatchLater(${index})">Adicionar à Lista para Assistir Depois</button>
    `;
    return li;
}

function addToFavorites(index) {
    const film = films[index];
    const li = document.createElement('li');
    li.innerHTML = `<strong>${film.nome}</strong> <button onclick="removeFromFavorites(this)">Remover</button>`;
    favoriteList.appendChild(li);
}

function removeFromFavorites(button) {
    const li = button.parentElement;
    li.remove();
}

function addToWatchLater(index) {
    const film = films[index];
    const li = document.createElement('li');
    li.innerHTML = `<strong>${film.nome}</strong> <button onclick="removeFromWatchLater(this)">Remover</button>`;
    watchLaterList.appendChild(li);
}

function removeFromWatchLater(button) {
    const li = button.parentElement;
    li.remove();
}

function searchFilm() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredFilms = films.filter(film => film.nome.toLowerCase().includes(searchTerm));
    filmList.innerHTML = '';
    if (filteredFilms.length > 0) {
        filteredFilms.forEach(film => {
            const li = createFilmItem(film);
            filmList.appendChild(li);
        });
    } else {
        filmList.innerHTML = '<li>Nenhum filme encontrado.</li>';
    }
}

function editFilm(index) {
    const film = films[index];
    document.getElementById('nome').value = film.nome;
    document.getElementById('classificacao').value = film.classificacao;
    document.getElementById('duracao').value = film.duracao;
    document.getElementById('genero').value = film.genero;
    document.getElementById('ano').value = film.ano;
    document.getElementById('sinopse').value = film.sinopse;
    document.getElementById('trailer').value = film.trailer;
    document.getElementById('avaliacao').value = film.avaliacao;
    document.getElementById('comentario').value = film.comentario;

    editIndex = index;
    formTitle.textContent = 'Editar Filme';
    cancelEditButton.style.display = 'inline';
}

function deleteFilm(index) {
    films.splice(index, 1);
    displayFilms();
}

function generateRecommendations() {
    const recommendedFilms = [];
    const userRatedFilms = Object.keys(userRatings);
    if (userRatedFilms.length > 0) {
        films.forEach((film) => {
            if (!userRatedFilms.includes(film.nome)) {
                const similarityScore = 0;
                userRatedFilms.forEach((ratedFilm) => {
                    if (film.genero === films[ratedFilm].genero || film.diretor === films[ratedFilm].diretor) {
                        similarityScore += 1;
                    }
                });
                if (similarityScore > 0) {
                    recommendedFilms.push({ film, score: similarityScore });
                }
            }
        });
        recommendedFilms.sort((a, b) => b.score - a.score);
        recommendedList.innerHTML = '';
        recommendedFilms.slice(0, 5).forEach((recommendedFilm) => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${recommendedFilm.film.nome}</strong>`;
            recommendedList.appendChild(li);
        });
    }
}

toggleThemeButton.addEventListener('click', function() {
    darkMode = !darkMode;
    loadTheme();
});

cancelEditButton.addEventListener('click', function() {
    filmForm.reset();
    formTitle.textContent = 'Cadastrar Novo Filme';
    cancelEditButton.style.display = 'none';
    editIndex = -1;
});

loadTheme();
displayFilms();