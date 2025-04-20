
import { useState, useEffect, useRef } from 'react';
import { MoodAnalyzer } from '../utils/MoodAnalyzer';

interface MessageInputProps {
  isConnected: boolean;
  onSendMessage: (content: string, emoji: string) => void;
  onEmojiSuggestion: (emoji: string) => void;
}

const MessageInput = ({ isConnected, onSendMessage, onEmojiSuggestion }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const moodAnalyzer = useRef(new MoodAnalyzer());
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isConnected]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value;
    setMessage(newMessage);
    
    // Analyze mood and update suggestion
    const suggestedEmoji = moodAnalyzer.current.analyzeMood(newMessage);
    onEmojiSuggestion(suggestedEmoji);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleSendMessage = () => {
    if (message.trim() === '' || !isConnected) return;
    
    const emoji = moodAnalyzer.current.analyzeMood(message);
    onSendMessage(message, emoji);
    setMessage('');
    onEmojiSuggestion('');
  };
  
  return (
    <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
      <div className="flex items-end space-x-2">
        <textarea
          ref={inputRef}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={isConnected ? "Type a message..." : "Connect to start chatting..."}
          disabled={!isConnected}
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none resize-none"
          rows={2}
        />
        <button
          onClick={handleSendMessage}
          disabled={!isConnected || message.trim() === ''}
          className={`px-4 py-3 rounded-lg font-medium ${
            isConnected && message.trim() !== ''
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          } transition-colors`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
