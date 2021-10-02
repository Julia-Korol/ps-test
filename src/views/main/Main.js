import { useSelector } from 'react-redux';
import qs from 'qs';
import './Main.scss';
import EmployeesTable from '../../components/employees-table/EmployeesTable';
import Select from '../../components/select/Select';
import EmployeesFilter from '../../components/employees-filter/EmployeesFilter';
import { rolesMap } from '../../constans';
import { useHistory, useLocation } from 'react-router';
import { useCallback, useEffect, useState } from 'react';

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

const rolesOptions = [
  {
    value: '',
    label: 'Не важно',
  },
  {
    value: 'cook',
    label: rolesMap.cook,
  },
  {
    value: 'waiter',
    label: rolesMap.waiter,
  },
  {
    value: 'driver',
    label: rolesMap.driver,
  },
];

function Main() {
  const employees = useSelector(stateEmployees);
  const history = useHistory();
  const location = useLocation();
  const [urlParams, setUrlParams] = useState({});

  const parseUrl = useCallback(
    () => qs.parse(location.search, { ignoreQueryPrefix: true }),
    [location.search]
  );

  useEffect(() => {
    setUrlParams(parseUrl());
  }, [location.search, parseUrl]);

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
          rolesOptions={rolesOptions}
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
      <EmployeesTable employees={employees} />
    </main>
  );
}

export default Main;
