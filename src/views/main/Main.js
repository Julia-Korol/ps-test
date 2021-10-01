import { useSelector } from 'react-redux';
import './Main.scss';
import EmployeesTable from '../../components/employees-table/EmployeesTable';

const stateEmployees = (state) => state.employees;
const stateRolesMap = (state) => state.rolesMap;

function Main() {
  const employees = useSelector(stateEmployees);
  const rolesMap = useSelector(stateRolesMap);

  return (
    <main>
      <div className="main__table-wrapper">
        <EmployeesTable employees={employees} rolesMap={rolesMap} />
      </div>
    </main>
  );
}

export default Main;
