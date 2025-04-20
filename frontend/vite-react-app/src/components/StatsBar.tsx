import React from 'react';
import { Packet } from '../type/Packet';

interface Props {
  packets: Packet[];
}

const StatsBar: React.FC<Props> = ({ packets }) => {
  const stats = {
    total: packets.length,
    tcp: packets.filter(p => p.protocol.toLowerCase() === 'tcp').length,
    udp: packets.filter(p => p.protocol.toLowerCase() === 'udp').length,
    icmp: packets.filter(p => p.protocol.toLowerCase() === 'icmp').length,
    other: packets.filter(p => !['tcp', 'udp', 'icmp'].includes(p.protocol.toLowerCase())).length
  };

  return (
    <div className="space-y-2">
      <div className="bg-gray-700 p-3 rounded">
        <h3 className="font-semibold mb-2">Network Statistics</h3>
        <div className="space-y-1 text-sm">
          <p>Total Packets: {stats.total}</p>
          <p>TCP: {stats.tcp}</p>
          <p>UDP: {stats.udp}</p>
          <p>ICMP: {stats.icmp}</p>
          <p>Other: {stats.other}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
