import React from 'react';
import Card from './Card';
import { connect } from 'react-redux';
import { getImageUrl } from '../../config';
import { getFavoriteMovieList, getGenreList, getMovies, addLog } from '../thunks';


class App extends React.Component {
  constructor(props) {
    super(props);

    props.onGetFavoriteMovieList();
    props.onGetGenreList();
    props.onGetMovieList();
    props.onGetLogs("Aplikacija uzkrauta");
  }

  changeGenre = (id, title) => {
      this.props.onGetMovieList(id);
      this.props.onGetLogs('Pakeistas zanras i ' + title);
  };

  render() {
    const { favoriteMovieList, genreList, movieList } = this.props;
    let filmList;

    (movieList === undefined || movieList.length === 0) ? filmList = favoriteMovieList : filmList = movieList;

    return (
      <div>
        <div>
          {genreList.map((listItem) => (
              <span
                  className="genre"
                  key={listItem.id}
                  onClick={() => this.changeGenre(listItem.id, listItem.name)}>
                {listItem.name}
              </span>
          ))}
        </div>
        <div>
          {filmList.map((listItem) => (
            <Card
              id={listItem.id}
              backgroundImage={getImageUrl(listItem.backdrop_path)}
              title={listItem.original_title}
              releaseDate={listItem.release_date}
              score={listItem.vote_average}
              votes={listItem.vote_count}
              description={listItem.overview}
              key={listItem.id}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  favoriteMovieList: state.movies.list,
  genreList: state.movies.genreList,
  movieList: state.movies.movieList,
  logs: state.movies.logs,
});

const mapDispatchToProps = (dispatch) => ({
  onGetFavoriteMovieList: () => dispatch(getFavoriteMovieList()),
  onGetGenreList: () => dispatch(getGenreList()),
  onGetMovieList: (id) => dispatch(getMovies(id)),
  onGetLogs: (log) => dispatch(addLog(log)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
