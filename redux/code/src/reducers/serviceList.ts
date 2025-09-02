import { nanoid } from 'nanoid';
import { ADD_SERVICE, REMOVE_SERVICE } from '../actions/actionTypes';

interface Service {
  id: string;
  name: string;
  price: number;
}

interface ServiceAction {
  type: string;
  payload: {
    name?: string;
    price?: string;
    id?: string;
  };
}

const initialState: Service[] = [
  { id: nanoid(), name: 'Замена стекла', price: 21000 },
  { id: nanoid(), name: 'Замена дисплея', price: 25000 },
];

export default function serviceListReducer(state = initialState, action: ServiceAction) {
  switch (action.type) {
    case ADD_SERVICE:
      const { name, price } = action.payload;
      return [
        ...state, 
        { 
          id: nanoid(), 
          name: name!, 
          price: Number(price) 
        }
      ];
    
    case REMOVE_SERVICE:
      const { id } = action.payload;
      return state.filter(service => service.id !== id);
    
    default:
      return state;
  }
}