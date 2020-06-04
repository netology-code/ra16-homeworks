import React from 'react'
import PropTypes from 'prop-types'
import Article from './Article'
import Video from './Video'
import Popular from './Popular';
import New from './New';

function List(props) {
    return props.list.map(item => {
        switch (item.type) {
            case 'video':
                if(item.views >=1000) {
                    return(
                        <Popular children={<Video {...item} />}/>
                    )
                } else {
                    return (
                        <New children={<Video {...item} />}/>
                    )
                }

            case 'article':
                if(item.views >=1000) {
                    return(
                        <Popular children={<Article {...item} />}/>
                    )
                } else {
                    return (
                        <New children={<Article {...item} />}/>
                    )
                }
        }
    });
};

List.propTypes = {

}

export default List

