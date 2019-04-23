export const setFavoriteMovieList = (list) => ({
  type: 'SET_FAVORITE_MOVIE_LIST',
  list,
});

export const setGenreList = (genreList) => ({
  type: 'SET_GENRE_LIST',
  genreList,
});

export const setMovies = (movieList) => ({
  type: 'SET_MOVIE_LIST',
    movieList,
});

export const setHearted = (heartList) => ({
  type: 'SET_HEARTED_LIST',
  heartList,
});

export const setLog = (log) => ({
  type: 'SET_LOG_LIST',
  log,
});
