import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';

import { AppDispatch, useDispatch, useSelector } from '../../services/store';
import { fetchBurgerIngredients } from '../../services/slices/burgerIngredientsSlice';

interface TOrderInfoProps {
  type: 'feed' | 'profile';
}

export const OrderInfo: FC<TOrderInfoProps> = ({ type }: TOrderInfoProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { number } = useParams();

  /** TODO: взять переменные orderData и ingredients из стора */
  const orderData = useSelector((state) =>
    type == 'feed'
      ? state.feeds.feeds?.orders.find(
          (item) => item.number == parseInt(number!)
        )
      : state.orders.orders.find((item) => item.number == parseInt(number!))
  );

  const ingredients: TIngredient[] = useSelector(
    (state) => state.burgerIngredients.ingredients
  );

  useEffect(() => {
    dispatch(fetchBurgerIngredients());
  }, []);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
