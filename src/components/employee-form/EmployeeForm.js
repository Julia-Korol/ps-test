import './EmployeeForm.scss';
import { useForm } from 'react-hook-form';

function EmployeeForm({ formData, rolesOptions, submitEmployee }) {
  const { register, handleSubmit } = useForm({ defaultValues: formData });

  const onSubmit = (data) => {
    submitEmployee(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="employee-form">
      <div className="employee-form__element">
        <label className="employee-form__label" htmlFor="name">
          Имя сотрудника
        </label>
        <input
          className="employee-form__input"
          id="name"
          name="name"
          type="text"
          {...register('name')}
        ></input>
      </div>

      <div className="employee-form__element">
        <label className="employee-form__label" htmlFor="phone">
          Телефон
        </label>
        <input
          className="employee-form__input"
          id="phone"
          name="phone"
          type="text"
          {...register('phone')}
        ></input>
      </div>

      <div className="employee-form__element">
        <label className="employee-form__label" htmlFor="birthday">
          Дата рождения
        </label>
        <input
          className="employee-form__input"
          id="birthday"
          name="birthday"
          type="text"
          {...register('birthday')}
        ></input>
      </div>

      <div className="employee-form__element">
        <label className="employee-form__label" htmlFor="role">
          Должность
        </label>
        <select className="employee-form__input" name="role" id="role" {...register('role')}>
          {rolesOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="employee-form__element">
        <label className="employee-form__label employee-form__label--checkbox">
          В архиве
          <input
            className="employee-form__input employee-form__input--checkbox"
            id="isArchive"
            name="isArchive"
            type="checkbox"
            {...register('isArchive')}
          ></input>
        </label>
      </div>

      <button className="employee-form__button" type="submit">
        Сохранить
      </button>
    </form>
  );
}

export default EmployeeForm;
