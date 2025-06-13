import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_WS_URL || 'http://localhost:3000', {
  autoConnect: false
});

export default socket;