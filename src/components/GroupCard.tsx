import { Link } from 'react-router-dom';
import type { CaviGroup } from '@/types/cavi';
import defaultImage from '@/assets/images/default.jpg';
import '@/styles/card.css';

interface GroupCardProps {
  group: CaviGroup;
  showAddButton?: boolean;
  onAdd?: (groupId: number) => void;
  isAdding?: boolean;
}

export const GroupCard = ({ group, showAddButton = false, onAdd, isAdding }: GroupCardProps) => (
  <div className="card">
    <div className="content">
      <img
        src={group.imageURL || defaultImage}
        alt={group.name}
        onError={(event) => {
          (event.target as HTMLImageElement).src = defaultImage;
        }}
      />
      <div className="details">
        <div className="title">{group.name}</div>
        <div className="text">{group.description}</div>
      </div>
    </div>
    <div className="card-actions">
      <Link to={`/cavi-group/${group.id}`}>
        <button type="button">Подробнее</button>
      </Link>
      {showAddButton && onAdd && (
        <button
          type="button"
          disabled={group.isSelected || isAdding}
          onClick={() => onAdd(group.id)}
        >
          {group.isSelected ? 'Добавлено' : 'Добавить'}
        </button>
      )}
    </div>
  </div>
);
