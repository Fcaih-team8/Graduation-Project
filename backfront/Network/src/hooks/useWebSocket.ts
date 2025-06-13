import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import socket from '../lib/socket';

export function useWebSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.connect();

    socket.on('stats:update', () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
    });

    socket.on('alerts:new', () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    });

    socket.on('threats:update', () => {
      queryClient.invalidateQueries({ queryKey: ['threats'] });
    });

    socket.on('traffic:update', () => {
      queryClient.invalidateQueries({ queryKey: ['traffic'] });
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);
}