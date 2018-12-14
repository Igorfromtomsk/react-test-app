import React, {Component} from 'react';



export default class Details extends Component {
  constructor(props) {
    super(props);
  }

  detailsBody() {
    const tasksAmount = this.props.currentDay.tasksAmount;

    if (tasksAmount > 0) {
      return (
        <div className="details-body">
          {/*{tasks}*/}
        </div>
      )
    } else {
      return (
        <div className="details-body">
          there is no tasks yet, sorry
        </div>
      )
    }
  }

  detailsAmount() {
    const tasksAmount = this.props.currentDay.tasksAmount;

    if (tasksAmount > 0) {
      return (
        <div className="details-tasks-counter">
          <small>{tasksAmount.toString() + ((tasksAmount > 1)?' tasks left':' task left')}</small>
        </div>
      )
    }
  }

  render() {
    const date = this.props.currentDay.date;
    const formatter = new Intl.DateTimeFormat('ru', {day: 'numeric', month: 'long'}); //todo: put global locale here
    const dateNumber = formatter.format(date);

    return (
      <div className="details">
        <div className="details-inner">
          <div className="details-header">
            <h2>{dateNumber}</h2>
            {this.detailsAmount()}
          </div>
          {this.detailsBody()}
        </div>
      </div>
    )
  }
}