import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MobileMenu } from '@/components/MobileMenu';
import { useCart } from '@/store';
import '@/styles/base.css';

export const AppLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const cart = useCart();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header>
        <div className="layout header-content">
          <Link to="/" className="header-link">
            CAVI калькулятор
          </Link>
          <nav className="header-nav desktop-only">
            <Link to="/groups" className="nav-link">
              Группы пациентов
            </Link>
          </nav>
          <button
            type="button"
            className="burger-btn mobile-only"
            onClick={toggleMenu}
            aria-label="Меню"
          >
            <span className={`burger-icon ${menuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </header>
      <MobileMenu
        isOpen={menuOpen}
        onClose={closeMenu}
        currentPath={location.pathname}
        cartItems={cart.items}
        calculationId={cart.calculationId}
      />
      <Breadcrumbs />
      <main>
        <div className="layout">
          <Outlet />
        </div>
      </main>
    </>
  );
};

