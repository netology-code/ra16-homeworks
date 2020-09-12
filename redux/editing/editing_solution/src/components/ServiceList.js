import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {removeService, changeServiceField, addService} from '../actions/actionCreators';
import PropTypes from 'prop-types'

function ServiceList(props) {
    const items  = useSelector(state => state.serviceList);
    const dispatch = useDispatch();

    const handleRemove = id => {
        dispatch(removeService(id))
    }

    const handleEdit = () => {
        
    }

    return (
        <ul>
            {items.map(o => <li key={o.id}>
                {o.name}{o.price}
                <button onClick={() => handleRemove(o.id)}>X</button>
                <button onClick={() => handleEdit()}>Edit</button>
                </li>)}
        </ul>
    )
}

ServiceList.propTypes = {

}

export default ServiceList

