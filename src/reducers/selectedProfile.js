export default function (state=null, action) {
	switch(action.type) {
		case "GET_KEY_PROFILES_FIELDS":
			return action.payload;
			break;
		default:
			return state;
	}
}