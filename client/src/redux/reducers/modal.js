import { getType, showModal, hideModal } from "../actions";

const initModalState = {
    isShow: false,
}

const modalReducer = (state = initModalState, action) => {

    switch (action.type) {
        case getType(showModal()):
            return {
                ...state,
                isShow: true
            }
        case getType(hideModal()):
            return {
                ...state,
                isShow: false
            }

        default:
            return state
    }

}

export default modalReducer