import TextField from "@mui/material/TextField";
import { React, useEffect, useState } from 'react';
import Header from "../components/Header";
import List from '../components/List';
import './HomeScreen.css';
import { useNavigate } from 'react-router-dom';

function HomeScreen() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [inputText, setInputText] = useState("");

    const navigate = useNavigate();

    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.results);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className='Home-screen'>
                <Header className='Home-header' />

                <div>
                    <button onClick={() => { navigate(`/`) }}>Home</button>
                    <button onClick={() => { navigate(`/gallery`) }}>Gallery</button>
                </div>

                <div className="search">
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        onChange={inputHandler}
                        label="Search"
                    />
                </div>

                <List input={inputText} data={items} />
            </div>
        )
    }
}

export default HomeScreen