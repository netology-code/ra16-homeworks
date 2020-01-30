import React from 'react'
import PropTypes from 'prop-types'
import Block from './Block'
import News from './News'
import Navigation from './Navigation'

function Main(props) {
    const currentNews = [
        {
            name: 'widget_1',
            content: [
                {
                    icon: 'H',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex animi laboriosam cum adipisci nam commodi distinctio, voluptates dolorum fuga.',
                    link: 'google.com'
                }
            ]
        },
        {
            name: 'widget_2',
            content: [
                {
                    icon: 'IMG',
                    text: 'Different Add'
                }
            ]
        }
    ]

    const navLinks = [
        {
            href: 'https://github.com/',
            name: 'Видео'
        },
        {
            href: 'https://github.com/',
            name: 'Картинки'
        },
        {
            href: 'https://github.com/',
            name: 'Карты'
        },
        {
            href: 'https://github.com/',
            name: 'Маркет'
        }
    ]

    const allWidgets = [
        {
            name: 'col_widget col_1',
            conten: []
        },
        {
            name: 'col_widget col_2',
            conten: []
        },
        {
            name: 'col_widget col_3',
            conten: []
        }        
    ]
    return (
        <React.Fragment>
            <Block class={'news-block'}>
                <News allNews={currentNews}></News>
            </Block>
            <Block class={'search-block'}>
                <Navigation list={navLinks}/>
            </Block>
            <Block class={'banner'}>

            </Block>
            <Block class={'widgets'}>
                {allWidgets.map(widget => <Block class={widget.name}></Block>)}
            </Block>
        </React.Fragment>
    )
}

Main.propTypes = {

}

export default Main

