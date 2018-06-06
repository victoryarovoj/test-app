import React, { Component } from 'react';
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk, createLogger()));

export default store;