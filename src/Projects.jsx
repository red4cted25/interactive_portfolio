import { useState } from 'react';
import { MenuList, MenuListItem, Button, Toolbar, Frame } from 'react95';
import { styled } from 'styled-components';
import DraggableWindow from './components/Window';

// Styled components for the File Explorer look
const ExplorerContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const NavigationBar = styled(Toolbar)`
    padding: 0 8px;
    position: relative;
`;

const AddressBar = styled(Frame)`
    flex: 1;
    margin: 0 8px;
    padding: 2px 4px;
    background-color: white;
    display: flex;
    align-items: center;
`;

const ExplorerContent = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    overflow: hidden;
`;

const FolderTree = styled.div`
    flex: 0 0 30%;
    border-right: 1px solid #a0a0a0;
    overflow-y: auto;
    padding: 8px;
`;

const FileView = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 8px;
    background-color: white;
`;

const IconGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    padding: 16px;
`;

const IconItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    cursor: pointer;
    width: 80px;
    height: 100px;
    margin-bottom: 10px;
    padding: 6px;
    
    &:hover {
        background-color: #c0d0ff;
    }
    
    &:active {
        background-color: #001080;
        color: white;
    }
`;

const IconImage = styled.div`
    width: 48px;
    height: 48px;
    margin-bottom: 6px;
    background-image: url(${props => props.src});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

const IconText = styled.div`
    font-size: 12px;
    word-wrap: break-word;
    width: 100%;
`;

const StatusBar = styled(Toolbar)`
    padding: 2px 4px;
    justify-content: space-between;
