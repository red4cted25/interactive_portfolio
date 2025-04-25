import { useState, useEffect } from 'react';
import { styled } from 'styled-components';

const LogoContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #008080;
    background-image: url('https://res.cloudinary.com/drnaycy06/image/upload/v1745611971/windows_98_clouds_background___16_9_widescreen_by__by_therealrichard5_dggobt4-fullview_dmy7do.jpg');
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Logo = styled.img`
    width: 320px;
    height: auto;
    opacity: 0;
    animation: fadeIn 1s ease-in forwards;
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

const LoadingText = styled.div`
    margin-top: 24px;
    color: black;
    font-family: 'Times New Roman', Times, serif;
    font-size: 20px;
    opacity: 0;
    animation: fadeIn 1s ease-in 0.5s forwards;
`;

const WindowsLogoScreen = () => {
    const [dots, setDots] = useState('');
    
    useEffect(() => {
        // Animate the loading dots
        const interval = setInterval(() => {
        setDots(prevDots => {
            if (prevDots.length >= 3) return '';
            return prevDots + '.';
        });
        }, 600);
        
        return () => clearInterval(interval);
    }, []);
    
    return (
        <LogoContainer>
        <Logo 
            src="https://res.cloudinary.com/drnaycy06/image/upload/v1745532998/Windows_Logo__1992-2001_.svg_osqvuf.png" 
            alt="Windows 98 Logo"
        />
        {/* TODO: CHECK WIREFRAME IMPROVE LATER */}
        <LoadingText>
            Portolio 98 is now starting{dots}
        </LoadingText>
        </LogoContainer>
    );
};

export default WindowsLogoScreen;