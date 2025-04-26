import { Frame } from 'react95'

const AboutMeContent = () => (
    <Frame
        variant="field"
        className="about-me-frame my-4 p-4"
        style={{ display: 'flex', gap: '16px', flexDirection: 'column'}}
    >
        <p>Hey! I'm Nico Diaz, a freshman at Arizona State University and a junior full stack web developer with a passion for creating unique and engaging user experiences.</p>
        <p>Through my experience with West-MEC, I've developed projects with HTML, CSS, JS, ReactJS, and NextJS.</p>
        <p>When I'm not coding or doing university homework, you can find me gaming, reading, listening to music, or researching random topics that cross my mind.</p>
    </Frame>
);

export default AboutMeContent;