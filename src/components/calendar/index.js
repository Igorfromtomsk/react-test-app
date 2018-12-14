import React, {Component} from 'react';
import Cell from './cell/index';

class Day {
  constructor(day) {
    this.date = day.date;
    this.isThisMonth = day.isThisMonth;
    this.tasks = day.tasks;
    this.tasksAmount = day.tasksAmount;
    this.completedTasks = day.completedTasks;
  }
}

export default class Calendar extends Component {
  constructor(props) {
    super(props);

    const today = new Date();
    const date = {
      year: today.getFullYear(),
      month: today.getMonth(),
      day: today.getDay(),
      maxDays: new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
    };
    const daysWithTasks = {};

    this.props.currentMonthDays.forEach(dayWithTasks => {
      daysWithTasks[dayWithTasks.date] = dayWithTasks;
    });

    let firstMonthDay = new Date(date.year, date.month, 1).getDay();
    let daysAmount = date.maxDays + firstMonthDay + (8 - date.maxDays % 7);
    let days = Array(daysAmount).fill(null);

    days = days.map((day, i) => {
      let dayProps = {
        date: new Date(date.year, date.month, (i - firstMonthDay + 2)),
        isThisMonth: (i - firstMonthDay + 1) >= 0 && (i - firstMonthDay + 2) <= date.maxDays,
        tasksAmount: (daysWithTasks[i - firstMonthDay + 2])?daysWithTasks[i - firstMonthDay + 2].tasksAmount:null,
        completedTasks: (daysWithTasks[i - firstMonthDay + 2])?daysWithTasks[i - firstMonthDay + 2].completedTasks:null
      };

      return new Day(dayProps);
    });

    this.state = {
      date: date,
      days: days,
      cells: []
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  clickHandle(e, data) {
    if (data.isThisMonth) {
      this.setState({})
    }
  }

  makeCells() {
    let cells = this.state.days.slice();

    cells = cells.map((day, i) => {
      const classNames = [];
      const today = new Date().getDate();
      const hasUncompletedTasks = day.tasksAmount && day.tasksAmount > 0 && (day.tasksAmount - day.completedTasks);
      const isWeekend = new Date(day.date).getDay() === 6 || new Date(day.date).getDay() === 0;
      const allTaskIsCompleted = day.completedTasks && (day.completedTasks === day.tasksAmount);
      const hasOverdueTasks = day.tasksAmount &&
        ((today > new Date(day.date).getDate()) && day.isThisMonth) &&
        (!day.completedTasks || day.completedTasks < day.tasksAmount);

      if (day.isThisMonth) classNames.push('current-month');
      if (isWeekend) classNames.push('is-weekend');
      if (hasUncompletedTasks) classNames.push('has-uncompleted-tasks');
      if (allTaskIsCompleted) classNames.push('all-tasks-completed');
      if (hasOverdueTasks) classNames.push('has-overdue-tasks');

      return (
        <Cell
          key={i}
          className={classNames.join(' ')}
          onClick={(e) => {
            this.clickHandle(e, day)
          }}
        >
          {new Date(day.date).getDate()}
          <div className="cell-tasks-counter">
            {day.tasksAmount}
          </div>
        </Cell>
      )
    });

    return cells;
  }

  render() {
    let cells = this.makeCells();

    return (
      <div className="calendar">
        {cells}
      </div>
    );
  }
}