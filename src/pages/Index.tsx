
import ChatWindow from '@/components/ChatWindow';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 space-y-3">
          <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
            Emoji LAN Chat
          </h1>
          <p className="text-lg text-white/80 font-light">
            Connect with friends on your local network with mood detection
          </p>
        </div>
        
        <ChatWindow />
      </div>
    </div>
  );
};

export default Index;
