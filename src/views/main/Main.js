import { useSelector } from 'react-redux';
import './Main.scss';
import EmployeesTable from '../../components/employees-table/EmployeesTable';
import Select from '../../components/select/Select';
import EmployeesFilter from '../../components/employees-filter/EmployeesFilter';

const stateEmployees = (state) => state.employees;
const stateRolesMap = (state) => state.rolesMap;

const sortOptions = [
  {
    value: '',
    label: 'По умолчанию',
    isDefault: true,
  },
  {
    value: 'name',
    label: 'Имени',
    isDefault: false,
  },
  {
    value: 'birthday',
    label: 'Дате рождения',
    isDefault: false,
  },
];

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

  const sortChangeHandler = (sortBy) => {
    console.log('sortBy', sortBy);
  };

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
        <Select selectChange={sortChangeHandler} label="Сортировать по" options={sortOptions} />
      </div>
      <EmployeesTable employees={employees} rolesMap={rolesMap} />
    </main>
  );
}

export default Main;
