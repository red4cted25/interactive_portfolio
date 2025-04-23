import { Anchor, Button } from 'react95'

const ContactContent = () => (
    <div>
        <h2>Contact Me</h2>
        <p>Feel free to reach out! I'm always open to new opportunities and collaborations.</p>
        <div style={{ marginBottom: '15px' }}>
            <p><strong>Email:</strong> nicolas.m.diaz07@gmail.com</p>
            <p><strong>LinkedIn:</strong> <Anchor href="https://www.linkedin.com/in/nicolas-m-diaz/" target="_blank">linkedin.com/in/nicolas-m-diaz/</Anchor></p>
        </div>
        <h3>Send a Message</h3>
        <div className="mb-2.5">
            <p>Name:</p>
            <input type="text" style={{ width: '100%' }} />
        </div>
        <div className="mb-2.5">
            <p>Email:</p>
            <input type="email" style={{ width: '100%' }} />
        </div>
        <div className="mb-2.5">
            <p>Message:</p>
            <textarea style={{ width: '100%', height: '100px' }} />
        </div>
        <Button>Send Message</Button>
    </div>
);

export default ContactContent;