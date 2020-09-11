import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {removeService, changeServiceField} from '../actions/actionCreators';
import PropTypes from 'prop-types'

function ServiceList(props) {
    const items  = useSelector(state => state.serviceList);
    const dispatch = useDispatch();

    const handleRemove = id => {
        dispatch(removeService(id))
    }

    const handleEdit = (name, price) => {
       
    }

    return (
        <ul>
            {items.map(o => <li key={o.id}>
                {o.name}{o.price}
                <button onClick={() => handleRemove(o.id)}>X</button>
                <button onClick={() => handleEdit(o.name, o.price)}>Edit</button>
                </li>)}
        </ul>
    )
}

ServiceList.propTypes = {

}

export default ServiceList

