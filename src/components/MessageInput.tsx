
import { useState, useEffect, useRef } from 'react';
import { MoodAnalyzer } from '../utils/MoodAnalyzer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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
    <div className="p-6 border-t border-white/10 bg-white/5 backdrop-blur-md rounded-b-xl">
      <div className="flex items-end gap-4">
        <Textarea
          ref={inputRef}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={isConnected ? "Type a message..." : "Connect to start chatting..."}
          disabled={!isConnected}
          className="flex-1 resize-none bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-purple-500"
          rows={2}
        />
        <Button
          onClick={handleSendMessage}
          disabled={!isConnected || message.trim() === ''}
          className={`px-6 h-12 ${
            isConnected && message.trim() !== ''
              ? 'bg-purple-500 hover:bg-purple-600 text-white'
              : 'bg-white/10 text-white/50 cursor-not-allowed'
          }`}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
