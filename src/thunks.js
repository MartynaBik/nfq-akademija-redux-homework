import axios from 'axios';
import { endpoints } from '../config';
import { setFavoriteMovieList, setHearted, setGenreList, setMovies, setLog } from './actions';

export const getFavoriteMovieList = () => (dispatch) => {
  axios
    .get(endpoints.mostPopularMovies())
    .then((res) => dispatch(setFavoriteMovieList(res.data.results)))
    .catch((error) => console.log(error));
};

export const getGenreList = () => (dispatch) => {
  axios
      .get(endpoints.genres())
      .then((res) => dispatch(setGenreList(res.data.genres)))
      .catch((error) => console.log(error));
};

export const getMovies = (id) => (dispatch) => {
  if (id) {
    axios
        .get(endpoints.genreMovies(id))
        .then((res) => dispatch(setMovies(res.data.results)))
        .catch((error) => console.log(error));
  }
};

export const getHearted = (heartList) => (dispatch) => {
  dispatch(setHearted(heartList));
};

export const addLog = (log) => (dispatch) => {
  const d = new Date();
  const date = [d.getFullYear(), d.getMonth()+1, d.getDate(),]
      .map(n => n < 10 ? `0${n}` : `${n}`).join('-');
  const time = [d.getHours(), d.getMinutes(), d.getSeconds()]
      .map(n => n < 10 ? `0${n}` : `${n}`).join(':');

  const logDate = date + ' ' + time;
  const logText = JSON.parse('{ "' + logDate + '": "' + log + '"}');
  dispatch(setLog(logText));
};
