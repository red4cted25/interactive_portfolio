import { Frame } from 'react95';
import styled from 'styled-components';

const AboutMeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

const ProfileImage = styled.img`
  width: 96px;
  height: 96px;
  image-rendering: pixelated;
  border: 2px solid #000;
  margin-bottom: 16px;
`;

const AboutMeContent = () => (
    <AboutMeWrapper>
        <ProfileImage
            src="https://res.cloudinary.com/drnaycy06/image/upload/v1746859927/nico-px-raw_ugdvvc.png"
            alt="Pixelated portrait of Nico Diaz"
            style={{
                borderRadius: '50%',
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
                height: '256px',
                width: '256px',
            }}
        />

        <Frame
            variant="field"
            className="about-me-frame"
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                width: '100%',
                maxWidth: '600px',
                padding: '16px',
            }}
        >
            <p>Hi! I'm <strong>Nico Diaz</strong>, a freshman at Arizona State University and a web developer who loves nostalgic tech and creative digital design.</p>
            <p>I got my start at West-MEC, where I dove deep into full stack development with HTML, CSS, JavaScript, React, and Next.js — and I've been hooked ever since.</p>
            <p>Outside of tech, I'm into gaming, reading, obscure online mysteries, and obsessively researching anything that catches my attention (like Mothman or Windows 98).</p>
            <p>This portfolio is a tribute to what got me into tech in the first place: quirky computers, pixel fonts, and creativity.</p>
        </Frame>
    </AboutMeWrapper>
);

export default AboutMeContent;
