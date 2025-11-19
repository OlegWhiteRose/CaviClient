import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGroup } from '@/api/cavi';
import type { CaviGroup } from '@/types/cavi';
import { groupsMock } from '@/mocks/groups';
import defaultImage from '@/assets/images/default.jpg';
import '@/styles/group.css';
import '@/styles/card.css';

export const GroupPage = () => {
  const { id } = useParams();
  const [group, setGroup] = useState<CaviGroup | null>(null);

  useEffect(() => {
    const loadGroup = async () => {
      if (!id) return;
      try {
        const response = await fetchGroup(Number(id));
        setGroup(response);
      } catch (err) {
        console.error(err);
        const fallback = groupsMock.find((item) => item.id === Number(id));
        if (fallback) {
          setGroup(fallback);
        }
      }
    };
    loadGroup();
  }, [id]);

  return (
    <div className="cavi-group-page">
      {group && (
        <div className="card large">
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
        </div>
      )}
    </div>
  );
};

