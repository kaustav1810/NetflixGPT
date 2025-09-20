import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

const userSlice = createSlice({
	name: 'user',
	initialState: null as User | null,
	reducers: {
		addUser: (state, action: PayloadAction<User>) => {
			return action.payload;
		},

		removeUser: () => {
			return null;
		},
	},
});

export default userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;