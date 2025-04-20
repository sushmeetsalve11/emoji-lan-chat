
import { useState, useEffect } from 'react';
import { User } from '../types';

interface HeaderProps {
  currentUser: User | null;
  isConnected: boolean;
  onDisconnect: () => void;
  isServer: boolean;
}

const Header = ({ currentUser, isConnected, onDisconnect, isServer }: HeaderProps) => {
  const [statusText, setStatusText] = useState('Disconnected');
  const [statusClass, setStatusClass] = useState('text-red-500');
  
  useEffect(() => {
    if (isConnected) {
      setStatusText('Connected');
      setStatusClass('text-green-500');
    } else {
      setStatusText('Disconnected');
      setStatusClass('text-red-500');
    }
  }, [isConnected]);
  
  return (
    <div className={`${isServer ? 'bg-gradient-to-r from-blue-600 to-blue-400' : 'bg-gradient-to-r from-green-600 to-green-400'} text-white p-4 rounded-t-lg shadow-md flex justify-between items-center`}>
      <div className="flex items-center space-x-2">
        <span className="text-2xl">💬</span>
        <h1 className="text-xl font-bold">
          {isServer ? 'Emoji LAN Chat (Server)' : 'Emoji LAN Chat (Client)'}
        </h1>
      </div>
      
      <div className="flex items-center">
        {currentUser && (
          <div className="mr-4 font-medium">
            User: {currentUser.nickname}
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <span>Status: </span>
          <span className={`font-bold ${statusClass}`}>{statusText}</span>
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        </div>
        
        {isConnected && (
          <button 
            onClick={onDisconnect}
            className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
