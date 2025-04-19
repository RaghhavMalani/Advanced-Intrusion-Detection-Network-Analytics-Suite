import React from 'react';
import { useSocket } from '../hooks/useSocket';

export const LivePacketStream = () => {
  const { packets, startSniffer } = useSocket();

  return (
    <div className="p-4">
      <button
        onClick={startSniffer}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Start Sniffer
      </button>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {packets.map((pkt, idx) => (
          <div key={idx} className="bg-gray-800 text-white p-2 rounded">
            <div><strong>{pkt.protocol}</strong> - {pkt.src} ➡️ {pkt.dst}</div>
            {pkt.anomaly && <div className="text-red-400">⚠️ {pkt.anomaly}</div>}
            <div className="text-sm">{new Date(pkt.time).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
