import {ADD_SERVICE, REMOVE_SERVICE, CHANGE_SERVICE_FIELD, EDITTING_SERVICE, FETCH_SERVICES_SUCCESS} from './actionTypes';

export function addService(name, price) {
    return {type: ADD_SERVICE, payload: {name, price}};
}

export function removeService(id) {
    return {type: REMOVE_SERVICE, payload: {id}};
}

export function changeServiceField(name, value) {
    return {type: CHANGE_SERVICE_FIELD, payload: {name, value}};
}

export function fetchServicesSuccess(items) {
    return {type: FETCH_SERVICES_SUCCESS, payload: {items}}
}