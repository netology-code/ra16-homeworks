import {ADD_SERVICE, REMOVE_SERVICE, CHANGE_SERVICE_FIELD, EDITTING_SERVICE} from './actionTypes';

export function addService(name, price, changedId = '') {
    return {type: ADD_SERVICE, payload: {name, price, changedId}};
}

export function removeService(id) {
    return {type: REMOVE_SERVICE, payload: {id}};
}

export function changeServiceField(name, value) {
    return {type: CHANGE_SERVICE_FIELD, payload: {name, value}};
}

export function edittingService(currName = '', currPrice = '', currId = '') {
    return {type: EDITTING_SERVICE, payload: {currName, currPrice, currId}}
}