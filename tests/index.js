export const MOCK_STORE = {
  foo: {
    bar: true
  },
  bar: {
    foo: 'test'
  }
};

export const ACTION_EVENTS = {
  ADD_TODO: {
    event: 'ADD_TODO',
    data: {
      prop1: 'foo.bar',
      prop2: 'bar.foo'
    }
  }
};
