import classNames from 'classnames';
import type { CaviGroup } from '@/types/cavi';
import { GroupCard } from './GroupCard';
import '@/styles/home.css';

interface GroupsListProps {
  groups: CaviGroup[];
  loading: boolean;
  addingId: number | null;
  onAddGroup: (groupId: number) => void;
}

export const GroupsList = ({ groups, loading, addingId, onAddGroup }: GroupsListProps) => (
  <div className={classNames('cards', { containerLoading: loading })}>
    {groups.map((group) => (
      <GroupCard
        key={group.id}
        group={group}
        onAdd={onAddGroup}
        isAdding={addingId === group.id}
      />
    ))}
  </div>
);
