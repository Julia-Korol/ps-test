import './EmployeeFormWrapper.scss';

function EmployeeFormWrapper({ children, title }) {
  return (
    <div className="employee-form-wrapper">
      <h2 className="employee-form-wrapper__title">{title}</h2>
      {children}
    </div>
  );
}

export default EmployeeFormWrapper;
