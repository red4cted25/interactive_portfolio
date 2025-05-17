import { useState, useContext } from 'react';
import { MenuList, MenuListItem, Frame, Button } from 'react95';
import { styled } from 'styled-components';
import { DesktopSettingsContext } from '../contexts/DesktopSettingsContext'; // You'll create this

const ExplorerContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const ExplorerContent = styled.div`
    display: flex;
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
    padding: 16px;
    background-color: white;
`;

const ColorBlock = styled.div`
    width: 60px;
    height: 40px;
    border: 2px solid black;
    margin: 8px;
    cursor: pointer;
`;

const IconGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
`;

const IconItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    cursor: pointer;
    width: 80px;
    margin-bottom: 10px;
    padding: 6px;
    &:hover {
        background-color: #c0d0ff;
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

const NicoComputer = ({ openWindow }) => {
    const [selectedFolder, setSelectedFolder] = useState('backgrounds');
    const { setBackgroundColor, setTheme } = useContext(DesktopSettingsContext);

    const themes = ['original', 'tokyoDark', '1995', 'modernDark'];
    const backgroundColors = ['#008080', '#202020', '#000080', '#C0C0C0', '#004000'];

    const appIcons = [
        { id: 'projects', name: 'My Projects', icon: 'your-project-icon-url', onClick: () => openWindow('projects') },
        { id: 'resume', name: 'Resume', icon: 'your-resume-icon-url', onClick: () => openWindow('resume') },
        { id: 'contact', name: 'Contact', icon: 'your-contact-icon-url', onClick: () => openWindow('contact') }
    ];

    return (
        <ExplorerContainer>
        <ExplorerContent>
            <FolderTree>
            <MenuList>
                <MenuListItem onClick={() => setSelectedFolder('backgrounds')}>Backgrounds</MenuListItem>
                <MenuListItem onClick={() => setSelectedFolder('themes')}>Themes</MenuListItem>
                <MenuListItem onClick={() => setSelectedFolder('apps')}>Other Apps</MenuListItem>
            </MenuList>
            </FolderTree>
            <FileView>
            {selectedFolder === 'backgrounds' && (
                <IconGrid>
                {backgroundColors.map((color, i) => (
                    <ColorBlock
                    key={i}
                    style={{ backgroundColor: color }}
                    onClick={() => setBackgroundColor(color)}
                    />
                ))}
                </IconGrid>
            )}

            {selectedFolder === 'themes' && (
                <IconGrid>
                {themes.map((theme, i) => (
                    <Frame key={i} variant="field" style={{ padding: '8px' }}>
                    <p style={{ marginBottom: 8 }}>{theme}</p>
                    <Button onClick={() => setTheme(theme)}>Apply Theme</Button>
                    </Frame>
                ))}
                </IconGrid>
            )}

            {selectedFolder === 'apps' && (
                <IconGrid>
                {appIcons.map(app => (
                    <IconItem key={app.id} onClick={app.onClick}>
                    <IconImage src={app.icon} />
                    <div>{app.name}</div>
                    </IconItem>
                ))}
                </IconGrid>
            )}
            </FileView>
        </ExplorerContent>
        </ExplorerContainer>
    );
};

export default NicoComputer;
