// src/components/PacketCard.tsx
import React from 'react';
import { Packet } from '../type/Packet';
import { motion } from 'framer-motion';

interface Props {
  packet: Packet;
}

const PacketCard: React.FC<Props> = ({ packet }) => {
  const getProtocolColor = (protocol: string) => {
    switch (protocol.toLowerCase()) {
      case 'tcp':
        return 'bg-blue-500/20 text-blue-400';
      case 'udp':
        return 'bg-purple-500/20 text-purple-400';
      case 'icmp':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <div className={`group relative p-6 rounded-xl transition-all duration-300 ${
      packet.scanner 
        ? 'bg-red-900/20 border-red-500/30 hover:bg-red-900/30' 
        : 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70'
    } border backdrop-blur-sm`}>
      {/* Protocol Badge */}
      <div className="absolute -top-2 -right-2">
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getProtocolColor(packet.protocol)}`}>
          {packet.protocol}
        </span>
      </div>

      {/* Alert Badge */}
      {packet.scanner && (
        <div className="absolute -top-2 -left-2">
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-500/20 text-red-400">
            ALERT
          </span>
        </div>
      )}

      {/* Content */}
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Size:</span>
            <span className="font-mono text-white">{formatBytes(packet.length)}</span>
          </div>
          <span className="text-sm text-gray-400">
            {new Date(packet.timestamp).toLocaleTimeString()}
          </span>
        </div>

        {/* IP Addresses */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-sm text-gray-400">Source</span>
            <div className="font-mono text-white bg-gray-900/50 px-3 py-2 rounded-lg">
              {packet.src_ip}
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-sm text-gray-400">Destination</span>
            <div className="font-mono text-white bg-gray-900/50 px-3 py-2 rounded-lg">
              {packet.dst_ip}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        {packet.scanner && (
          <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-sm text-red-400">
              Suspicious activity detected from this source
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PacketCard;
