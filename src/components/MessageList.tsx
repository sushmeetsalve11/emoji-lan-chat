
import { useEffect, useRef } from 'react';
import { Message } from '../types';

interface MessageListProps {
  messages: Message[];
  currentUserNickname: string | undefined;
}

const MessageList = ({ messages, currentUserNickname }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  return (
    <div className="flex-1 p-6 overflow-y-auto bg-white/5 backdrop-blur-sm">
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-white/60 mt-10 space-y-2">
            <p className="text-lg font-medium">No messages yet</p>
            <p className="text-sm">Start chatting by typing a message below!</p>
          </div>
        ) : (
          messages.map((message) => {
            const isCurrentUser = message.sender === currentUserNickname;
            
            return (
              <div 
                key={message.id} 
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl p-4 shadow-md 
                    ${isCurrentUser 
                      ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-br-none' 
                      : 'bg-white/10 backdrop-blur-sm text-white rounded-bl-none'
                    }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`font-medium text-sm ${isCurrentUser ? 'text-violet-200' : 'text-purple-200'}`}>
                      {message.sender}
                    </span>
                    <span className={`text-xs ${isCurrentUser ? 'text-violet-200/70' : 'text-white/50'}`}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <p className="leading-relaxed">{message.content}</p>
                  
                  {message.emoji && (
                    <div className="text-xl mt-2 opacity-90">
                      {message.emoji}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
