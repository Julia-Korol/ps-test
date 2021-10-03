import EmployeeFormWrapper from '../../components/employee-form-wrapper/EmployeeFormWrapper';
import EmployeeForm from './../../components/employee-form/EmployeeForm';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { ACTIONS } from './../../store/index';
import { useHistory } from 'react-router';
import CenteredWrapper from './../../components/centered-wrapper/CenteredWrapper';

function EmployeeNew() {
  const rolesOptions = useSelector((state) => state.rolesOptions);
  const dispatch = useDispatch();
  const history = useHistory();

  const allowedRolesOptions = rolesOptions.filter(({ value }) => !!value);

  const submitEmployeehandler = (data) => {
    dispatch({ type: ACTIONS.ADD_EMPLOYEE, payload: { ...data, id: uuidv4() } });
    history.push('/');
  };

  return (
    <CenteredWrapper>
      <EmployeeFormWrapper title="Добавление нового сотрудника">
        <EmployeeForm rolesOptions={allowedRolesOptions} submitEmployee={submitEmployeehandler} />
      </EmployeeFormWrapper>
    </CenteredWrapper>
  );
}

export default EmployeeNew;
