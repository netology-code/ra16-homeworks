import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Menu() {
    
    return (
        <nav className="menu">
            <NavLink exact className="menu__item" to="/" activeClassName='menu__item-active'>Главная</NavLink>
            <NavLink exact className="menu__item" to="/drift" activeClassName='menu__item-active'>Дрифт-такси</NavLink>
            <NavLink exact className="menu__item" to="/timeattack" activeClassName='menu__item-active'>Time Attack</NavLink>
            <NavLink exact className="menu__item" to="/forza" activeClassName='menu__item-active'>Forza Karting</NavLink>
        </nav>
    )
}
