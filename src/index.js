import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import GalleryScreen from './screens/GalleryScreen';
import HomeScreen from './screens/HomeScreen';
import PokeDetailsScreen from './screens/PokeDetailsScreen';

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route exact path="/details/:id" element={<PokeDetailsScreen />} />
                <Route exact path="/gallery" element={<GalleryScreen />} />
            </Routes>
        </HashRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
