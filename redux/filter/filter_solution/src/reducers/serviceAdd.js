import {CHANGE_SERVICE_FIELD, ADD_SERVICE, EDITTING_SERVICE} from '../actions/actionTypes'

const initialState = {
    name: '',
    price: '',
    id: ''
};

export default function serviceAddReducer (state = initialState, action) {
    switch (action.type) {
        case CHANGE_SERVICE_FIELD:
            const {name, value} = action.payload;
            return {...state, [name]: value};
        case ADD_SERVICE: 
            return {...initialState}
        case EDITTING_SERVICE:
            const {currName, currPrice, currId} = action.payload;
            return {...state, name: currName, price: currPrice, id: currId}
        default:
            return state;
    }
}