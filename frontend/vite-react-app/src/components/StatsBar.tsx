import React from 'react';
import { Packet } from '../type/Packet';
import { motion } from 'framer-motion';

interface Props {
  packets: Packet[];
}

const StatsBar: React.FC<Props> = ({ packets }) => {
  const stats = {
    total: packets.length,
    tcp: packets.filter(p => p.protocol.toLowerCase() === 'tcp').length,
    udp: packets.filter(p => p.protocol.toLowerCase() === 'udp').length,
    icmp: packets.filter(p => p.protocol.toLowerCase() === 'icmp').length,
    other: packets.filter(p => !['tcp', 'udp', 'icmp'].includes(p.protocol.toLowerCase())).length,
    alerts: packets.filter(p => p.scanner).length
  };

  const getPercentage = (value: number) => {
    return stats.total > 0 ? (value / stats.total) * 100 : 0;
  };

  const StatItem: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">{label}</span>
        <span className="font-medium text-white">{value}</span>
      </div>
      <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${getPercentage(value)}%` }}
          transition={{ duration: 0.5 }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-semibold text-white mb-4">Network Statistics</h3>
        <div className="space-y-4">
          <StatItem label="Total Packets" value={stats.total} color="bg-blue-500" />
          <StatItem label="TCP" value={stats.tcp} color="bg-blue-400" />
          <StatItem label="UDP" value={stats.udp} color="bg-purple-400" />
          <StatItem label="ICMP" value={stats.icmp} color="bg-green-400" />
          <StatItem label="Other" value={stats.other} color="bg-gray-400" />
        </div>
      </div>

      {/* Alerts Card */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-semibold text-white mb-4">Security Alerts</h3>
        <div className="space-y-4">
          <StatItem label="Suspicious Activity" value={stats.alerts} color="bg-red-500" />
          <div className="pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Alert Rate</span>
              <span className="text-sm font-medium text-white">
                {getPercentage(stats.alerts).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Traffic Summary */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-semibold text-white mb-4">Traffic Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Average Packet Size</span>
            <span className="text-white">
              {stats.total > 0
                ? (packets.reduce((sum, p) => sum + p.length, 0) / stats.total).toFixed(1)
                : 0} bytes
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Capture Duration</span>
            <span className="text-white">
              {stats.total > 0
                ? `${((new Date().getTime() - new Date(packets[0].timestamp).getTime()) / 1000).toFixed(1)}s`
                : '0s'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
