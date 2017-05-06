import { Server } from 'http';
import socketio from 'socket.io';
import logger from '../logger';

const server = socketio();

export const worldNet = makeNamespace('world');
export const chatNet = makeNamespace('chat');

export function attachServer(httpServer: Server): void {
    server.attach(httpServer);
}

function makeNamespace(name: string): SocketIO.Namespace {
    return server.of(`/${name}`).on('connect', handleConnect);
}

function handleConnect(socket: SocketIO.Socket): void {
    logger.info(`rtm: ${socket.client.conn.remoteAddress} connected to ${socket.nsp.name}`);
}
