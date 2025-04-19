export interface Packet {
  id: string;
  src_ip: string;
  dst_ip: string;
  protocol: string;
  length: number;
  timestamp: string;
  anomaly?: {
    type: 'port_scan' | 'flood' | string;
    description: string;
  };
}