`;

const ProjectsContent = () => {
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [currentPath, setCurrentPath] = useState('C:\\Projects');
    const [projectWindows, setProjectWindows] = useState([]);
    const [nextZIndex, setNextZIndex] = useState(1000);
    
    // Programming languages data
    const languages = [
        { 
        id: 'html', 
        name: 'HTML', 
        icon: 'https://res.cloudinary.com/drnaycy06/image/upload/v1745356157/directory_closed-4_ehkixu.png'
        },
        { 
        id: 'javascript', 
        name: 'JavaScript', 
        icon: 'https://res.cloudinary.com/drnaycy06/image/upload/v1745356157/directory_closed-4_ehkixu.png'
        },
        { 
        id: 'python', 
        name: 'Python',
        icon: 'https://res.cloudinary.com/drnaycy06/image/upload/v1745356157/directory_closed-4_ehkixu.png'
        },
        { 
        id: 'react', 
        name: 'ReactJS',
        icon: 'https://res.cloudinary.com/drnaycy06/image/upload/v1745356157/directory_closed-4_ehkixu.png'
        }
        ,
        { 
        id: 'next', 
        name: 'NextJS',
        icon: 'https://res.cloudinary.com/drnaycy06/image/upload/v1745356157/directory_closed-4_ehkixu.png'
        },
        { 
        id: 'typescript', 
        name: 'TypeScript',
        icon: 'https://res.cloudinary.com/drnaycy06/image/upload/v1745356157/directory_closed-4_ehkixu.png'
        }
    ];
    
    // Projects data
    const projects = {
        html: [
            {
                id: 'holidayfriends',
                name: 'Holiday Themed Friends Website',
                description: 'A holiday themed website for friends at West-MEC',
                date: 'Dec 19, 2023',
                technologies: 'HTML, CSS',
                github: 'https://github.com/red4cted25/Holiday-Themed-Friends-Website',
                icon: 'https://res.cloudinary.com/drnaycy06/image/upload/v1745356180/document-0_lyzog6.png'
            },
            {
                id: 'businesswebsite',
                name: 'Business Website',
                description: 'A business website for a fictional company',
                date: 'Nov 16, 2023',
                technologies: 'HTML, CSS',
                github: 'https://github.com/red4cted25/Business-Website',
                icon: 'https://res.cloudinary.com/drnaycy06/image/upload/v1745356180/document-0_lyzog6.png'
            },
            {
                id: 'webcalculator',
                name: 'Web Calculator',
                description: 'A simple, stylish calculator built with HTML and CSS',
                date: 'Feb 14, 2024',
                technologies: 'HTML, CSS, JS',
                github: 'https://github.com/red4cted25/Web-Calculator',
                icon: 'https://res.cloudinary.com/drnaycy06/image/upload/v1745356180/document-0_lyzog6.png'
            },
            {
                id: 'jenkinssecretsociety',
                name: 'Jenkins Secret Society',
                description: 'A practice for servers and node modules by creating a puzzle game that uses the url as the answer check',
                date: 'Dec 16, 2024',
                technologies: 'HTML, CSS, JS',
                github: 'https://github.com/red4cted25/Jenkins-Secret-Society',
                icon: 'https://res.cloudinary.com/drnaycy06/image/upload/v1745356180/document-0_lyzog6.png'
            },
        ],
        javascript: [
            {
                id: 'holidayfriends',
                name: 'Holiday Themed Friends Website',
                description: 'A holiday themed website for friends at West-MEC',
                date: 'Dec 19, 2023',
                technologies: 'HTML, CSS',
                github: 'https://github.com/red4cted25/Holiday-Themed-Friends-Website',
                icon: 'https://res.cloudinary.com/drnaycy06/image/upload/v1745356180/document-0_lyzog6.png'
            },
        ],
        python: [
            {
                id: 'datavisualizer',
                name: 'Data Visualizer',
                description: 'Tool for creating interactive visualizations from CSV data.',
                technologies: 'Python, Pandas, Matplotlib',
                github: 'https://github.com/yourusername/datavisualizer',
                icon: 'https://res.cloudinary.com/drnaycy06/image/upload/v1745356180/document-0_lyzog6.png'
            },
        ],
        react: [
            {
                id: 'win98portfolio',
                name: 'Win98 Portfolio',
                description: 'A nostalgic Windows 98-themed portfolio website built with React and styled-components.',
                technologies: 'React, React95, Styled Components',
                github: 'https://github.com/yourusername/win98portfolio',
                icon: 'https://res.cloudinary.com/drnaycy06/image/upload/v1745356180/document-0_lyzog6.png'
            },
        ],
        next: [
            {
                id: 'win98portfolio',
                name: 'Win98 Portfolio',
                description: 'A nostalgic Windows 98-themed portfolio website built with React and styled-components.',
                technologies: 'React, React95, Styled Components',
                github: 'https://github.com/yourusername/win98portfolio',
                icon: 'https://res.cloudinary.com/drnaycy06/image/upload/v1745356180/document-0_lyzog6.png'
            },
        ],
        typescript: [
            {
                id: 'win98portfolio',
                name: 'Win98 Portfolio',
                description: 'A nostalgic Windows 98-themed portfolio website built with React and styled-components.',
                technologies: 'React, React95, Styled Components',
                github: 'https://github.com/yourusername/win98portfolio',
                icon: 'https://res.cloudinary.com/drnaycy06/image/upload/v1745356180/document-0_lyzog6.png'
            },
        ],
    };
    
    const handleFolderClick = (languageId) => {
        setSelectedFolder(languageId);
        setCurrentPath(`C:\\Projects\\${languageId}`);
    };
    
    const handleProjectClick = (project) => {
        openProjectWindow(project);
    };
    
    const openProjectWindow = (project) => {
        // Check if already open
        if (projectWindows.find(window => window.id === project.id)) {
            focusWindow(project.id);
            return;
        }
        
        const newWindow = {
            id: project.id,
            title: project.name,
            project: project,
            zIndex: nextZIndex,
            position: { x: 200 + Math.random() * 100, y: 150 + Math.random() * 50 }
        };
        
        setProjectWindows([...projectWindows, newWindow]);
        setNextZIndex(nextZIndex + 1);
    };
    
    const closeWindow = (id) => {
        setProjectWindows(projectWindows.filter(window => window.id !== id));
    };
    
    const focusWindow = (id) => {
        setProjectWindows(
        projectWindows.map(window => 
            window.id === id 
            ? { ...window, zIndex: nextZIndex } 
            : window
        )
        );
        setNextZIndex(nextZIndex + 1);
    };
    
    const goBack = () => {
        setSelectedFolder(null);
        setCurrentPath('C:\\Projects');
    };
    
    const ProjectDetailsWindow = ({ project, id, title, onClose, onFocus, zIndex, position }) => (
        <DraggableWindow
            id={id}
            title={title}
            initialPosition={position}
            onClose={onClose}
            onFocus={onFocus}
            zIndex={zIndex}
            width={500}
            height={450}
        >
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">{project.name}</h2>
            
            <div className="mb-4">
            <h3 className="font-bold">Description:</h3>
            <p>{project.description}</p>
            </div>
            
            <div className="mb-4">
            <h3 className="font-bold">Technologies:</h3>
            <p>{project.technologies}</p>
            </div>
            
            <div className="mb-4">
            <h3 className="font-bold">GitHub:</h3>
            <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#0000ff', textDecoration: 'underline' }}
            >
                {project.github}
            </a>
            </div>
            
            <Button onClick={() => window.open(project.github, '_blank')}>
            Visit Project Repository
            </Button>
        </div>
        </DraggableWindow>
    );
    
    return (
        <ExplorerContainer>
        {/* Navigation Bar */}
        <NavigationBar>
            <Button onClick={goBack} disabled={!selectedFolder}>
            Back
            </Button>
            <AddressBar>
            <span style={{ fontFamily: 'ms_sans_serif' }}>{currentPath}</span>
            </AddressBar>
        </NavigationBar>
        
        {/* Explorer Content */}
        <ExplorerContent>
            {/* Folder Tree */}
            <FolderTree>
            <MenuList>
                <MenuListItem>
                <span style={{ fontWeight: 'bold' }}>Projects</span>
                </MenuListItem>
                {languages.map(lang => (
                <MenuListItem 
                    key={lang.id}
                    onClick={() => handleFolderClick(lang.id)}
                    style={{ paddingLeft: '20px', cursor: 'pointer' }}
                >
                    {lang.name}
                </MenuListItem>
                ))}
            </MenuList>
            </FolderTree>
            
            {/* File View */}
            <FileView>
            {selectedFolder ? (
                // Show projects for the selected language
                <IconGrid>
                {projects[selectedFolder].map(project => (
                    <IconItem 
                    key={project.id}
                    onClick={() => handleProjectClick(project)}
                    >
                    <IconImage src={project.icon} />
                    <IconText>{project.name}</IconText>
                    </IconItem>
                ))}
                </IconGrid>
            ) : (
                // Show language folders
                <IconGrid>
                {languages.map(lang => (
                    <IconItem 
                    key={lang.id}
                    onClick={() => handleFolderClick(lang.id)}
                    >
                    <IconImage src={lang.icon} />
                    <IconText>{lang.name}</IconText>
                    </IconItem>
                ))}
                </IconGrid>
            )}
            </FileView>
        </ExplorerContent>
        
        {/* Status Bar */}
        <StatusBar>
            <div>
            {selectedFolder ? 
                `${projects[selectedFolder].length} project(s)` : 
                `${languages.length} language(s)`
            }
            </div>
        </StatusBar>
        
        {/* Project Detail Windows */}
        {projectWindows.map(window => (
            <ProjectDetailsWindow
            key={window.id}
            id={window.id}
            title={window.title}
            project={window.project}
            position={window.position}
            onClose={() => closeWindow(window.id)}
            onFocus={() => focusWindow(window.id)}
            zIndex={window.zIndex}
            />
        ))}
        </ExplorerContainer>
    );
};

export default ProjectsContent;