import { call, put, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions'
import * as api from '../../api'

function* fetchPostSaga() {
    try {
        const posts = yield call(api.fetchPosts)
        console.log('[fetchPostSaga]', posts)
        yield put(actions.getPosts.getPostsSuccess(posts.data))
    } catch (err) {
        console.error(err)
        yield put(actions.getPosts.getPostsFailure(err))
    }
}

function* createPostSaga(action) {
    try {
        const post = yield call(api.createPost, action.payload)
        console.log('[createPostSaga]', post)
        yield put(actions.createPost.createPostSuccess(post.data))
    } catch (err) {
        console.error(err)
        yield put(actions.createPost.createPostFailure(err))
    }
}

function* mySaga() {
    yield takeLatest(actions.getPosts.getPostsRequest, fetchPostSaga)
    yield takeLatest(actions.createPost.createPostRequest, createPostSaga)
}

export default mySaga