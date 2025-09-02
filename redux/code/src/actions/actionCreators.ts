import { ADD_SERVICE, REMOVE_SERVICE, CHANGE_SERVICE_FIELD } from './actionTypes';

export const addService = (name: string, price: string) => ({
  type: ADD_SERVICE,
  payload: { name, price }
});

export const removeService = (id: string) => ({
  type: REMOVE_SERVICE,
  payload: { id }
});

export const changeServiceField = (name: string, value: string) => ({
  type: CHANGE_SERVICE_FIELD,
  payload: { name, value }
});