import { Button } from "react95";

const ResumeContent = () => (
    <div>
        <h2>Resume</h2>
        <h3>Experience</h3>
        <div style={{ marginBottom: '15px' }}>
            <h4>Senior Frontend Developer - Tech Co.</h4>
            <p>2020 - Present</p>
            <ul>
                <li>Led development of company's flagship web application</li>
                <li>Implemented CI/CD pipeline reducing deployment time by 70%</li>
                <li>Mentored junior developers</li>
            </ul>
        </div>
        <div>
            <h4>Web Developer - Digital Agency</h4>
            <p>2018 - 2020</p>
            <ul>
                <li>Built responsive websites for various clients</li>
                <li>Collaborated with design team to implement UI/UX improvements</li>
            </ul>
        </div>
        <h3>Education</h3>
        <p>B.S. Computer Science - University Name, 2018</p>
        <Button style={{ marginTop: '15px' }} href="/Resume.pdf" target='_blank'>Download PDF</Button>
    </div>
);

export default ResumeContent;