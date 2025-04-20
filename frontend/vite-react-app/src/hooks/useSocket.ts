import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Packet } from '../type/Packet';

const SOCKET_URL = 'http://localhost:5000';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [packets, setPackets] = useState<Packet[]>([]);

  useEffect(() => {
    const sock = io(SOCKET_URL, {
      transports: ['websocket'], // force WebSocket only (skip polling fallback)
    });

    sock.on('connect', () => {
      console.log('Socket connected:', sock.id);
    });

    sock.on('packet', (data: any) => {
      const packet: Packet = {
        timestamp: data.time,
        src_ip: data.src,
        dst_ip: data.dst,
        protocol: data.protocol,
        length: data.length,
        scanner: !!data.anomaly // Mark as suspicious if there's an anomaly
      };
      console.log('Received packet:', packet);
      setPackets(prev => [packet, ...prev.slice(0, 99)]);
    });

    sock.on('sniffer_started', (data: any) => {
      console.log('[✓] Sniffer started:', data.status);
    });

    sock.on('connect_error', (err) => {
      console.error('[x] Socket connection error:', err.message);
    });

    setSocket(sock);

    return () => {
      sock.disconnect();
      console.log('Socket disconnected');
    };
  }, []);

  const startSniffer = () => {
    if (socket && socket.connected) {
      socket.emit('start_sniffer');
      console.log('Starting sniffer...'); // Debug log
    } else {
      console.warn('[!] Socket not connected. Cannot start sniffer.');
    }
  };

  return { packets, startSniffer };
};
