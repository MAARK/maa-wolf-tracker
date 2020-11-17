import 'regenerator-runtime/runtime';
import { getDataFromStore } from '../src';
import deepFind from '../src/deepFind';
import { MOCK_STORE, ACTION_EVENTS } from "./index";

const RESOLVED_DATA = {
  prop1: MOCK_STORE.foo.bar,
  prop2: MOCK_STORE.bar.foo
};

describe('Test Deepfind function', () => {
  it('should return correct string', () => {
    const data = deepFind(MOCK_STORE, 'bar.foo');
    expect(data).toEqual(MOCK_STORE.bar.foo);
  });

  it('should find mapped elements within the store', () => {
    const data = getDataFromStore(ACTION_EVENTS.ADD_TODO, MOCK_STORE);
    expect(data).toEqual(RESOLVED_DATA);
  });
});
