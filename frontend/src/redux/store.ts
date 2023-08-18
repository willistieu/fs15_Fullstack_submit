import { configureStore } from "@reduxjs/toolkit";
import productListReducer from  '../redux/slices/productListSlice'

export const store = configureStore({
    reducer: {
        productListReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;