import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {removeService, edittingService} from '../actions/actionCreators';
import PropTypes from 'prop-types'

function ServiceList(props) {
    const items  = useSelector(state => state.serviceList);
    
    const dispatch = useDispatch();

    const handleRemove = id => {
        dispatch(removeService(id))
    }

    const handleEdit = (name, price, id) => {
        console.log(name, price)
        dispatch(edittingService(name, price, id));
    }

    return (
        <div>
            <input type="text" />
            <ul>
            {items.map(o => <li key={o.id}>
                {o.name}{o.price}
                <button onClick={() => handleRemove(o.id)}>X</button>
                <button onClick={() => handleEdit(o.name, o.price, o.id)}>Edit</button>
                </li>)}
            </ul>
        </div>
    )
}

ServiceList.propTypes = {

}

export default ServiceList

