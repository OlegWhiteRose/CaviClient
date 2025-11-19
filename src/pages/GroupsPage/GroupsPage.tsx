import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useNavigate, Link } from 'react-router-dom';
import defaultImage from '@/assets/images/default.jpg';
import requestIcon from '@/assets/images/request-link-icon.svg';
import { fetchGroups, getCartInfo, addGroupToDraft } from '@/api/cavi';
import { ensureAuth } from '@/api/auth';
import type { CaviGroup } from '@/types/cavi';
import { groupsMock, calculationMock } from '@/mocks/groups';
import '@/styles/home.css';
import '@/styles/card.css';

export const GroupsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [groups, setGroups] = useState<CaviGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [calculationId, setCalculationId] = useState<number | null>(null);
  const [addingId, setAddingId] = useState<number | null>(null);
  const navigate = useNavigate();

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
      <form action="/" method="GET" onSubmit={handleSearch}>
        <input
          className="search-input"
          type="text"
          name="caviGroupTitle"
          placeholder="Поиск по наименованию"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </form>
      <div className={classNames('cards', { containerLoading: loading })}>
        {groups.map((group) => (
          <div className="card" key={group.id}>
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
              <button
                type="button"
                disabled={group.isSelected || addingId === group.id}
                onClick={() => handleAddGroup(group.id)}
              >
                {group.isSelected ? 'Добавлено' : 'Добавить'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalItems > 0 && calculationId ? (
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
      ) : (
        <div className="request-link request-link-disabled">
          <div className="request-link-content">
            <img src={requestIcon} alt="Расчёт" className="request-link-icon" />
            <div className="request-link-number">0</div>
          </div>
        </div>
      )}
    </>
  );
};

