import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import './PokeDetailsScreen.css';
import {useNavigate} from 'react-router-dom';

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

function PokeDetailsScreen(props) {
    let { id } = useParams();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    })

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className='PokeDetails-screen'>
                <Header />

                <div>
                    <button onClick={() => { navigate(`/details/${parseInt(items.id) - 1}`) }}>Prev</button>
                    <button onClick={() => { navigate(`/details/${parseInt(items.id) + 1}`) }}>Next</button>
                </div>

                <div className='PokeDetails-container'>
                    <h2 className='name'>#{items.id} {Capitalize(items.name)}</h2>
                    <div className='img-container'>
                        <img className='pokedetails-img' src={items.sprites.front_default} alt={items.name} />
                    </div>
                    <div className='img-container'>
                        <img className='pokedetails-img' src={items.sprites.back_default} alt={items.name} />
                    </div>

                    <p className='poke-type'>Types: {GetTypeList(items)}</p>
                    <p className='poke-info'>Weight: {items.weight} hectograms</p>
                    <p className='poke-info'>Height: {items.height} decimetres</p>
                    <p className='poke-info'>Base experience gained: {items.base_experience} </p>
                </div>

                <div className='nav-btns'>
                    <button onClick={() => { navigate(`/`) }}>Home</button>
                    <button onClick={() => { navigate(`/gallery`) }}>Gallery</button>
                </div>
            </div>
        )
    }
}

export default PokeDetailsScreen