import { Link, useLocation } from 'react-router-dom';
import '@/styles/breadcrumbs.css';

interface BreadcrumbItem {
  label: string;
  path: string;
}

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbs: BreadcrumbItem[] = [];

  // Добавляем главную страницу
  breadcrumbs.push({ label: 'Главная', path: '/' });

  // Генерируем breadcrumbs из пути
  let currentPath = '';
  pathnames.forEach((name) => {
    currentPath += `/${name}`;
    
    // Определяем label для каждого сегмента
    let label = name;
    
    if (name === 'cavi-group') {
      label = 'Услуга';
    } else if (name === 'calculations') {
      label = 'Расчёт';
    } else if (!isNaN(Number(name))) {
      // Если это ID, пропускаем
      return;
    }

    breadcrumbs.push({ label, path: currentPath });
  });

  // Если это страница деталей, добавляем ID в конец
  if (pathnames.length > 1 && !isNaN(Number(pathnames[pathnames.length - 1]))) {
    const id = pathnames[pathnames.length - 1];
    const parentPath = `/${pathnames.slice(0, -1).join('/')}`;
    
    // Переопределяем последний breadcrumb
    const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
    if (lastBreadcrumb) {
      lastBreadcrumb.label = `${lastBreadcrumb.label} #${id}`;
      lastBreadcrumb.path = `${parentPath}/${id}`;
    }
  }

  if (breadcrumbs.length <= 1) {
    return null; // Не показываем breadcrumbs на главной странице
  }

  return (
    <nav className="breadcrumbs">
      <div className="layout">
        <div className="breadcrumbs-container">
          {breadcrumbs.map((breadcrumb, index) => (
            <div key={breadcrumb.path} className="breadcrumb-item">
              {index < breadcrumbs.length - 1 ? (
                <>
                  <Link to={breadcrumb.path} className="breadcrumb-link">
                    {breadcrumb.label}
                  </Link>
                  <span className="breadcrumb-separator">/</span>
                </>
              ) : (
                <span className="breadcrumb-current">{breadcrumb.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};
