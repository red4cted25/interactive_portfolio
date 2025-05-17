import { useState, useEffect } from 'react';
import DraggableWindow from './components/Window';
import AboutMeContent from './AboutMe';
import ProjectsContent from './Projects';
import ResumeContent from './Resume';
import ContactContent from './ContactMe';
// ** React95 Imports **
import { AppBar, Button, Toolbar, MenuList, MenuListItem, Separator, styleReset} from 'react95';
import { createGlobalStyle, ThemeProvider, styled } from 'styled-components';
/* Fonts and Theme */
import original from 'react95/dist/themes/original'; 
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

// Global styles for react95
const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  
  body, input, select, textarea {
    font-family: 'ms_sans_serif';
  }
  
  body {
    margin: 0;
    padding: 0;
  }
  
  * {
    box-sizing: border-box;
  }
`;

// Styled components for our layout
const AppContainer = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const DesktopArea = styled.div`
  flex: 1;
  position: relative;
  background-color: #008080; /* Classic Windows 98 teal background */
  overflow: hidden;
  padding: 20px;
  user-select: none;
`;

const DesktopIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  width: 80px;
  text-align: center;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  img {
    width: 48px;
    height: 48px;
    margin-bottom: 5px;
  }
  
  .icon {
    font-size: 32px;
    margin-bottom: 5px;
  }
  
  span {
    color: white;
    font-size: 12px;
    text-shadow: 1px 1px 1px black;
    word-wrap: break-word;
    max-width: 75px;
  }
`;

const TaskbarButton = styled(Button)`
  margin-right: 5px;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 8px;
`;

