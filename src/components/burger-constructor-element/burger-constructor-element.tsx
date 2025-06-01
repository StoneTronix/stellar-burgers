import { FC, useRef, memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { BurgerConstructorElementProps } from './type';
import { AppDispatch, useDispatch } from '../../services/store';
import {
  moveIngredient,
  removeIngredient
} from '../../services/slices/burgerConstructorSlice';
import { BurgerConstructorElementUI } from '@ui';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch: AppDispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(moveIngredient({ fromIndex: index, toIndex: index + 1 }));
    };

    const handleMoveUp = () => {
      dispatch(moveIngredient({ fromIndex: index, toIndex: index - 1 }));
    };

    const handleClose = () => {
      dispatch(removeIngredient(index));
    };

    const ref = useRef<HTMLLIElement>(null);

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
