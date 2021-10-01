import './Select.scss';

function Select({ selectChange, options, label }) {
  const onChangeHandler = (e) => {
    selectChange(e.target.value);
  };

  return (
    <label className="select__container">
      <span className="select__label">{label}</span>
      <select className="select__select" name="select" onChange={onChangeHandler}>
        {options.map(({ value, isDefault, label }) => (
          <option key={value} value={value} defaultValue={isDefault}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default Select;
