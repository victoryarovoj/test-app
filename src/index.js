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

// import { createStore } from 'redux';

// function playList(state = [], action) {
// 	if (action.type === 'ADD_TRACK') {
// 		return [
// 			...state,
// 			action.payload
// 		];
// 	}
// 	console.log(action);
// 	return state;
// }

// const store = createStore(playList);

// console.log(store.getState());

// store.subscribe(() => {
// 	console.log('subscribe', store.getState());
// 	const list = document.querySelectorAll('.list')[0];
// 	list.innerHTML = '';
// 	document.querySelectorAll('.trackInput')[0].value = '';
// 	store.getState().forEach(track => {
// 		const li = document.createElement('li');
// 		li.textContent = track;
// 		list.appendChild(li);
// 	});
// });


// const addTrackBtn = document.querySelectorAll('.addTrack')[0];
// addTrackBtn.addEventListener('click', () => {
// 	const trackName = document.querySelectorAll('.trackInput')[0].value;
// 	console.log('trackName', trackName);
// 	store.dispatch({type: 'ADD_TRACK', payload: trackName});
// });