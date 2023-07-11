import PropTypes from 'prop-types';

class ShopModel {
    static items = {
        brand: 'Tiger of Sweden2',
        title: 'Leonard coat',
        description: 'Minimalistic coat in cotton-blend',
        descriptionFull: 'Men\'s minimalistic overcoat in cotton-blend. Features a stand-up collar, concealed front closure and single back vent. Slim fit with clean, straight shape. Above-knee length.',
        price: 399,
        currency: '£'      
    }
}

    ShopModel.PropTypes = {
        items: PropTypes.shape({
            brand: PropTypes.string,
            title: PropTypes.string,
            description: PropTypes.string,
            descriptionFull: PropTypes.string,
            currency: PropTypes.string,
            price: PropTypes.number    
        })
           }

export default ShopModel;
