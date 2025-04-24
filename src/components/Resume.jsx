import { useState } from "react";
import { AppBar, Button, Frame, Tab, Tabs, TabBody, Toolbar } from "react95";

const ResumeContent = () => {
    const [activeTab, setActiveTab] = useState(0);
    
    return (
        <div className="flex flex-col h-full">
            <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
                <Tab value={0}><span className="underline underline-offset-1">E</span>ducation</Tab>
                <Tab value={1}>E<span className="underline underline-offset-1">x</span>perience</Tab>
                <Tab value={2}><span className="underline underline-offset-1">S</span>kills</Tab>
            </Tabs>
            <TabBody className="flex-1 overflow-y-auto">
                {activeTab === 0 && (
                    <div className="tab-content">
                        <Frame 
                            variant="field" 
                            className="education-frame mb-4" 
                            style={{ padding: '16px', marginTop: '16px' }}
                        >
                            <h3 className="font-bold">West-MEC NEC - Coding</h3>
                            <p>2023 - 2025</p>
                            <ul className="list-disc pl-5">
                                <li>- Completed West-MEC's Coding Program focused on web and mobile development</li>
                                <li>- Proficient in HTML, CSS, JavaScript, Python, and React</li>
                                <li>- Built full-stack projects individually and in teams</li>
                                <li>- Trained in agile workflows, version control, and responsible design practices</li>
                            </ul>
                        </Frame>
                        
                        <Frame 
                            variant="field" 
                            className="education-frame mb-4" 
                            style={{ padding: '16px', marginTop: '16px' }}
                        >
                            <h3 className="font-bold">Moon Valley High School</h3>
                            <p>2021 - 2025</p>
                            <ul className="list-disc pl-5">
                                <li>- Earned 3.8 Unweighted, 4.7 Weighted GPA</li>
                                <li>- Supported school community with leadership and mentoring peers</li>
                            </ul>
                        </Frame>

                        <Frame 
                            variant="field" 
                            className="education-frame mb-4" 
                            style={{ padding: '16px', marginTop: '16px', width: '100%' }}
                        >
                            <h3 className="font-bold">B.S. Computer Science - Arizona State University</h3>
                            <p>2025 - Present</p>
                            <ul className="list-disc pl-5">
                                <li>- Enrolled in Barrett, The Honors College</li>
                                <li>- Earned New American University Scholarship</li>
                            </ul>
                        </Frame>
                    </div>
                )}

                {activeTab === 1 && (
                    <div className="tab-content">
                        <Frame variant="field" className="mb-4" style={{ padding: '16px', marginTop: '16px' }}>
                            <h3><span className="font-bold">Subway</span> - Sandwich Artist</h3>
                            <p>August 2024 - May 2025</p>
                            <ul className="list-disc pl-5">
                                <li>- Prepared custom orders while following food safety guidelines in a fast-paced environment</li>
                                <li>- Managed multiple tasks including dishwashing, food prep, and restocking</li>
                                <li>- Strengthened time management, teamwork, and problem-solving skills under pressure</li>
                            </ul>
                        </Frame>
                    </div>
                )}
                
                {activeTab === 2 && (
                    <div className="tab-content">
                        <Frame variant="field" className="mb-4" style={{ padding: '16px', marginTop: '16px' }}>
                            <h3 className="font-bold">Technical Skills</h3>
                            <ul className='pl-5'>
                                <li className="underline underline-offset-2">Frontend Development</li>
                                <ul className="pl-5">
                                    <li>- HTML, CSS, JavaScript</li>
                                    <li>- ReactJS, NextJS</li>
                                    <li>- TailwindCSS</li>
                                </ul>
                                <li className="underline underline-offset-2">Backend Development</li>
                                <ul className="pl-5">
                                    <li>- Node.js, Express</li>
                                    <li>- RESTful APIs</li>
                                    <li>- Python, Flask</li>
                                </ul>
                                <li className="underline underline-offset-2">Database Management</li>
                                <ul className="pl-5">
                                    <li>- MongoDB</li>
                                    <li>- Encryption, bcryptjs</li>
                                </ul>
                            </ul>
                        </Frame>
                    </div>
                )}
            </TabBody>
            <AppBar position="static" className="mt-4">
                <Toolbar style={{ justifyContent: 'flex-end' }}>
                    <a href="/Resume.pdf" target='_blank' className="mt-3 ml-auto">
                        <Button>Download PDF</Button>
                    </a>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default ResumeContent;