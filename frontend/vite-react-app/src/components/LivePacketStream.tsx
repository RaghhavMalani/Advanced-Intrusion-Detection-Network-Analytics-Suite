// src/components/LivePacketStream.tsx
import React, { useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import PacketCard from './PacketCard';
import StatsBar from './StatsBar';
import { Packet } from '../type/Packet';
import { motion, AnimatePresence } from 'framer-motion';

const LivePacketStream: React.FC = () => {
  const { packets, startSniffer } = useSocket();
  const [isSnifferActive, setIsSnifferActive] = useState(false);

  const handleStartSniffer = () => {
    startSniffer();
    setIsSnifferActive(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main Content Area */}
      <div className="lg:col-span-3 space-y-6">
        {/* Control Panel */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Live Packet Stream</h2>
              <p className="text-gray-400">Monitor network traffic in real-time</p>
            </div>
            <button
              onClick={handleStartSniffer}
              disabled={isSnifferActive}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                isSnifferActive
                  ? 'bg-green-500/20 text-green-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isSnifferActive ? 'Sniffer Active' : 'Start Sniffer'}
            </button>
          </div>
        </div>

        {/* Packet Display */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 h-[calc(100vh-300px)] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Live Packets</h3>
            <span className="text-sm text-gray-400">{packets.length} packets captured</span>
          </div>
          
          <AnimatePresence>
            {packets.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-64"
              >
                <p className="text-gray-400">No packets captured yet. Start the sniffer to begin monitoring.</p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {packets.map((packet, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PacketCard packet={packet} />
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Stats Sidebar */}
      <div className="lg:col-span-1">
        <StatsBar packets={packets} />
      </div>
    </div>
  );
};

export default LivePacketStream;
