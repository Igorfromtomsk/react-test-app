import React, {Component} from 'react';
import './App.css';

import Calendar from './components/calendar/index';
import Details from './components/details/index';

class App extends Component {
  render() {
    const currentDay = {
      date: new Date(),
      isThisMonth: true,
      tasks: [],
      tasksAmount: 2,
      completedTasks: 1
    };
    const currentMonthDays = [
      { date: 2, tasksAmount: 2, completedTasks: 1 },
      { date: 5, tasksAmount: 1, completedTasks: 1 },
      { date: 16, tasksAmount: 4, completedTasks: 4 },
      { date: 20, tasksAmount: 2, completedTasks: 1 },
      { date: 29, tasksAmount: 3, completedTasks: 2 },
    ];

    return (
      <div className="App">
        <Calendar currentMonthDays={currentMonthDays}/>
        <Details currentDay={currentDay}/>
      </div>
    );
  }
}

export default App;
