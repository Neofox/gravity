import socketio from 'socket.io-client';

export const univNet = connectNamespace('univ');
export const chatNet = connectNamespace('chat');

function connectNamespace(name: string): SocketIOClient.Socket {
    return socketio(`:${process.env.SERVER_PORT}/${name}`);
}
