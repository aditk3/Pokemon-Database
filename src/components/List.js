import { React, useEffect, useState } from 'react';
import Select from 'react-select';
import './List.css';
import PokeCard from './PokeCard';

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

function List(props) {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('id');
    const [order, setOrder] = useState('asc');

    const filters = [
        { value: 'id', label: 'ID' },
        { value: 'name', label: 'Name' }
    ]

    useEffect(() => {
        props.data.forEach(pokemon => {
            fetchPokemonData(pokemon)
        })

        setData(ll);
    }, [props.data])

    const filteredData = data.filter((el) => {
        if (props.input === '') {
            return undefined;
        } else {
            return el.name.toLowerCase().startsWith(props.input.toLowerCase());
        }
    })

    const sortAscending = () => {
        let t = order
        setOrder('asc')
        let temp = [t]
        temp.pop()

        if (filter === 'id') {
            temp = data.sort((a, b) => a.id - b.id);
        } else if (filter === 'name') {
            temp = data.sort((a, b) => a.name.localeCompare(b.name));
        }

        setData(temp);
    }

    const sortDescending = () => {
        setOrder('desc')
        let temp = []

        if (filter === 'id') {
            temp = data.sort((a, b) => a.id - b.id).reverse();
        } else if (filter === 'name') {
            temp = data.sort((a, b) => a.name.localeCompare(b.name)).reverse();
        }

        setData(temp);
    }

    const handleChangeFilter = (selectedOption) => {
        if (selectedOption.value === 'id') {
            setFilter('id');
        } else if (selectedOption.value === 'name') {
            setFilter('name');
        }
    }

    return (
        <div className='List'>
            <div className="List-filters">
                <div className="List-sort">
                    <p>Sort by:</p>

                    <Select
                        className='List-select'
                        options={filters}
                        onChange={handleChangeFilter}
                        defaultValue={{ value: 'id', label: 'ID' }}
                    />
                </div>

                <div className="List-sortorder">
                    <button onClick={() => { sortAscending() }}>Asc</button>
                    <button onClick={() => { sortDescending() }}>Desc</button>
                </div>
            </div>

            <ol>
                {filteredData.map((item) => (
                    <li key={item.id}>
                        <PokeCard data={item} />
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default List