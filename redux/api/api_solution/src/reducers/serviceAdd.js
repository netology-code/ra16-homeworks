import {CHANGE_SERVICE_FIELD, EDITTING_SERVICE, ADD_SERVICE_SUCCESS, ADD_SERVICE_REQUEST, ADD_SERVICE_ERROR} from '../actions/actionTypes'

const initialState = {
    items: {
        name: '',
        price: ''
    },
    loading: false,
    error: null
};

export default function serviceAddReducer (state = initialState, action) {
    switch (action.type) {
        case CHANGE_SERVICE_FIELD:
            const {name, value} = action.payload;
            const {items} = state;
            return {...state, items:{...items ,[name]: value}};
        case ADD_SERVICE_SUCCESS: 
            return {...initialState}
        case ADD_SERVICE_REQUEST:
            return {...state, loading: true, error: null}
        case ADD_SERVICE_ERROR:
            const {error} = action.payload;
            return {...state, loading: false, error}
        default:
            return state;
    }
}