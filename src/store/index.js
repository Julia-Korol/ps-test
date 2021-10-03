import { rolesMap } from './../constans/index';

const initialState = {
  employees: [],
  rolesOptions: [
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
  ],
};

export const ACTIONS = {
  SET_EMPLOYEES: 'SET_EMPLOYEES',
  UPDATE_EMPLOYEE: 'UPDATE_EMPLOYEE',
  ADD_EMPLOYEE: 'ADD_EMPLOYEE',
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_EMPLOYEES:
      return { ...state, employees: action.payload };
    case ACTIONS.UPDATE_EMPLOYEE:
      const updatedEmployees = [...state.employees];
      const employeeIndex = updatedEmployees.findIndex(
        ({ id }) => id.toString() === action.payload.id
      );

      updatedEmployees.splice(employeeIndex, 1, action.payload);

      return { ...state, employees: updatedEmployees };
    case ACTIONS.ADD_EMPLOYEE:
      return { ...state, employees: [...state.employees, action.payload] };
    default:
      return state;
  }
}
