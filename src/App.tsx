import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { GroupsPage } from '@/pages/GroupsPage/GroupsPage';
import { GroupPage } from '@/pages/GroupPage/GroupPage';
import { CalculationPage } from '@/pages/CalculationPage/CalculationPage';

const App = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<GroupsPage />} />
      <Route path="cavi-group/:id" element={<GroupPage />} />
      <Route path="calculations/:id" element={<CalculationPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);

export default App;
