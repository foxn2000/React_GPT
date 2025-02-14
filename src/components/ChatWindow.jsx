import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { generateChatResponse } from '../services/openai';
import { FaSpinner } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  color: #007bff;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  padding: 0.5rem;
  margin: 0.5rem;
  text-align: center;
  background-color: #f8d7da;
  border-radius: 4px;
`;

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content) => {
    const userMessage = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    const updatedMessages = [...messages, userMessage];
    const response = await generateChatResponse(updatedMessages);

    if (response.success) {
      setMessages(prev => [...prev, response.data]);
    } else {
      setError('メッセージの送信中にエラーが発生しました。もう一度お試しください。');
    }

    setIsLoading(false);
  };

  return (
    <Container>
      <MessagesContainer>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isLoading && (
          <LoadingSpinner>
            <FaSpinner size={24} />
          </LoadingSpinner>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </Container>
  );
};

export default ChatWindow;
