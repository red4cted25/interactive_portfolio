import { Button } from 'react95';

const ProjectsContent = () => (
    <div>
        <h2>My Projects</h2>
        <div style={{ marginBottom: '20px' }}>
            <h3>E-commerce Platform</h3>
            <p>A full-stack e-commerce solution with React frontend and Node.js backend.</p>
            <Button>View Project</Button>
        </div>
        <div style={{ marginBottom: '20px' }}>
            <h3>Weather App</h3>
            <p>Real-time weather forecasting application using OpenWeather API.</p>
            <Button>View Project</Button>
        </div>
        <div>
            <h3>Portfolio Website</h3>
            <p>This Windows 98-themed portfolio website built with React and react95.</p>
            <Button>View Code</Button>
        </div>
    </div>
);

export default ProjectsContent;