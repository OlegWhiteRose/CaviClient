import { useCallback, useEffect, useState } from 'react';
import { fetchGroups, getCartInfo, addGroupToDraft } from '@/api/cavi';
import { ensureAuth } from '@/api/auth';
import type { CaviGroup } from '@/types/cavi';
import { groupsMock, calculationMock } from '@/mocks/groups';
import { SearchForm } from '@/components/SearchForm';
import { GroupsList } from '@/components/GroupsList';
import { CalculationLink } from '@/components/CalculationLink';

export const GroupsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [groups, setGroups] = useState<CaviGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [calculationId, setCalculationId] = useState<number | null>(null);
  const [addingId, setAddingId] = useState<number | null>(null);

  const fallbackGroups = useCallback(() => {
    return groupsMock.filter((group) =>
      searchValue ? group.name.toLowerCase().includes(searchValue.toLowerCase()) : true,
    );
  }, [searchValue]);

  const loadCartInfo = useCallback(async () => {
    try {
      await ensureAuth();
      const info = await getCartInfo();
      setCartItems(info.items);
      setCalculationId(info.calculation_id || null);
    } catch {
      setCartItems(calculationMock.calculationGroups?.length ?? 0);
      setCalculationId(calculationMock.id);
    }
  }, []);

  const loadGroups = useCallback(async (query: string = '') => {
    setLoading(true);
    try {
      const response = await fetchGroups({ title: query });
      setGroups(response);
    } catch (err) {
      console.error(err);
      setGroups(fallbackGroups());
    } finally {
      setLoading(false);
    }
  }, [fallbackGroups]);

  useEffect(() => {
    loadGroups();
    loadCartInfo();
  }, [loadGroups, loadCartInfo]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    loadGroups(searchValue);
  };

  const handleAddGroup = async (groupId: number) => {
    setAddingId(groupId);
    try {
      await ensureAuth();
      await addGroupToDraft(groupId);
      await loadGroups();
      await loadCartInfo();
    } catch (err) {
      console.error('Не удалось добавить услугу в расчет', err);
    } finally {
      setAddingId(null);
    }
  };

  const totalItems = cartItems || groups.filter((group) => group.isSelected).length;

  return (
    <>
      <SearchForm
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSubmit={handleSearch}
      />
      <GroupsList
        groups={groups}
        loading={loading}
        addingId={addingId}
        onAddGroup={handleAddGroup}
      />
      <CalculationLink totalItems={totalItems} calculationId={calculationId} />
    </>
  );
};

