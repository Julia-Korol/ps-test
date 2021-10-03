import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Main from './views/main/Main';
import { ACTIONS } from './store';
import EmployeeNew from './views/employee-new/EmployeeNew';
import EmployeeEdit from './views/employee-edit/EmployeeEdit';
import Header from './components/header/Header';
import NotFound from './views/not-found/NotFound';

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
      <Header />
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/employees/:id/edit">
          <EmployeeEdit />
        </Route>
        <Route path="/employees/new">
          <EmployeeNew />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
