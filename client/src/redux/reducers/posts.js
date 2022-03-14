import { createPost, getPosts, getType } from "../actions";

const initPostsState = {
    isLoading: false,
    data: [],
    error: ''
}

const postsReducer = (state = initPostsState, action) => {

    switch (action.type) {
        case getType(getPosts.getPostsRequest()):
            return {
                ...state,
                isLoading: true
            }

        case getType(getPosts.getPostsSuccess()):
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }

        case getType(getPosts.getPostsFailure()):
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case getType(createPost.createPostRequest()):
            return {
                ...state,
                isLoading: true
            }

        case getType(createPost.createPostSuccess()):
            return {
                ...state,
                isLoading: false,
                data: [...state.data, action.payload]
            }

        case getType(createPost.createPostFailure()):
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }

        default:
            return state
    }

}

export default postsReducer