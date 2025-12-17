import type { CaviGroup } from '@/types/cavi';
import { getProxiedImageUrl } from '@/utils/imageUrl';
import defaultImage from '@/assets/images/default.jpg';
import '@/styles/card.css';

interface GroupDetailProps {
  group: CaviGroup | null;
}

export const GroupDetail = ({ group }: GroupDetailProps) => {
  if (!group) {
    return null;
  }

  return (
    <div className="card large">
      <div className="content">
        <img
          src={getProxiedImageUrl(group.imageURL) || defaultImage}
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
    </div>
  );
};
