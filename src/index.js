import deepFind from './deepFind';

/**
 * @module testSatelite
 * @description  Runs a check that DTM's satalite api is available on the page. if unavailable it will not attempt to send any data.
 */

export function testSatelite() {
  return window._satellite && window.__satelliteLoaded;
}

/**
 * @module trackEvent
 * @description  Sends an request to a specified event in Adobe Analytics  and passes defined metadata to be trakced.
 */

/**
 * @function trackEvent
 * @param {string} satellite  The ID of the event defined int DTM.
 * @param {object} data the metadata to be store in the event withing Adobe Analytics
 * @example
 * trackEvent({
 *    satellite: 'onPageLoad
 *    data: {
 *      foo: 'bar'
 *  }
 * })
 */

export async function trackEvent({ satellite = '', data = {} }) {
  if (testSatelite()) {
    // eslint-disable-next-line no-underscore-dangle
    window._satellite.track(satellite, data);
  }

  return {
    satellite,
    data
  };
}

/**
 * @module getDataFromStore
 * @description takes the data mappings used in teh applicaitons events mapping and formats the data based on the current state of the application
 */

/**
 * @function getDataFromStore
 * @param {string} props The events objects definition. must include the satelite event along with a data object defining the paths within the sote
 * @param {object} state  The current redux state of the application
 */

export const getDataFromStore = (props, state) => Object.keys(props.data).reduce((acc, curr) => {
  acc[curr] = deepFind(state, props.data[curr]);
  return acc;
}, {});

/**
 * @module trackEventFromAction
 * @description formats the path based events data and passes it into the trackEvent funciton
 */

const trackEventFromAction = async (properties, state) => trackEvent({
  ...properties,
  data: getDataFromStore(properties, state)
});

/**
 * @module aemAnalyticsMiddleware
 * @description Redux middleware to trigger DTM events and pass metadata based on redux actions and current state.
 */

/**
 * @function aemAnalyticsMiddleware
 * @param {object} events The events objects definition. must include the satelite event along with a data object defining the paths within the sote
 * @param {object} state  The current redux state of the application
 */

const wolfTracker = (events = {}) => (store) => (next) => (action) => {
  if (!testSatelite()) return next(action);

  const result = next(action);

  if (events[action.type]) {
    trackEventFromAction(events[action.type], store.getState());
  }

  return result;
};

export default wolfTracker;
