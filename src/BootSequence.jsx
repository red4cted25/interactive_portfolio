import { useState, useEffect } from 'react';
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
    
    // Reference to audio elements
    const floppyDriveSound = new Audio('./sounds/floppy_drive.mp3');
    const startupSound = new Audio('./sounds/windows98_startup.mp3');
    
    useEffect(() => {
        // Boot sequence timing management
        const bootTimeline = async () => {
        // BIOS stage (typically lasts about 8-10 seconds)
        if (bootStage === 'bios') {
            // Play floppy drive sound at specific points during BIOS
            setTimeout(() => {
            floppyDriveSound.play();
            }, 2000);
            
            // After BIOS completes, transition to black screen
            setTimeout(() => {
                setBootStage('blackTransition1');
            }, 8000);
        }
        
        // First black screen transition (about 1.5 seconds)
        if (bootStage === 'blackTransition1') {
            setTimeout(() => {
                setBootStage('windowsLogo');
            }, 1500);
        }
        
        // Windows logo screen
        if (bootStage === 'windowsLogo') {
            // Play Windows startup sound when logo appears
            setTimeout(() => {
                startupSound.play();
            }, 200);
            
            // Logo screen typically shows for 4-5 seconds
            setTimeout(() => {
                setBootStage('blackTransition2');
            }, 4500);
        }
        
        // Final black screen transition before desktop
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