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

import styles from './app.module.css';
import '../../index.css';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/profile/orders' element={<ProfileOrders />} />
      <Route path='*' element={<NotFound404 />} />

      <Route path='/ingredients/:id' element={<ConstructorPage />} />
      <Route path='/feed/:number' element={<Feed />} />
      <Route path='/profile/orders/:number' element={<ProfileOrders />} />
    </Routes>
    <Routes>
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
