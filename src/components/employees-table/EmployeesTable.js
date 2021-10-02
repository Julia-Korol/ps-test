import { Link } from 'react-router-dom';
import { rolesMap } from '../../constans';
import './EmployeesTable.scss';

function EmployeesTable({ employees }) {
  return (
    <table className="employeess-table">
      <thead className="employeess-table__head">
        <tr className="employeess-table__row">
          <th className="employeess-table__cell">Имя</th>
          <th className="employeess-table__cell">Должность</th>
          <th className="employeess-table__cell">Номер телефона</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(({ id, name, role, phone }) => (
          <tr key={id} className="employeess-table__row">
            <td className="employeess-table__cell">
              <Link to={`employees/${id}/edit`}>{name}</Link>
            </td>
            <td className="employeess-table__cell">{rolesMap[role]}</td>
            <td className="employeess-table__cell">
              <a href={`tel:${phone}`}>{phone}</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeesTable;
