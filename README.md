[ WIP ]
# Wolf Tracker

[![CircleCI](https://circleci.com/gh/circleci/circleci-docs.svg?style=svg)](https://circleci.com/gh/MAARK/maa-wolf-tracker)

A redux middleware for triggering Adobe Launch direct-call rules. 

### Requirements
- Adobe Launch script must be imported onto the page. This will expose the `_satellite` api to track events.
  - ``If no Launch script is imported the middle ware will not dispatch events``
- Direct call rules and data handlers must be created in Launch. 


## Usage

### launchMiddleware 

[For defining events check Events Object](#events-object)

``` javascript
import { createStore, applyMiddleware } from 'redux';
import launchMiddleWare from 'launch-redux-middleware'

const EVENTS =  {...}

const middleware = [launchMiddleWare(EVENTS)]

const store = createStore(rootReducter, applyMiddleware(...middleware));

```

___ 


### Events Object
The Events object is created to map specific Redux actions to Launch events. Each mapping should include the event name to be triggered withing launch and the data to be passed in from the redux store. 


``` javascript
const EVENTS = {
  ADD_TODO: { // redux action being tracked
    event: '' // Launch event to be triggered.
    data: { // Data to be passed into launch.
      foo :'foo.bar.status' //Path to the desired data within the redux store. 
    }
  }
}
```