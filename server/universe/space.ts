import { World } from 'matter-js';
import { Physics, MetaEntity } from './meta_entity';

export class Space extends MetaEntity<World> {
    public addMetaEntity<T extends Physics>(entity: MetaEntity<T>): void {
        World.add(this.physics, entity.physics as Physics);
    }

    public removeMetaEntity<T extends Physics>(entity: MetaEntity<T>): void {
        World.remove(this.physics, entity.physics as Physics);
    }

    protected synthetize(): World {
        return World.create({
            gravity: { x: 0, y: 0, scale: 0 }
        });
    }
}
