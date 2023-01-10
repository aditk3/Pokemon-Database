import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import './PokeCard.css';

function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function GetTypeList(obj) {
    let types = "";
    obj.types.forEach(element => {
        types += (Capitalize(element.type.name)) + ", ";
    });

    return types.slice(0, -2);
}

function PokeCard(props) {
    const navigate = useNavigate();

    return (
        <div className='Poke-card' onClick={() => navigate(`/details/${parseInt(props.data.id)}`)}>
            <img src={props.data.sprites.front_default} alt={Capitalize(props.data.name)} />

            <div className='Card-info'>
                <p>#{props.data.id} {Capitalize(props.data.name)}</p>
                <p>Type: {GetTypeList(props.data)}</p>
            </div>

        </div>
    )
}

export default PokeCard