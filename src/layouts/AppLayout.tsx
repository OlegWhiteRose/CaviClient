import { Link, Outlet } from 'react-router-dom';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import '@/styles/base.css';

export const AppLayout = () => (
  <>
    <header>
      <div className="layout header-content">
        <Link to="/" className="header-link">
          CAVI калькулятор
        </Link>
        <nav className="header-nav">
          <Link to="/groups" className="nav-link">
            Группы пациентов
          </Link>
        </nav>
      </div>
    </header>
    <Breadcrumbs />
    <main>
      <div className="layout">
        <Outlet />
      </div>
    </main>
  </>
);

