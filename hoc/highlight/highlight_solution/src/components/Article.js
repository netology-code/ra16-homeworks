import React from 'react'
import PropTypes from 'prop-types'

function Article(props) {
    return (
        <div className="item item-article">
            <h3><a href="#">{props.title}</a></h3>
            <p className="views">Прочтений: {props.views}</p>
        </div>
    )
};

Article.propTypes = {

}

export default Article

