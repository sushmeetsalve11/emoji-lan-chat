
import { useEffect, useState } from 'react';

interface EmojiSuggestionProps {
  emoji: string;
}

const EmojiSuggestion = ({ emoji }: EmojiSuggestionProps) => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    if (emoji) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [emoji]);
  
  if (!emoji) return null;
  
  return (
    <div className="flex items-center mt-2 mb-2 text-sm text-gray-600">
      <span className="mr-2">Mood Suggestion:</span>
      <div className={`text-2xl ${animate ? 'animate-bounce' : ''}`}>
        {emoji}
      </div>
    </div>
  );
};

export default EmojiSuggestion;
