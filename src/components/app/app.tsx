import { useEffect } from 'react';
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
import { AppDispatch, useDispatch, useSelector } from '../../services/store';
import { getUser } from '../../services/slices/userSlice';

import styles from './app.module.css';
import '../../index.css';

const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthChecked } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthChecked) dispatch(getUser());
  }, []);

  return (
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
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute type='protected'>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Routes>
        <Route
          path='/feed/:number'
          element={
            <Modal
              title={''}
              onClose={() => {
                navigate('/feed');
              }}
            >
              <OrderInfo type='feed' />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal
              title='Детали ингредиента'
              onClose={() => {
                navigate('/');
              }}
            >
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute type='protected'>
              <Modal
                title={''}
                onClose={() => {
                  navigate('/profile/orders');
                }}
              >
                <OrderInfo type='profile' />
              </Modal>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
