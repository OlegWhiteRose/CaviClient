import { Link, Outlet } from 'react-router-dom';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import '@/styles/base.css';

export const AppLayout = () => (
  <>
    <header>
      <div className="layout">
        <Link to="/" className="header-link">
          CAVI калькулятор
        </Link>
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

