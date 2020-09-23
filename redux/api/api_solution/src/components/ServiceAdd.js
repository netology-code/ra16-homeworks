import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeServiceField, addServiceSuccess, edittingService, addServiceRequest, addServiceError} from '../actions/actionCreators'
import PropTypes from 'prop-types'
import { fetchhendler } from './ServiceList';

function ServiceAdd(props) {
    const {items, loadig, error} = useSelector(state => state.serviceAdd);
    
    const dispatch = useDispatch();

    const handleChange = event => {
        const {name, value} = event.target;
        dispatch(changeServiceField(name, value))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(addServiceRequest());
        try{
            await fetch(process.env.REACT_APP_API_URL, {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(items)
            })
            fetchhendler(dispatch);
            dispatch(addServiceSuccess());
        } catch(err) {
            dispatch(addServiceError(err.message))
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='name' onChange={handleChange} value={items.name}/>
                <input name='price' onChange={handleChange} value={items.price}/>
                <button type='submit'>Save</button>
            </form>
        </div>
        
    )
}

ServiceAdd.propTypes = {

}

export default ServiceAdd

