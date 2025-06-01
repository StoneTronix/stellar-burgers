import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch, useSelector } from '../../services/store';
import { fetchOrders } from '../../services/slices/feedSlice';
import { fetchBurgerIngredients } from '../../services/slices/burgerIngredientsSlice';
import { TOrder } from '@utils-types';
import { FeedUI } from '@ui-pages';
import { Preloader } from '@ui';

export const Feed: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchBurgerIngredients());
  }, []);

  const orders: TOrder[] = useSelector(
    (state) => state.feeds.feeds?.orders || []
  );

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
