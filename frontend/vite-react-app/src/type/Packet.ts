export interface Packet {
  timestamp: string;
  src_ip: string;
  dst_ip: string;
  protocol: string;
  length: number;
  scanner?: boolean; // 👈 optional flag for scanner packets
}
