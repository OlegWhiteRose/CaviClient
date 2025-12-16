import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { HomePage } from '@/pages/HomePage/HomePage';
import { GroupsPage } from '@/pages/GroupsPage/GroupsPage';
import { GroupPage } from '@/pages/GroupPage/GroupPage';

const App = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<HomePage />} />
      <Route path="groups" element={<GroupsPage />} />
      <Route path="cavi-group/:id" element={<GroupPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);

export default App;
