import './Select.scss';

function Select({ selectChange, options, label, selectedOption }) {
  const onChangeHandler = (e) => {
    selectChange(e.target.value);
  };

  return (
    <label className="select__container">
      <span className="select__label">{label}</span>
      <select
        className="select__select"
        name="select"
        onChange={onChangeHandler}
        value={selectedOption}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default Select;
