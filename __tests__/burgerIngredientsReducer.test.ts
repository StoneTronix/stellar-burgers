import { burgerIngredientsSlice, fetchBurgerIngredients } from '../src/services/slices/burgerIngredientsSlice';
import { TIngredient } from '../src/utils/types';

jest.mock('../src/utils/burger-api', () => ({
  getIngredientsApi: jest.fn(),
}));

describe('Редьюсер слайса burgerIngredientsSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Ожидание fetchBurgerIngredients', () => {
    const initialState = burgerIngredientsSlice.getInitialState();
    const action = fetchBurgerIngredients.pending('requestId');
    const state = burgerIngredientsSlice.reducer(initialState, action);

    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('Выполнение fetchBurgerIngredients', () => {
    const ingredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Ingredient 1',
        type: 'main',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 100,
        price: 50,
        image: 'image1.png',
        image_mobile: 'image1_mobile.png',
        image_large: 'image1_large.png'          
      },
    ];
    const initialState = burgerIngredientsSlice.getInitialState();
    const action = fetchBurgerIngredients.fulfilled(ingredients, 'requestId');
    const state = burgerIngredientsSlice.reducer(initialState, action);

    expect(state.status).toBe('succeeded');
    expect(state.ingredients).toEqual(ingredients);
    expect(state.error).toBeNull();
  });

  it('Отказ fetchBurgerIngredients', () => {
    const initialState = burgerIngredientsSlice.getInitialState();
    const action = fetchBurgerIngredients.rejected(new Error('Failed to fetch'), 'requestId');
    const state = burgerIngredientsSlice.reducer(initialState, action);

    expect(state.status).toBe('failed');
    expect(state.error).toBe('Failed to fetch');
  });
});
