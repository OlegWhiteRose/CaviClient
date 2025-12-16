import '@/styles/filters.css';

interface FilterValues {
  title: string;
  ageGroup: string;
  diseaseType: string;
}

interface GroupsFilterProps {
  filters: FilterValues;
  onFilterChange: (filters: FilterValues) => void;
}

export const GroupsFilter = ({ filters, onFilterChange }: GroupsFilterProps) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="filters-form">
      <input
        type="text"
        className="search-input"
        placeholder="Поиск по наименованию"
        value={filters.title}
        onChange={(e) => onFilterChange({ ...filters, title: e.target.value })}
      />
      <div className="filters-row">
        <select
          className="filter-select"
          value={filters.ageGroup}
          onChange={(e) => onFilterChange({ ...filters, ageGroup: e.target.value })}
        >
          <option value="">Все возрасты</option>
          <option value="young">Молодые (до 35 лет)</option>
          <option value="middle">Средний возраст (36-50)</option>
          <option value="elderly">Пожилые (51+)</option>
        </select>
        <select
          className="filter-select"
          value={filters.diseaseType}
          onChange={(e) => onFilterChange({ ...filters, diseaseType: e.target.value })}
        >
          <option value="">Все типы заболеваний</option>
          <option value="diabetes">Сахарный диабет</option>
          <option value="hypertension">Гипертония</option>
        </select>
      </div>
    </form>
  );
};
