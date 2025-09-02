import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeService } from '../actions/actionCreators';

interface Service {
  id: string;
  name: string;
  price: number;
}

interface RootState {
  serviceList: Service[];
}

const ServiceList: React.FC = () => {
  const services = useSelector((state: RootState) => state.serviceList);
  const dispatch = useDispatch();
  
  const handleRemove = (id: string) => {
    dispatch(removeService(id));
  };
  
  return (
    <ul>
      {services.map(service => (
        <li key={service.id}>
            <button
                onClick={() => handleRemove(service.id)}
                aria-label={`Удалить ${service.name}`}
            >
                ✕
            </button>

          {service.name} - {service.price}₽
        </li>
      ))}
    </ul>
  );
};

export default ServiceList;