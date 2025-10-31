import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeServiceField, addService } from '../actions/actionCreators';

interface ServiceForm {
  name: string;
  price: string;
}

interface RootState {
  serviceAdd: ServiceForm;
}

const ServiceAdd: React.FC = () => {
  const formData = useSelector((state: RootState) => state.serviceAdd);
  const dispatch = useDispatch();
  
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    dispatch(changeServiceField(name, value));
  };
  
  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    if (formData.name.trim() && formData.price.trim()) {
      dispatch(addService(formData.name, formData.price));
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Название услуги"
        required
      />
      <input 
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="Цена"
        required
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default ServiceAdd;