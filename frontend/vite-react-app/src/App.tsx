import React from "react";
import LivePacketStream from "./components/LivePacketStream";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Network Packet Analyzer
          </h1>
          <p className="text-gray-400 mt-2">Real-time network traffic monitoring and analysis</p>
        </header>
        <LivePacketStream />
      </div>
    </div>
  );
};

export default App;
