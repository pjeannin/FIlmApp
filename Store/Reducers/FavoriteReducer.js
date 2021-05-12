const initialState = { favoritesFilms : []}

function toggleFavorite(state = initialState, action)
{
    let nextState

    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteFilmIndex = state.favoritesFilms.findIndex(item => item.id === action.value.id)
            if (favoriteFilmIndex !== -1) {
                nextState = {
                    ...state,
                    favoritesFilms: state.favoritesFilms.filter( (item, index) => index !== favoriteFilmIndex)
                }
            }
            else {
                nextState = {
                    ...state,
                    favoritesFilms: [...state.favoritesFilms, action.value]
                }
            }
            return nextState || state
        default:
            return state
    }
}

export default toggleFavorite