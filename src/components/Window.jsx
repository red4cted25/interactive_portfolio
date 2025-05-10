import { useMediaQuery } from 'react-responsive';
import { Window, WindowHeader, WindowContent, Button } from 'react95';
import styled from 'styled-components';
import { Rnd } from 'react-rnd';

const StyledWindow = styled(Window)`
    position: absolute;
    display: flex;
    flex-direction: column;
`;

const HeaderBar = styled(WindowHeader)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: move;
    user-select: none;
    padding-right: 6px;
`;

const CloseButton = styled(Button)`
    margin-left: 4px;
`;

const DraggableWindow = ({
        id,
        title,
        content,
        position,
        zIndex,
        onClose,
        onFocus,
        width,
        height,
    }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    if (isMobile) {
        return (
        <StyledWindow
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '85vw',
                height: '85vh',
                zIndex,
            }}
            onClick={() => onFocus(id)}
        >
            <HeaderBar>
            <span>{title}</span>
            <CloseButton size="sm" onClick={() => onClose(id)}>
                <span style={{ fontWeight: 'bold' }}>×</span>
            </CloseButton>
            </HeaderBar>
            <WindowContent style={{ overflowY: 'auto' }}>{content}</WindowContent>
        </StyledWindow>
        );
    }

    // Desktop: Draggable and resizable
    return (
        <Rnd
            bounds="parent"
            default={{
                x: position.x,
                y: position.y,
                width,
                height,
            }}
            minWidth={300}
            minHeight={200}
            dragHandleClassName="title-bar"
            style={{ zIndex }}
            onMouseDown={() => onFocus(id)}
        >
        <StyledWindow resizable >
            <HeaderBar className="title-bar" active>
            <span>{title}</span>
            <CloseButton size="sm" onClick={() => onClose(id)}>
                <span style={{ fontWeight: 'bold' }}>×</span>
            </CloseButton>
            </HeaderBar>
            <WindowContent style={{ overflowY: 'auto' }}>{content}</WindowContent>
        </StyledWindow>
        </Rnd>
    );
};

export default DraggableWindow;
