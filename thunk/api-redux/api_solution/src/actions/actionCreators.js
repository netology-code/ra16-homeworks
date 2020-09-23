import {ADD_SERVICE_SUCCESS, ADD_SERVICE_ERROR, ADD_SERVICE_REQUEST, REMOVE_SERVICE, CHANGE_SERVICE_FIELD, EDITTING_SERVICE, FETCH_SERVICES_SUCCESS, FETCH_SERVICES_REQUEST, FETCH_SERVICES_ERROR} from './actionTypes';

export function addServiceSuccess() {
    return {type: ADD_SERVICE_SUCCESS};
}

export function addServiceRequest() {
    return {type: ADD_SERVICE_REQUEST};
}

export function addServiceError(err) {
    return {type: ADD_SERVICE_ERROR, payload: {err}};
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

export function fetchServicesRequest() {
    return {type: FETCH_SERVICES_REQUEST}
}

export function fetchServicesError(err) {
    return {type: FETCH_SERVICES_ERROR, payload: {err}}
}
