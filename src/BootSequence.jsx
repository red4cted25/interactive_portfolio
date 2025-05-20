import { useState, useEffect, useRef } from 'react';
import Win98Home from './Win98Home';
import BiosScreen from './components/BiosScreen';
import WindowsLogoScreen from './components/WindowsLogoScreen';
import { styled } from 'styled-components';

// Styled components for boot sequence container
const BootContainer = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    background-color: black;
    color: white;
    font-family: 'Courier New', monospace;
    overflow: hidden;
    padding: 0;
    margin: 0;
`;

const BlackScreen = styled.div`
    width: 100%;
    height: 100%;
    background-color: black;
`;

const BootSequence = () => {
    const [bootStage, setBootStage] = useState('bios');

    const floppyDriveSound = useRef(new Audio('./sounds/floppy_drive.mp3'));
    const startupSound = useRef(new Audio('./sounds/windows98_startup.mp3'));

    useEffect(() => {
        const bootTimeline = async () => {
            if (bootStage === 'bios') {
                setTimeout(() => {
                    floppyDriveSound.current.play();
                }, 2000);

                setTimeout(() => {
                    setBootStage('blackTransition1');
                }, 8000);
            }

            if (bootStage === 'blackTransition1') {
                setTimeout(() => {
                    setBootStage('windowsLogo');
                }, 1500);
            }

            if (bootStage === 'windowsLogo') {
                setTimeout(() => {
                    startupSound.current.play();
                }, 200);

                setTimeout(() => {
                    setBootStage('blackTransition2');
                }, 4500);
            }

            if (bootStage === 'blackTransition2') {
                setTimeout(() => {
                    setBootStage('desktop');
                }, 1500);
            }
        };

        bootTimeline();
    }, [bootStage]);
    
    // Render current boot stage
    const renderBootScreen = () => {
        switch (bootStage) {
        case 'bios':
            return <BiosScreen />;
        case 'blackTransition1':
        case 'blackTransition2':
            return <BlackScreen />;
        case 'windowsLogo':
            return <WindowsLogoScreen />;
        case 'desktop':
            return <Win98Home />;
        default:
            return null;
        }
    };
    
    return (
        <BootContainer>
            {renderBootScreen()}
        </BootContainer>
    );
};

export default BootSequence;