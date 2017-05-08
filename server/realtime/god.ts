import logger from '../logger';
import { Spaceship, Universe } from '../universe';
import { Player } from './player';
import { univNet } from './server';

let universe: Universe;
const players = new Map<string, Player>();

export function createUniverse(): void {
    universe = new Universe();
    universe.run();

    logger.info('god: created an empty universe');

    univNet.on('connection', handlePlayerConnection);
}

function handlePlayerConnection(socket: SocketIO.Socket): void {
    logger.info(`god: new connection: ${socket.id} (${socket.conn.remoteAddress})`);

    createPlayer(socket);

    socket.on('disconnect', (reason: string) => handlePlayerDisconnection(socket, reason));
}

function handlePlayerDisconnection(socket: SocketIO.Socket, reason: string): void {
    logger.info(`god: disconnection of ${socket.id} (${socket.conn.remoteAddress}), reason is ${reason}`);

    killPlayer(socket);
}

function createPlayer(socket: SocketIO.Socket): Player {
    const spaceship = new Spaceship();
    const player = new Player(spaceship);

    players.set(socket.id, player);

    universe.space.addMetaEntity(spaceship);

    return player;
}

function killPlayer(socket: SocketIO.Socket): boolean {
    const player = players.get(socket.id);
    if (!player) return false;

    universe.space.removeMetaEntity(player.spaceship);

    return true;
}
