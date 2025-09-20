import { MovieState } from './movie';
import { UserState } from './user';

export interface RootState {
	user: UserState | null;
	movie: MovieState;
}

export interface FormError {
	[key: string]: string;
}