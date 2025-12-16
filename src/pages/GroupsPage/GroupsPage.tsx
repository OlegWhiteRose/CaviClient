import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGroups, getCartInfo, addGroupToDraft } from '@/api/cavi';
import { ensureAuth } from '@/api/auth';
import type { CaviGroup } from '@/types/cavi';
import { groupsMock, calculationMock } from '@/mocks/groups';
import { GroupsList } from '@/components/GroupsList';
import { CalculationLink } from '@/components/CalculationLink';
import {
  useFilters,
  setTitleAction,
  setAgeGroupAction,
  setDiseaseTypeAction,
  setCartAction,
} from '@/store';
import '@/styles/filters.css';

export const GroupsPage = () => {
  // Получаем фильтры из Redux store
  const filters = useFilters();
  const dispatch = useDispatch();

  const [groups, setGroups] = useState<CaviGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [calculationId, setCalculationId] = useState<number | null>(null);
  const [addingId, setAddingId] = useState<number | null>(null);

  // Фильтрация mock-данных при отсутствии бекенда
  const filterMockGroups = useCallback((f: typeof filters) => {
    return groupsMock.filter((group) => {
      const matchTitle = !f.title || group.name.toLowerCase().includes(f.title.toLowerCase());
      const matchAge = !f.ageGroup || group.ageGroup === f.ageGroup;
      const matchDisease = !f.diseaseType || group.diseaseType === f.diseaseType;
      return matchTitle && matchAge && matchDisease;
    });
  }, []);

  const loadCartInfo = useCallback(async () => {
    try {
      await ensureAuth();
      const info = await getCartInfo();
      setCartItems(info.items);
      setCalculationId(info.calculation_id || null);
      dispatch(setCartAction({ items: info.items, calculationId: info.calculation_id || null }));
    } catch {
      // При ошибке используем моки
      console.log('Корзина недоступна, используем mock');
      const mockItems = calculationMock.calculationGroups?.length ?? 0;
      const mockId = calculationMock.id;
      setCartItems(mockItems);
      setCalculationId(mockId);
      dispatch(setCartAction({ items: mockItems, calculationId: mockId }));
    }
  }, [dispatch]);

  const loadGroups = useCallback(
    async (f: typeof filters) => {
      setLoading(true);
      try {
        const response = await fetchGroups({
          title: f.title,
          ageGroup: f.ageGroup,
          disease: f.diseaseType,
        });
        setGroups(response);
      } catch {
        // При любой ошибке (сеть, CORS, бекенд недоступен) используем моки
        console.log('Бекенд недоступен, используем mock данные');
        setGroups(filterMockGroups(f));
      } finally {
        setLoading(false);
      }
    },
    [filterMockGroups],
  );

  useEffect(() => {
    // Сначала показываем моки, потом пытаемся загрузить с сервера
    setGroups(filterMockGroups(filters));
    const mockItems = calculationMock.calculationGroups?.length ?? 0;
    const mockId = calculationMock.id;
    setCartItems(mockItems);
    setCalculationId(mockId);
    dispatch(setCartAction({ items: mockItems, calculationId: mockId }));

    // Пытаемся загрузить реальные данные
    loadGroups(filters);
    loadCartInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    loadGroups(filters);
  };

  const handleAddGroup = async (groupId: number) => {
    setAddingId(groupId);
    try {
      await ensureAuth();
      await addGroupToDraft(groupId);
      await loadGroups(filters);
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
      <div className="filters-section">
        <h3>Фильтры</h3>
        <form onSubmit={handleSearch} className="filters-form">
          <input
            type="text"
            className="search-input"
            placeholder="Поиск по наименованию"
            value={filters.title}
            onChange={(e) => dispatch(setTitleAction(e.target.value))}
          />
          <div className="filters-row">
            <select
              className="filter-select"
              value={filters.ageGroup}
              onChange={(e) => dispatch(setAgeGroupAction(e.target.value))}
            >
              <option value="">Все возрасты</option>
              <option value="young">Молодые (до 35 лет)</option>
              <option value="middle">Средний возраст (36-50)</option>
              <option value="elderly">Пожилые (51+)</option>
            </select>
            <select
              className="filter-select"
              value={filters.diseaseType}
              onChange={(e) => dispatch(setDiseaseTypeAction(e.target.value))}
            >
              <option value="">Все типы заболеваний</option>
              <option value="diabetes">Сахарный диабет</option>
              <option value="hypertension">Гипертония</option>
            </select>
            <button type="submit" className="search-button">
              Применить
            </button>
          </div>
        </form>
      </div>
      <GroupsList groups={groups} loading={loading} addingId={addingId} onAddGroup={handleAddGroup} />
      <CalculationLink totalItems={totalItems} calculationId={calculationId} />
    </>
  );
};

