import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGroup } from '@/api/cavi';
import type { CaviGroup } from '@/types/cavi';
import { groupsMock } from '@/mocks/groups';
import { GroupDetail } from '@/components/GroupDetail';
import '@/styles/group.css';

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
      <GroupDetail group={group} />
    </div>
  );
};

