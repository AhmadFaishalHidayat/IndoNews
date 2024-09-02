import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./features/counter/counterSlice";
import newsReducer from './features/News/NewsSlice'

// create `store` using configureStore
export default configureStore({
    reducer: {
      // add reducer here
    //   counter: counterReducer,
      news: newsReducer,
    },
  });
