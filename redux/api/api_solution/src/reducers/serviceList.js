import {FETCH_SERVICES_ERROR, FETCH_SERVICES_REQUEST, FETCH_SERVICES_SUCCESS, REMOVE_SERVICE} from '../actions/actionTypes'

const initialState = {
    items: [],
    loading: false,
    error: null
}

export default function serviceListReducer(state = initialState, action) {
    switch(action.type) {
        case REMOVE_SERVICE: 
            const {id} = action.payload;
            return state.filter(service => service.id !== id);
        case FETCH_SERVICES_REQUEST:
            return {...state, loading: true, error: null}
        case FETCH_SERVICES_ERROR:
            const {error} = action.payload;
            return { ...state, loading: false, error}
        case FETCH_SERVICES_SUCCESS:
            const {items} = action.payload;
            return {
                items,
                loading: false,
                error: null
            };
        default:
            return state;
    }
}

