import { Link, Outlet } from 'react-router-dom';
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
    <main>
      <div className="layout">
        <Outlet />
      </div>
    </main>
  </>
);

