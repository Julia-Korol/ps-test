import { useParams, useHistory } from 'react-router';
import EmployeeFormWrapper from './../../components/employee-form-wrapper/EmployeeFormWrapper';
import EmployeeForm from './../../components/employee-form/EmployeeForm';
import { useSelector, useDispatch } from 'react-redux';
import { ACTIONS } from '../../store';
import CenteredWrapper from './../../components/centered-wrapper/CenteredWrapper';

function EmployeeEdit() {
  const { id } = useParams();
  const employees = useSelector((state) => state.employees);
  const rolesOptions = useSelector((state) => state.rolesOptions);
  const dispatch = useDispatch();
  const history = useHistory();

  const employee = employees.find((employee) => employee.id.toString() === id);
  const allowedRolesOptions = rolesOptions.filter(({ value }) => !!value);

  const submitEmployeehandler = (data) => {
    dispatch({ type: ACTIONS.UPDATE_EMPLOYEE, payload: { ...data, id } });
    history.push('/');
  };

  return (
    <CenteredWrapper>
      <EmployeeFormWrapper title="Изменение данных сотрудника">
        {employee ? (
          <EmployeeForm
            rolesOptions={allowedRolesOptions}
            formData={employee}
            submitEmployee={submitEmployeehandler}
          />
        ) : (
          <h3>Данные о сотруднике не найдены</h3>
        )}
      </EmployeeFormWrapper>
    </CenteredWrapper>
  );
}

export default EmployeeEdit;
