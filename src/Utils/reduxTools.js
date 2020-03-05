import { createAction } from '@reduxjs/toolkit';

export const getDefaultState = () => ({
  error: null,
  isLoading: false,
  payload: null,
});

export const getDefaultHandler = (action, path = '') => ({
  [action + '_pending']: (state) => {
    if (path) {
      state[path].isLoading = true;
    } else {
      state.isLoading = true;
    }
  },
  [action + '_rejected']: (state, action) => {
    if (path) {
      state[path].isLoading = false;
      state[path].error = action.payload;
      state[path].payload = null;
    } else {
      state.isLoading = false;
      state.error = action.payload;
      state.payload = null;
    }
  },
  [action + '_fulfilled']: (state, action) => {
    if (path) {
      state[path].isLoading = false;
      state[path].payload = action.payload;
      state[path].error = null;
    } else {
      state.isLoading = false;
      state.payload = action.payload;
      state.error = null;
    }
  },
  [action + '_reset']: (state) => {
    if (path) {
      state[path] = getDefaultState();
    } else {
      state = getDefaultState();
    }
  },
});

export const getResetAction = (action) => (createAction(action + '_reset'));
