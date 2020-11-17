'use strict';Object.defineProperty(exports,'__esModule',{value:true});function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}/* eslint-disable no-underscore-dangle */

/**
 * @module deepFind
 * @description allows for deepsearching within an object based on a defind path.
 */
function deepFind() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var paths = path.split('.');
  var current = obj;
  var i;

  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      return undefined;
    }

    current = current[paths[i]];
  }

  return current;
}/**
 * @module testSatelite
 * @description  Runs a check that DTM's satalite api is available on the page. if unavailable it will not attempt to send any data.
 */

function testSatelite() {
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

function trackEvent(_x) {
  return _trackEvent.apply(this, arguments);
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

function _trackEvent() {
  _trackEvent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref) {
    var _ref$satellite, satellite, _ref$data, data;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref$satellite = _ref.satellite, satellite = _ref$satellite === void 0 ? '' : _ref$satellite, _ref$data = _ref.data, data = _ref$data === void 0 ? {} : _ref$data;

            if (testSatelite()) {
              // eslint-disable-next-line no-underscore-dangle
              window._satellite.track(satellite, data);
            }

            return _context2.abrupt("return", {
              satellite: satellite,
              data: data
            });

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _trackEvent.apply(this, arguments);
}

var getDataFromStore = function getDataFromStore(props, state) {
  return Object.keys(props.data).reduce(function (acc, curr) {
    acc[curr] = deepFind(state, props.data[curr]);
    return acc;
  }, {});
};
/**
 * @module trackEventFromAction
 * @description formats the path based events data and passes it into the trackEvent funciton
 */

var trackEventFromAction = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(properties, state) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", trackEvent(_objectSpread2(_objectSpread2({}, properties), {}, {
              data: getDataFromStore(properties, state)
            })));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function trackEventFromAction(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * @module aemAnalyticsMiddleware
 * @description Redux middleware to trigger DTM events and pass metadata based on redux actions and current state.
 */

/**
 * @function aemAnalyticsMiddleware
 * @param {object} events The events objects definition. must include the satelite event along with a data object defining the paths within the sote
 * @param {object} state  The current redux state of the application
 */


var aemAnalyticsMiddleware = function aemAnalyticsMiddleware() {
  var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (store) {
    return function (next) {
      return function (action) {
        if (!testSatelite()) return next(action);
        var result = next(action);

        if (events[action.type]) {
          trackEventFromAction(events[action.type], store.getState());
        }

        return result;
      };
    };
  };
};exports.default=aemAnalyticsMiddleware;exports.getDataFromStore=getDataFromStore;exports.testSatelite=testSatelite;exports.trackEvent=trackEvent;