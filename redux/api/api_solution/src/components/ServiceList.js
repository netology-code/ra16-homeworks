import React, {useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {removeService, edittingService, fetchServicesSuccess, fetchServicesRequest, fetchServicesError} from '../actions/actionCreators';
import PropTypes from 'prop-types'

export  const fetchhendler = async (dispatch) => {
    dispatch(fetchServicesRequest())
    try{
        const response = await fetch(process.env.REACT_APP_API_URL);
        const services = await response.json();
        dispatch(fetchServicesSuccess(services))
    } catch(err) {
        dispatch(fetchServicesError(err.message))
    }
}

function ServiceList(props) {
    const {items, loading, error}  = useSelector(state => state.serviceList);
    
    const dispatch = useDispatch();

    useEffect(() => {
        fetchhendler(dispatch)
    }, [dispatch])

    const handleRemove = async (id) => {
        console.log(typeof id)
        dispatch(fetchServicesRequest());
        try {
            await fetch(`http://localhost:7070/api/services/${id}`, {
                method: 'DELETE',
                // headers: {'Content-Type': 'application/json'}
            })
            fetchhendler(dispatch)
        } catch(err) {
            dispatch(fetchServicesError(err.message))
        }
    }

    const handleEdit = async (id) => {
        dispatch(fetchServicesRequest());
        try {
            const response = await fetch(`http://localhost:7070/api/services/${id}`,{
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            })
            const service = await response.json();
            console.log(service)
            fetchhendler(dispatch)
        } catch(err) {
            dispatch(fetchServicesError(err.message))
        }
    }

    if(loading) {
        return <div>Loading ... </div>
    }

    // if(error) {
    //     return <div>Произошла ошибка</div>
    // }
    
    return (
        <ul>
            {error ? <div>Произошла ошибка</div> : null}
            {
            items.map(o => <li key={o.id}>
                {o.name}{o.price}
                <button onClick={() => handleRemove(o.id)}>X</button>
                <button onClick={() => handleEdit(o.id)}>Edit</button>
            </li>)}
        </ul>
    )
}

ServiceList.propTypes = {

}

export default ServiceList