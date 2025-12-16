import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) {
    return null;
  }

  const items: { label: string; path: string; active: boolean }[] = [
    { label: 'Главная', path: '/', active: false },
  ];

  // Для страницы деталей группы добавляем ссылку на список групп
  if (pathnames[0] === 'cavi-group') {
    items.push({ label: 'Группы пациентов', path: '/groups', active: false });
    if (pathnames[1]) {
      items.push({ label: pathnames[1], path: location.pathname, active: true });
    }
  } else if (pathnames[0] === 'groups') {
    items.push({ label: 'Группы пациентов', path: '/groups', active: true });
  }

  return (
    <div className="bg-light border-bottom py-2 mb-3">
      <div className="layout">
        <Breadcrumb className="mb-0">
          {items.map((item) =>
            item.active ? (
              <Breadcrumb.Item key={item.path} active>
                {item.label}
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={item.path} linkAs={Link} linkProps={{ to: item.path }}>
                {item.label}
              </Breadcrumb.Item>
            ),
          )}
        </Breadcrumb>
      </div>
    </div>
  );
};
