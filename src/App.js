import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Main from './views/main/Main';
import { ACTIONS } from './store';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/employees.json')
      .then((response) => response.json())
      .then((employees) => {
        dispatch({ type: ACTIONS.SET_EMPLOYEES, payload: employees });
      });
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/employees/:id/edit">Editing</Route>
      </Switch>
    </Router>
  );
}

export default App;
