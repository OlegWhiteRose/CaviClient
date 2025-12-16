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
        </nav>
        {calculationId && cartItems > 0 && (
          <div className="mobile-cart">
            <Link to={`/calculations/${calculationId}`} className="mobile-cart-link" onClick={onClose}>
              <img src={requestIcon} alt="Корзина" className="mobile-cart-icon" />
              <span>Корзина</span>
              <span className="mobile-cart-badge">{cartItems}</span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
