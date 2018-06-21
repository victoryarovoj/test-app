export default function (state=null, action) {
	switch(action.type) {
		case "AVAILABELES_CONTAINERS":
			return action.payload;

		default:
			return state;
	}
}