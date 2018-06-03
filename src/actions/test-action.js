export const testAction = () => (dispatch) => {
    dispatch({
        type: 'TEST_ACTION',
        payload: 123
    })
}

export const getStatus = () => (dispatch) => {
	fetch("https://local.cipher.kiev.ua:9091/api/v1/status", {
      method: 'GET'
      }).then((response) => {
      
      response.json().then((response) => {
      	dispatch({
	        type: 'GET_STATUS',
	        payload: response
	    })
      });
    });
}