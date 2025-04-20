
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
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            <p>No messages yet</p>
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
                  className={`max-w-[80%] rounded-lg p-3 shadow-sm 
                    ${isCurrentUser 
                      ? 'bg-blue-500 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                    }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`font-bold text-sm ${isCurrentUser ? 'text-blue-100' : 'text-blue-500'}`}>
                      {message.sender}
                    </span>
                    <span className={`text-xs ${isCurrentUser ? 'text-blue-200' : 'text-gray-400'}`}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <p>{message.content}</p>
                  
                  {message.emoji && (
                    <div className="text-lg mt-1">
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
