import { useState, useEffect, useRef } from 'react';
import { styled } from 'styled-components';

const BiosContainer = styled.div`
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

const EnergyStarLogo = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    text-align: right;
    opacity: 0;
    transition: opacity 0.5s ease-in;
    opacity: ${props => props.visible ? 1 : 0};
`;

const biosText = [
    { text: "Award Modular BIOS v4.51PG, An Energy Star Ally", delay: 0 },
    { text: "Copyright (C) 1984-98, Award Software, Inc.", delay: 200 },
    { text: "", delay: 300 },
    { text: "ASUS P5A ACPI BIOS Revision 1011", delay: 300 },
    { text: "CPU : AMD-K6(tm)-III Processor", delay: 500 },
    { text: "Speed : 450MHz", delay: 300 },
    { text: "", delay: 200 },
    { text: "Detecting Primary Master... FUJITSU MPC3064AT", delay: 400 },
    { text: "Detecting Primary Slave... None", delay: 300 },
    { text: "Detecting Secondary Master... ASUS CD-ROM", delay: 400 },
    { text: "Detecting Secondary Slave... None", delay: 300 },
    { text: "", delay: 200 },
    { text: "Memory Test :  262144K OK", delay: 1500 },
    { text: "", delay: 200 },
    { text: "Award Plug and Play BIOS Extension v1.0A", delay: 300 },
    { text: "Initialize Plug and Play Cards...", delay: 600 },
    { text: "PNP Init Completed", delay: 600 },
    { text: "", delay: 400 },
    { text: "Trend ChipAwayVirus(R) On Guard", delay: 400 },
    { text: "", delay: 500 },
    { text: "Press DEL to enter SETUP", delay: 400 },
    { text: "05/02/1998-ALADDIN5-2A69KN0YC-00", delay: 200 }
];

const BiosScreen = () => {
    const [biosLines, setBiosLines] = useState([]);
    const [showEnergyStarLogo, setShowEnergyStarLogo] = useState(false);
    const lastLineRef = useRef(null);
    
    useEffect(() => {
        // Display BIOS lines with timing
        let currentLines = [];
        let totalDelay = 0;
        
        biosText.forEach((line, index) => {
        totalDelay += line.delay;
        
        setTimeout(() => {
            currentLines = [...currentLines, line.text];
            setBiosLines([...currentLines]);
            
            // Scroll to bottom when new content is added
            if (lastLineRef.current) {
            lastLineRef.current.scrollIntoView({ behavior: 'auto' });
            }
            
            // Show Energy Star logo near the end of the BIOS sequence
            if (index === biosText.length - 5) {
            setShowEnergyStarLogo(true);
            }
        }, totalDelay);
        });
    }, []);
    
    return (
        <BiosContainer>
        <div className="flex flex-grow">
            <div className="flex-grow">
            {biosLines.map((line, index) => (
                <div 
                key={index} 
                ref={index === biosLines.length - 1 ? lastLineRef : null}
                >
                {line}
                </div>
            ))}
            </div>
        </div>
        
        <EnergyStarLogo visible={showEnergyStarLogo}>
            <div style={{ color: '#ffff00' }}>
            Energy★<br/>
            <span style={{ color: '#00ff00', fontSize: '10px' }}>
                EPA POLLUTION PREVENTER
            </span>
            </div>
        </EnergyStarLogo>
        </BiosContainer>
    );
};

export default BiosScreen;