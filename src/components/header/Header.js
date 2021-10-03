import './Header.scss';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <ul className="header__list">
          <li>
            <Link className="header__button" to="/">
              Главная
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
