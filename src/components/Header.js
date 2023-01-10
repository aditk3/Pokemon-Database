import React from 'react'
import './Header.css'

function Header() {
    return (
        <header className='Header'>
            <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png'
                className='logo'
                alt='pokeball'
            />

            <p>Pokemon</p>
        </header>
    )
}

export default Header