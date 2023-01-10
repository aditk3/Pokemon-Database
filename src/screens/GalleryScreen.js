import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import PokePic from '../components/PokePic';
import './GalleryScreen.css';

function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function GetTypeList(obj) {
    let types = [];
    obj.types.forEach(element => {
        types.push(element.type.name);
    });
    return types;
}

const unique = (arr) => [...new Set(arr)];
let ll = []

const fetchPokemonData = (pokemon) => {
    let url = pokemon.url

    fetch(url)
        .then(response => response.json())
        .then(function (pokeData) {
            let pd = {
                id: pokeData.id,
                name: pokeData.name,
                sprites: pokeData.sprites,
                types: pokeData.types,
                height: pokeData.height,
                weight: pokeData.weight
            }

            ll.push(pd)
            return pd
        })
}

function GalleryScreen() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [types, setTypes] = useState([]);
    const [cur_type, setCurType] = useState("all");

    const navigate = useNavigate();

    let filteredData = []
    filteredData = items.filter((el) => {
        if (cur_type === 'all') {
            return true;
        } else {
            return GetTypeList(el).includes(cur_type);
        }
    })

    filteredData.sort((a, b) => parseInt(a.id) - parseInt(b.id))

    useEffect(() => {
        ll = []

        fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);

                    result.results.forEach(pokemon => {
                        fetchPokemonData(pokemon)
                    })

                    if (items.length === 0 && ll.length > 0) {
                        setItems([])
                        setItems(unique(ll))
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )

        fetch(`https://pokeapi.co/api/v2/type?limit=18`)
            .then(res => res.json())
            .then(
                (typeinfo) => {
                    setIsLoaded(true);

                    if (types.length === 0) {
                        setTypes(typeinfo.results);
                    }
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
            <div className='Gallery-screen'>
                <Header className='Gallery-header' />

                <div>
                    <button onClick={() => { navigate(`/`) }}>Home</button>
                    <button onClick={() => { navigate(`/gallery`) }}>Gallery</button>
                </div>

                <div className='Gallery-filters'>
                    <button onClick={() => setCurType('all')}>All</button>

                    {types.map((item) => (
                        <button key={item.name} onClick={() => setCurType(item.name)}>{Capitalize(item.name)}</button>
                    ))}
                </div>

                <div className='Gallery-container'>
                    {unique(filteredData).map((item) => (
                        <PokePic data={item} key={item.id} />
                    ))}
                </div>
            </div>
        )
    }
}

export default GalleryScreen