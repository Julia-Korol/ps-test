import './EmployeeForm.scss';
import { useForm } from 'react-hook-form';
import { format, parse } from 'date-fns/esm';

const FORM_DATE_FORMAT = 'yyyy-MM-dd';
const API_DATE_FORMAT = 'dd.MM.yyyy';

const getNumbersValue = (value) => value.replace(/\D/g, '');

function EmployeeForm({ formData = null, rolesOptions, submitEmployee }) {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: formData && {
      ...formData,
      birthday: format(parse(formData.birthday, API_DATE_FORMAT, new Date()), FORM_DATE_FORMAT),
    },
  });

  const onSubmit = (data) => {
    submitEmployee({
      ...data,
      birthday:
        data?.birthday &&
        format(parse(data.birthday, FORM_DATE_FORMAT, new Date()), API_DATE_FORMAT),
    });
  };

  const setPhoneValue = (value) => {
    setValue('phone', value);
  };

  const onKeyDownHandler = ({ target, code }) => {
    if (code === 'Backspace' && getNumbersValue(target.value).length === 1) {
      setPhoneValue('');
    }
  };

  const onPastHandler = ({ target, clipboardData }) => {
    if (clipboardData && /\D/g.test(clipboardData.getData('Text'))) {
      setPhoneValue(getNumbersValue(target.value));
    }
  };

  const onInputHandler = ({ target, data }) => {
    let inputNumbersValue = getNumbersValue(target.value);

    if (!inputNumbersValue) {
      setPhoneValue('');

      return;
    }

    const { selectionStart, value } = target;

    if (value.length !== selectionStart) {
      if (data && /\D/g.test(data)) {
        setPhoneValue(inputNumbersValue);
      }

      return;
    }

    let formattedInputValue = '';

    if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] === '9') {
        inputNumbersValue = '7' + inputNumbersValue;
      }

      const firstSymbol = inputNumbersValue[0] === '8' ? '8' : '+7';
      formattedInputValue = firstSymbol + ' ';

      if (inputNumbersValue.length > 1) {
        formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
      }

      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
      }

      if (inputNumbersValue.length >= 8) {
        formattedInputValue += '-' + inputNumbersValue.substring(7, 11);
      }
    } else {
      formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
    }

    setPhoneValue(formattedInputValue);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="employee-form">
      <div className="employee-form__element">
        <label className="employee-form__label" htmlFor="name">
          Имя сотрудника*
        </label>
        <input
          className="employee-form__input"
          id="name"
          name="name"
          type="text"
          required
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
          type="tel"
          placeholder="+7 (XXX) XXX-XXXX"
          maxLength="18"
          onInput={onInputHandler}
          onKeyDown={onKeyDownHandler}
          onPaste={onPastHandler}
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
          type="date"
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

// import './EmployeeForm.scss';
// import { useForm } from 'react-hook-form';
// import { format, parse } from 'date-fns/esm';

// const FORM_DATE_FORMAT = 'yyyy-MM-dd';
// const API_DATE_FORMAT = 'dd.MM.yyyy';

// function EmployeeForm({ formData = null, rolesOptions, submitEmployee }) {
//   const { register, handleSubmit, setValue } = useForm({
//     defaultValues: formData && {
//       ...formData,
//       birthday: format(parse(formData.birthday, API_DATE_FORMAT, new Date()), FORM_DATE_FORMAT),
//     },
//   });

//   const onSubmit = (data) => {
//     submitEmployee({
//       ...data,
//       birthday:
//         data?.birthday &&
//         format(parse(data.birthday, FORM_DATE_FORMAT, new Date()), API_DATE_FORMAT),
//     });
//   };

//   const setPhoneValue = (value) => {
//     setValue('phone', value);
//   };

//   const getInputNumbersValue = ({ value }) => setPhoneValue(value.replace(/\D/g, ''));

//   const onKeyDownHandler = ({ keyCode, target }) => {
//     if (keyCode === 8 && getInputNumbersValue(target.input).length === 1) {
//       setPhoneValue('');
//     }
//   };

//   const onPastHandler = ({ clipboardData, target }) => {
//     const inputNumbersValue = getInputNumbersValue(target.input);

//     if (clipboardData && /\D/g.test(clipboardData.getData('Text'))) {
//       setPhoneValue(inputNumbersValue);
//     }
//   };

//   const onInputHandler = ({ data, target }) => {
//     let inputNumbersValue = getInputNumbersValue(target);

//     if (!inputNumbersValue) {
//       setPhoneValue('');

//       return;
//     }

//     if (target.value.length !== target.selectionStart) {
//       if (data && /\D/g.test(data)) {
//         setPhoneValue(inputNumbersValue);
//       }

//       return;
//     }

//     let formattedInputValue = '';

//     if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
//       if (inputNumbersValue[0] === '9') {
//         inputNumbersValue = '7' + inputNumbersValue;
//       }

//       const firstSymbols = inputNumbersValue[0] === '8' ? '8' : '+7';

//       formattedInputValue = firstSymbols + ' ';

//       if (inputNumbersValue.length > 1) {
//         formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
//       }

//       if (inputNumbersValue.length >= 5) {
//         formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
//       }

//       if (inputNumbersValue.length >= 8) {
//         formattedInputValue += '-' + inputNumbersValue.substring(7, 11);
//       }
//     } else {
//       formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
//     }

//     setPhoneValue(formattedInputValue);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="employee-form">
//       <div className="employee-form__element">
//         <label className="employee-form__label" htmlFor="name">
//           Имя сотрудника
//         </label>
//         <input
//           className="employee-form__input"
//           id="name"
//           name="name"
//           type="text"
//           {...register('name')}
//         ></input>
//       </div>

//       <div className="employee-form__element">
//         <label className="employee-form__label" htmlFor="phone">
//           Телефон
//         </label>
//         <input
//           className="employee-form__input"
//           id="phone"
//           name="phone"
//           type="tel"
//           placeholder="+7 (XXX) XXX-XXXX"
//           maxLength="18"
//           onInput={onInputHandler}
//           onKeyDown={onKeyDownHandler}
//           onPaste={onPastHandler}
//           {...register('phone')}
//         ></input>
//       </div>

//       <div className="employee-form__element">
//         <label className="employee-form__label" htmlFor="birthday">
//           Дата рождения
//         </label>
//         <input
//           className="employee-form__input"
//           id="birthday"
//           name="birthday"
//           type="date"
//           {...register('birthday')}
//         ></input>
//       </div>

//       <div className="employee-form__element">
//         <label className="employee-form__label" htmlFor="role">
//           Должность
//         </label>
//         <select className="employee-form__input" name="role" id="role" {...register('role')}>
//           {rolesOptions.map(({ value, label }) => (
//             <option key={value} value={value}>
//               {label}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="employee-form__element">
//         <label className="employee-form__label employee-form__label--checkbox">
//           В архиве
//           <input
//             className="employee-form__input employee-form__input--checkbox"
//             id="isArchive"
//             name="isArchive"
//             type="checkbox"
//             {...register('isArchive')}
//           ></input>
//         </label>
//       </div>

//       <button className="employee-form__button" type="submit">
//         Сохранить
//       </button>
//     </form>
//   );
// }

// export default EmployeeForm;
