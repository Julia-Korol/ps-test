import './EmployeesFilter.scss';
import Select from '../select/Select';
import { rolesMap } from './../../constans/index';

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

function EmployeesFilter({
  rolesFilterChange,
  isArchiveChanged,
  selectedOption,
  isArchiveChecked,
}) {
  const onChangeHandler = (value) => {
    rolesFilterChange(value);
  };

  const onChangeCheckbox = (e) => {
    isArchiveChanged(e.target.checked);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="employees-filter__container">
      <div className="employees-filter__role">
        <Select
          options={rolesOptions}
          selectChange={onChangeHandler}
          label="Должность"
          selectedOption={selectedOption}
        />
      </div>
      <label className="employees-filter__check-label">
        В архиве
        <input
          onChange={onChangeCheckbox}
          className="employees-filter__check"
          checked={!!isArchiveChecked}
          type="checkbox"
        ></input>
      </label>
    </form>
  );
}

export default EmployeesFilter;
