import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, MovieState } from '../../types';

const initialState: MovieState = {
    nowPlayingMovies: null,
    movieTrailers: {}
};

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        addMovie: (state, action: PayloadAction<Movie[]>) => {
            state.nowPlayingMovies = action.payload;
        },
        addMovieTrailer: (state, action: PayloadAction<{ movieId: number; videos: any[] }>) => {
            state.movieTrailers[action.payload.movieId] = action.payload.videos;
        }
    }
});

export const { addMovie, addMovieTrailer } = movieSlice.actions;
export default movieSlice.reducer;