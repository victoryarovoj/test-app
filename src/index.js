import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';

const initialState = {
	uuid: [
		'first item',
		'second item'
	]
};

function userInfo(state = initialState, action) {

	return {
		...state,
		uuid: [...state.uuid, action.payload]
	};

	console.log(action);
	return state;
}

const store = createStore(userInfo);

ReactDom.render(
	<Provider store={store}>
		<App/>
	</Provider>, 
	document.getElementById('root')
);