import { useNavigate } from 'react-router-dom';
import requestIcon from '@/assets/images/request-link-icon.svg';
import '@/styles/home.css';

interface CalculationLinkProps {
  totalItems: number;
  calculationId: number | null;
}

export const CalculationLink = ({ totalItems, calculationId }: CalculationLinkProps) => {
  const navigate = useNavigate();

  if (totalItems > 0 && calculationId) {
    return (
      <button
        type="button"
        className="request-link"
        onClick={() => navigate(`/calculations/${calculationId}`)}
      >
        <div className="request-link-content">
          <img src={requestIcon} alt="Расчёт" className="request-link-icon" />
          <div className="request-link-number">{totalItems}</div>
        </div>
      </button>
    );
  }

  return (
    <div className="request-link request-link-disabled">
      <div className="request-link-content">
        <img src={requestIcon} alt="Расчёт" className="request-link-icon" />
        <div className="request-link-number">0</div>
      </div>
    </div>
  );
};
