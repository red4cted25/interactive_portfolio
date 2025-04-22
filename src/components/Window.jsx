import Draggable from "react-draggable";
import { Button, Window, WindowHeader, WindowContent} from 'react95';
import { styled } from 'styled-components';

const StyledWindow = styled(Window)`
    position: absolute;
    min-width: 320px;
`;

const DraggableWindow = ({ id, title, children, initialPosition, onClose, onFocus, zIndex, width = 400, height = 300}) => {
    return (
        <Draggable 
            defaultPosition={initialPosition} 
            handle=".window-header"
            bounds="parent"
        >
            <StyledWindow style={{ zIndex, width, height }} onClick={() => onFocus(id)}>
            <WindowHeader className="window-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>{title}</span>
                <Button onClick={() => onClose(id)}>
                <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>×</span>
                </Button>
            </WindowHeader>
            <WindowContent style={{ height: 'calc(100% - 33px)', overflow: 'auto' }}>
                {children}
            </WindowContent>
            </StyledWindow>
        </Draggable>
    );
};

export default DraggableWindow;