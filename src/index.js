import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppStarter from './AppStarter';

const preloadResources = () => {
    const sounds = [
        './sounds/floppy_drive.mp3',
        './sounds/windows98_startup.mp3',
    ];
    
    sounds.forEach((sound) => {
        const audio = new Audio();
        audio.src = sound;
        audio.preload = 'auto';
        audio.loop = false;
    });
    
    const images = ['https://res.cloudinary.com/drnaycy06/image/upload/v1745532998/Windows_Logo__1992-2001_.svg_osqvuf.png'];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

preloadResources();


const App = <React.StrictMode><AppStarter /></React.StrictMode>
ReactDOM.render( App, document.getElementById('root'));