export default function (state=null, action) {
	switch(action.type) {
		case "GET_KEY_PROFILES_FIELDS":
			return action.payload

		default:
			return state;
	}
}