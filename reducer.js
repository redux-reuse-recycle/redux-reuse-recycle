import {
	SET_USERS_BEEN_FETCHED,
	GET_ALL_USERS,
	DELETE_ALL_USERS,
} from "./actions/users.js";

const initialState = {
	hasUsersBeenFetched: false,
	users1: [],
	users2: [],
};

export default function counterReducer(state = initialState, action = {}) {
	switch(action.type) {
		case SET_USERS_BEEN_FETCHED:
			return{
				...state,
				hasUsersBeenFetched: typeof action.payload === 'boolean' ? action.payload : !state.hasUsersBeenFetched,
			};
		case GET_ALL_USERS:
			return{
				...state,
				users1: action.payload || state.users1,
				users2: action.payload || state.users2,
			};
		case DELETE_ALL_USERS:
			return{
				...state,
				users1: action.payload || state.users1,
				users2: action.payload || state.users2,
			};
		default:
			return state;
	}
}
