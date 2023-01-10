import React from 'react';
import { useNavigate } from 'react-router-dom';

import './PokePic.scss';

function PokePic(props) {
    const navigate = useNavigate()

    return (
        <div className='Poke-pic' onClick={() => navigate(`/details/${parseInt(props.data.id)}`)}>
            <h3>{props.data.id}</h3>
            
            <img
                src={props.data.sprites.front_default}
                alt={props.data.name}
            />
        </div>
    )
}

export default PokePic