import { combineReducers } from 'redux';

const base = (state = {}, { type, payload }) => {

    switch (type) {
    	case 'TEST_ACTION': {
		    return {
		        ...state,
		        test: payload
		    }
		}

        case 'GET_STATUS': {
            return {
                ...state,
                status: payload
            }
        }

        default:
            return state;
    }

}

export default combineReducers({
    base
});


