
import { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ConnectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (nickname: string, isServer: boolean) => void;
}

const ConnectionDialog = ({ isOpen, onClose, onConnect }: ConnectionDialogProps) => {
  const [nickname, setNickname] = useState('');
  const [isServer, setIsServer] = useState(false);
  const [error, setError] = useState('');

  const handleConnect = () => {
    if (!nickname.trim()) {
      setError('Please enter a nickname');
      return;
    }
    
    onConnect(nickname.trim(), isServer);
    setError('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 animate-in fade-in-50 zoom-in-95">
          <h2 className="text-xl font-bold mb-4">Connect to Chat</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nickname">Your Nickname</Label>
              <Input
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter your nickname"
                className="w-full"
                autoFocus
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isServer"
                checked={isServer}
                onChange={(e) => setIsServer(e.target.checked)}
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <Label htmlFor="isServer">Host the chat (be the server)</Label>
            </div>
            
            <div className="text-sm text-gray-500">
              <p>💡 <strong>How to connect:</strong></p>
              <p>1. One person should check "Host the chat" to start the server</p>
              <p>2. Others can leave it unchecked to connect as clients</p>
              <p>3. All users must be on the same local network</p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleConnect}>
              Connect
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ConnectionDialog;
