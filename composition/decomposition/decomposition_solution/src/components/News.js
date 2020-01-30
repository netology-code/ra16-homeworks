import React from 'react'
import PropTypes from 'prop-types'
import Link from './Link'
import Block from './Block'

function News(props) {
    console.log(props)
    return (
        <React.Fragment>
            {props.allNews.map(widget => 
                <Block class={widget.name}>
                    {widget.content.map(news =>
                    <div>
                        <i>
                            {news.icon}
                        </i>
                        <Link link={news.link} class={news.class ? news.class : null}>
                            <p>
                                {news.text}
                            </p>
                        </Link>
                    </div> 
                    )}  
                </Block>
            )}
        </React.Fragment>
    )
}

News.propTypes = {

}

export default News

