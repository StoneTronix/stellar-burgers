import { Route, Routes, useNavigate } from 'react-router-dom';

import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { ProtectedRoute } from '@components';

import styles from './app.module.css';
import '../../index.css';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route
        path='/login'
        element={
          <ProtectedRoute type='login'>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route
        path='/profile'
        element={
          <ProtectedRoute type='protected'>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path='/profile/orders'
        element={
          <ProtectedRoute type='protected'>
            <ProfileOrders />
          </ProtectedRoute>
        }
      />
      <Route path='*' element={<NotFound404 />} />

      <Route path='/ingredients/:id' element={<ConstructorPage />} />
      <Route path='/feed/:number' element={<Feed />} />

      <Route path='/profile/orders/:number' element={<ProfileOrders />} />
      <Route
        path='/feed/:number'
        element={
          <Modal title={''} onClose={() => {}}>
            <OrderInfo />
          </Modal>
        }
      />
      <Route
        path='/ingredients/:id'
        element={
          <Modal title='Детали ингредиента' onClose={() => {}}>
            <IngredientDetails />
          </Modal>
        }
      />
      <Route path='/profile/orders/:number' element={<OrderInfo />} />
    </Routes>
  </div>
);

export default App;
