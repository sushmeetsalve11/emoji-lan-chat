
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './Header';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import EmojiSuggestion from './EmojiSuggestion';
import ConnectionDialog from './ConnectionDialog';
import { Message, User, ChatState } from '../types';

// For demo purposes, we'll simulate the server/client communication
class MockConnection {
  private static instance: MockConnection;
  private callbacks: Array<(message: Message) => void> = [];
  private users: User[] = [];
  private isConnected = false;

  private constructor() {}

  public static getInstance(): MockConnection {
    if (!MockConnection.instance) {
      MockConnection.instance = new MockConnection();
    }
    return MockConnection.instance;
  }

  public connect(user: User, isServer: boolean): void {
    this.isConnected = true;
    this.users.push(user);
    
    // Simulate a join message
    const joinMessage: Message = {
      id: uuidv4(),
      sender: 'System',
      content: `${user.nickname} has joined the chat`,
      timestamp: Date.now(),
      emoji: '👋'
    };
    
    setTimeout(() => {
      this.broadcast(joinMessage);
    }, 500);
  }

  public disconnect(user: User): void {
    this.isConnected = false;
    this.users = this.users.filter(u => u.id !== user.id);
    
    // Simulate a leave message
    const leaveMessage: Message = {
      id: uuidv4(),
      sender: 'System',
      content: `${user.nickname} has left the chat`,
      timestamp: Date.now(),
      emoji: '👋'
    };
    
    setTimeout(() => {
      this.broadcast(leaveMessage);
    }, 500);
  }

  public sendMessage(message: Message): void {
    if (this.isConnected) {
      setTimeout(() => {
        this.broadcast(message);
      }, 100);
    }
  }

  public onMessageReceived(callback: (message: Message) => void): void {
    this.callbacks.push(callback);
  }

  private broadcast(message: Message): void {
    this.callbacks.forEach(callback => callback(message));
  }
}

const ChatWindow = () => {
  const [state, setState] = useState<ChatState>({
    messages: [],
    users: [],
    currentUser: null,
    isConnected: false,
    suggestedEmoji: ''
  });
  
  const [showConnectionDialog, setShowConnectionDialog] = useState(true);
  
  useEffect(() => {
    const connection = MockConnection.getInstance();
    
    connection.onMessageReceived((message) => {
      setState(prevState => ({
        ...prevState,
        messages: [...prevState.messages, message]
      }));
    });
  }, []);
  
  const handleConnect = (nickname: string, isServer: boolean) => {
    const newUser: User = {
      id: uuidv4(),
      nickname,
      isConnected: true
    };
    
    setState(prevState => ({
      ...prevState,
      currentUser: newUser,
      isConnected: true
    }));
    
    const connection = MockConnection.getInstance();
    connection.connect(newUser, isServer);
    
    setShowConnectionDialog(false);
  };
  
  const handleDisconnect = () => {
    if (state.currentUser) {
      const connection = MockConnection.getInstance();
      connection.disconnect(state.currentUser);
      
      setState(prevState => ({
        ...prevState,
        isConnected: false
      }));
      
      setShowConnectionDialog(true);
    }
  };
  
  const handleSendMessage = (content: string, emoji: string) => {
    if (!state.currentUser || !state.isConnected) return;
    
    const newMessage: Message = {
      id: uuidv4(),
      sender: state.currentUser.nickname,
      content,
      timestamp: Date.now(),
      emoji: emoji || undefined
    };
    
    const connection = MockConnection.getInstance();
    connection.sendMessage(newMessage);
  };
  
  const handleEmojiSuggestion = (emoji: string) => {
    setState(prevState => ({
      ...prevState,
      suggestedEmoji: emoji
    }));
  };
  
  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto shadow-lg border border-gray-200 rounded-lg overflow-hidden">
      <Header 
        currentUser={state.currentUser} 
        isConnected={state.isConnected}
        onDisconnect={handleDisconnect}
      />
      
      <MessageList 
        messages={state.messages}
        currentUserNickname={state.currentUser?.nickname}
      />
      
      <div className="px-4">
        <EmojiSuggestion emoji={state.suggestedEmoji} />
      </div>
      
      <MessageInput 
        isConnected={state.isConnected}
        onSendMessage={handleSendMessage}
        onEmojiSuggestion={handleEmojiSuggestion}
      />
      
      <ConnectionDialog 
        isOpen={showConnectionDialog}
        onClose={() => {
          if (!state.isConnected) {
            setShowConnectionDialog(true);
          } else {
            setShowConnectionDialog(false);
          }
        }}
        onConnect={handleConnect}
      />
    </div>
  );
};

export default ChatWindow;
