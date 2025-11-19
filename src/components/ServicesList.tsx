import type { CaviCalculationGroup } from '@/types/cavi';
import defaultImage from '@/assets/images/default.jpg';

interface ServicesListProps {
  groups: CaviCalculationGroup[];
}

export const ServicesList = ({ groups }: ServicesListProps) => {
  if (!groups.length) {
    return <p className="empty-cart-message">Тут пусто</p>;
  }

  return (
    <div className="services-list">
      {groups.map((item) => (
        <div className="service-item" key={item.id}>
          <div className="service-info">
            <img
              src={item.group?.imageURL || defaultImage}
              alt={item.group?.name}
              className="service-image"
              onError={(event) => {
                (event.target as HTMLImageElement).src = defaultImage;
              }}
            />
            <div className="service-details">
              <h3>{item.group?.name}</h3>
              <p className="service-subtitle">{item.group?.description}</p>
            </div>
          </div>
          <div className="control-group CAVI-price-group">
            <div className="CAVI-price-group-content">
              <span className="price-value">{item.calculatedCAVI?.toFixed(3)}</span>
              <span className="price-label">Рассчитанный CAVI</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
