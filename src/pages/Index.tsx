
import ChatWindow from '@/components/ChatWindow';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Emoji LAN Chat</h1>
          <p className="text-gray-300">Connect with friends on your local network with mood detection</p>
        </div>
        
        <ChatWindow />
      </div>
    </div>
  );
};

export default Index;
