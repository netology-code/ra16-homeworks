import {nanoid} from 'nanoid';
import {ADD_SERVICE, FETCH_SERVICES_SUCCESS, REMOVE_SERVICE} from '../actions/actionTypes'

const initialState = [];

export default function serviceListReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_SERVICE: 
            const {name, price} = action.payload;
                return [...state, {id: nanoid(), name, price: Number(price)}];
        case REMOVE_SERVICE: 
            const {id} = action.payload;
            return state.filter(service => service.id !== id);
        case FETCH_SERVICES_SUCCESS:
            const {items} = action.payload;
            return items;
        default:
            return state;
    }
}

