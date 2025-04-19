import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [packets, setPackets] = useState<any[]>([]);

  useEffect(() => {
    const sock = io(SOCKET_URL);
    setSocket(sock);

    sock.on('packet', (data: any) => {
      setPackets(prev => [...prev, data]);
    });

    sock.on('sniffer_started', (data: any) => {
      console.log(data.status);
    });

    return () => {
      sock.disconnect();
    };
  }, []);

  const startSniffer = () => {
    if (socket) socket.emit('start_sniffer');
  };

  return { packets, startSniffer };
};
