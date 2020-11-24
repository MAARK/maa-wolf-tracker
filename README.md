
[![CircleCI](https://circleci.com/gh/circleci/circleci-docs.svg?style=svg)](https://circleci.com/gh/MAARK/maa-wolf-tracker)

[ WIP ]
# Wolf Tracker 
A redux middleware for triggering Adobe Launch direct-call rules. 


## Core Concept
Wolf Tracker was created to act as a bridge between the redux store and Adobe launch. 

### Requirements
- Adobe Launch script must be imported onto the page. This will expose the `_satellite` api to track events.
  - `If no Launch script is imported the middle ware will not dispatch events`
- Direct call rules and data handlers must be created in Launch. 

## Usage

### wolfTracker 

[For defining events check Events Object](#events-object)

``` javascript
import { createStore, applyMiddleware } from 'redux';
import wolfTracker from '@maarkllc/wolf-tracker'

const EVENTS =  {...}

const middleware = [wolfTracker(EVENTS)]

const store = createStore(rootReducter, applyMiddleware(...middleware));

```
___ 

### trackEvent

This function is exposed for flexibility to allow for developers to directly trigger a direct call rule.

``` javascript

  import { trackEvent } from '@maarkllc/wolf-tracker'

  trackEvent({
    event: '[Direct call event]',
    data: {} // data to be tracked 
  })
``` 
___ 

### Events Object
The events object is created to map specific Redux actions to Launch events. Each mapping should include the event name to be triggered within launch and the data to be passed in from the redux store. 


``` javascript

const EVENTS = {
  ADD_TODO: { // redux action being tracked
    event: 'addToDo' // direct call rule to be triggered.
    data: { // Data to be passed into launch.
      status :'foo.bar.status' //Path to the desired data within the redux store. 
    }
  },
  REMOVE_TODO : {...}
}


// Example of output of data mappings.
/* Redux store  */
{
  foo: {
    bar: {
      status: true
    }
  }
}

/* Data Outputted to Launch */
{ 
  status: true 
}

```