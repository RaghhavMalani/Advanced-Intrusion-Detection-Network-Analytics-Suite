import React from "react";
import LivePacketStream from "./components/LivePacketStream";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-black p-4">
      <h1 className="text-xl font-bold mb-4">Live Packet Stream</h1>
      <LivePacketStream />
    </div>
  );
};

export default App;
