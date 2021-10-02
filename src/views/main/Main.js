import { useSelector } from 'react-redux';
import qs from 'qs';
import { useHistory, useLocation } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import './Main.scss';
import EmployeesTable from '../../components/employees-table/EmployeesTable';
import Select from '../../components/select/Select';
import EmployeesFilter from '../../components/employees-filter/EmployeesFilter';
import { getTime, parse } from 'date-fns/esm';

const stateEmployees = (state) => state.employees;

const sortOptions = [
  {
    value: '',
    label: 'По умолчанию',
  },
  {
    value: 'name',
    label: 'Имени',
  },
  {
    value: 'birthday',
    label: 'Дате рождения',
  },
];

const sortEmployees = (sortBy = '', employees = []) => {
  switch (sortBy) {
    case 'name':
      return employees.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    case 'birthday':
      return employees.sort((a, b) => {
        return (
          getTime(parse(a.birthday, 'dd.MM.yyyy', new Date())) -
          getTime(parse(b.birthday, 'dd.MM.yyyy', new Date()))
        );
      });
    default:
      return employees;
  }
};

const filterEmployees = (filterBy = '', employees = []) => {
  if (!filterBy) {
    return employees;
  }

  return employees.filter(({ role }) => role === filterBy);
};

const filterByArchive = (isArchive = false, employees) => {
  return employees.filter((employee) => employee.isArchive === isArchive);
};

function Main() {
  const employees = useSelector(stateEmployees);
  const history = useHistory();
  const location = useLocation();
  const [urlParams, setUrlParams] = useState({});
  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  const parseUrl = useCallback(
    () => qs.parse(location.search, { ignoreQueryPrefix: true }),
    [location.search]
  );

  const getFilteredEmployees = useCallback(() => {
    const sortedEmployees = sortEmployees(urlParams?.sortBy, [...employees]);
    const filteredEmployees = filterEmployees(urlParams?.filterBy, sortedEmployees);

    return filterByArchive(!!urlParams?.isArchive, filteredEmployees);
  }, [employees, urlParams.filterBy, urlParams.isArchive, urlParams.sortBy]);

  useEffect(() => {
    setUrlParams(parseUrl());
  }, [location.search, parseUrl]);

  useEffect(() => {
    setFilteredEmployees(getFilteredEmployees());
  }, [getFilteredEmployees, setFilteredEmployees]);

  const replaceQueryParams = (param) => {
    history.replace({
      search: qs.stringify({
        ...parseUrl(),
        ...param,
      }),
    });
  };

  const sortChangeHandler = (sortBy) => {
    replaceQueryParams({ sortBy });
  };

  const rolesFilterChangeHandler = (filterBy) => {
    replaceQueryParams({ filterBy });
  };

  const isArchiveChangeHandler = (checked) => {
    replaceQueryParams({ isArchive: checked || null });
  };

  return (
    <main className="main">
      <div className="main__filters-toolbar">
        <EmployeesFilter
          rolesFilterChange={rolesFilterChangeHandler}
          isArchiveChanged={isArchiveChangeHandler}
          selectedOption={urlParams?.filterBy}
          isArchiveChecked={urlParams?.isArchive}
        />
        <Select
          selectChange={sortChangeHandler}
          label="Сортировать по"
          options={sortOptions}
          selectedOption={urlParams?.sortBy}
        />
      </div>
      <EmployeesTable employees={filteredEmployees} />
    </main>
  );
}

export default Main;
