import React, {useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {removeService, edittingService, fetchServicesSuccess} from '../actions/actionCreators';
import PropTypes from 'prop-types'

export  const fetchhendler = async (dispatch) => {
    const response = await fetch(process.env.REACT_APP_API_URL);
    const services = await response.json();
    dispatch(fetchServicesSuccess(services))
}

function ServiceList(props) {
    const items  = useSelector(state => state.serviceList);
    
    const dispatch = useDispatch();

    useEffect(() => {
        fetchhendler(dispatch)
    }, [dispatch])

    const handleRemove = id => {
        dispatch(removeService(id))
    }

    // const handleEdit = (name, price, id) => {
    //     console.log(name, price)
    //     dispatch(edittingService(name, price, id));
    // }

    return (
        <ul>
            {items.map(o => <li key={o.id}>
                {o.name}{o.price}
                <button onClick={() => handleRemove(o.id)}>X</button>
                {/* <button onClick={() => handleEdit(o.name, o.price, o.id)}>Edit</button> */}
                </li>)}
        </ul>
    )
}

ServiceList.propTypes = {

}

export default ServiceList