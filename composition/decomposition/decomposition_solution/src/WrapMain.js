import React from 'react'
import PropTypes from 'prop-types'

function WrapMain(props) {
    return (
        <div>
            <div className='news-block'>
                <div className='widget_1'></div>
                <div className='widget_2'></div>
            </div>
            <div className='search-block'>
                <nav className='nav_bar'>
                    <a href={props.link} className='nav_bar_link'>Видео</a>
                    <a href={props.link} className='nav_bar_link'>Картинки</a>
                    <a href={props.link} className='nav_bar_link'>Новости</a>
                    <a href={props.link} className='nav_bar_link'>Карты</a>
                    <a href={props.link} className='nav_bar_link'>Маркет</a>
                    <a href={props.link} className='nav_bar_link'>Переводчик</a>
                    <a href={props.link} className='nav_bar_link'>Эфир</a>
                    <a href={props.link} className='nav_bar_link'>...ещё</a>
                </nav>
                <input className='search' />
            </div>
            <div className='banner'>
                <a href={props.banner.link}>''</a>
            </div>
            <div className='widgets'>
                <div className='col_widget col_1'></div>
                <div className='col_widget col_2'></div>
                <div className='col_widget col_3'></div>
            </div>
        </div>
    )
}

WrapMain.propTypes = {

}

export default WrapMain

