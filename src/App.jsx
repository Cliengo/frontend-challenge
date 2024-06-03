import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={TaskList} />
          <Route path="/edit/:id" component={TaskForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
