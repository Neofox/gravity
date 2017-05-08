import { Server } from 'http';
import socketio from 'socket.io';

const server = socketio();

export const univNet = server.of('/univ');
export const chatNet = server.of('/chat');

export function attachServer(httpServer: Server): void {
    server.attach(httpServer);
}

