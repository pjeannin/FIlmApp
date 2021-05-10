const Token = "bbda9aab7e466aba4551fafc2211c38f";

export function getFilmFromAPI (text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + Token + '&language=fr&query=' + text + "&page=" + page
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export function getImageFromApi (name) {
    return 'https://image.tmdb.org/t/p/w300' + name
}

export function getOneFilmFromApi (id) {
    const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + Token + '&language=fr'
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}