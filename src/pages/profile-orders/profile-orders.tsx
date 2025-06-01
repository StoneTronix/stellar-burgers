import { FC, useEffect } from 'react';

import { TOrder } from '@utils-types';
import { AppDispatch, useDispatch, useSelector } from '../../services/store';
import { getOrders } from '../../services/slices/ordersSlice';
import { ProfileOrdersUI } from '@ui-pages';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch: AppDispatch = useDispatch();
  const orders: TOrder[] = useSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
