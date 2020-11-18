import './_satellite.mock';
import 'regenerator-runtime/runtime';
import configureStore from 'redux-mock-store';

import { MOCK_STORE, ACTION_EVENTS } from "./index";
import aemAnalyticsMiddleware from '../src';

const initialState = {};
const expectedPayload = MOCK_STORE;

const addTodo = () => ({
  type: 'ADD_TODO',
  payload: expectedPayload
});

const mockStore = configureStore([aemAnalyticsMiddleware(ACTION_EVENTS)]);

describe('trigger actions', () => {
  it('should dispatch actions', () => {
    const store = mockStore(initialState);
    store.dispatch(addTodo());
    const actions = store.getActions();

    expect(actions).toEqual([
      {
        type: 'ADD_TODO',
        payload: expectedPayload
      }
    ]);
  });
});
