import styled from '@emotion/styled';
import { FaUser, FaRobot } from 'react-icons/fa';

const MessageContainer = styled.div`
  display: flex;
  padding: 1rem;
  gap: 1rem;
  background-color: ${props => props.isUser ? '#f0f0f0' : '#ffffff'};
  border-bottom: 1px solid #e0e0e0;
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.isUser ? '#007bff' : '#28a745'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const MessageContent = styled.div`
  flex-grow: 1;
  white-space: pre-wrap;
`;

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <MessageContainer isUser={isUser}>
      <IconContainer isUser={isUser}>
        {isUser ? <FaUser /> : <FaRobot />}
      </IconContainer>
      <MessageContent>
        {message.content}
      </MessageContent>
    </MessageContainer>
  );
};

export default ChatMessage;
