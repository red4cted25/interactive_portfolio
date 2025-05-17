import { useRef, useState } from 'react';
import { Anchor, Button, TextInput, WindowContent } from 'react95';
import emailjs from 'emailjs-com';

const ContactContent = () => {
    const formRef = useRef();
    const [status, setStatus] = useState('');
    const [sending, setSending] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setSending(true);
        setStatus('');

        emailjs.sendForm(
            'service_t70m03w', 
            'template_z2gc51j', 
            formRef.current,
            'gXwr2K_Ws3NE88KR-' 
        )
        .then(() => {
            setStatus('Message sent!');
            formRef.current.reset();
        })
        .catch(() => {
            setStatus('Something went wrong. Please try again later.');
        })
        .finally(() => setSending(false));
    };

    return (
        <WindowContent>
            <p>Feel free to reach out! I'm always open to new opportunities and collaborations.</p>
            <div style={{ marginBottom: '15px' }}>
                <p><strong>Email:</strong> nicolas.m.diaz07@gmail.com</p>
                <p><strong>LinkedIn:</strong> <Anchor href="https://www.linkedin.com/in/nicolas-m-diaz/" target="_blank">linkedin.com/in/nicolas-m-diaz/</Anchor></p>
            </div>

            <h3 className="font-bold mt-4">Send a Message</h3>
            <form ref={formRef} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                    <label><span className="underline underline-offset-1">N</span>ame:</label>
                    <TextInput name="name" fullWidth required/>
                </div>
                <div>
                    <label><span className="underline underline-offset-1">E</span>mail:</label>
                    <TextInput name="email" type="email" fullWidth required/>
                </div>
                <div>
                    <label><span className="underline underline-offset-1">T</span>itle:</label>
                    <TextInput name="title" fullWidth required/>
                </div>
                <div>
                    <label><span className="underline underline-offset-1">M</span>essage:</label>
                    <TextInput name="message" multiline rows={5} fullWidth required/>
                </div>
                <input type="hidden" name="time" value={new Date().toLocaleString()} />
                <Button type="submit" disabled={sending} style={{cursor: sending ? 'wait' : 'default'}}>
                    <span className="underline underline-offset-1">S</span>end Message
                </Button>
                {status && <p style={{ color: status.includes('sent') ? 'green' : 'red' }}>{status}</p>}
            </form>
        </WindowContent>
    );
};

export default ContactContent;
