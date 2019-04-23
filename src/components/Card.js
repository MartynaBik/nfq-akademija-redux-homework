import React from 'react';
import {addLog, getHearted} from "../thunks";
import { connect } from "react-redux";

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false,
    };
  }

  isHearted = (id, title) => {
      let heartedList = this.props.heartedList;
      const isHearted = heartedList.includes(id);

      if (isHearted) {
          this.unSetHeart(id, title);
          heartedList = heartedList.filter(item => item !== id);
      }
      else {
          this.setHeart(id, title);
          heartedList.push(id);
      }
      return this.props.onGetHearted(heartedList);
  };

  setHeart = (id, title) => {
     this.props.onGetLogs('Uzdeta sirdele filmui ' + title);
  };

  unSetHeart = (id, title) => {
     this.props.onGetLogs('Nuimta sirdele filmui ' + title);
  };

  render() {
    const {
      backgroundImage,
      title,
      releaseDate,
      score,
      votes,
      description,
      id
    } = this.props;
    const { opened } = this.state;

    return (
      <div className="card">

        <div
          className="card__image"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
        />

        <div className="card__title">
          {title}
        </div>

        <div className="card__like">
            <i className={(this.props.heartedList.includes(id)) ? 'fa fa-heart': "fa fa-heart-o"}
               onClick={() => this.isHearted(id, title)}
            />
        </div>

        <div className="card__subtitle">
            <span>{releaseDate}</span>
            <span>{score} ({votes} votes)</span>
        </div>

        <div className="card-info">
        <div
          className="card-info__header"
          onClick={() => this.setState({ opened: !opened })}>
          Summary
        </div>

          {opened
            ? (
              <div className="card-info__description">
                {description}
              </div>
            )
            : null
          }
    </div>
</div>

    );
  }
}

const mapStateToProps = (state) => ({
    heartedList: state.movies.hearted,
    logs: state.movies.logs,
});

const mapDispatchToProps = (dispatch) => ({
    onGetHearted: (list) => dispatch(getHearted(list)),
    onGetLogs: (log) => dispatch(addLog(log)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Card);
