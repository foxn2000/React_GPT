import './App.css';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">AI Chat Assistant</h1>
        <p className="app-description">GPT-4-miniを使用したチャットボット</p>
      </header>
      <ChatWindow />
    </div>
  );
}

export default App;
