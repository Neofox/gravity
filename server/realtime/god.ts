import { Spaceship, Universe } from '../universe';

let universe: Universe;

export function createUniverse(): void {
    universe = new Universe();
    universe.run();
}

export function createPlayer(): void {
    const ship = new Spaceship();

    universe.space.addMetaEntity(ship);
}
