import { useState } from 'react';
import styled from '@emotion/styled';
import { FaPaperPlane } from 'react-icons/fa';

const InputContainer = styled.form`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
`;

const TextArea = styled.textarea`
  flex-grow: 1;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  resize: none;
  font-family: inherit;
  font-size: 1rem;
  min-height: 40px;
  max-height: 120px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SendButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #0056b3;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <InputContainer onSubmit={handleSubmit}>
      <TextArea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="メッセージを入力..."
        disabled={isLoading}
      />
      <SendButton type="submit" disabled={!message.trim() || isLoading}>
        <FaPaperPlane />
        送信
      </SendButton>
    </InputContainer>
  );
};

export default ChatInput;
