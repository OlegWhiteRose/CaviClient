import { Link } from 'react-router-dom';
import requestIcon from '@/assets/images/request-link-icon.svg';
import '@/styles/mobile-menu.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  cartItems?: number;
  calculationId?: number | null;
}

export const MobileMenu = ({
  isOpen,
  onClose,
  currentPath,
  cartItems = 0,
  calculationId,
}: MobileMenuProps) => {
  return (
    <>
      <div className={`mobile-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <span>Меню</span>
          <button type="button" className="mobile-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <nav className="mobile-nav">
          <Link
            to="/"
            className={`mobile-nav-link ${currentPath === '/' ? 'active' : ''}`}
            onClick={onClose}
          >
            Главная
          </Link>
          <Link
            to="/groups"
            className={`mobile-nav-link ${currentPath === '/groups' ? 'active' : ''}`}
            onClick={onClose}
          >
            Группы пациентов
          </Link>
          {calculationId && cartItems > 0 && (
            <Link
              to={`/calculations/${calculationId}`}
              className={`mobile-nav-link mobile-nav-cart ${currentPath.includes('/calculations/') ? 'active' : ''}`}
              onClick={onClose}
            >
              <img src={requestIcon} alt="" className="mobile-nav-cart-icon" />
              <span>Корзина</span>
              <span className="mobile-nav-badge">{cartItems}</span>
            </Link>
          )}
        </nav>
      </div>
    </>
  );
};
