import { createSlice } from "@reduxjs/toolkit";

import newsApi from "../../helpers/axios";

const initialState = {
    loading: false,
    news: []
}

export const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        setLoading: (state, {payload}) => {
            state.loading = payload
        },
        setNews: (state, {payload}) => {
            state.news = payload
        }
    }
});

export const { setLoading, setNews } = newsSlice.actions;

export default newsSlice.reducer

export const getNews = () => {
    return async function (dispatch) {
        dispatch(setLoading(true));
        const { data } = await newsApi.get('/v2/top-headlines?country=id&apiKey=c8381381b29e4cb9a2228ec1431e06c5')
        console.log(data.articles);
        dispatch(setNews(data.articles))
        dispatch(setLoading(false))
    }
}