const ClockArea = styled.div`
  padding: 2px 10px;
  border: 1px solid #888;
  background-color: #c0c0c0;
  box-shadow: inset 1px 1px #fff, inset -1px -1px #888;
`;
const Win98Portfolio = () => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [openWindows, setOpenWindows] = useState([]);
  const [nextZIndex, setNextZIndex] = useState(1);
  
  // Update time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCurrentTime(timeString);
    };
    
    updateTime();
    const timer = setInterval(updateTime, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  const windowContents = {
    'about': { component: <AboutMeContent />, title: 'About Me', width: 450, height: 400 },
    'projects': { component: <ProjectsContent />, title: 'My Projects', width: 500, height: 450 },
    'resume': { component: <ResumeContent />, title: 'Resume', width: 550, height: 375 },
    'contact': { component: <ContactContent />, title: 'Contact', width: 400, height: 500 }
  };
  
  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };
  
  const centerWindowPosition = (width, height) => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    return {
      x: (screenWidth - width) / 2 + Math.floor(Math.random() * 50) - 20,
      y: (screenHeight - height) / 2 + Math.floor(Math.random() * 50) - 20,
    };
  };

  const openWindow = (type) => {
    const windowContent = windowContents[type];
  
    if (openWindows.some(window => window.type === type)) {
      focusWindow(openWindows.find(window => window.type === type).id);
      return;
    }
  
    const position = centerWindowPosition(windowContent.width, windowContent.height);
  
    const newWindow = {
      id: Date.now(),
      type,
      title: windowContent.title,
      position,
      zIndex: nextZIndex,
      width: windowContent.width,
      height: windowContent.height
    };
  
    setOpenWindows([...openWindows, newWindow]);
    setNextZIndex(nextZIndex + 1);
    setIsStartMenuOpen(false);
  };
  
  
  const closeWindow = (id) => {
    setOpenWindows(openWindows.filter(window => window.id !== id));
  };
  
  const focusWindow = (id) => {
    const windowToFocus = openWindows.find(w => w.id === id);
    
    if (windowToFocus && windowToFocus.zIndex !== nextZIndex - 1) {
      setOpenWindows(
        openWindows.map(window => 
          window.id === id 
            ? { ...window, zIndex: nextZIndex }
            : window
        )
      );
      setNextZIndex(nextZIndex + 1);
    }
  };
  
  const desktopIcons = [
    { 
      name: "Nico's Computer", 
      icon: 'https://res.cloudinary.com/drnaycy06/image/upload/v1745356100/computer_explorer_cool-0_tse5md.png',
      onClick: () => openWindow('about')
    },
    { 
      name: 'My Projects', 
      icon: 'https://res.cloudinary.com/drnaycy06/image/upload/v1745356157/directory_closed-4_ehkixu.png',
      onClick: () => openWindow('projects')
    },
    { 
      name: 'Resume', 
      icon: 'https://res.cloudinary.com/drnaycy06/image/upload/v1745356180/document-0_lyzog6.png',
      onClick: () => openWindow('resume')
    },
    { 
      name: 'Contact Me', 
      icon: 'https://res.cloudinary.com/drnaycy06/image/upload/v1745356187/envelope_closed-0_okted3.png',
      onClick: () => openWindow('contact')
    },
    { 
      name: 'Recycle Bin', 
      icon: 'https://res.cloudinary.com/drnaycy06/image/upload/v1745356943/recycle_bin_empty-4_nmu8qs.png',
      onClick: () => alert('Recycle Bin is empty')
    }
  ];
  
  return (
    <ThemeProvider theme={original}>
      <GlobalStyles />
      <AppContainer>
        <DesktopArea onClick={() => isStartMenuOpen && setIsStartMenuOpen(false)}>
          {/* Desktop Icons */}
          {desktopIcons.map((icon, index) => (
            <DesktopIcon 
              key={index} 
              onClick={(e) => {
                e.stopPropagation();
                icon.onClick();
              }}
              style={{ position: 'relative', top: index * 30 }}
            >
              <img src={icon.icon} alt={icon.name} className="icon" />
              <span>{icon.name}</span>
            </DesktopIcon>
          ))}
          
          {/* Render all open windows */}
          {openWindows.map(window => (
            <DraggableWindow
              key={window.id}
              id={window.id}
              title={window.title}
              content={windowContents[window.type].component}
              position={window.position}
              zIndex={window.zIndex}
              width={window.width}
              height={window.height}
              onClose={closeWindow}
              onFocus={focusWindow}
            >
              {windowContents[window.type].component}
            </DraggableWindow>
          ))}
        </DesktopArea>
        
        {/* Taskbar */}
        <AppBar style={{ position: 'relative', bottom: 0 }}>
          <Toolbar style={{ justifyContent: 'space-between' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Button onClick={(e) => {
                e.stopPropagation();
                toggleStartMenu();
              }} active={isStartMenuOpen}>
                <img 
                  src="data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 2H7.5V7.5H0V2ZM8.5 2H16V7.5H8.5V2ZM0 8.5H7.5V14H0V8.5ZM8.5 8.5H16V14H8.5V8.5Z' fill='%23000000'/%3E%3C/svg%3E"
                  alt="Start" 
                  style={{ marginRight: '5px', width: '16px', height: '16px' }}
                />
                Start
              </Button>
              
              {isStartMenuOpen && (
                <MenuList 
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: 0,
                    width: '200px',
                  }}
                >
                  <MenuListItem onClick={() => openWindow('about')}>
                    <span role="img" aria-label="about"><img src="https://res.cloudinary.com/drnaycy06/image/upload/v1745356742/computer_explorer-0_nkg8wi.png" alt="Computer" /></span> Nico's Computer
                  </MenuListItem>
                  <MenuListItem onClick={() => openWindow('projects')}>
                    <span role="img" aria-label="projects"><img src="https://res.cloudinary.com/drnaycy06/image/upload/v1745357067/directory_closed-1_zh32fr.png" alt="Projects" /></span> My Projects
                  </MenuListItem>
                  <MenuListItem onClick={() => openWindow('resume')}>
                    <span role="img" aria-label="resume"><img src="https://res.cloudinary.com/drnaycy06/image/upload/v1745357082/document-1_yx3joe.png" alt="Resume" /></span> Resume
                  </MenuListItem>
                  <Separator />
                  <MenuListItem onClick={() => openWindow('contact')}>
                    <span role="img" aria-label="contact"><img src="https://res.cloudinary.com/drnaycy06/image/upload/v1745357117/envelope_closed-1_spanot.png" alt="Envelope" /></span> Contact Me
                  </MenuListItem>
                </MenuList>
              )}
            </div>
            
            {/* Open window indicators in taskbar */}
            <div style={{ flex: 1, display: 'flex', marginLeft: 10, marginRight: 10, overflow: 'hidden' }}>
              {openWindows.map(window => (
                <TaskbarButton 
                  key={window.id} 
                  active={window.zIndex === nextZIndex - 1}
                  onClick={() => focusWindow(window.id)}
                >
                  {window.title}
                </TaskbarButton>
              ))}
            </div>
            
            <ClockArea>
              {currentTime}
            </ClockArea>
          </Toolbar>
        </AppBar>
      </AppContainer>
    </ThemeProvider>
  );
};

export default Win98Portfolio;