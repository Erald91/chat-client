import {io} from 'socket.io-client';

const DISCONNECT_REASON = Object.freeze({
  SERVER_DISCONNECT: 'io server disconnect'
});

const SocketService = (domain = '', options = {}) => {
  const socket = io(domain, {...options, reconnectionDelay: 1500, reconnectionDelayMax: 2000});
  const listeners = {};

  socket.on('connect', () => {
    fireListeners('connect');
    console.log('Connection with server established', socket.id);
  });

  socket.on('connect_error', () => {
    fireListeners('connect_error');
    console.log('Failed to connect with server');
  });

  socket.on('disconnect', (reason) => {
    fireListeners('disconnect', reason);
    console.log('Disconnected from server', reason);
    if (reason === DISCONNECT_REASON.SERVER_DISCONNECT) {
      // Try to reconnect with server if socket disconnected from it
      socket.connect();
    }
  });

  socket.on('message', (payload) => {
    fireListeners('message', payload);
  });

  socket.on('command', (payload) => {
    fireListeners('command', payload);
  });

  const fireListeners = (event, payload = null) => (listeners[event] || []).forEach(
    listener => listener(payload)
  );

  const on = (event, handler) => {
    if (listeners[event]) {
      listeners[event].push(handler);
    } else {
      listeners[event] = [handler];
    }
  };

  const off = (event, handler) => {
    if (!listeners[event]) {
      return;
    }
    listeners[event] = listeners[event].filter(existing => existing === handler);
  };

  const dispose = () => {
    if (socket.connected) {
      socket.disconnect();
    }
  };

  const sendMessage = (author, message) =>  {
    socket.emit('message', {author, message});
  };

  const sendCommand = (author, type = null) => {
    socket.emit('command', {author, command: {type}});
  };

  return {on, off, dispose, sendMessage, sendCommand};
}

export default SocketService;
