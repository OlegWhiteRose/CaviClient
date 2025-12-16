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
    if (!id) return;

    // Сначала показываем мок
    const mockGroup = groupsMock.find((item) => item.id === Number(id));
    if (mockGroup) {
      setGroup(mockGroup);
    }

    // Пытаемся загрузить реальные данные
    const loadGroup = async () => {
      try {
        const response = await fetchGroup(Number(id));
        setGroup(response);
      } catch {
        console.log('Группа недоступна, используем mock');
        // Мок уже установлен выше
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

