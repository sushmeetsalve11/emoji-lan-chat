
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
    <div 
      className={`${
        isServer 
          ? 'bg-gradient-to-r from-blue-600/90 to-blue-500/90' 
          : 'bg-gradient-to-r from-emerald-600/90 to-emerald-500/90'
      } backdrop-blur-lg text-white p-6 rounded-t-xl shadow-lg flex justify-between items-center`}
    >
      <div className="flex items-center space-x-3">
        <span className="text-2xl filter drop-shadow-md">💬</span>
        <h1 className="text-xl font-semibold tracking-tight">
          {isServer ? 'Chat Server' : 'Chat Client'}
        </h1>
      </div>
      
      <div className="flex items-center gap-6">
        {currentUser && (
          <div className="font-medium px-4 py-1.5 bg-white/10 rounded-full">
            {currentUser.nickname}
          </div>
        )}
        
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'} shadow-lg`} />
          <span className={`font-medium ${statusClass}`}>{statusText}</span>
        </div>
        
        {isConnected && (
          <button 
            onClick={onDisconnect}
            className="px-4 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-100 rounded-full font-medium transition-colors duration-200"
          >
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
