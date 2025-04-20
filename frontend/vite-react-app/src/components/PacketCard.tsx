// src/components/PacketCard.tsx
import React from 'react';
import { Packet } from '../type/Packet';

interface Props {
  packet: Packet;
}

const PacketCard: React.FC<Props> = ({ packet }) => {
  const bgColor = packet.scanner ? 'bg-red-900/90' : 'bg-gray-800/90';

  return (
    <div className={`p-4 rounded-lg shadow-lg ${bgColor} border-l-4 ${packet.scanner ? 'border-red-500' : 'border-blue-500'}`}>
      <div className="grid gap-3">
        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-blue-400">{packet.protocol}</span>
            {packet.scanner && (
              <span className="px-2 py-0.5 text-xs bg-red-500/20 rounded text-red-300">ALERT</span>
            )}
          </div>
          <span className="text-sm font-medium text-gray-300">{packet.length.toLocaleString()} bytes</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Source:</span>
            <span className="text-lg font-mono text-white">{packet.src_ip}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Destination:</span>
            <span className="text-lg font-mono text-white">{packet.dst_ip}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Time:</span>
            <span className="text-white">{new Date(packet.timestamp).toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PacketCard;
