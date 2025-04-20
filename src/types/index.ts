
export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: number;
  emoji?: string;
}

export interface User {
  id: string;
  nickname: string;
  isConnected: boolean;
}

export interface ChatState {
  messages: Message[];
  users: User[];
  currentUser: User | null;
  isConnected: boolean;
  suggestedEmoji: string;
}
