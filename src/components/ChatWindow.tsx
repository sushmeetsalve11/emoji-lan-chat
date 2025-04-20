
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './Header';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import EmojiSuggestion from './EmojiSuggestion';
import ConnectionDialog from './ConnectionDialog';
import { Message, User, ChatState } from '../types';
import { MockConnection } from '../utils/MockConnection';
import { useToast } from "@/components/ui/use-toast";

const ChatWindow = () => {
  const { toast } = useToast();
  const [state, setState] = useState<ChatState>({
    messages: [],
    users: [],
    currentUser: null,
    isConnected: false,
    suggestedEmoji: '',
    isChatFull: false,
    isServer: false
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

    // Check if chat is already full
    if (connection.isChatFull()) {
      setState(prevState => ({
        ...prevState,
        isChatFull: true
      }));
    }
  }, []);
  
  const handleConnect = (nickname: string, isServer: boolean) => {
    const connection = MockConnection.getInstance();
    
    // Check if max users reached
    if (connection.getUserCount() >= 2 && !isServer) {
      toast({
        title: "Connection Failed",
        description: "The chat room is full (max 2 users). Please try again later.",
        variant: "destructive"
      });
      return;
    }
    
    const newUser: User = {
      id: uuidv4(),
      nickname,
      isConnected: true
    };
    
    const connected = connection.connect(newUser, isServer);
    
    if (connected) {
      setState(prevState => ({
        ...prevState,
        currentUser: newUser,
        isConnected: true,
        isServer: isServer
      }));
      
      setShowConnectionDialog(false);
    } else {
      toast({
        title: "Connection Failed",
        description: "The chat room is full (max 2 users). Please try again later.",
        variant: "destructive"
      });
    }
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
    <div className={`flex flex-col h-screen max-w-4xl mx-auto shadow-lg border border-white/10 backdrop-blur-md bg-white/5 rounded-lg overflow-hidden ${state.isServer ? 'bg-blue-950/10' : 'bg-emerald-950/10'}`}>
      <Header 
        currentUser={state.currentUser} 
        isConnected={state.isConnected}
        onDisconnect={handleDisconnect}
        isServer={state.isServer}
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
          // Allow closing the dialog even if not connected
          setShowConnectionDialog(false);
        }}
        onConnect={handleConnect}
        isChatFull={MockConnection.getInstance().isChatFull()}
      />
    </div>
  );
};

export default ChatWindow;
