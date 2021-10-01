const initialState = {
  employees: [],
  rolesMap: {
    driver: 'Водитель',
    waiter: 'Официант',
    cook: 'Повар',
  },
};

export const ACTIONS = {
  SET_EMPLOYEES: 'SET_EMPLOYEES',
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_EMPLOYEES:
      return { ...state, employees: action.payload };
    default:
      return state;
  }
}
