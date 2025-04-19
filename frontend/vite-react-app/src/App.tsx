// src/App.tsx
import React from 'react';
import { useSocket } from './hooks/useSocket';

function App() {
  const { packets, startSniffer } = useSocket();

  return (
    <div className="bg-gray-900 text-green-400 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">
        Advanced Intrusion Detection Network Analytics Suite
      </h1>

      <button
        onClick={startSniffer}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold mb-6"
      >
        Start Sniffer
      </button>

      <div className="bg-gray-800 p-4 rounded shadow-md max-h-[500px] overflow-y-scroll">
        <h2 className="text-xl font-semibold mb-3">Live Packet Logs</h2>
        <ul className="space-y-2 text-sm">
          {packets.length === 0 && <p>No packets captured yet...</p>}
          {packets.map((pkt, index) => (
            <li key={index} className="bg-gray-700 p-2 rounded">
              <span className="block">📦 <b>Protocol:</b> {pkt.protocol}</span>
              <span className="block">🌐 <b>Source:</b> {pkt.src} → <b>Dest:</b> {pkt.dst}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
