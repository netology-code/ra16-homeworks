import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeServiceField, addService, edittingService} from '../actions/actionCreators'
import PropTypes from 'prop-types'

function ServiceAdd(props) {
    const items = useSelector(state => state.serviceAdd);
    
    const dispatch = useDispatch();

    const handleChange = event => {
        const {name, value} = event.target;
        dispatch(changeServiceField(name, value))
    }

    const handleSubmit = event => {
        event.preventDefault();
        if(items.id) {
            dispatch(addService(items.name, items.price, items.id))    
        } else {
            dispatch(addService(items.name, items.price));    
        }
    }

    const handleCancel = () => {
        dispatch(edittingService())
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='name' onChange={handleChange} value={items.name}/>
                <input name='price' onChange={handleChange} value={items.price}/>
                <button type='submit'>Save</button>
            </form>
            {items.id ? <button onClick={handleCancel}>Cancel</button> : null}
        </div>
        
    )
}

ServiceAdd.propTypes = {

}

export default ServiceAdd

