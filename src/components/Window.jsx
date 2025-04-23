import Draggable from "react-draggable";
import { Button, Window, WindowHeader, WindowContent } from 'react95';
import { styled } from 'styled-components';

const StyledWindow = styled(Window)`
    position: absolute;
    min-width: 320px;
`;

const DraggableWindow = ({ id, title, children, initialPosition, onClose, onFocus, zIndex, width = 400, height = 'auto' }) => {
    return (
        <Draggable 
            defaultPosition={initialPosition} 
            handle=".window-header"
            bounds="parent"
        >
            <StyledWindow 
                style={{ 
                    zIndex, 
                    width, 
                    maxHeight: '90vh',
                }} 
                onClick={() => onFocus(id)}
            >
                <WindowHeader className="window-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{title}</span>
                    <Button onClick={() => onClose(id)}>
                        <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>×</span>
                    </Button>
                </WindowHeader>
                <WindowContent className="overflow-y-auto" style={{ maxHeight: 'calc(80vh - 33px)' }}>
                    {children}
                </WindowContent>
            </StyledWindow>
        </Draggable>
    );
};

export default DraggableWindow;