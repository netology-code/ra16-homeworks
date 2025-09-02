import { CHANGE_SERVICE_FIELD } from '../actions/actionTypes';

interface ServiceFormState {
  name: string;
  price: string;
}

interface ServiceFormAction {
  type: string;
  payload: {
    name: string;
    value: string;
  };
}

const initialState: ServiceFormState = { 
  name: '', 
  price: '' 
};

export default function serviceAddReducer(state = initialState, action: ServiceFormAction) {
  switch (action.type) {
    case CHANGE_SERVICE_FIELD:
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    
    default:
      return state;
  }
}