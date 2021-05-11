import './_satellite.mock';
import 'regenerator-runtime/runtime';

import { trackEvent } from '../src';

const EVENT = {
  event: 'TEST',
  data: {
    prop1: true,
    prop2: 'foo',
    prop3: 'bar'
  }
};
describe('test direct event trigger', () => {
  const spy = jest.spyOn(window._satellite, 'track');
  it('should trigger satelite track', () => {
    trackEvent(EVENT).then((data) => {
      expect(spy).toHaveBeenCalled();
    });
  });
});
