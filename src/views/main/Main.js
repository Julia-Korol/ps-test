import { useSelector } from 'react-redux';
import './Main.scss';
import EmployeesTable from '../../components/employees-table/EmployeesTable';
import EmployeesFilter from '../../components/employees-filter/EmployeesFilter';

const stateEmployees = (state) => state.employees;
const stateRolesMap = (state) => state.rolesMap;

function Main() {
  const employees = useSelector(stateEmployees);
  const rolesMap = useSelector(stateRolesMap);

  const rolesOptions = [
    {
      value: '',
      label: 'Не важно',
      isDefault: true,
    },
    {
      value: 'cook',
      label: rolesMap.cook,
      isDefault: false,
    },
    {
      value: 'waiter',
      label: rolesMap.waiter,
      isDefault: false,
    },
    {
      value: 'driver',
      label: rolesMap.driver,
      isDefault: false,
    },
  ];

  const rolesFilterChangeHandler = (filterBy) => {
    console.log('filterBy', filterBy);
  };

  const isArchiveChangeHandler = (checkbox) => {
    console.log(checkbox);
  };

  return (
    <main className="main">
      <div className="main__filters-toolbar">
        <EmployeesFilter
          rolesFilterChange={rolesFilterChangeHandler}
          isArchiveChanged={isArchiveChangeHandler}
          rolesOptions={rolesOptions}
        />
      </div>
        <EmployeesTable employees={employees} rolesMap={rolesMap} />
      </div>
    </main>
  );
}

export default Main;
