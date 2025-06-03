import { TUser } from '../src/utils/types';
import { TLoginData, TAuthResponse } from '../src/utils/burger-api';
import { 
  userSlice, 
  loginUser, 
  getUser, 
  updateUser, 
  logoutUser 
} from '../src/services/slices/userSlice';

jest.mock('../src/utils/burger-api', () => ({
    loginUserApi: jest.fn(),
    registerUserApi: jest.fn(),
    logoutApi: jest.fn(),
    getUserApi: jest.fn(),
    updateUserApi: jest.fn()
}));

describe('Тестирование userSlice', () => {
    beforeEach(() => {
      jest.clearAllMocks();   
    });

    const loginData: TLoginData = {
      email: 'test@example.com',
      password: 'password123',
    };

    const user: TUser = {
      email: 'test@example.com',
      name: 'Test User',
    };

    const apiResponse: TAuthResponse = {
      success: true,
      user,
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    };

    describe('Тестирование loginUser', () => {
        it('Ожидание loginUser', () => {
          const initialState = userSlice.getInitialState();
          const action = loginUser.pending('requestId', loginData);
          const state = userSlice.reducer(initialState, action);
  
          expect(state.isLoading).toBe(true);
          expect(state.isAuthChecked).toBe(true);
          expect(state.user).toBeNull();
        });
    
        it('Выполнение loginUser', async () => {
          const loginUserApi = require('../src/utils/burger-api').loginUserApi;
          loginUserApi.mockResolvedValue(apiResponse);
  
  
          const initialState = userSlice.getInitialState();
          const action = loginUser.fulfilled(user, 'requestId', loginData);
          const state = userSlice.reducer(initialState, action);
          
          expect(state.user).toEqual(user);
          expect(state.isLoading).toBe(false);
          expect(state.isAuthChecked).toBe(true);
        });

        it('Отказ loginUser', () => {
          const initialState = userSlice.getInitialState();
          const action = loginUser.rejected(new Error('Invalid credentials'), 'requestId', loginData);
          const state = userSlice.reducer(initialState, action);
      
          expect(state.isLoading).toBe(false);
          expect(state.isAuthChecked).toBe(true);
          expect(state.user).toBeNull();
        });
    });

    describe('Тестирование logoutUser', () => {
      it('logoutUser.fulfilled', () => {
        const logoutApi = require('@api').logoutApi;
        logoutApi.mockResolvedValue({ success: true });

        const initialState = userSlice.getInitialState();
        const action = logoutUser.fulfilled(undefined, 'requestId');
        const state = userSlice.reducer(initialState, action);

        expect(state.user).toBeNull();
        expect(state.isLoading).toBe(false);
        expect(state.isAuthChecked).toBe(true);
      });
    });

    describe('Тестирование getUser', () => {
      it('Ожидание getUser', () => {
        const initialState = userSlice.getInitialState();
        const action = getUser.pending('requestId');
        const state = userSlice.reducer(initialState, action);
  
        expect(state.isLoading).toBe(true);
      });
  
      it('Выполнение getUser', () => {
        const getUserApi = require('@api').getUserApi;
        getUserApi.mockResolvedValue({ success: true, user });
  
        const initialState = userSlice.getInitialState();
        const action = getUser.fulfilled({ success: true, user }, 'requestId');
        const state = userSlice.reducer(initialState, action);
  
        expect(state.user).toEqual(user);
        expect(state.isLoading).toBe(false);
        expect(state.isAuthChecked).toBe(true);
      });
  
      it('Отказ getUser', () => {
        const getUserApi = require('@api').getUserApi;
        getUserApi.mockRejectedValue(new Error('Failed to fetch user'));
  
        const initialState = userSlice.getInitialState();
        const action = getUser.rejected(new Error('Failed to fetch user'), 'requestId');
        const state = userSlice.reducer(initialState, action);
  
        expect(state.isLoading).toBe(false);
        expect(state.isAuthChecked).toBe(true);
      });
    });

    describe('Тестирование updateUser', () => {
      it('Выполнение updateUser', () => {
        const updateUserApi = require('@api').updateUserApi;
        updateUserApi.mockResolvedValue({ success: true, user: { ...user, name: 'Updated User' } });
  
        const initialState = userSlice.getInitialState();
        const action = updateUser.fulfilled(
          { success: true, user: { ...user, name: 'Updated User' } }, 
          'requestId', 
          { name: 'Updated User' }
        );
        const state = userSlice.reducer(initialState, action);
  
        expect(state.user).toEqual({ ...user, name: 'Updated User' });
        expect(state.isLoading).toBe(false);
      });
    });
});