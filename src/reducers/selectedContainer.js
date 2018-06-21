export default function (state=null, action) {
	switch(action.type) {
		case "SELECTED_CONTAINER":
			return action.payload;

		default:
			return state;
	}
}