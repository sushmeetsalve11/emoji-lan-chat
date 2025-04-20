
import { v4 as uuidv4 } from 'uuid';
import { Message, User } from '../types';

export class MockConnection {
  private static instance: MockConnection;
  private callbacks: Array<(message: Message) => void> = [];
  private users: User[] = [];
  private isConnected = false;
  private maxUsers = 2;

  private constructor() {}

  public static getInstance(): MockConnection {
    if (!MockConnection.instance) {
      MockConnection.instance = new MockConnection();
    }
    return MockConnection.instance;
  }

  public isChatFull(): boolean {
    return this.users.length >= this.maxUsers;
  }

  public getUserCount(): number {
    return this.users.length;
  }

  public connect(user: User, isServer: boolean): boolean {
    // Check if we already have max users
    if (this.users.length >= this.maxUsers && !isServer) {
      return false;
    }

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

    return true;
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
