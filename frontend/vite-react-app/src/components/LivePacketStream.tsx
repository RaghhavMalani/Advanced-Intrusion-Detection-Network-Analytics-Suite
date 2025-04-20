// src/components/LivePacketStream.tsx
import React from 'react';
import { useSocket } from '../hooks/useSocket';
import PacketCard from './PacketCard';
import StatsBar from './StatsBar';
import { Packet } from '../type/Packet';

const LivePacketStream: React.FC = () => {
  const { packets, startSniffer } = useSocket();

  const fakePackets: Packet[] = [
    {
      timestamp: new Date().toISOString(),
      src_ip: '10.0.0.5',
      dst_ip: '192.168.0.1',
      protocol: 'TCP',
      length: 512,
      scanner: true
    },
    {
      timestamp: new Date().toISOString(),
      src_ip: '172.16.0.3',
      dst_ip: '8.8.8.8',
      protocol: 'UDP',
      length: 128,
      scanner: false
    }
  ];

  const allPackets = [...fakePackets, ...packets];

  return (
    <div className="w-screen h-screen flex bg-gray-900 text-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/4 min-w-[250px] bg-gray-800 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6">Live Packet Stream</h2>
          <button
            onClick={startSniffer}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mb-6"
          >
            Start Sniffer
          </button>
        </div>
        {/* Stats Bar */}
        <div>
          <StatsBar packets={allPackets} />
        </div>
      </div>

      {/* Packet Display */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-950">
        <h2 className="text-xl font-bold mb-4">Live Packets</h2>
        {allPackets.length === 0 ? (
          <p className="text-gray-400">No packets captured yet.</p>
        ) : (
          <div className="space-y-4">
            {allPackets.map((packet, index) => (
              <PacketCard key={index} packet={packet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePacketStream;
