const toggle = document.querySelector('#toggle')
const list = document.querySelector('#list')
const pad = document.querySelector('.pad')

toggle.addEventListener('click', () => {
    if (list.classList.contains('hidden') && pad.classList.contains('pt-56')) {
        list.classList.remove('hidden');
        pad.classList.remove('pt-56');
    } else {
        list.classList.add('hidden');
        pad.classList.add('pt-56');
    }
})

const API_KEY = 'api_key=7a857573a1f4f344d5f95a89246a027c';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const maind = document.getElementById("maind");
const fill = document.getElementById("fill");
const search = document.getElementById("search");

getShows(API_URL);

function getShows(url) {
    fetch(url)
        .then(res => res.json()).then(data => {

            showShows(data.results);

        })
}

function showShows(data) {
    maind.innerHTML = '';

    data.forEach(show => {
        const { title, poster_path, vote_average,release_date } = show;
        const show1 = document.createElement('div');
        show1.classList.add('show');
        show1.innerHTML = `
        <div class="bg-white rounded overflow-hidden shadow-md hover:shadow-lg">
            <div class="h-48 md:h-64 w-full bg-cover bg-no-repeat" style="background-image: url(${IMG_URL + poster_path})">
                <span class="font-bold text-white">${title}</span>
                <span class="block font-bold text-purple-400">${vote_average}</span>
                <span class="block text-white">${release_date}</span>
            </div>
        </div>
        `
        maind.appendChild(show1);
    });
}

fill.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchfill = search.value;

    if (searchfill) {
        getShows(searchURL + '&query=' + searchfill);
    } else {
        getShows(API_URL);
    }
})