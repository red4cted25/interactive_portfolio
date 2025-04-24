import { useState } from 'react';
import BootSequence from './BootSequence';
import { styled } from 'styled-components';

const StartContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #aaaaaa;
    font-family: 'Courier New', monospace;
`;

const StartButton = styled.button`
    background-color: black;
    border: 1px solid #aaaaaa;
    padding: 12px 24px;
    font-family: 'Courier New', monospace;
    font-size: 16px;
    cursor: pointer;
    color: #aaaaaa;
    
    &:hover {
        background-color: #333;
    }
    
    &:active {
        background-color: #444;
    }
`;

const AppStarter = () => {
    const [started, setStarted] = useState(false);

    const handleStart = () => {
        // Enable audio context if needed
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            const audioContext = new AudioContext();
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
        }
        
        setStarted(true);
    };

    if (!started) {
        return (
        <StartContainer>
            <h1 className="mb-8 text-2xl">Press any key to boot</h1>
            <StartButton onClick={handleStart}>
                Power On
            </StartButton>
        </StartContainer>
        );
    }

    return <BootSequence />;
};

export default AppStarter;