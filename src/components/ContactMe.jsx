import { Anchor, Button } from 'react95'

const ContactContent = () => (
    <div>
        <p>Feel free to reach out! I'm always open to new opportunities and collaborations.</p>
        <div style={{ marginBottom: '15px' }}>
            <p><strong>Email:</strong> nicolas.m.diaz07@gmail.com</p>
            <p><strong>LinkedIn:</strong> <Anchor href="https://www.linkedin.com/in/nicolas-m-diaz/" target="_blank">linkedin.com/in/nicolas-m-diaz/</Anchor></p>
        </div>
        <h3 className='font-bold mt-4'>Send a Message</h3>
        <div className="mb-2.5">
            <p><span className="underline underline-offset-1">N</span>ame:</p>
            <input type="text" style={{ width: '100%', padding: '8px' }} />
        </div>
        <div className="mb-2.5">
            <p><span className="underline underline-offset-1">E</span>mail:</p>
            <input type="email" style={{ width: '100%', padding: '8px' }} />
        </div>
        <div className="mb-2.5">
            <p><span className="underline underline-offset-1">M</span>essage:</p>
            <textarea style={{ width: '100%', height: '100px', padding: '8px', resize: 'none' }} />
        </div>
        <Button><span className="underline underline-offset-1">S</span>end Message</Button>
    </div>
);

export default ContactContent;