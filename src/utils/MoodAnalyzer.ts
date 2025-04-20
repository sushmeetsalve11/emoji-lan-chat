interface EmojiMapping {
  [key: string]: string;
}

export class MoodAnalyzer {
  private moodMap: EmojiMapping;

  constructor() {
    this.moodMap = {
      // Happy emotions
      "happy": "😊",
      "glad": "😀",
      "joy": "😄",
      "excited": "🤩",
      "great": "😃",
      "wonderful": "🥰",
      "love": "❤️",
      "awesome": "🤩",
      "amazing": "🤩",
      "excellent": "👍",
      "good": "🙂",
      "lol": "😂",
      "haha": "😆",
      
      // Sad emotions
      "sad": "😢",
      "unhappy": "😔",
      "depressed": "😞",
      "disappointed": "😕",
      "sorry": "😥",
      "upset": "😟",
      "miss": "😥",
      
      // Angry emotions
      "angry": "😠",
      "mad": "😡",
      "annoyed": "😤",
      "frustrated": "🙄",
      "hate": "👿",
      
      // Surprised emotions
      "surprised": "😮",
      "wow": "😲",
      "omg": "😱",
      "shocked": "😱",
      
      // Neutral or thinking
      "thinking": "🤔",
      "confused": "😕",
      "unsure": "🤷",
      "maybe": "🤔",
      
      // Tired or sleepy
      "tired": "😴",
      "sleepy": "😪",
      "exhausted": "😫",
      
      // Other common expressions
      "thanks": "🙏",
      "thank": "🙏",
      "please": "🙏",
      "congrats": "🎉",
      "congratulations": "🎉",
      "cool": "😎",
      "yes": "👍",
      "no": "👎",
      "hello": "👋",
      "hi": "👋",
      "bye": "👋",
      "food": "🍕",
      "hungry": "🍔",
      "thirsty": "🥤"
    };
  }

  public analyzeMood(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    // Detect multiple emotions in the message
    let foundEmojis: string[] = [];
    
    Object.keys(this.moodMap).forEach(mood => {
      // Check if the word appears as a whole word in the message
      const regex = new RegExp(`\\b${mood}\\b`, 'i');
      if (regex.test(lowerMessage)) {
        foundEmojis.push(this.moodMap[mood]);
      }
    });
    
    // Return unique emojis, up to 3
    return [...new Set(foundEmojis)].slice(0, 3).join(' ');
  }
}
