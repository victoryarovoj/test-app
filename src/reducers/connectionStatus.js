export default function (state=false, action) {
	switch(action.type) {
		case "CONNECTION_STATUS":
			return action.payload;

		default:
			return state;
	}
}