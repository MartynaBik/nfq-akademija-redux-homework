import { combineReducers } from 'redux';

const initialState = {
  list: [],
  genreList: [],
  movieList: [],
  hearted: [],
  logs: {}
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FAVORITE_MOVIE_LIST':
      return {
        ...state,
        list: action.list,
      };

    case 'SET_GENRE_LIST':
      return {
        ...state,
        genreList: action.genreList,
      };

    case 'SET_MOVIE_LIST':
      return {
        ...state,
        movieList: action.movieList,
      };

    case 'SET_LOG_LIST':
      const oldList = state.logs;
      return {
        ...state,
        logs: {...oldList, ...action.log},
      };

    case 'SET_HEARTED_LIST':
      return {
        ...state,
        hearted: action.heartList,
      };

    default: return state;
  }
};

export default combineReducers({
  movies: moviesReducer,
});
