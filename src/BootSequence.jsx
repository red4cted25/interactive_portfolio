import { useState, useEffect, useRef } from 'react';
import Win98Home from './Win98Home';
import { styled } from 'styled-components';

// Styled components for boot screens
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

const BiosScreen = styled.div`
    width: 100%;
    height: 100%;
    background-color: black;
    color: #aaaaaa;
    padding: 20px;
    font-size: 14px;
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    white-space: pre;
`;

const DosScreen = styled.div`
    width: 100%;
    height: 100%;
    background-color: black;
    color: white;
    padding: 20px;
    font-size: 16px;
    line-height: 1.5;
    display: flex;
    flex-direction: column;
`;

const WindowsLogo = styled.div`
    width: 100%;
    height: 100%;
    background-color: #008080;
    background-image: url('https://res.cloudinary.com/your-cloud-name/image/upload/windows98_logo_bg.jpg');
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const LoadingBar = styled.div`
    width: 300px;
    height: 20px;
    border: 2px solid white;
    margin-top: 20px;
    position: relative;
    overflow: hidden;
`;

const LoadingProgress = styled.div`
    height: 100%;
    background-color: white;
    width: ${props => props.progress}%;
    transition: width 0.1s ease-in-out;
`;

const TypedText = ({ text, initialDelay = 0, speed = 10, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [delayCompleted, setDelayCompleted] = useState(false);
    
    useEffect(() => {
        if (initialDelay > 0 && !delayCompleted) {
            const timer = setTimeout(() => {
                setDelayCompleted(true);
            }, initialDelay);
            return () => clearTimeout(timer);
        }
        
        if (!delayCompleted) return;
        
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, speed);
            
            return () => clearTimeout(timer);
        } else if (onComplete) {
            onComplete();
        }
    }, [currentIndex, text, speed, initialDelay, delayCompleted, onComplete]);
    
    return <span>{displayedText}</span>;
    };

const BootSequence = () => {
    const [bootStage, setBootStage] = useState('bios');
    const [biosLines, setBiosLines] = useState([]);
    const [progress, setProgress] = useState(0);
    const [biosComplete, setBiosComplete] = useState(false);
    const lastLineRef = useRef(null);
    
    // BIOS text with timing
    const biosText = [
        { text: "Award Modular BIOS v4.51PG, An Energy Star Ally", delay: 0 },
        { text: "Copyright (C) 1984-98, Award Software, Inc.", delay: 200 },
        { text: "", delay: 500 },
        { text: "ASUS P5A ACPI BIOS Revision 1011 Beta 005", delay: 300 },
        { text: "", delay: 200 },
        { text: "AMD-K6(tm)-III/450 Processor", delay: 500 },
        { text: "Memory Test :  262144K OK", delay: 1500 },
        { text: "", delay: 200 },
        { text: "Award Plug and Play BIOS Extension v1.0A", delay: 300 },
        { text: "Initialize Plug and Play Cards...", delay: 600 },
        { text: "PNP Init Completed", delay: 800 },
        { text: "", delay: 400 },
        { text: "Trend ChipAwayVirus(R) On Guard_", delay: 400 },
        { text: "", delay: 1000 },
        { text: "", delay: 500 },
        { text: "", delay: 500 },
        { text: "Press DEL to enter SETUP", delay: 400 },
        { text: "05/02/2002-ALADDIN5-<P5A>>", delay: 200 }
    ];
    
    const biosTimingRef = useRef([]);
    
    // Sound effects
    const [biosBeepSound] = useState(new Audio('/sounds/bios_beep.mp3'));
    const [diskSound] = useState(new Audio('/sounds/floppy_drive.mp3'));
    const [startupSound] = useState(new Audio('/sounds/windows98_startup.mp3'));
    
    useEffect(() => {
        // Handle BIOS screen loading
        if (bootStage === 'bios') {
            let currentLines = [];
            let currentDelay = 0;
            
            // Play BIOS beep
            try {
                setTimeout(() => {
                    biosBeepSound.play();
                }, 500);
            } catch (error) {
                console.log('Audio playback failed:', error);
            }
            
            biosText.forEach((line, index) => {
                currentDelay += line.delay;
                biosTimingRef.current.push(currentDelay);
                
                setTimeout(() => {
                currentLines = [...currentLines, line.text];
                setBiosLines([...currentLines]);
                
                // Scroll to bottom if new content
                if (line.text && lastLineRef.current) {
                    lastLineRef.current.scrollIntoView({ behavior: 'auto' });
                }
                
                // Move to next stage after all BIOS lines are shown
                if (index === biosText.length - 1) {
                    setTimeout(() => {
                    setBiosComplete(true);
                    setTimeout(() => {
                        setBootStage('dos');
                    }, 1500);
                    }, 1000);
                }
                }, currentDelay);
            });
        }
        
        // Handle DOS boot screen
        if (bootStage === 'dos') {
        // Play disk sound
        try {
            diskSound.play();
        } catch (error) {
            console.log('Audio playback failed:', error);
        }
        
        const loadingInterval = setInterval(() => {
            setProgress(prev => {
            if (prev >= 100) {
                clearInterval(loadingInterval);
                setTimeout(() => {
                setBootStage('black1');
                }, 500);
                return 100;
            }
            return prev + 2;
            });
        }, 40);
        
        return () => clearInterval(loadingInterval);
        }
        
        // Handle black screen transition
        if (bootStage === 'black1') {
        setTimeout(() => {
            setBootStage('logo');
        }, 1500);
        }
        
        // Handle Windows logo screen
        if (bootStage === 'logo') {
        // Play startup sound
        try {
            startupSound.play();
        } catch (error) {
            console.log('Audio playback failed:', error);
        }
        
        setTimeout(() => {
            setBootStage('black2');
        }, 4000);
        }
        
        // Handle final black screen transition
        if (bootStage === 'black2') {
        setTimeout(() => {
            setBootStage('desktop');
        }, 1500);
        }
    }, [bootStage, biosBeepSound, diskSound, startupSound]);
    
    // Render different boot screens
    const renderBootScreen = () => {
        switch (bootStage) {
        case 'bios':
            return (
            <BiosScreen>
                <div className="flex">
                <div className="flex-grow">
                    {biosLines.map((line, index) => (
                    <div key={index} ref={index === biosLines.length - 1 ? lastLineRef : null}>
                        {line}
                    </div>
                    ))}
                </div>
                <div className="flex-none ml-auto">
                    {biosComplete && (
                    <div style={{ color: '#ffff00' }}>
                        Energy★<br/>
                        <span style={{ color: '#00ff00', fontSize: '10px' }}>EPA POLLUTION PREVENTER</span>
                    </div>
                    )}
                </div>
                </div>
            </BiosScreen>
            );
        case 'dos':
            return (
            <DosScreen>
                <div className="mb-8">
                <TypedText 
                    text="Starting MS-DOS..." 
                    speed={50}
                />
                <br />
                <TypedText 
                    text="HIMEM is testing extended memory..." 
                    initialDelay={500}
                    speed={30}
                />
                <br />
                <TypedText 
                    text="HIMEM is testing extended memory... Done." 
                    initialDelay={1500}
                    speed={30}
                />
                <br />
                <TypedText 
                    text="MS-DOS 7.10 (Disk Operating System)" 
                    initialDelay={2000}
                    speed={40}
                />
                <br />
                <TypedText 
                    text="Copyright Microsoft Corp 1981-1998" 
                    initialDelay={2300}
                    speed={40}
                />
                <br />
                <br />
                <TypedText 
                    text="C:\\> cd WINDOWS" 
                    initialDelay={2800}
                    speed={60}
                />
                <br />
                <TypedText 
                    text="C:\\WINDOWS> WIN" 
                    initialDelay={3500}
                    speed={60}
                />
                <br />
                <br />
                <TypedText 
                    text="Loading Windows 98..." 
                    initialDelay={4000}
                    speed={50}
                />
                <LoadingBar>
                    <LoadingProgress progress={progress} />
                </LoadingBar>
                </div>
            </DosScreen>
            );
        case 'black1':
        case 'black2':
            return (
            <div className="w-full h-full bg-black"></div>
            );
        case 'logo':
            return (
            <WindowsLogo>
                <img 
                src="/images/windows98_logo.png" 
                alt="Windows 98" 
                className="w-80 h-auto"
                />
                <div className="text-white mt-4 text-lg">
                Windows 98 is now starting...
                </div>
            </WindowsLogo>
            );
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